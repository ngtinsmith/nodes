export interface Project {
    id: string;
    title: string;
    user_id: string;
    // TODO: check if states need to be on a different table
    // could be last_opened too
    active: boolean;
}
