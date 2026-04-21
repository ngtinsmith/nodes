import { ref, computed, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { createNodeMap } from '@/utils/array';
import { buildTree } from '@/utils/tree';
import { getParensMatch, incrementDuplicateCount } from '@/utils/duplicates';
import type {
    Node,
    NodeId,
    NodeMap,
    NodeState,
    NodeStatesMap,
    RawNode,
} from './interfaces';
import { nodes as staticNodes } from './static/nodes';
import { nodeStates as stateNodeStates } from './static/node-states';

export const useNodes = defineStore('nodes', () => {
    // State
    const rawNodes = ref<RawNode[]>([]);
    const nodeStates = ref<NodeState[]>([]);

    // Tables
    const nodeMap = computed(() =>
        rawNodes.value.reduce<NodeMap>(createNodeMap, {}),
    );
    const nodeStateMap = computed(() =>
        nodeStates.value.reduce<NodeStatesMap>(createNodeMap, {}),
    );

    // Derived parent lookup — built from children[], which is the single source of truth
    const parentMap = computed((): Record<NodeId, NodeId | null> => {
        const map: Record<NodeId, NodeId | null> = {};
        for (const [id, node] of Object.entries(nodeMap.value)) {
            if (!(id in map)) map[id] = null;
            for (const childId of node.children) {
                map[childId] = id;
            }
        }
        return map;
    });

    // Getters
    const rootIds = computed(() =>
        nodeStates.value.filter((n) => n.primary).map((n) => n.id),
    );
    const mappedTree = computed(() =>
        buildTree(
            rootIds.value,
            nodeMap.value,
            nodeStateMap.value,
            parentMap.value,
        ),
    );
    const tree = computed<Node>(() => ({
        id: '0',
        parent_id: null,
        title: 'Root',
        children: mappedTree.value,
        complete: false,
        expanded: true,
    }));

    const treeRows = computed(() => {
        const nodes: Node[] = [];
        const nodeMap: Record<string, boolean> = {};

        function mapTreeRows(node: Node) {
            if (nodeMap[node.id]) return;

            nodes.push(node);
            nodeMap[node.id] = true;

            if (node.children.length > 0) {
                node.children.forEach(mapTreeRows);
            }
        }

        tree.value.children.forEach(mapTreeRows);

        return nodes;
    });

    const focusedNode = ref<NodeId>('');

    function setFocusedNode(id: NodeId) {
        focusedNode.value = focusedNode.value === id ? '' : id;
    }

    // Returns ancestorIds in "bottom-up" direction
    // @returns [parent, grand-parent, ..., root-ancestor]
    function getAncestorIds(nodeId: NodeId) {
        const path: NodeId[] = [];

        function getPath(id: NodeId) {
            const pid = parentMap.value[id];
            if (!pid) return;
            path.push(pid);
            getPath(pid);
        }

        getPath(nodeId);

        return path;
    }

    // Lookup table for node path(ancestors) to root
    const nodePath = computed(() => {
        return rawNodes.value.reduce<Record<NodeId, null | NodeId[]>>(
            (acc, node) => ({
                ...acc,
                [node.id]:
                    parentMap.value[node.id] === null
                        ? null
                        : getAncestorIds(node.id),
            }),
            {},
        );
    });

    // Actions
    async function fetchNodes() {
        // api - node data
        rawNodes.value = staticNodes;

        // api - node states
        nodeStates.value = stateNodeStates;
    }

    const createNode = (title: string): RawNode => ({
        id: uuidv4(),
        title,
        children: [],
    });

    function addIntoNode({
        parentId,
        title,
    }: {
        parentId: string;
        title: string;
    }) {
        const newNode: RawNode = createNode(title);
        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        if (!parentNode) return;

        parentNode.children.push(newNode.id);
        rawNodes.value.push(newNode);

        nodeStates.value.push({
            id: newNode.id,
            complete: false,
            expanded: false,
        });

        const parentState = nodeStates.value.find((s) => s.id === parentId);
        if (parentState && !parentState.expanded) {
            parentState.expanded = true;
        }
    }

    function addNode(
        parentId: NodeId,
        id: NodeId,
        title: string,
        pos: 'above' | 'below',
    ) {
        const newNode: RawNode = createNode(title);
        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        if (!parentNode) return;

        const siblingIds = parentNode.children;
        let currentIdx = siblingIds.findIndex((childId) => childId === id);

        if (pos === 'below') {
            currentIdx += 1;
        }

        if (currentIdx === siblingIds.length) {
            parentNode.children.push(newNode.id);
        } else {
            parentNode.children.splice(currentIdx, 0, newNode.id);
        }

        rawNodes.value.push(newNode);

        nodeStates.value.push({
            id: newNode.id,
            complete: false,
            expanded: false,
        });
    }

    function duplicateNode(id: NodeId) {
        // 1 - prepare nodeClone
        const node = nodeMap.value[id];
        const parentId = parentMap.value[id];
        const nodeState = nodeStateMap.value[id];

        if (!parentId || !node || !nodeState) return;

        const parentNode = nodeMap.value[parentId];

        if (!parentNode) return;

        const cloneId = uuidv4();
        const nodeClone = structuredClone(toRaw(node));
        const nodeStateClone = structuredClone(toRaw(nodeState));

        nodeClone.id = cloneId;
        nodeStateClone.id = cloneId;

        const { hasBrace, braced, raw } = getParensMatch(nodeClone.title);
        const siblingTitles =
            parentNode?.children
                .map((id) => nodeMap.value[id]?.title || '')
                .filter(Boolean) ?? [];

        if (hasBrace) {
            const newTitle = nodeClone.title.replace(braced, `(${raw + 1})`);
            nodeClone.title = incrementDuplicateCount(newTitle, siblingTitles);
        } else {
            const nextTitle = `${nodeClone.title} (1)`;
            nodeClone.title = incrementDuplicateCount(nextTitle, siblingTitles);
        }

        // 2 - insert or splice nodeClone
        const referenceIndex = parentNode.children.findIndex(
            (childId) => childId === id,
        );
        const cloneIndex = referenceIndex + 1;

        if (cloneIndex === parentNode.children.length) {
            parentNode.children.push(cloneId);
        } else {
            parentNode.children.splice(cloneIndex, 0, cloneId);
        }

        rawNodes.value.push(nodeClone);

        // TODO: option to preserve reference state
        nodeStates.value.push({
            id: cloneId,
            complete: false,
            expanded: false,
        });
    }

    // TODO: batch create (or queue) duplicated Nodes in server

    function deleteNode(nodeId: string) {
        // TODO: handle node has children
        const parentId = parentMap.value[nodeId];
        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        if (!parentNode) return;

        parentNode.children = parentNode.children.filter(
            (childId) => childId !== nodeId,
        );

        rawNodes.value = rawNodes.value.filter((node) => node.id !== nodeId);
        nodeStates.value = nodeStates.value.filter((s) => s.id !== nodeId);
    }

    function toggleNode(id: string) {
        nodeStates.value = nodeStates.value.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    expanded: !node.expanded,
                };
            }

            return node;
        });
    }

    function toggleNodeCheck(id: string) {
        nodeStates.value = nodeStates.value.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    complete: !node.complete,
                };
            }

            return node;
        });
    }

    return {
        rawNodes,
        nodeStates,
        tree,
        treeRows,

        // getters
        nodeMap,
        nodeStateMap,
        parentMap,
        nodePath,
        focusedNode,

        // handlers
        setFocusedNode,
        fetchNodes,
        toggleNode,
        toggleNodeCheck,

        // node controls
        addIntoNode,
        addNode,
        deleteNode,
        duplicateNode,
    };
});
