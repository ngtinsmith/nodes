export interface ISummaryState {
    locked?: boolean;
    pinned?: boolean;
    active?: boolean;
}

export interface ISummaryBase<T extends TSummaryType> extends ISummaryState {
    id: string;
    title: string;
    type: T;
}

export type TSummaryType = 'todo' | 'document';

export type TSummary = ISummaryTodo | ISummaryDocument;

export interface ISummaryTodo extends ISummaryBase<'todo'> {
    type: 'todo';
    progressCurrent: number;
    progressTotal: number;
}

export interface ISummaryDocument extends ISummaryBase<'document'> {
    type: 'document';
    countDocs: number;
    countNotes: number;
}
