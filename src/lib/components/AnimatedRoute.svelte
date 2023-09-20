<script>
    import {fly} from "svelte/transition"
    import { page } from "$app/stores";
    import { browser } from "$app/environment"
</script>


{#key $page.url}
    <div 
        class="w-fullscreen"
        in:fly={{x:'-100%', duration:500, delay:500}}
        out:fly={{x:'100%', duration:500}}>
            <slot />
    </div>
{/key}
