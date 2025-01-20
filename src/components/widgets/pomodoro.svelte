<script lang="ts">
    import { X, Bolt, Play } from "lucide-svelte";

    import {
        Workspace,
        BooleanSetting,
        NumericalSetting,
    } from "../../widgets.svelte.ts";

    import SettingsBox from "../settings/settings_box.svelte";

    import { scale } from "svelte/transition";

    import { drag } from "../../subjx-svelte.svelte.js";

    import { onMount } from "svelte";

    let { id, disabled = false } = $props();

    let me: HTMLDivElement;
    let text: HTMLElement;

    onMount(() => {
        text.innerText = timeToText(
            currentSettings.find((s) => s.name === "Work time (m)").value *
                60 *
                1000,
        );
    });

    let mySettings = [];
    mySettings.push(
        new NumericalSetting(
            "Work time (m)",
            "How long work sessions are, in minutes.",
            20,
        ),
    );
    mySettings.push(
        new NumericalSetting(
            "Short break time (m)",
            "How long short breaks are, in minutes.",
            7,
        ),
    );
    mySettings.push(
        new NumericalSetting(
            "Long break time (m)",
            "How long long breaks are, in minutes.",
            15,
        ),
    );

    let currentSettings = $derived.by(() => {
        if (Workspace.settingsOwnerId == me.id) {
            return Workspace.settings;
        } else {
            return mySettings;
        }
    });

    let SettingsOpen: boolean = $state(false);

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

    // Timer logic
    function startTimer() {
        if (!disabled) {
            let mins: number = currentSettings.find(
                (s) => s.name === "Work time (m)",
            ).value;
            var start = Date.now();
            setInterval(function () {
                if (text) {
                    var delta = Date.now() - start; // milliseconds elapsed since start
                    const total = mins * 60 * 1000; //
                    let remaining = total - delta;
                    text.innerText = timeToText(remaining);
                }
            }, 100);
        }
    }

    function timeToText(remaining: number) {
        let minutes = Math.floor(remaining / 60000);
        let seconds = Math.floor((remaining - minutes * 60000) / 1000);
        return (
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0")
        );
    }

    function openSettings() {
        Workspace.settings = mySettings;
        Workspace.settingsOpen = true;
        Workspace.settingsOwnerId = me.id;
    }
</script>

<!-- Interactive -->
<div
    class="widget bg-slate-800/80 outline outline-1 outline-slate-600 rounded-2xl flex absolute before:transition-none backdrop-blur-sm group {disabled &&
        'hidden'}"
    {id}
    use:drag
    bind:this={me}
    transition:scale={{ duration: 300 }}
>
    <div
        class="!scale-1 absolute bg-slate-800/75 -top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center py-1 px-3 outline outline-1 outline-slate-600 rounded-full {!Workspace.editMode &&
            'hidden'}"
    >
        <button class="group/button mr-2" onclick={close}>
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

    <div class="flex w-full h-full p-8 px-12 mb-10">
        <div class="content-center">
            <h1
                class="text-7xl font-mono font-bold text-slate-100"
                bind:this={text}
            >
                01:30
            </h1>
        </div>
    </div>

    <div
        class="bg-slate-800 min-w-full h-10 absolute bottom-0 rounded-b-2xl flex align-middle"
    >
        <button
            class="content-center ml-2 p-0.5 rounded-full px-2 group/button bg-slate-700 my-auto"
            onclick={startTimer}
        >
            <Play
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
            />
        </button>
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
