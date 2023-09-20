<script lang='ts'>
    import { user } from "$lib/firebase"
</script>

{#if $user}
  <slot />
{:else}
    <p class="text-error">
        You must be signed in to view this page.
    </p>
    <a class="btn btn-primary" href="/login/user-auth">Sign in</a>
{/if}