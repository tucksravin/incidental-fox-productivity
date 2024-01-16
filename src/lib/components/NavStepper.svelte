<script lang='ts'>
   import { page } from "$app/stores" 
  import { userData } from "$lib/stores/firebaseStore";


   
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

{#key $userData}

<ul class="steps mx-auto opacity-0 transition-opacity transition-duration-500" class:opacity-100={fadeIn}>
    {#each navLinks as link}
    <a 
        href={link.href+link.direction}
        class="step"
        class:step-primary={link.href == $page.url.pathname }
    >
        {link.name}
    </a>
    {/each}
    
</ul>
{/key}


