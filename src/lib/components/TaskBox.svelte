<script lang="ts">
    import type { Task } from "@doist/todoist-api-typescript";
    import { todoistProjectIdToFirebaseProject } from "$lib/functions/todoistFunctions";
    import Icon from "@iconify/svelte"
    import { DateTime } from 'luxon'
    
    

    export let task:Task;

    let project = todoistProjectIdToFirebaseProject(task.projectId);

    let boxBgColorCSS = `background-color:${project?.color}20`
    let projectLabelBgColorCSS = `background-color:${project?.color}`


    let start;
    let end;


    if(task.due){
        console.log(task.due.datetime)
        start = DateTime.fromISO(task.due.datetime).setZone('system');
        if(task.duration){
            console.log(start)
            console.log(task.due.datetime)
            console.log(task.duration)
            switch(task.duration.unit){
                case "minute":
                    end = start.plus({ minutes: task.duration.amount }).setZone('system')
                    break;
                case "day":
                    end = start.plus({ days: task.duration.amount })
                    break;
            }
            console.log("end:")
            console.log(end)
        }
    }

    let isTimeInputVisible = false;

    let addEndTime = () => {

    }

    let hideTimeInput = () =>  isTimeInputVisible = false;

    

    let showTimeInput = () => isTimeInputVisible = true;

    


    



</script>

<div>
<div class="w-full h-20 py-2 my-4 flex-col rounded-lg" style={boxBgColorCSS}>
    <div class="w-full h-8 p-2 px-4 text-left text-md font-semibold text-slate-700">{task?.content}</div>
    <div class="w-full h-8 p-2 pl-4 flex justify-between align-middle">
        <div class="flex align-middle h-full">
            {#if !task.due?.datetime}
                <button class="rounded-full text-sm px-2 h-6 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={showTimeInput} on:keypress={showTimeInput}>what time are we doing this?</button>
            {:else}
                <div class="text-sm">{task.due.datetime.slice(-8,-3)} -&nbsp;</div>
                {#if !task.duration}
                    <button class="rounded-full text-sm h-6 px-2 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={showTimeInput} on:keypress={showTimeInput}>until when?</button>
                {:else}
                    <div class="text-sm">{end.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
                {/if}
            {/if}
        </div>
        <div class="h-6 px-2 text-sm rounded-full text-slate-100" style={projectLabelBgColorCSS}>{project?.name}</div>
    </div>
</div>
{#if isTimeInputVisible}

    <div class="top-0 left-0 fixed bg-slate-200 z-50 h-48 w-2/5 min-w-[24rem] mx-[30vw] mt-[20vh] rounded-lg" >
        <input id="time-input" class="mx-auto rounded-sm mt-12 p-1 text-3xl" type="time" />
    </div>

<div class="top-0 left-0 fixed z-40 w-screen h-screen bg-slate-800/25 flex-row" on:click={hideTimeInput} aria-hidden > 
</div>

{/if}

</div>
