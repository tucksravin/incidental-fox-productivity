<script lang="ts">
    import type { Task } from "@doist/todoist-api-typescript";
    import { todoistProjectIdToFirebaseProject, addStartTimeToTask, addDurationToTask, fetchTodoistTasks, postponeTaskByADay, completeTask, deleteTask } from "$lib/functions/todoistFunctions";
    import InputBox from "./InputBox.svelte";
    import { userData } from "$lib/stores/firebaseStore";
    import Icon from "@iconify/svelte"
    import { DateTime } from 'luxon'

    
    $userData;

    export let task:Task;
    let project = todoistProjectIdToFirebaseProject(task.projectId);
    let isHidden = false;
    const hideTask = () => isHidden = true;  

    let boxBgColorCSS = `background-color:${project?.color}20`
    let projectLabelBgColorCSS = `background-color:${project?.color}`


    let start;
    let end;


    if(task.due){
        //console.log(task.due.datetime)
        start = DateTime.fromISO(task.due.datetime);
        if(task.duration){
            //console.log(start)
            //console.log(task.due.datetime)
            //console.log(task.duration)
            switch(task.duration.unit){
                case "minute":
                    end = start.plus({ minutes: task.duration.amount });
                    break;
                case "day":
                    end = start.plus({ days: task.duration.amount })
                    break;
            }
            //console.log("end:")
            //console.log(end)
        }
    }

    let isInputVisible = false;
    let isDateInput:boolean;
    let isEditingStart:boolean;
    const hideInput = () => isInputVisible = false;

    const editStartTime = () =>{
        isInputVisible = true;
        isDateInput = false;
        isEditingStart = true;
    }

    const editStopTime = () => {
        isInputVisible = true;
        isDateInput = false;
        isEditingStart = false;
    }

    const editDate = () => {
        isInputVisible = true;
        isDateInput = true;
        isEditingStart = true;

    }


  


    



</script>

<div class:hidden={isHidden}>
<div class="w-full h-20 my-4 flex-col rounded-lg flex justify-between" style={boxBgColorCSS}>
    <div class="w-full h-8 p-2 px-4 flex flex-row justify-between">
        <h3 class="text-left text-md font-semibold text-slate-700">{task?.content}</h3>
        <div class="h-full flex flex-row">
            <button  class="ml-2 cursor-pointer hover:opacity-80 hover:text-red-700 transition-all" on:click={()=>{deleteTask($userData.todotoken, task.id); hideTask();}}>
                <Icon icon="tabler:trash" />
            </button>
            <button  class="ml-2 cursor-pointer hover:opacity-80 hover:text-yellow-500 transition-all" on:click={()=>editDate()}>
                <Icon icon="tabler:calendar" />
            </button>
            <button class="rotate-180 ml-2 cursor-pointer hover:opacity-80 hover:text-yellow-500 transition-all" on:click={()=>{postponeTaskByADay($userData.todotoken, task.id); hideTask();}}>
                <Icon icon="tabler:rotate-clockwise" />
            </button>
            <button class="ml-2 cursor-pointer hover:opacity-80 hover:text-green-700 transition-all" on:click={()=>{completeTask($userData.todotoken, task.id); hideTask();}} >
                <Icon icon="tabler:checkbox" />
            </button>
        </div>
    </div>
    <div class="w-full h-8 px-3 flex justify-between align-middle">
        <div class="flex align-middle h-full">
            {#if !task.due?.datetime}
                <button class="rounded-full text-xs px-2 h-6 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={editStartTime} on:keypress={editStartTime}>what time are we doing this?</button>
            {:else}
                <button class="rounded-full text-xs px-2 h-6 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={editStartTime} on:keypress={editStartTime}>{DateTime.fromISO(task.due.datetime).toLocaleString(DateTime.TIME_24_SIMPLE)}</button>
                <span class="mx-2 font-bold">-</span>
                {#if !task.duration}
                    <button class="rounded-full text-xs h-6 px-2 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={editStopTime} on:keypress={editStopTime}>until when?</button>
                {:else}
                    <button class="rounded-full text-xs px-2 h-6 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={editStopTime} on:keypress={editStopTime}>{end.toLocaleString(DateTime.TIME_24_SIMPLE)}</button>
                {/if}
            {/if}
        </div>
        <div class="h-6 px-2 py-1 text-xs rounded-full text-slate-100" style={projectLabelBgColorCSS}>{project?.name}</div>
    </div>
</div>
{#if isInputVisible}
    <InputBox {task} {isDateInput} {isEditingStart} {hideInput}/>
{/if}

</div>
