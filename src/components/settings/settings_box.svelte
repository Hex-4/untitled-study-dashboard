<script lang="ts">
    let { open: boolean = $bindable() } = $props();
    import { scale } from "svelte/transition";
</script>

<div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-2/3 h-2/3 bg-slate-800/90 rounded-2xl outline outline-1 outline-slate-600"
    transition:scale={{ duration: 300 }}
>
    Hello WORLD!!!!
</div>
