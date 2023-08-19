export type NodeId = string;
export type NodeMark = 'red' | 'green' | 'blue';

export interface NodeState {
    id: NodeId;
    expanded?: boolean;
    primary?: boolean;
    complete?: boolean;
    modified?: string;
    locked?: boolean;
    mark?: NodeMark;
}

export interface RawNode {
    id: NodeId;
    title: string;
    children: string[];
}

export interface Node {
    id: NodeId;
    title: string;
    children: Node[];
}

export type NodeMap = Record<NodeId, RawNode>;
export type NodeStatesMap = Record<NodeId, NodeState>;

export interface Tree {
    id: NodeId;
    title: string;
    children: Node[];
}

export type TNodeState = keyof Pick<NodeState, 'expanded' | 'complete'>;
