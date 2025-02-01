<script>
    // Import all widgets here
    import Pomodoro from "./widgets/pomodoro.svelte";
    import Clock from "./widgets/clock.svelte";
    import Editor from "./widgets/editor.svelte";
    import Quotes from "./widgets/quotes.svelte";

    let { open = $bindable() } = $props();
    import { slide } from "svelte/transition";

    import { Workspace, Widget } from "../widgets.svelte.ts";

    function newWidget(name) {
        let widget = new Widget(name);
        Workspace.widgets.push(widget);
        open = false;
    }
</script>

<div
    transition:slide
    class="bg-slate-800/80 p-8 outline outline-1 outline-slate-600 rounded-2xl absolute bottom-12 transition-all before:transition-none backdrop-blur-sm z-[999] h-[500px] overflow-scroll"
>
    <h1 class="mx-auto text-slate-100 text-2xl italic w-full text-center mb-1">
        new widget
    </h1>
    <hr class="border-t border-slate-400" />
    <!-- One for each widget -->
    <div class="grid gap-3 mt-2 grid-cols-2">
        <div>
            <button onclick={() => newWidget("pomodoro")}>
                <Pomodoro disabled="true" />
            </button>
        </div>
        <div>
            <button onclick={() => newWidget("clock")}>
                <Clock disabled="true" />
            </button>
        </div>
        <div>
            <button onclick={() => newWidget("editor")}>
                <Editor disabled="true" />
            </button>
        </div>
        <div class="w-[400px]">
            <button onclick={() => newWidget("quotes")}>
                <Quotes disabled="true" />
            </button>
        </div>
    </div>
</div>

<style>
</style>
