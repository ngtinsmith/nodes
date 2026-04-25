import type { Node } from '~/stores/nodes/interfaces';

export interface Card {
    id: string;
    title: string;
    project_id: string;
    board_id: string;
    root_node_id: string;
}

export type CardWithTree = Card & { tree: Node | null };
