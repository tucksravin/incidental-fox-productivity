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



    function directionAssigner(){

        //allows the url to change before running
        setTimeout(()=> {

            let curr= false;

            navLinks.forEach((link)=>{
                if($page.route.id?.includes(link.href))
                 curr = true;
            
                if(curr)
                    link.direction = "?fromRight";
                else
                    link.direction = "?fromLeft";
            });

            if(!curr)
                navLinks.forEach((link)=>{link.direction="?fromBottom"});
                    
            curr=false;
            console.log(navLinks)
        },50)
    }

    directionAssigner();
</script>
{#key navLinks}
<ul class="steps mx-auto">
    {#each navLinks as link}
    <a 
        href={link.href+link.direction}
        class="step"
        class:step-primary={$page.route.id?.includes(link.href)}
        on:click={directionAssigner}>
        {link.name}
        
    </a>
    {/each}
    
</ul>
{/key}

