<script lang='ts'>
   import { page } from "$app/stores" 

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



</script>
{#key navLinks}
<ul class="steps mx-auto">
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

