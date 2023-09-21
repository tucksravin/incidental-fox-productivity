<script lang='ts'>
    import { user } from "$lib/firebase"
    import DelayContent from "./DelayContent.svelte";
</script>



{#if $user}
  <slot />
{:else}
    <p class="mt-8 text-error">
        sorry you gotta sign in with google before you get to the fun bits!
    </p>
    <a class="btn btn-primary mb-8" href="/login/user-auth">Sign in</a>
{/if}

