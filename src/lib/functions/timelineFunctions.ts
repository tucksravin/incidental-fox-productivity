import type { TimeChunk } from "$lib/types/frontend_types";
import type { TogglTimeEntry } from "$lib/types/toggl_types";
import type { Task } from "@doist/todoist-api-typescript";
import { togglProjectIdToFirebaseProject } from "./togglFunctions";
import { DateTime } from "luxon";



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
        start: 0,
        end: 2,
        name: "",
        project: "",
        color: "black",
        active:false
    }

    return chunk;
}

const convertTimeToTimelineUnits = (time:string) =>  Math.round(((DateTime.fromISO(time).hour-7)*60+DateTime.fromISO(time).minute-40)/20);   


const checkIfValidStartTime = (startTime:number) => {

}