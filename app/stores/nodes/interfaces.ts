export type NodeId = string;
export type NodeMark = 'red' | 'green' | 'blue';

export interface NodeProperties {
    id: NodeId;
    parent_id: NodeId;
    project_id: string;
}

export interface RawNodeState extends Omit<NodeProperties, 'parent_id'> {
    node_id: string;
    expanded: boolean;
    complete: boolean;
    primary?: boolean;
    modified?: string;
    locked?: boolean;
    mark?: NodeMark;
}

export interface RawNode extends NodeProperties {
    title: string;
}

export interface Node extends NodeProperties, Omit<RawNodeState, 'node_id'> {
    title: string;
    children: Node[];
}

export type NodeMap = Record<NodeId, RawNode>;
export type NodeStatesMap = Record<NodeId, RawNodeState>;
export type TNodeState = keyof Pick<RawNodeState, 'expanded' | 'complete'>;
export type RawNodeWithChildren = RawNode & { children: string[] };
export type NormalizedNodesMap = Record<NodeId, RawNodeWithChildren>;
