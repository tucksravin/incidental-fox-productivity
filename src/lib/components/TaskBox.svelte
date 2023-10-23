<script lang="ts">
    import type { Task } from "@doist/todoist-api-typescript";
    import type { FirebaseProject } from "$lib/types/firebase_types";
    import { todoistProjectIdToFirebaseProject } from "$lib/functions/todoistFunctions";
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



    



</script>

<div class="w-full h-20 py-2 my-4 flex-col rounded-lg" style={boxBgColorCSS}>
    <div class="w-full h-8 p-2 px-4 text-left text-md font-semibold text-slate-700">{task?.content}</div>
    <div class="w-full h-8 p-2 pl-4 flex justify-between align-middle">
        <div class="flex align-middle h-full">
            {#if !task.due?.datetime}
                <div class="rounded-full text-sm px-2 h-6 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer">what time are we doing this?</div>
            {:else}
                <div class="text-sm">{task.due.datetime.slice(-8,-3)} -&nbsp;</div>
                {#if !task.duration}
                    <div class="rounded-full text-sm h-6 px-2 border hover:border-slate-800 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 cursor-pointer">until when?</div>
                {:else}
                    <div class="text-sm">{end.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
                {/if}
            {/if}
        </div>
        <div class="h-6 px-2 text-sm rounded-full text-slate-100" style={projectLabelBgColorCSS}>{project?.name}</div>
    </div>
</div>