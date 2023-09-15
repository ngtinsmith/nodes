import type {
    Node,
    NodeId,
    NodeMap,
    NodeState,
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
): Node[] => {
    return nodeIds.map((id) => {
        const node: RawNode = nodeMap[id];
        const states: NodeState = nodeStatesMap[id];
        const mappedNode: Node = {
            ...node,
            ...states,
            children: hasChildren(node)
                ? buildTree(node.children, nodeMap, nodeStatesMap)
                : [],
        };

        return mappedNode;
    });
};
