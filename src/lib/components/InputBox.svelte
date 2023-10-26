<script lang="ts">
    import type { Task } from "@doist/todoist-api-typescript";
    import { addStartTimeToTask, addDurationToTask, addDateToTask, fetchTodoistTasks, todoistProjectIdToFirebaseProject } from "$lib/functions/todoistFunctions";
    import { DateTime } from "luxon"
    import { userData } from "$lib/stores/firebaseStore";
    import Icon from "@iconify/svelte";

    export let isDateInput:boolean;
    export let isEditingStart:boolean;
    export let hideInput;
    export let task:Task;
    const project = todoistProjectIdToFirebaseProject(task.projectId);
    const boxBgColorCSS = `background-color:${project?.color}20`

    
    let inputTime:string;
    let inputDate:string;



    let handleTimeSubmit = async () => {
        hideInput();
        //let testdate = DateTime.local(task.due.date.slice(0,4),task.due.date.slice(5,7),task.due.date.slice(8,10),inputTime.slice(0,2), inputTime.slice(3,5));
        //console.log(testdate);
        //console.log(task.due.date.slice(8,10))
        //console.log(inputTime.slice(0,2))
        //console.log(buildInputDateString())

        console.log(DateTime.fromISO(inputDate))

        if(isDateInput){
            await addDateToTask($userData.todotoken, task.id, DateTime.fromISO(inputDate))
        }
        else if(isEditingStart){
            await addStartTimeToTask($userData.todotoken, task.id, parseInputTime().setZone('UTC').toISO())
        }
        else{
            await addDurationToTask($userData.todotoken, task.id, task.due.datetime, parseInputTime().toISO())
        }
        let date = DateTime.fromISO(task.due.date)
        
        fetchTodoistTasks($userData.todotoken, date.month, date.day, date.year);
    }
    
    let parseInputTime = ():DateTime =>  
    DateTime.local(parseInt(task.due.date.slice(0,4)),parseInt(task.due.date.slice(5,7)),parseInt(task.due.date.slice(8,10)),parseInt(inputTime.slice(0,2)), parseInt(inputTime.slice(3,5)));

</script>

<div class="top-0 left-0 fixed bg-slate-200 z-50 h-48 w-2/5 min-w-[24rem] mx-[30vw] mt-[20vh] rounded-lg" >
    <div class="w-full h-full rounded-lg" style={boxBgColorCSS}>
    <div class="ablsolute top-2 left-2 p-4 text-left text-md font-semibold text-slate-700">{task?.content}</div>
    <button aria-label="close-button" on:click={hideInput}>
        <Icon icon="tabler:x" width="30" class="absolute top-2 right-2 cursor-pointer hover:opacity-80" />
    </button>
    {#if isDateInput}
        <input id="date-input" class="mx-auto rounded-sm p-1 text-3xl" type="date" bind:value={inputDate}/>
    {:else}
        <input id="time-input" class="mx-auto rounded-sm p-1 text-3xl" type="time" bind:value={inputTime}/>
    {/if}
    {#if !task.due?.datetime}
        <div class="mt-2">when should we start?</div>
    {:else}
        <div class="mt-2">when do you think we'll be done by?</div>
    {/if}

    {#if inputTime||inputDate}
    <button class="btn-primary absolute bottom-4 right-4 p-2 rounded-md" on:click={handleTimeSubmit}>submit</button>
    {/if}
    </div>
</div>

<div class="top-0 left-0 fixed z-40 w-screen h-screen bg-slate-800/25 flex-row" on:click={hideInput} aria-hidden > 
</div>