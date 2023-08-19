import type {
    Node,
    NodeId,
    NodeMap,
    RawNode,
} from '@/stores/nodes/interfaces';

export const hasChildren = (node?: RawNode) => {
    const childSize = node?.children?.length;

    return childSize && childSize > 0;
}

export const buildTree = (nodeIds: NodeId[], nodeMap: NodeMap): Node[] => {
    return nodeIds.map((id) => {
        const node: RawNode = nodeMap[id];
        const mappedNode: Node = {
            ...node,
            children: hasChildren(node)
                ? buildTree(node.children, nodeMap)
                : [],
        };

        return mappedNode;
    });
}
