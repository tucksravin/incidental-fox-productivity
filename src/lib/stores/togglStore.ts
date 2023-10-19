import { writable } from 'svelte/store';
import type { TogglProject, TogglTimeEntry } from './../types/toggl_types';
import type { TimeChunk } from './../types/frontend_types'

// Initialize the store with an empty object
export const togglProjects = writable<TogglProject[]>([]);
export const togglWorkspaceId =  writable<string>("");
export const togglTimeEntries = writable<TogglTimeEntry[]>([]);
export const togglTimeline = writable<TimeChunk[]>([])
export const togglLoading = writable<boolean>(false);


