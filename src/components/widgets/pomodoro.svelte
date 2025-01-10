<script>
    import { X, Bolt } from "lucide-svelte";

    import { Workspace } from "../../widgets.svelte";

    import { scale } from "svelte/transition";

    import { drag } from "../../subjx-svelte.svelte.js";

    let { id, disabled = false } = $props();

    let me;

    function close() {
        let index = Workspace.widgets.indexOf(
            Workspace.widgets.find((widget) => widget.id === me.id),
        );
        if (index > -1) {
            // only splice array when item is found
            Workspace.widgets.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
</script>

<!-- Interactive -->
<div
    class="widget bg-slate-800/80 p-8 outline outline-1 outline-slate-600 rounded-2xl flex absolute before:transition-none backdrop-blur-sm group {disabled &&
        'hidden'}"
    {id}
    use:drag
    bind:this={me}
    transition:scale={{ duration: 300 }}
>
    <div
        id="topbar"
        class="min-w-full absolute top-0 left-0 h-8 bg-slate-800 rounded-t-2xl flex px-2"
    >
        <button class="group/button">
            <Bolt
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2] group-hover/button:rotate-[60deg]"
            />
        </button>

        <div class="grow"></div>

        <button class="group/button" onclick={close}>
            <X
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
            />
        </button>
    </div>
    <div class="flex content-center w-full mt-6">
        <h1 class="text-7xl font-mono font-bold text-slate-100">00:49</h1>
    </div>
</div>

<!-- Used in widget picker -->
<div
    class="bg-slate-800/80 p-8 outline outline-1 outline-slate-600 rounded-2xl flex relative transition-all before:transition-none backdrop-blur-sm group {!disabled &&
        'hidden'}"
    {id}
    bind:this={me}
>
    <div
        id="topbar"
        class="min-w-full absolute top-0 left-0 h-8 bg-slate-800 rounded-t-2xl flex px-2"
    >
        <button class="group/button">
            <Bolt
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all "
            />
        </button>

        <div class="grow"></div>

        <button class="group/button">
            <X
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all"
            />
        </button>
    </div>
    <div class="flex content-center w-full mt-6">
        <h1 class="text-7xl font-mono font-bold text-slate-100">00:49</h1>
    </div>
</div>
