import { ref, computed, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { createNodeMap, createNodeStateMap } from '@/utils/array';
import { getParensMatch, incrementDuplicateCount } from '@/utils/duplicates';
import type {
    NodeId,
    NodeMap,
    RawNodeState,
    NodeStatesMap,
    RawNode,
    RawNodeWithChildren,
    NormalizedNodesMap,
    Node,
} from './interfaces';
import { nodes as staticNodes } from '../_data/nodes';
import { nodeStates as stateNodeStates } from '../_data/node-states';
import { useProjects } from '../projects';

export const useNodes = defineStore('nodes', () => {
    const projectsStore = useProjects();

    // State
    const rawNodes = ref<RawNode[]>([]);
    const rawNodeStates = ref<RawNodeState[]>([]);

    const nodeMap = computed(() =>
        rawNodes.value.reduce<NodeMap>(createNodeMap, {}),
    );

    const nodeStateMap = computed(() =>
        rawNodeStates.value.reduce<NodeStatesMap>(createNodeStateMap, {}),
    );

    type TParentMap = Record<NodeId, NodeId | null>;

    // Derived parent lookup — built from children[], which is the single source of truth
    const parentMap = computed((): TParentMap => {
        const map: TParentMap = {};

        for (const [id, node] of Object.entries(normalizedNodesMap.value)) {
            if (!(id in map)) map[id] = null;

            const childIds = rawNodes.value
                .filter((n) => n.parent_id === node.id)
                .map((n) => n.id);

            for (const childId of childIds) {
                map[childId] = id;
            }
        }
        return map;
    });

    const parentChildrenMap = computed(() => {
        // { [parent_id]: node.id[] }
        const map: Record<string, string[]> = {};

        for (const node of rawNodes.value) {
            const entry = map[node.parent_id];

            if (entry && Array.isArray(entry)) {
                entry.push(node.id);
            } else {
                map[node.parent_id] = [node.id];
            }
        }

        return map;
    });

    const normalizedNodes = computed((): RawNodeWithChildren[] => {
        return rawNodes.value.map((rawNode) => ({
            ...rawNode,
            children:
                parentChildrenMap.value[rawNode.id]?.sort((a, b) => {
                    const aOrder = nodeMap.value[a]?.order;
                    const bOrder = nodeMap.value[b]?.order;

                    if (aOrder && bOrder) {
                        return aOrder - bOrder;
                    }

                    return -1;
                }) ?? [],
        }));
    });

    const normalizedNodesMap = computed(() =>
        normalizedNodes.value.reduce<NormalizedNodesMap>(createNodeMap, {}),
    );

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
    async function fetchNodes(projectId: string) {
        // TODO: explore joins for single fetch call

        // api - node data
        rawNodes.value = staticNodes.filter((n) => n.project_id === projectId);

        // api - node states
        rawNodeStates.value = stateNodeStates.filter(
            (ns) => ns.project_id === projectId,
        );
    }

    const createRawNode = ({
        title,
        parentId,
        projectId,
        order,
    }: {
        title: string;
        parentId: string;
        projectId: string;
        order: number;
    }): RawNode => ({
        id: uuidv4(),
        title,
        project_id: projectId,
        parent_id: parentId,
        order,
    });

    function addIntoNode({
        parentId,
        title,
    }: {
        parentId: string;
        title: string;
    }) {
        const projectId = projectsStore.activeProjectId;
        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        if (!parentNode || !projectsStore.activeProject) return;

        const entry = parentChildrenMap.value[parentId];
        const order = entry && Array.isArray(entry) ? entry.length * 10 : 10;
        const newNode = createRawNode({ title, parentId, projectId, order });

        rawNodes.value.push(newNode);
        rawNodeStates.value.push({
            id: newNode.id,
            node_id: newNode.id,
            project_id: projectId,
            complete: false,
            expanded: false,
        });

        const parentState = rawNodeStates.value.find(
            (ns) => ns.node_id === parentId,
        );

        if (parentState && !parentState.expanded) {
            parentState.expanded = true;
        }
    }

    function addNode({
        node,
        title,
        pos,
    }: {
        node: Node;
        title: string;
        pos: 'above' | 'below';
    }) {
        if (!projectsStore.activeProject) return;

        // sorted siblings - ASC
        const siblings = rawNodes.value
            .filter((n) => n.parent_id === node.parent_id)
            .sort((a, b) => a.order - b.order);

        const idx = siblings.findIndex((s) => s.id === node.id);
        if (idx === -1) return;

        // pos selects the insertion slot; derive left/right neighbors of that slot
        const leftIdx = pos === 'above' ? idx - 1 : idx;
        const rightIdx = pos === 'above' ? idx : idx + 1;

        const left = siblings[leftIdx];
        const right = siblings[rightIdx];

        let order: number;

        if (left && right) {
            // in-between
            order = (left.order + right.order) / 2;
        } else if (left) {
            // above
            order = left.order + 10;
        } else if (right) {
            // below
            order = right.order - 10;
        } else {
            // first child
            order = 10;
        }

        const newNode = createRawNode({
            title,
            parentId: node.parent_id,
            projectId: projectsStore.activeProjectId,
            order,
        });

        rawNodes.value.push(newNode);
        rawNodeStates.value.push({
            id: newNode.id,
            complete: false,
            expanded: false,
            node_id: newNode.id,
            project_id: projectsStore.activeProjectId,
        });
    }

    function recursiveDuplicate(sourceId: NodeId, newParentId: NodeId): void {
        const source = rawNodes.value.find((n) => n.id === sourceId);
        const children = parentChildrenMap.value[sourceId] ?? [];

        if (!source) return;

        const cloneId = uuidv4();

        rawNodes.value.push({
            ...structuredClone(toRaw(source)),
            id: cloneId,
            parent_id: newParentId,
        });

        rawNodeStates.value.push({
            id: cloneId,
            node_id: cloneId,
            complete: false,
            expanded: false,
            project_id: projectsStore.activeProjectId,
        });

        for (const childId of children) {
            recursiveDuplicate(childId, cloneId);
        }
    }

    function duplicateNode(id: NodeId, parentId: string) {
        // 1 - prepare nodeClone
        const node = normalizedNodesMap.value[id];
        const nodeState = nodeStateMap.value[id];

        if (!node || !nodeState) {
            console.log('Invalid node.');
            return;
        }

        const parentNode = normalizedNodesMap.value[parentId];
        const siblingIds = parentChildrenMap.value[parentId];

        if (!parentNode || !siblingIds) {
            console.error('Invalid parent node or sibling IDs.', parentId);
            return;
        }

        const cloneId = uuidv4();
        const nodeClone = structuredClone(toRaw(node));

        nodeClone.id = cloneId;

        const { hasBrace, braced, raw } = getParensMatch(nodeClone.title);
        const siblingTitles =
            siblingIds
                .map((id) => normalizedNodesMap.value[id]?.title || '')
                .filter(Boolean) ?? [];

        // Temp logic to generate random node title based on original title
        // replace with input field to type title
        if (hasBrace) {
            const newTitle = nodeClone.title.replace(braced, `(${raw + 1})`);
            nodeClone.title = incrementDuplicateCount(newTitle, siblingTitles);
        } else {
            const nextTitle = `${nodeClone.title} (1)`;
            nodeClone.title = incrementDuplicateCount(nextTitle, siblingTitles);
        }

        rawNodes.value.push(nodeClone);

        // TODO: option to preserve reference state
        rawNodeStates.value.push({
            id: cloneId,
            complete: false,
            expanded: false,
            node_id: cloneId,
            project_id: projectsStore.activeProjectId,
        });

        for (const childId of parentChildrenMap.value[id] ?? []) {
            recursiveDuplicate(childId, cloneId);
        }
    }

    function getDescendantIds(nodeId: NodeId): NodeId[] {
        const children = parentChildrenMap.value[nodeId] ?? [];
        return children.flatMap((childId) => [
            childId,
            ...getDescendantIds(childId),
        ]);
    }

    function deleteNode(node: Node) {
        const parentNode = normalizedNodesMap.value[node.parent_id];
        if (!parentNode) return;

        const toDelete = new Set([node.id, ...getDescendantIds(node.id)]);

        rawNodes.value = rawNodes.value.filter((n) => !toDelete.has(n.id));
        rawNodeStates.value = rawNodeStates.value.filter(
            (ns) => !toDelete.has(ns.node_id),
        );
    }

    function toggleNode(id: string) {
        rawNodeStates.value = rawNodeStates.value.map((ns) => {
            if (ns.node_id === id) {
                return {
                    ...ns,
                    expanded: !ns.expanded,
                };
            }

            return ns;
        });
    }

    function toggleNodeCheck(id: string) {
        rawNodeStates.value = rawNodeStates.value.map((ns) => {
            if (ns.node_id === id) {
                return {
                    ...ns,
                    complete: !ns.complete,
                };
            }

            return ns;
        });
    }

    return {
        rawNodes,
        nodeStates: rawNodeStates,
        normalizedNodes,
        normalizedNodesMap,

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
