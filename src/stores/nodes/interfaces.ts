interface NodeState {
    isExpanded?: boolean;
}

export interface RawNode {
    id: string;
    title: string;
    children: string[];
    isPrimary?: boolean;
}

export type RawNodeWithState = RawNode & NodeState;

export interface Node extends NodeState {
    id: string;
    title: string;
    children: Node[];
}

export type NodeMap = Record<RawNode['id'], RawNode>;

export interface Tree {
    id: string;
    title: string;
    children: Node[];
}
