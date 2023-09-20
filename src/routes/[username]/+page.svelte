<script lang="ts">

    import type { PageData } from "./$types";
    import { error } from "@sveltejs/kit"

    
    export let data: PageData;

    
    
  
</script>
  
  <svelte:head>
    <title>{data.username}'s Dashboard | IFP</title>

  </svelte:head>
  
  
  <main class="prose text-center mx-auto mt-8">

    <h1 class="text-7xl text-primary">
      {data.username}'s dashboard
    </h1>
  
  
  
  </main>