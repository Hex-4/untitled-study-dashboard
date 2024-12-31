<script>
    // Import all widgets here
    import Pomodoro from "./widgets/pomodoro.svelte";

    let { open } = $props();
    import { slide } from 'svelte/transition';
</script>

<div transition:slide class="bg-slate-800/80 p-8 outline outline-1 outline-slate-600 rounded-2xl flex absolute bottom-12 transition-all before:transition-none backdrop-blur-sm">
    <Pomodoro />
</div>

<style>

</style>