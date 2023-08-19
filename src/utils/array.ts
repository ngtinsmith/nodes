import type { NodeId } from '@/stores/nodes/interfaces';

export const createNodeMap = <
    M extends Record<NodeId, I>,
    I extends { id: NodeId },
>(
    acc: M,
    cur: I,
): M => ({
    ...acc,
    [cur.id]: cur,
});
