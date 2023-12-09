import { derived, writable } from 'svelte/store';
import type { TogglProject, TogglTimeEntry } from './../types/toggl_types';
import type { TimeChunk } from './../types/frontend_types'

// Initialize the store with an empty object
export const togglProjects = writable<TogglProject[]>([]);
export const togglWorkspaceId =  writable<string>("");
export const togglTimeEntries = writable<TogglTimeEntry[]>([]);
export const togglTimeline = writable<TimeChunk[]>([])
export const togglLoading = writable<boolean>(false);
export const sortedTogglTimeEntries = derived(togglTimeEntries, ($togglTimeEntries) => {
    return $togglTimeEntries.sort((a, b) => parseInt(a.start.split(":")[0])*60*60+parseInt(a.start.split(":")[1])*60 - parseInt(b.start.split(":")[0])*60*60 - parseInt(b.start.split(":")[1])*60)
})


