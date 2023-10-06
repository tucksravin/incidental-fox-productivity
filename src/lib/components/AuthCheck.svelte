<script lang='ts'>
    import { user } from "$lib/stores/firebaseStore"
</script>



{#if $user}
  <slot />
{:else}
    <div>
    <p class="my-8 text-error font-bold">
        sorry you gotta sign in with google before you get to the fun bits!
    </p>
    <a class="btn btn-primary my-8" href="/login/user-auth?fromTop">Sign in</a>
    </div>
{/if}

