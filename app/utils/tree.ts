import type {
    Node,
    NodeId,
    NodeMap,
    NodeStatesMap,
    RawNode,
} from '@/stores/nodes/interfaces';

export const hasChildren = (node?: RawNode) => {
    const childSize = node?.children?.length;

    return childSize && childSize > 0;
};

export const buildTree = (
    nodeIds: NodeId[],
    nodeMap: NodeMap,
    nodeStatesMap: NodeStatesMap,
    parentMap: Record<NodeId, NodeId | null>,
): Node[] => {
    return nodeIds
        .map((id) => {
            const node = nodeMap[id];
            const states = nodeStatesMap[id];

            if (!node || !states) return;

            return {
                ...node,
                ...states,
                parent_id: parentMap[id] ?? null,
                children: hasChildren(node)
                    ? buildTree(
                          node?.children ?? [],
                          nodeMap,
                          nodeStatesMap,
                          parentMap,
                      )
                    : [],
            };
        })
        .filter((node) => node !== undefined);
};
