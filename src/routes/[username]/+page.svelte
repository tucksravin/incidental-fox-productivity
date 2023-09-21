<script lang="ts">

    import AuthCheck from "$lib/components/AuthCheck.svelte";
import type { PageData } from "./$types";
    import { error } from "@sveltejs/kit"

    
    export let data: PageData;

    
    
  
</script>
  
  <svelte:head>
    <title>{data.username}'s Dashboard | IFP</title>

  </svelte:head>
  
  <AuthCheck>


    <h1 class="text-7xl text-primary">
      {data.username}'s dashboard
    </h1>
  
   

</AuthCheck>