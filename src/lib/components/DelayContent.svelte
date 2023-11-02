<script lang='ts'>
  import { onMount } from "svelte";

 let showContent = false;

 export let delay = 300;

 onMount(()=>{
    setTimeout(()=>{
        showContent = true;
    }, delay)
 })
</script>

{#if showContent}
        <slot />
{/if}