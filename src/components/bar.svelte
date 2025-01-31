<script>
    import {
        Menu,
        BadgePlus,
        Settings,
        ChevronLeft,
        ChevronRight,
        Pencil,
        PencilOff,
    } from "lucide-svelte";
    import WidgetPicker from "./widget_picker.svelte";
    import { Workspace, Widget } from "../widgets.svelte.ts";

    let barOpen = $state(true);
    let PickerOpen = $state(false);

    function toggleBar() {
        barOpen = !barOpen;
        PickerOpen = false;
        console.log("Bar toggled!");
    }

    function newPomo() {
        let pomodoro = new Widget("pomodoro");
        Workspace.widgets.push(pomodoro);
    }

    function toggleEditMode() {
        Workspace.editMode = !Workspace.editMode;
        Workspace.draggables.forEach((i) => {
            if (Workspace.editMode == true) {
                let prevOptions = i.options
                i.disable();

                i.enable(prevOptions);

            } else if (Workspace.editMode == false) {
                i.disable();
            }
        });
    }
</script>

<div
    id="bar"
    class="bg-slate-800/60 h-10 rounded-full flex max-w-min absolute bottom-1 left-1 transition-all backdrop-blur-sm {!barOpen &&
        '-translate-x-52'} duration-200 ease-out"
>
    <button
        class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700"
    >
        <Menu
            class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"
        />
    </button>

    <button
        class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700"
        onclick={toggleEditMode}
    >
        {#if Workspace.editMode}
            <Pencil
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"
            />
        {:else}
            <PencilOff
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"
            />
        {/if}
    </button>

    <button
        class="bg-slate-800 rounded-full m-1 px-3 content-center group/button transition-all hover:bg-slate-700"
        onclick={() => (PickerOpen = !PickerOpen)}
    >
        <BadgePlus
            class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
        />
    </button>

    <button
        class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700"
        onclick={newPomo}
    >
        <Settings
            class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"
        />
    </button>
    <button
        class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700"
        onclick={toggleBar}
    >
        {#if barOpen}
            <ChevronLeft
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"
            />
        {:else}
            <ChevronRight
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"
            />
        {/if}
    </button>
</div>

{#if PickerOpen}
    <WidgetPicker bind:open={PickerOpen} />
{/if}
