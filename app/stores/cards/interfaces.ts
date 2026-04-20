import type { Node } from '../nodes/interfaces';

export interface Card {
    id?: string;
    title: string;
    node: Node;
}
