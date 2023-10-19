<script lang="ts">

  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import DelayContent from "$lib/components/DelayContent.svelte";
  import TimeBar from "$lib/components/TimeBar.svelte";
  import TimelineLabels from "$lib/components/TimelineLabels.svelte"
  import type { PageData } from "./$types";
  import type { TimeChunk } from "$lib/types/frontend_types";
  import { timeEntryToTimeChunk } from "$lib/functions/timelineFunctions";
  import { togglTimeEntries, togglLoading, togglProjects, togglTimeline } from '$lib/stores/togglStore';
  import { fetchDailyTimeEntries, togglProjectIdToFirebaseProject } from "$lib/functions/togglFunctions";
  import { todoistTasks, todoistLoading } from '$lib/stores/todoistStore'
  import { fetchTodoistTasks } from "$lib/functions/todoistFunctions";
  import { user, firebaseProjects } from "$lib/stores/firebaseStore";
  import { redirect } from "@sveltejs/kit";
  import { refreshProjects} from "$lib/functions/firebaseFunctions";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  
  
  if(!user) redirect(307, '/login');

  const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    
  export let data: PageData;

  if($firebaseProjects.length==0){
      onMount(()=>{
        setTimeout(()=>{
          refreshProjects($user);
        }, 1)   
        console.log($togglProjects)     
      })
    }


    fetchDailyTimeEntries(data.toggltoken, data.date);

    //tie timeline update to this and proj refresh
    fetchTodoistTasks(data.todotoken, data.month, data.day, data.year);

    let todoTimeChunks:TimeChunk[]; 
    
  
</script>
  
  <svelte:head>
    <title>{data.username}'s Dashboard | IFP</title>

  </svelte:head>
  <DelayContent>
    <AuthCheck>
      <h1>data for {months[data.month-1]} {data.day}, {data.year}</h1>
      <div class="w-full h-full flex justify-between">
        <div class="w-2/5 bg-red-200">
          <h1>Todoist Stuff</h1>
            {#if $todoistLoading}
              <div class="loading loading-spinner loading-m text-warning"></div>
            {/if}
            {#each $todoistTasks as task}
              <div>{task.content}</div>
            {/each}
        </div>
        <div class="w-1/5 bg-slate-200 flex justify-between py-4">
          {#key $firebaseProjects}
          <div class="w-8 h-full mx-2 z-10"><TimeBar timeChunks={todoTimeChunks}/></div>
          {/key}
          <TimelineLabels />
          <div class="w-8 h-full mx-2 z-10"><TimeBar timeChunks={$togglTimeline}/></div>
          
        </div>
        <div class="w-2/5 bg-blue-200">
          <h1>Toggl Stuff</h1>
          {#if $togglLoading}
            <div class="loading loading-spinner loading-m text-warning"></div>
          {:else }
          {#key $firebaseProjects}
            {#each $togglTimeEntries as entry}
              <div>
                {entry.description} in {togglProjectIdToFirebaseProject(entry.project_id)?.name}
              </div>
              
            {/each}
          {/key}
          {/if}
        </div>
      </div>

      <div class="min-w-[30rem] w-3/5 ">
        <DateNavigator {data}/>
      </div>
    </AuthCheck>
  </DelayContent>

