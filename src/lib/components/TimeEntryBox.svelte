<script lang="ts">
    import { togglProjectIdToFirebaseProject } from '$lib/functions/togglFunctions';
    import type { TogglTimeEntry } from '$lib/types/toggl_types';
    import { DateTime } from 'luxon'
    
    

    export let entry:TogglTimeEntry;

    let project = togglProjectIdToFirebaseProject(entry.project_id);

    let boxBgColorCSS = `background-color:${project?.color}20`
    let projectLabelBgColorCSS = `background-color:${project?.color}`

    let start = null;
    
    if(entry?.start)
        start = DateTime.fromISO(entry.start).setZone('system');

    console.log("start")
    console.log(start.toLocaleString(DateTime.TIME_24_SIMPLE))
    

    let stop = null;

    if(entry?.stop)
        stop = DateTime.fromISO(entry.stop).setZone('system');
    console.log("stop")
    console.log(stop)



</script>


<div class="w-full h-20 py-2 my-4 flex-col rounded-lg" style={boxBgColorCSS}>
    <div class="w-full h-8 p-2 px-4 text-left text-md font-semibold text-slate-700">{entry?.description}</div>
    <div class="w-full h-8 p-2 pl-4 flex justify-between align-middle">
        <div class="flex align-middle h-full">            
                <div class="text-sm">{start.toLocaleString(DateTime.TIME_24_SIMPLE)} -&nbsp;</div>
                {#if !entry.stop}
                    <div class="text-sm">now</div>
                {:else}
                    <div class="text-sm">{stop.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
                {/if}
        </div>
        <div class="h-6 px-2 text-sm rounded-full text-slate-100" style={projectLabelBgColorCSS}>{project?.name}</div>
    </div>
</div>
