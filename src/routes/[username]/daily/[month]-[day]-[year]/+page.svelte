<script lang="ts">

  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import TimeBar from "$lib/components/TimeBar.svelte";
  import TimelineLabels from "$lib/components/TimelineLabels.svelte"
  import TaskBox from "$lib/components/TaskBox.svelte";
  import TimeEntryBox from "$lib/components/TimeEntryBox.svelte";
  import type { PageData } from "./$types"
  import { togglTimeEntries, togglLoading, togglTimeline } from '$lib/stores/togglStore';
  import { fetchDailyTimeEntries } from "$lib/functions/togglFunctions";
  import { todoistTasks, todoistLoading, todoistTimeline } from '$lib/stores/todoistStore'
  import { fetchTodoistTasks } from "$lib/functions/todoistFunctions";
  import { user, firebaseProjects } from "$lib/stores/firebaseStore";
  import { redirect } from "@sveltejs/kit";
  import { refreshProjects} from "$lib/functions/firebaseFunctions";
  import { onMount} from "svelte";
  import { DateTime } from "luxon"
  import Icon from "@iconify/svelte";

  
  
  if(!user) redirect(307, '/login');

  const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    
  export let data: PageData;

  if($firebaseProjects.length==0){
      onMount(()=>{
        setTimeout(()=>{
          refreshProjects($user);
        }, 1)   
        //console.log($togglProjects)     
      })
    }
//tie timeline update to this and proj refresh
    fetchTodoistTasks(data.todotoken,data.date);
    fetchDailyTimeEntries(data.toggltoken, data.date);
    
  
</script>
  
  <svelte:head>
    <title>{data.username}'s Dashboard | IFP</title>

  </svelte:head>

      <h1 class="text-lg font-semibold">{months[data.month-1]} {data.day}, {data.year}, a {DateTime.local(data.year,data.month,data.day).weekdayLong}</h1>
      <button  class="h-8 w-8 absolute top-5 right-8 cursor-pointer hover:opacity-80 hover:text-slate-500 transition-all" on:click={()=> null}>
        <Icon icon="ri:quill-pen-line" class="w-full h-full"/>
      </button>
      <div class="w-full h-full flex justify-between">
        <div class="w-2/5 relative overflow-scroll">
            {#if $todoistLoading}
              <div class="loading loading-spinner loading-m text-warning"></div>
            {:else }
            {#key $firebaseProjects}
            {#each $todoistTasks as task, id (task.id)}
              <TaskBox {task}/>
            {/each}
            {/key}
            {/if}
        </div>
        <div class="w-1/5 bg-slate-200 flex justify-between py-4">         
          <div class="w-8 h-full mx-2 z-10"><TimeBar timeChunks={$todoistTimeline}/></div>    
          <TimelineLabels />
          <div class="w-8 h-full mx-2 z-10"><TimeBar timeChunks={$togglTimeline}/></div>
        </div>
        <div class="w-2/5 relative overflow-scroll">

          {#if $togglLoading}
            <div class="loading loading-spinner loading-m text-warning"></div>
          {:else }
          {#key $firebaseProjects}
            {#each $togglTimeEntries as entry, id (entry.id)}
              <TimeEntryBox {entry} />     
            {/each}
          {/key}
          {/if}
        </div>
      </div>

      <div class="w-full h-0 absolute bottom-8">
        <DateNavigator {data}/>
      </div>


