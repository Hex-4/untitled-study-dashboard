<script lang="ts">
    import Widget from "./widget.svelte";

    let { id, disabled } = $props();

    let text: HTMLHeadingElement;
   

    import { NumericalSetting } from "../../widgets.svelte";

    let mySettings = $state([]);
    mySettings.push(
        new NumericalSetting(
            "hai",
            "A number to display. Literally any number, we'll display it.",
            20,
        ),
    );

    let currentSettings = $state(mySettings);


</script>

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
                {#if currentSettings}
                    {currentSettings.find((s) => s.name === "hai").value}
                {/if}
            </h1>
        </div>
    </div>
</Widget>

{#snippet inactive()}
    <div class="flex w-full h-full p-8">
        <div class="content-center">
            <h1 class="text-7xl font-mono font-bold text-slate-100">HEYOO</h1>
        </div>
    </div>
{/snippet}

<style>
</style>
