<script lang="ts">

    import AuthCheck from "$lib/components/AuthCheck.svelte";
  import DelayContent from "$lib/components/DelayContent.svelte";
import type { PageData } from "./$types";
    import { error } from "@sveltejs/kit"

    
    export let data: PageData;

    const today = new Date();
    const todaysUrl = "/"+data.username+"/"+(today.getMonth()+1)+"-"+(today.getDay()+1)+"-"+today.getFullYear();

    
    
  
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