export type TogglProject = {
    color: string,
    commentCount: number,
    id: string,
    isFavorite: boolean,
    isInboxProject: boolean,
    isShared: boolean,
    isTeamInbox: boolean,
    name: string,
    order: number,
    parentId: string|null,
    url: string
}

export type TogglTimeEntry = {
    at: string,
    billable: boolean,
    description: string,
    duration: number,
    dur_only: boolean,
    id: string,
    pid: string,
    project_id: string,
    server_deleted_at: string|null,
    start: string,
    stop: string|null,
    task_id: string,
    uid: string,
    user_id: string,
    wid: string,
    workspace_id: string,
    tags: string[]|null,
    tag_ids: string[]|null



}