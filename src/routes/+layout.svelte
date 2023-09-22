<script lang="ts">
   import "../app.css"
   import { signOut } from "firebase/auth";
   import { browser } from '$app/environment';
   import { auth, user, userData } from "$lib/firebase";
   import {fly} from "svelte/transition"
   import { page } from "$app/stores";
   import NavStepper from "$lib/components/NavStepper.svelte"
  import DelayContent from "$lib/components/DelayContent.svelte";

   $user;
   $userData;
 
    const fromLeft = {
        in: {x:'-100%', duration:500, delay:200},
        out: {x:'100%', duration:200}
    }

    const fromRight = {
        in: {x:'100%', duration:500, delay:200},
        out: {x:'-100%', duration:200}
    }

    const fromTop = {
        in: {y:'-100%', duration:500, delay:200},
        out: {y:'100%', duration:200}
    }

    const fromBottom = {
        in: {y:'100%', duration:500, delay:200},
        out: {y:'-100%', duration:200}
    }

    function getDirection(){
        let currentPage = $page.url.toString();

        if(currentPage.includes("fromLeft"))
            return fromLeft;
        if(currentPage.includes("fromRight"))
            return fromRight;
        if(currentPage.includes("fromTop"))
             return fromTop;
        if(currentPage.includes("fromBottom"))
            return fromBottom;
        return fromBottom;
    }


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

<div class="absolute top-0 left-0 w-full flex align-middle pt-8">
    <NavStepper />
</div>
<div class="sticky top-0 left-0 w-screen h-screen">


{#key $page.url}
    

    <div 
        class="card mx-auto bg-slate-200 w-4/5 h-4/5 top-32 max-w-7xl"
        in:fly = {getDirection().in}
        out:fly = {getDirection().out}
        >
        
            <div class="card-body items-center text-center flex align-middle justify-center" >
                    <slot />
             </div>
            
    </div>
{/key}
</div>