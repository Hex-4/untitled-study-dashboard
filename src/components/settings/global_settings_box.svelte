<script lang="ts">
    import { scale } from "svelte/transition";
    import { Workspace } from "../../widgets.svelte.ts";
    import { GlobalSetting } from "../../widgets.svelte.ts";
    import { Bolt, Settings, X } from "lucide-svelte";

    let s = $derived(Workspace.globalSettings)

    Workspace.globalSettings.push(
        new GlobalSetting("Background image URL", "A URL to set the background image to.", "https://cloud-k2ejdyfk3-hack-club-bot.vercel.app/0854164.jpg")
    )
</script>



<div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-2/3 h-2/3 bg-slate-800/75 rounded-2xl outline outline-1 outline-slate-600 p-5 text-slate-100 backdrop-blur-lg"
    transition:scale={{ duration: 300 }}
>
    <div class="flex gap-3">
        <Settings class="text-slate-200 self-center size-7"/>
        <h1 class="font-bold text-3xl">GLOBAL SETTINGS</h1>
        <div class="grow"></div>
        <X onclick={() => {Workspace.globalSettingsOpen = false}} class="text-slate-200 self-center size-8 transition-all hover:text-amber-500 hover:scale-[1.2]"/>
    </div>
    <div class="w-full outline outline-1 outline-slate-600 my-2 mb-2"></div>
    <div class="my-3">
        <label for={s[0].name} class="my-2">{s[0].name}</label>
        <br />
        <input
            type="text"
            name={s[0].name}
            class="p-2 rounded-full w-[550px] my-1 bg-slate-800 outline outline-1 outline-slate-600 focus:outline-amber-500 transition-all"
            bind:value={s[0].value}
        />
    </div>
</div>
