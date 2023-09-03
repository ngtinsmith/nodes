import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { createNodeMap } from '@/utils/array';
import { buildTree } from '@/utils/tree';
import type {
    Node,
    NodeId,
    NodeMap,
    NodeState,
    NodeStatesMap,
    RawNode,
    TNodeState,
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

    // Getters
    const rootIds = computed(() =>
        nodeStates.value.filter((n) => n.primary).map((n) => n.id),
    );
    const mappedTree = computed(() => buildTree(rootIds.value, nodeMap.value));
    const tree = computed<Node>(() => ({
        id: '0',
        parent_id: null,
        title: 'Root',
        children: mappedTree.value,
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

    const getState = computed(() => (id: NodeId, state: TNodeState) => {
        const node = nodeStateMap.value[id];

        // If root node
        if (id === '0') return true;

        return node[state];
    });

    // Returns ancestorIds in "bottom-up" direction
    // @returns { [node.id]: [parent, grand-parent, ..., root-ancestor] }
    function getAncestorIds(nodeId: NodeId) {
        const path: NodeId[] = [];

        // TODO: try iteration
        function getPath(node: RawNode) {
            if (!node.parent_id) return;

            const parentNode = nodeMap.value[node.parent_id];

            path.push(parentNode.id);
            getPath(parentNode);
        }

        getPath(nodeMap.value[nodeId]);

        return path;
    }

    // Lookup table for node path(ancestors) to root
    const nodePath = computed(() => {
        return rawNodes.value.reduce<Record<NodeId, null | NodeId[]>>(
            (acc, node) => {
                return {
                    ...acc,
                    [node.id]:
                        node.parent_id === null
                            ? null
                            : getAncestorIds(node.id),
                };
            },
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

    function addIntoNode({
        parentId,
        title,
    }: {
        parentId: string;
        title: string;
    }) {
        const newNode: RawNode = {
            id: uuidv4(),
            parent_id: parentId,
            title,
            children: [],
        };

        rawNodes.value.push(newNode);

        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        parentNode?.children.push(newNode.id);
    }

    function deleteNode(nodeId: string, parentId?: string) {
        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        if (!parentNode?.children) return;

        parentNode.children = parentNode.children.filter(
            (childId) => childId !== nodeId,
        );

        rawNodes.value = rawNodes.value.filter((node) => node.id !== nodeId);
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
        getState,
        nodePath,

        // handlers
        fetchNodes,
        addIntoNode,
        deleteNode,
        toggleNode,
        toggleNodeCheck,
    };
});
