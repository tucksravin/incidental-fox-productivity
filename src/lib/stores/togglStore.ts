import { writable } from 'svelte/store';
import { fetchTogglProjects, getTogglWorkspace } from '$lib/functions/togglFunctions';
import { userData } from '$lib/stores/firebaseStore';



// Initialize the store with an empty object
export const togglProjects = writable<any>({});
export const togglWorkspaceId =  writable<string>("");
export const togglTimeEntries = writable<any>({});
export const togglLoading = writable<boolean>(false);


