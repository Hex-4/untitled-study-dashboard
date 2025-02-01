<script lang="ts">
    import Widget from "./widget.svelte";

    let { id, disabled } = $props();

    let text: HTMLHeadingElement;
    let author: HTMLElement;

    import { NumericalSetting } from "../../widgets.svelte";
    import { onMount } from "svelte";

    let mySettings = $state([]);

    let time = $state(new Date());

    let currentSettings = $state(mySettings);

    async function getData() {
        const url = "https://qapi.vercel.app/api/random";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            text.innerText = '"' + json.quote + '"'
            author.innerText = json.author
        } catch (error) {
            console.error(error.message);
        }
    }

    onMount(() => {
		getData()
	});
</script>

<!-- MAKE SURE TO NULL CHECK ALL SETTINGS-->

<Widget
    {id}
    {disabled}
    {mySettings}
    inactive_state={inactive}
    bind:currentSettings
>
    <div class="flex w-[500px] h-full p-8">
        <div class="content-center">
            <h1
                class="text-center text-4xl font-mono font-bold text-slate-100"
                bind:this={text}
            >
                "Dreams don't work unless you do"
            </h1>
            <p
                class="text-2xl font-bold text-slate-400 text-center w-full mt-2"
                bind:this={author}
            >
                Someone, probably
            </p>
        </div>
    </div>
</Widget>

{#snippet inactive()}
    <div class="flex w-full h-full p-8">
        <div class="content-center">
            <h1
                class="text-4xl font-mono font-bold text-slate-100"
            >
                "Dreams don't work unless you do"
            </h1>
            <p
                class="text-2xl font-bold text-slate-400 text-center w-full mt-2"
            >
                Someone, probably
            </p>
        </div>
    </div>
{/snippet}

<style>
</style>
