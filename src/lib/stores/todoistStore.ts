import type { TimeChunk } from "$lib/types/frontend_types";
import type { Project, Task } from "@doist/todoist-api-typescript";
import { writable} from "svelte/store";

// Initialize the store with an empty object
export const todoistProjects = writable<Project[]>([]);
export const todoistTasks = writable<Task[]>([]);
export const todoistTimeline = writable<TimeChunk[]>([]);
export const todoistLoading = writable<boolean>(false);