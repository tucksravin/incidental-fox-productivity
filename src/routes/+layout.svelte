<script lang="ts">
   import "../app.css"
   import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
   import { browser } from '$app/environment';
   import { auth, user } from "$lib/firebase"
   
</script>


{#if $user&&browser}
    <button class="btn absolute top-0 right-0 p-2 m-2" on:click={()=>signOut(auth)}> sign out </button>
{/if}



<slot />