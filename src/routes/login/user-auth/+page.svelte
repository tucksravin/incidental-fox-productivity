<script lang="ts">
    import { auth, userData } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);     
        console.log(user);   
    }
    $userData
</script>

{#if $userData?.username}
    <h2 class="font-bold mx-16">you're all logged in, welcome back</h2>
    <h2 class="font-bold mx-16">head over to your dashboard!</h2>
    <a class="btn" href="/{$userData.username}">{$userData.username}</a>

{:else }

<h2 class="font-bold">user auth</h2>

<button class="p-4 mt-8 rounded-sm btn-primary" on:click={signInWithGoogle}>sign in with google</button>

{/if}