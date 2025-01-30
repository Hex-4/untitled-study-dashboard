<script lang="ts">
    let {
        disabled = false,
        id,
        inactive_state,
        me = $bindable(),
        mySettings,
        children,
        currentSettings = $bindable(),
    } = $props();

    import { Workspace } from "../../widgets.svelte.ts";

    import { drag } from "../../subjx-svelte.svelte.js";

    import { scale } from "svelte/transition";

    import { X, Bolt } from "lucide-svelte";

    function openSettings() {
        Workspace.settings = mySettings;
        Workspace.settingsOpen = true;
        Workspace.settingsOwnerId = me.id;
    }

    $effect(() => {
        if (Workspace.settingsOwnerId == me.id) {
            currentSettings = Workspace.settings;
        } else {
            currentSettings = mySettings;
        }
    });

    $inspect(currentSettings)

    function close() {
        let index = Workspace.widgets.indexOf(
            Workspace.widgets.find((widget) => widget.id === me.id),
        );
        if (index > -1) {
            // only splice array when item is found
            Workspace.widgets.splice(index, 1); // 2nd parameter means remove one item only
        }
        if (Workspace.settingsOwnerId == me.id) {
            Workspace.settingsOpen = false;
        }
    }

    $inspect(disabled);
</script>

<div
    use:drag
    {id}
    bind:this={me}
    transition:scale={{ duration: 300 }}
    class="widget bg-slate-800/80 outline outline-1 outline-slate-600 rounded-2xl flex absolute before:transition-none backdrop-blur-sm group {disabled &&
        'hidden'}"
>
    <!-- Floating tools (close, settings)-->
    <div
        class="!scale-1 absolute bg-slate-800/75 -top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center py-1.5 px-3 outline outline-1 outline-slate-600 rounded-full flex flex-row gap-2 {!Workspace.editMode &&
            'hidden'}"
    >
        <button class="group/button" onclick={close}>
            <X
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
            />
        </button>
        <button class="group/button" onclick={openSettings}>
            <Bolt
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
            />
        </button>
    </div>
    {@render children()}
</div>
<div
    class="bg-slate-800/80 outline outline-1 outline-slate-600 rounded-2xl flex relative transition-all before:transition-none backdrop-blur-sm group {!disabled &&
        'hidden'}"
    {id}
    bind:this={me}
>
    {@render inactive_state()}
</div>

<style>
</style>
