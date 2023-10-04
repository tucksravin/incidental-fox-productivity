<script lang="ts">

  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import DelayContent from "$lib/components/DelayContent.svelte";
  import TimeBar from "$lib/components/TimeBar.svelte";
  import TimelineLabels from "$lib/components/TimelineLabels.svelte"
  import type { PageData } from "./$types";
  import { TodoistApi } from "@doist/todoist-api-typescript";


  const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    
  export let data: PageData;

  const todoistApi = new TodoistApi(data.todotoken);
  let tasksAPIResponse = [];
  
  todoistApi.getTasks({filter: "due on "+data.month+"/"+data.day+"/"+data.year})
    .then((tasks) => {
     tasksAPIResponse =  tasks;
      console.log(tasks)
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
          <!--TODO: call the toggl api and list all the entries of the day-->
        </div>
      </div>

      <!--TODO: tomorrow, yesterday, next day, previous day, today, and date picker-->
    </AuthCheck>
  </DelayContent>

