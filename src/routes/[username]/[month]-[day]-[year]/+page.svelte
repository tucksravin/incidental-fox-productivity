<script lang="ts">

  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import DateNavigator from "$lib/components/DateNavigator.svelte";
  import DelayContent from "$lib/components/DelayContent.svelte";
  import TimeBar from "$lib/components/TimeBar.svelte";
  import TimelineLabels from "$lib/components/TimelineLabels.svelte"
  import type { PageData } from "./$types";
  import { TodoistApi } from "@doist/todoist-api-typescript";
  import { fetchDailyTimeEntries, togglTimeEntries, togglLoading } from '$lib/stores/togglStore';
  import { onMount } from "svelte";


  const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    
  export let data: PageData;


  fetchDailyTimeEntries(data.toggltoken, data.date);

  console.log(togglTimeEntries);

  const todoistApi = new TodoistApi(data.todotoken);
  let tasksAPIResponse = [];
  let todoistLoading = true;
  
  todoistApi.getTasks({filter: "due on "+data.month+"/"+data.day+"/"+data.year})
    .then((tasks) => {
     tasksAPIResponse =  tasks;
      console.log(tasks)
      todoistLoading=false;
    })
    .catch((error) => console.log(error))

    

  
    
  
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
            {#if todoistLoading}
              <div class="loading loading-spinner loading-m text-warning"></div>
            {/if}
            {#each tasksAPIResponse as task}
              <div>{task.content}</div>
            {/each}
        </div>
        <div class="w-1/5 bg-slate-200 flex justify-between py-4">
          <div class="w-8 h-full mx-2"><TimeBar /></div>
          <TimelineLabels />
          <div class="w-8 h-full mx-2"><TimeBar /></div>
          
        </div>
        <div class="w-2/5 bg-blue-200">
          <h1>Toggl Stuff</h1>
          {#if $togglLoading}
            <div class="loading loading-spinner loading-m text-warning"></div>
          <!--{:else }
            {#each $togglTimeEntries as entry}
              <div>
                {entry.description} in {entry.project_id}
              </div>
              
            {/each} -->
          
          {/if}
          
     
          <!--TODO: call the toggl api and list all the entries of the day-->
        </div>
      </div>

      <div class="min-w-[30rem] w-3/5 ">
        <DateNavigator {data}/>
      </div>
    </AuthCheck>
  </DelayContent>

