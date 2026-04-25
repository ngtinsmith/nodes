export interface IBoardState {
    locked?: boolean;
    pinned?: boolean;
    active?: boolean;
}

export interface IS<T extends TBoardType> extends IBoardState {
    id: string;
    title: string;
    type: T;
    project_id: string;
    section_id: string;
}

export type TBoardType = 'todo' | 'document';

export type Board = IBoardTodo | IBoardDocument;

export interface IBoardTodo extends IS<'todo'> {
    type: 'todo';
    progressCurrent: number;
    progressTotal: number;
}

export interface IBoardDocument extends IS<'document'> {
    type: 'document';
    countDocs: number;
    countNotes: number;
}
