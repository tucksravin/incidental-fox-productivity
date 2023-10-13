<script lang="ts">
   import "../app.css"
   import { signOut } from "firebase/auth";
   import { browser } from '$app/environment';
   import { auth, user, userData } from "$lib/stores/firebaseStore";
   import { page } from "$app/stores";
   import NavStepper from "$lib/components/NavStepper.svelte"
   import AnimatedCard from "$lib/components/AnimatedCard.svelte";
   



   $user;
   $userData;






    const navLinksLogin = [
        {
            name:"login",
            href:"/login/user-auth",
            direction:"?fromLeft"
        },
        {
            name:"first time",
            href:"/login/first-time",
            direction:"?fromRight"
        },
    ]

    const navLinksDash = [
        {
            name:"dash",
            href:"",
            direction:"?fromLeft"
        },
        {
            name:"first time",
            href:"/login/first-time",
            direction:"?fromRight"
        },
    ]

    
   
</script>

<!-- global styles -->

<style>
    :global(html) {
    font-size: 16px;
}


@media only screen and (max-width: 768px ){
    :global(html) {
        font-size: 12px;
    }
}
</style>

<!-- sign out button -->
{#if $user&&browser}
    <a href="/login/user-auth/?fromTop"><button 
        class="btn absolute top-8 right-8 z-10" 
        on:click={
            ()=>signOut(auth)}> sign out </button></a>
{/if}

<!--dynamic nav-->
<div class="absolute top-0 left-0 w-full flex align-middle pt-8">
    <NavStepper />
</div>

<!--main content on card-->
<div class="sticky top-0 left-0 w-screen h-screen">
    {#key $page.url}
        <AnimatedCard>
            <slot />
        </AnimatedCard>
    {/key}
</div>