import type {
    Node,
    NodeStatesMap,
    NormalizedNodesMap,
} from '~/stores/nodes/interfaces';

export const buildTree = (args: {
    childIds: string[];
    nodeMap: NormalizedNodesMap;
    nodeStatesMap: NodeStatesMap;
}): Node[] => {
    const { childIds, nodeMap, nodeStatesMap } = args;

    if (childIds.length === 0) return [];

    return childIds
        .map((id) => {
            const node = nodeMap[id];
            const states = nodeStatesMap[id];

            if (!node || !states) return;

            return {
                ...node,
                ...states,
                children:
                    node.children.length > 0
                        ? buildTree({ ...args, childIds: node.children })
                        : [],
            };
        })
        .filter((node) => node !== undefined);
};
