import type { Project, Task } from "@doist/todoist-api-typescript";
import { writable} from "svelte/store";

// Initialize the store with an empty object
export const todoistProjects = writable<Project[]>([]);
export const todoiostTasks = writable<Task[]>([]);
export const todoistLoading = writable<boolean>(false);