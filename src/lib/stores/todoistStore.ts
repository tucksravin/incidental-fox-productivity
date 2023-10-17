import { writable} from "svelte/store";

// Initialize the store with an empty object
export const todoistProjects = writable<any>({});
export const todoiostTasks = writable<any>({});
export const todoistLoading = writable<boolean>(false);