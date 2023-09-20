<script lang="ts">
    import { auth } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);     
        console.log(user);   
    }
</script>

<h2 class="font-bold">user auth</h2>

<button class="p-4 mt-8 rounded-sm btn-primary" on:click={signInWithGoogle}>sign in with google</button>