<script lang="ts">

    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import DelayContent from "$lib/components/DelayContent.svelte";
    import type { PageData } from "./$types";
    import { refreshProjects } from "$lib/functions/firebaseFunctions";
    import { auth, user, userData, firebaseProjects } from "$lib/stores/firebaseStore";
    import { afterUpdate, onMount } from 'svelte'
  


    if($firebaseProjects.length==0){
      onMount(()=>{
        setTimeout(()=>{
          refreshProjects($user);
        }, 50)        
      })
    }


    
    export let data: PageData;
    let today:Date;
    let todaysUrl = "";
    
      today = new Date();
      todaysUrl = `${data.username}/${today.getMonth()+1}-${(today.getDate())}-${today.getFullYear()}`
    
    
  
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
    </AuthCheck>
  </DelayContent>