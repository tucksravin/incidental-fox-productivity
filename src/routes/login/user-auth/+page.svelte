<script lang="ts">
  import { goto } from "$app/navigation";
    import { auth, userData } from "$lib/firebase";
    import DelayContent from "$lib/components/DelayContent.svelte"
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    $userData;

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);     
        console.log(user);   
        if($userData?.username)
            goto("/"+$userData.username);
        else
            goto("/login/first-time/?fromRight");
    }
    
</script>

<DelayContent>
{#if $userData?.username}
    <h2 class="font-bold mx-16">you're all logged in, welcome back</h2>
    <h2 class="font-bold mx-16">head over to your dashboard!</h2>
    <a class="btn mt-8" href="/{$userData.username}">{$userData.username}</a>

{:else }

<h2 class="font-bold">user auth</h2>

<button class="p-4 mt-8 rounded-lg btn-primary" on:click={signInWithGoogle}>sign in with google</button>

{/if}
</DelayContent>