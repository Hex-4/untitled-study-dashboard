<script lang="ts">
    import Widget from "./widget.svelte";

    let { id, disabled } = $props();

    let text: HTMLHeadingElement;

    import { NumericalSetting } from "../../widgets.svelte";

    let mySettings = $state([]);

    let time = $state(new Date());

    setInterval(() => {
        time = new Date();
    }, 10000);

    let currentSettings = $state(mySettings);

    let timeString: string = $derived.by(() =>
        time.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
        }),
    );
</script>

<!-- MAKE SURE TO NULL CHECK ALL SETTINGS-->

<Widget
    {id}
    {disabled}
    {mySettings}
    inactive_state={inactive}
    bind:currentSettings
>
    <div class="flex w-full h-full p-8">
        <div class="content-center">
            <h1
                class="text-7xl font-mono font-bold text-slate-100"
                bind:this={text}
            >
                {timeString.split(" ")[0].padStart(5, "0")}
            </h1>
            <p class="text-2xl font-bold text-slate-400 text-center w-full mt-2">{timeString.split(" ")[1]}</p>
        </div>
    </div>
</Widget>

{#snippet inactive()}
<div class="w-full h-full p-8">
    <div class="content-center">
        <h1
            class="text-7xl font-mono font-bold text-slate-100"
            
        >
            03:14
        </h1>
        <p class="text-2xl font-bold text-slate-400 text-center w-full mt-2">AM</p>
    </div>
</div>
{/snippet}

<style>
</style>
