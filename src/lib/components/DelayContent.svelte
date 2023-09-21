<script lang='ts'>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

 let showContent = false;

 export let delay = 200;

 onMount(()=>{
    setTimeout(()=>{
        showContent = true;
    }, delay)
 })
</script>

{#if showContent}
    <div transition:fade={{duration:100}}>
        <slot />
    </div>
{/if}