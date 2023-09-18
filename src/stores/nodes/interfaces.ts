export type NodeId = string;
export type NodeMark = 'red' | 'green' | 'blue';

export interface NodeState {
    id: NodeId;
    expanded: boolean;
    primary?: boolean;
    complete: boolean;
    modified?: string;
    locked?: boolean;
    mark?: NodeMark;
}

export interface NodeProperties {
    id: NodeId;
    title: string;
    parent_id: NodeId;
}

export interface RawNode extends NodeProperties {
    children: NodeId[];
}

export interface Node extends NodeProperties, NodeState {
    children: Node[];
}

export type NodeMap = Record<NodeId, RawNode>;
export type NodeStatesMap = Record<NodeId, NodeState>;
export type TNodeState = keyof Pick<NodeState, 'expanded' | 'complete'>;
