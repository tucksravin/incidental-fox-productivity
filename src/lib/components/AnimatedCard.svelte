<script lang='ts'>
import {fly} from "svelte/transition"
import { page } from "$app/stores";

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


    
</script>

<div 
class="card mx-auto bg-slate-200 w-4/5 h-4/5 top-32 max-w-7xl"
in:fly = {getDirection().in}
out:fly = {getDirection().out}
>

    <div class="card-body items-center text-center flex align-middle justify-center relative h-full w-full" >
            <slot />
     </div>
    
</div>