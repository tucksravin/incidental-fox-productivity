<script lang="ts">
    //pulls the page data so you can get the url
    import { page } from "$app/stores";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>
<div class="w-full flex align-middle mt-8">
    <ul class="steps mx-auto w-48 ">
        <a 
            href="/login/user-auth" 
            class="step"
            class:step-primary={$page.route.id?.includes("user-auth")}>
            login
        </a>
        <a 
            href="/login/first-time" 
            class="step"
            class:step-primary={$page.route.id?.includes("first-time")}>
            signup
        </a>
    </ul>
</div>

<AnimatedRoute>
    <main class="card mx-auto bg-slate-200 w-2/3 mt-8 aspect-video">
        <div class="card-body items-center text-center flex align-middle justify-center">
            <slot> </slot>
     </div>
    </main>
</AnimatedRoute>
