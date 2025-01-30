<script lang="ts">
    let { open: boolean = $bindable() } = $props();
    import { scale } from "svelte/transition";
    import { Workspace } from "../../widgets.svelte.ts";
    import { Bolt, X } from "lucide-svelte";
    // import all setting types
    import { NumericalSetting, BooleanSetting } from "../../widgets.svelte.ts";
</script>

<div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-2/3 h-2/3 bg-slate-800/75 rounded-2xl outline outline-1 outline-slate-600 p-5 text-slate-100 backdrop-blur-lg"
    transition:scale={{ duration: 300 }}
>
    <div class="flex gap-3">
        <Bolt class="text-slate-200 self-center size-7"/>
        <h1 class="font-bold text-3xl">WIDGET SETTINGS</h1>
        <div class="grow"></div>
        <X onclick={() => {Workspace.settingsOpen = false}} class="text-slate-200 self-center size-8 transition-all hover:text-amber-500 hover:scale-[1.2]"/>
    </div>
    <div class="w-full outline outline-1 outline-slate-600 my-2 mb-2"></div>
    {#each Workspace.settings as s}
        {#if s instanceof NumericalSetting}
            <div class="my-3">
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
