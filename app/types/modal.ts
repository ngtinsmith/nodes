import type { Node } from '@/stores/nodes/interfaces';

export interface NodeModal {
    expandNodeContent: (node: Node) => void;
}
