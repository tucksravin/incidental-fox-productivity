import type { TimeChunk } from "$lib/types/frontend_types";
import type { Project, Task } from "@doist/todoist-api-typescript";
import { derived, writable} from "svelte/store";

// Initialize the store with an empty object
export const todoistProjects = writable<Project[]>([]);
export const todoistTasks = writable<Task[]>([]);
export const todoistTimeline = writable<TimeChunk[]>([]);
export const todoistLoading = writable<boolean>(false);
export const sortedTodoistTasks = derived(todoistTasks, ($todoistTimeEntries) => {
    
    return $todoistTimeEntries.sort((a, b) => {
        var aTime = new Date(a.due?.datetime);
        var bTime = new Date(b.due?.datetime);
        
        if( aTime < bTime){
            return -1;
        }
        else{
            return 1;
        
        }
    }
    

)});