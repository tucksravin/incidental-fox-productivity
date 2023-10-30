<script lang="ts">

    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import DelayContent from "$lib/components/DelayContent.svelte";
    import { DateTime } from "luxon"
    import type { PageData } from "./$types";
    import { refreshProjects } from "$lib/functions/firebaseFunctions";
    import { getFortnightNumber } from "$lib/functions/navigationFunctions";
    import { user, firebaseProjects } from "$lib/stores/firebaseStore";
    import { onMount } from 'svelte'
  


    if($firebaseProjects.length==0){
      onMount(()=>{
        setTimeout(()=>{
          refreshProjects($user);
        }, 10)        
      })
    }


    
    export let data: PageData;
    let today = DateTime.now();
    let todaysUrl = "";
    let currentFortnightUrl = "";
    

      todaysUrl = `${data.username}/daily/${today.month}-${(today.day)}-${today.year}`
      currentFortnightUrl = `${data.username}/fortnightly/${getFortnightNumber(today)}-${today.year}`;
    
    
  
</script>
  
  <svelte:head>
    <title>{data.username}'s Dashboard | IFP</title>

  </svelte:head>
  <DelayContent>
    <AuthCheck>
      <h1 class="text-7xl text-primary">
        {data.username}'s dashboard
      </h1>

      <a href={todaysUrl} class="link mt-8 hover:opacity-70">go to today's date</a>
      <a href={currentFortnightUrl} class="link mt-8 hover:opacity-70">go to today's fortnight</a>
    </AuthCheck>
  </DelayContent>