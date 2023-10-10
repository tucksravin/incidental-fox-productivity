import { writable } from 'svelte/store';;




// Initialize the store with an empty object
export const togglProjects = writable<any>({});
export const togglWorkspaceId =  writable<any>({});
export const togglTimeEntries = writable<any>({});
export const togglLoading = writable<boolean>(false);


