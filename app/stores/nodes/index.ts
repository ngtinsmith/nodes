import { ref, computed, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { createNodeMap } from '@/utils/array';
import { getParensMatch, incrementDuplicateCount } from '@/utils/duplicates';
import type {
    NodeId,
    NodeMap,
    RawNodeState,
    NodeStatesMap,
    RawNode,
    RawNodeWithChildren,
    NormalizedNodesMap,
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
        rawNodeStates.value.reduce<NodeStatesMap>(createNodeMap, {}),
    );

    type TParentMap = Record<NodeId, NodeId | null>;

    // Derived parent lookup — built from children[], which is the single source of truth
    const parentMap = computed((): TParentMap => {
        const map: TParentMap = {};

        for (const [id, node] of Object.entries(nodeMap.value)) {
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
            children: parentChildrenMap.value[rawNode.id] ?? [],
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
    async function fetchNodes() {
        // TODO: explore joins for single fetch call

        // api - node data
        rawNodes.value = staticNodes;

        // api - node states
        rawNodeStates.value = stateNodeStates;
    }

    const createRawNode = ({
        title,
        parentId,
        projectId,
    }: {
        title: string;
        parentId: string;
        projectId: string;
    }): RawNode => ({
        id: uuidv4(),
        title,
        project_id: projectId,
        parent_id: parentId,
    });

    function addIntoNode({
        parentId,
        title,
    }: {
        parentId: string;
        title: string;
    }) {
        const projectId = projectsStore.activeProjectId;
        const newNode = createRawNode({ title, parentId, projectId });
        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        if (!parentNode || !projectsStore.activeProject) return;

        rawNodes.value.push(newNode);
        rawNodeStates.value.push({
            id: newNode.id,
            node_id: newNode.id,
            project_id: projectId,
            complete: false,
            expanded: false,
        });

        const parentState = rawNodeStates.value.find((s) => s.id === parentId);

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
        const parentNode = rawNodes.value.find((node) => node.id === parentId);
        const siblingIds = parentChildrenMap.value[parentId];

        if (!parentNode || !siblingIds?.length) return;

        const newNode: RawNode = createRawNode({
            title,
            parentId,
            projectId: projectsStore.activeProjectId,
        });

        // let currentIdx = siblingIds.findIndex((childId) => childId === id);

        // if (pos === 'below') {
        //     currentIdx += 1;
        // }

        // if (currentIdx === siblingIds.length) {
        //     parentNode.children.push(newNode.id);
        // } else {
        //     parentNode.children.splice(currentIdx, 0, newNode.id);
        // }

        rawNodes.value.push(newNode);
        rawNodeStates.value.push({
            id: newNode.id,
            complete: false,
            expanded: false,
            node_id: newNode.id,
            project_id: projectsStore.activeProjectId,
        });
    }

    function duplicateNode(id: NodeId) {
        // 1 - prepare nodeClone
        const node = nodeMap.value[id];
        const parentId = parentMap.value[id];
        const nodeState = nodeStateMap.value[id];

        if (!parentId || !node || !nodeState) return;

        const parentNode = nodeMap.value[parentId];
        const siblingIds = parentChildrenMap.value[parentId];

        if (!parentNode || !siblingIds) return;

        const cloneId = uuidv4();
        const nodeClone = structuredClone(toRaw(node));
        const nodeStateClone = structuredClone(toRaw(nodeState));

        nodeClone.id = cloneId;
        nodeStateClone.id = cloneId;

        const { hasBrace, braced, raw } = getParensMatch(nodeClone.title);
        const siblingTitles =
            siblingIds
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
        const referenceIndex = siblingIds.findIndex(
            (childId) => childId === id,
        );
        const cloneIndex = referenceIndex + 1;

        if (cloneIndex === siblingIds.length) {
            siblingIds.push(cloneId);
        } else {
            siblingIds.splice(cloneIndex, 0, cloneId);
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
    }

    // TODO: batch create (or queue) duplicated Nodes in server

    function deleteNode(nodeId: string) {
        // TODO: handle node has children
        const parentId = parentMap.value[nodeId];
        const parentNode = rawNodes.value.find((node) => node.id === parentId);

        if (!parentNode || !parentId) return;

        // TODO: delete from raw
        // const siblingIds = parentChildrenMap.value[parentId];

        // parentNode.children = parentNode.children.filter(
        //     (childId) => childId !== nodeId,
        // );

        rawNodes.value = rawNodes.value.filter((node) => node.id !== nodeId);
        rawNodeStates.value = rawNodeStates.value.filter(
            (s) => s.id !== nodeId,
        );
    }

    function toggleNode(id: string) {
        rawNodeStates.value = rawNodeStates.value.map((node) => {
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
        rawNodeStates.value = rawNodeStates.value.map((node) => {
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
