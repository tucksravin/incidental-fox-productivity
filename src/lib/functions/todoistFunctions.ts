//TODO: fill in pseudocode scaffold
import { todoistLoading, todoistProjects, todoistTasks } from "$lib/stores/todoistStore";
import { TodoistApi } from "@doist/todoist-api-typescript";


export const fetchTodoistProjects = async (apitoken:string) => {
    todoistLoading.set(true);
    todoistProjects.set([]);
    try {
        const todoistApi = new TodoistApi(apitoken);
        await todoistApi.getProjects().then((projects) => { 
            todoistProjects.set(projects);
            console.log(projects);
            todoistLoading.set(false);
        
        });
    }    
     catch (error) {
        console.log(error);
        todoistLoading.set(false);
    }
    
}

export const fetchTodoistTasks = async (apitoken:string, month:number, day:number, year:number) => {
    const todoistApi = new TodoistApi(apitoken);
    todoistLoading.set(true);
  
  
  
  todoistApi.getTasks({filter: "due on "+month+"/"+day+"/"+year})
    .then((tasks) => {
      todoistTasks.set(tasks);
      console.log(tasks)
      todoistLoading.set(false);
    })
    .catch((error) => {
        console.log(error)
        todoistLoading.set(false);
    })

}




// fetch todoist tasks for the day

// fetch specific todoist task

// add time to todoist task

// delete todoist task

// mark todoist task as complete

// edit todoist task