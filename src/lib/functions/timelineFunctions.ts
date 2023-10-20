import type { TimeChunk } from "$lib/types/frontend_types";
import type { TogglTimeEntry } from "$lib/types/toggl_types";
import type { Task } from "@doist/todoist-api-typescript";
import { togglProjectIdToFirebaseProject } from "./togglFunctions";
import { DateTime } from "luxon";
import { todoistProjectIdToFirebaseProject } from "./todoistFunctions";



//every unit is 20 minues, 0 is 7:40a 50 is 12:20a

export const timeEntryToTimeChunk = (entry:TogglTimeEntry) => {
    let chunk : TimeChunk = {
        start: convertTimeToTimelineUnits(entry.start),
        end: convertTimeToTimelineUnits(entry.stop),
        name: entry.description,
        project: togglProjectIdToFirebaseProject(entry.pid)?.name,
        color: togglProjectIdToFirebaseProject(entry.pid)?.color,
        active: entry.duration<0
    }

    if(chunk.active) chunk.end = convertTimeToTimelineUnits(DateTime.now().toISO());

    return chunk;

}

export const taskToTimeChunk= (task:Task) => {
    let chunk : TimeChunk = {
        start: convertTimeToTimelineUnits(task.due?.datetime),
        end: convertTimeToTimelineUnits(task.due?.datetime)+convertTodoistDurationToTimlineUnits(task.duration),
        name: task.content,
        project: todoistProjectIdToFirebaseProject(task.projectId)?.name,
        color: todoistProjectIdToFirebaseProject(task.projectId)?.color,
        active:false
    }

    

    return chunk;
}

const convertTimeToTimelineUnits = (time:string) =>  Math.round(((DateTime.fromISO(time).hour-7)*60+DateTime.fromISO(time).minute-40)/20);

const convertDurationToTimelineUnits = (duration:number) => Math.round(duration/20)

const convertTodoistDurationToTimlineUnits = (durationObject):number =>{
    let timelineDuration:number = 0;
    console.log(durationObject)
    
    if(durationObject == null) return 0;

    switch (durationObject.unit){
        case "day": timelineDuration = durationObject.amount * 24 * 3;
            break;

        case "hour": timelineDuration = durationObject.amount * 3;
            break;

        case "minute": timelineDuration = durationObject.amount;
            break;
        case "second": timelineDuration = durationObject.amount / 120;
            break;

        case "millisecond": timelineDuration = durationObject.amount / 12000
            break;
    };

    timelineDuration = timelineDuration/20;

    console.log(timelineDuration)
    return timelineDuration;
}




const checkIfValidStartTime = (startTime:number) => {

}