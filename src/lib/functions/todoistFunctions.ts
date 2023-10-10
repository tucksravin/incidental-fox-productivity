//TODO: fill in pseudocode scaffold
import { todoistLoading, todoistProjects } from "$lib/stores/todoistStore";


export const fetchTodoistProjects = async (apitoken:string) => {
    todoistLoading.set(true);
    todoistProjects.set([]);
    try {

        
    } catch (error) {
        console.log(error);
    }
    
}

// fetch todoist tasks for the day

// fetch specific todoist task

// add time to todoist task

// delete todoist task

// mark todoist task as complete

// edit todoist task