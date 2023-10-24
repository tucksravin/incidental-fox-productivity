//TODO: fill in pseudocode scaffold
import { todoistLoading, todoistProjects, todoistTasks, todoistTimeline } from "$lib/stores/todoistStore";
import { firebaseProjects } from "$lib/stores/firebaseStore";
import { TodoistApi } from "@doist/todoist-api-typescript";
import type { FirebaseProject } from "$lib/types/firebase_types";
import type { TimeChunk } from "$lib/types/frontend_types";
import { taskToTimeChunk } from "$lib/functions/timelineFunctions";
import { DateTime } from "luxon"







export const fetchTodoistProjects = async (apitoken:string) => {
    todoistLoading.set(true);
    todoistProjects.set([]);
    try {
        const todoistApi = new TodoistApi(apitoken);
        await todoistApi.getProjects().then((projects) => { 
            todoistProjects.set(projects);
            //console.log(projects);
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
      //console.log(tasks)
      todoistLoading.set(false);
    })
    .catch((error) => {
        console.log(error)
        todoistLoading.set(false);
    });

    setTodoistTimeline();

}

export function setTodoistTimeline(){
    let todoistTimeChunks:TimeChunk[] = [];
  
    let tasks;
    todoistTasks.subscribe((value) => { tasks = value;});
  
  
  
   tasks.forEach((entry)=> {
       // console.log("trying to add to timeline ")
        //console.log(entry)
      todoistTimeChunks.push(taskToTimeChunk(entry))});
  
    //console.log("todoist timeline set")
    todoistTimeline.set(todoistTimeChunks);
  }


export function todoistProjectIdToFirebaseProject(id:string) {  
    let allFirebaseProjects:FirebaseProject[];
    firebaseProjects.subscribe((value) => { allFirebaseProjects = value;});

    let currProject:FirebaseProject;

    allFirebaseProjects.forEach((project) => { 
        if(project.todoistId == id) currProject = project;
    });

    return currProject;


}
  
  

// fetch specific todoist task

// add start time to todoist task

export async function addStartTimeToTask(apitoken:string, task_id:string, startTime:string) {
    const todoistApi = new TodoistApi(apitoken);

    todoistApi.updateTask(task_id, { due_datetime: startTime })
    .then((isSuccess) => console.log(isSuccess))
    .catch((error) => console.log(error))

}

// add duration to todoist task
export async function addDurationToTask(apitoken:string, task_id:string, startTime:string, endTime:string) {
    const todoistApi = new TodoistApi(apitoken);
    let minutes = DateTime.fromISO(endTime).diff(DateTime.fromISO(startTime)).as('minutes');

    todoistApi.updateTask(task_id, { duration: minutes, duration_unit: "minute" })
    .then((isSuccess) => console.log(isSuccess))
    .catch((error) => console.log(error))

}

// delete todoist task

// mark todoist task as complete

// edit todoist task