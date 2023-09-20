<script lang="ts">
    import { redirect } from '@sveltejs/kit'

    export function load() {
        throw redirect(308, '/login/user-auth')
    }
</script>