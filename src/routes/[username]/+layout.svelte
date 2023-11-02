<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import DelayContent from "$lib/components/DelayContent.svelte";

    
</script>

<DelayContent>
    <AuthCheck>
        <slot />
    </AuthCheck>
</DelayContent>