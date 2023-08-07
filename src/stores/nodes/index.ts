import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type {
    Node,
    NodeMap,
    RawNode,
    RawNodeWithState,
    Tree,
} from './interfaces';
import { nodes as staticNodes } from './data';

export const useNodes = defineStore('nodes', () => {
    const rawNodes = ref<RawNodeWithState[]>([]);
    const rootIds = computed(() =>
        rawNodes.value.filter((n) => n.isPrimary).map((n) => n.id),
    );
    const nodeMap = computed(() =>
        rawNodes.value.reduce<NodeMap>((acc, cur) => {
            return {
                ...acc,
                [cur.id]: cur,
            };
        }, {}),
    );
    const mappedTree = computed(() => buildTree(rootIds.value, nodeMap.value));

    const tree = computed<Tree>(() => ({
        id: '0',
        title: 'Root',
        children: mappedTree.value,
        isExpanded: true,
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

    async function fetchNodes() {
        rawNodes.value = staticNodes.map((node) => ({
            ...node,
            isExpanded: node.children.length > 0,
        }));
    }

    function hasChildren(node?: RawNode) {
        const childSize = node?.children?.length;

        return childSize && childSize > 0;
    }

    function buildTree(nodeIds: string[], nodeMap: NodeMap): Node[] {
        return nodeIds.map((id) => {
            const node: RawNodeWithState = nodeMap[id];
            const mappedNode: Node = {
                ...node,
                children: hasChildren(node)
                    ? buildTree(node.children, nodeMap)
                    : [],
            };

            return mappedNode;
        });
    }

    function addIntoNode({
        parentId,
        title,
    }: {
        parentId: string;
        title: string;
    }) {
        const newNode: RawNodeWithState = {
            id: uuidv4(),
            title,
            children: [],
            isExpanded: false,
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
        rawNodes.value = rawNodes.value.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    isExpanded: !node.isExpanded,
                };
            }

            return node;
        });
    }

    return {
        rawNodes,
        tree,
        treeRows,
        fetchNodes,
        addIntoNode,
        deleteNode,
        toggleNode,
    };
});
