<script lang="ts">
    let { open: boolean = $bindable() } = $props();
    import { scale } from "svelte/transition";
    import { Workspace } from "../../widgets.svelte.ts";
    // import all setting types
    import { NumericalSetting, BooleanSetting } from "../../widgets.svelte.ts";
</script>

<div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-2/3 h-2/3 bg-slate-800/75 rounded-2xl outline outline-1 outline-slate-600 p-5 text-slate-100 backdrop-blur-lg"
    transition:scale={{ duration: 300 }}
>
    {#each Workspace.settings as s}
        {#if s instanceof NumericalSetting}
            <div class="mb-4">
                <label for={s.name} class="my-2">{s.name}</label>
                <br />
                <input
                    type="number"
                    name={s.name}
                    class="p-2 rounded-full w-20 my-1 bg-slate-800 outline outline-1 outline-slate-600 focus:outline-amber-500 transition-all"
                    bind:value={s.value}
                />
            </div>
        {/if}
    {/each}
</div>
