<script lang='ts'>
   import { page } from "$app/stores" 
  import { userData } from "$lib/stores/firebaseStore";
  import { fly } from "svelte/transition";

   //TODO: when more user-level pages are added add a different type of navLinkes
   
   export let navLinks = [
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

    let fadeIn = false;
    setTimeout(()=>{
        fadeIn = true;
    },1500)



</script>

{#key userData}
<ul class="steps mx-auto opacity-0 transition-opacity transition-duration-500" class:opacity-100={fadeIn}>
    {#each navLinks as link}
    <a 
        href={link.href+link.direction}
        class="step"
        class:step-primary={$page.url.pathname == link.href+link.direction}
>
        {link.name}
        
    </a>
    {/each}
    
</ul>
{/key}


