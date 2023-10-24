<script lang="ts">
    import type { Task } from "@doist/todoist-api-typescript";
    import { todoistProjectIdToFirebaseProject, addStartTimeToTask, addDurationToTask, fetchTodoistTasks } from "$lib/functions/todoistFunctions";
    import { userData } from "$lib/stores/firebaseStore";
    import Icon from "@iconify/svelte"
    import { DateTime } from 'luxon'
  import { fetchDailyTimeEntries } from "$lib/functions/togglFunctions";
    
    $userData;

    export let task:Task;

    let project = todoistProjectIdToFirebaseProject(task.projectId);

    let boxBgColorCSS = `background-color:${project?.color}20`
    let projectLabelBgColorCSS = `background-color:${project?.color}`


    let start;
    let end;
    let inputTime;


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

    let hideTimeInput = () =>  isTimeInputVisible = false;

    let showTimeInput = () => isTimeInputVisible = true;

    let buildInputDateString = ():string =>  
    DateTime.local(parseInt(task.due.date.slice(0,4)),parseInt(task.due.date.slice(5,7)),parseInt(task.due.date.slice(8,10)),parseInt(inputTime.slice(0,2)), parseInt(inputTime.slice(3,5))).toISO();
         

    

    let handleTimeSubmit = async () => {
        hideTimeInput();
        let testdate = DateTime.local(task.due.date.slice(0,4),task.due.date.slice(5,7),task.due.date.slice(8,10),inputTime.slice(0,2), inputTime.slice(3,5));
        console.log(testdate);
        console.log(task.due.date.slice(8,10))
        console.log(inputTime.slice(0,2))
        console.log(buildInputDateString())

        if(!task.due?.datetime){
            await addStartTimeToTask($userData.todotoken, task.id, buildInputDateString())
        }
        else{
            await addDurationToTask($userData.todotoken, task.id, task.due.datetime, buildInputDateString())
        }
        let date = DateTime.fromISO(task.due.date)
        
        fetchTodoistTasks($userData.todotoken, date.month, date.day, date.year);

    }

    


    



</script>

<div>
<div class="w-full h-20 py-2 my-4 flex-col rounded-lg" style={boxBgColorCSS}>
    <div class="w-full h-8 p-2 px-4 text-left text-md font-semibold text-slate-700">{task?.content}</div>
    <div class="w-full h-8 p-2 pl-4 flex justify-between align-middle">
        <div class="flex align-middle h-full">
            {#if !task.due?.datetime}
                <button class="rounded-full text-xs px-2 h-6 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={showTimeInput} on:keypress={showTimeInput}>what time are we doing this?</button>
            {:else}
                <div class="text-xs h-6 py-1">{DateTime.fromISO(task.due.datetime).toLocaleString(DateTime.TIME_24_SIMPLE)} -&nbsp;</div>
                {#if !task.duration}
                    <button class="rounded-full text-xs h-6 px-2 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer" on:click={showTimeInput} on:keypress={showTimeInput}>until when?</button>
                {:else}
                    <div class="text-xs h-6 py-1">{end.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
                {/if}
            {/if}
        </div>
        <div class="h-6 px-2 text-sm rounded-full text-slate-100" style={projectLabelBgColorCSS}>{project?.name}</div>
    </div>
</div>
{#if isTimeInputVisible}

    <div class="top-0 left-0 fixed bg-slate-200 z-50 h-48 w-2/5 min-w-[24rem] mx-[30vw] mt-[20vh] rounded-lg" >
        <div class="w-full h-full" style={boxBgColorCSS}>
        <div class="ablsolute top-2 left-2 p-4 text-left text-md font-semibold text-slate-700">{task?.content}</div>
        <button aria-label="close-button" on:click={hideTimeInput}>
            <Icon icon="tabler:x" width="30" class="absolute top-2 right-2 cursor-pointer hover:opacity-80" />
        </button>
        <input id="time-input" class="mx-auto rounded-sm p-1 text-3xl" type="time" bind:value={inputTime}/>
        {#if !task.due?.datetime}
            <div class="mt-2">when should we start?</div>
        {:else}
            <div class="mt-2">when do you think we'll be done by?</div>
        {/if}

        {#if inputTime}
        <button class="btn-primary absolute bottom-4 right-4 p-2 rounded-md" on:click={handleTimeSubmit}>submit</button>
        {/if}
        </div>
    </div>

<div class="top-0 left-0 fixed z-40 w-screen h-screen bg-slate-800/25 flex-row" on:click={hideTimeInput} aria-hidden > 
</div>

{/if}

</div>
