<script>
    import { Workspace } from "../widgets.svelte.ts";
    import subjx from "subjx";
    import "subjx/dist/style/subjx.css";
    import SettingsBox from "./settings/settings_box.svelte";
    import { GlobalSetting } from "../widgets.svelte.ts";

    // Import all widgets :3
    import Pomodoro from "./widgets/pomodoro.svelte";
    import Clock from "./widgets/clock.svelte";
    import Editor from "./widgets/editor.svelte";
    import Quotes from "./widgets/quotes.svelte"

    // there has to be a better way
    let components = {
        pomodoro: Pomodoro,
        clock: Clock,
        editor: Editor,
        quotes: Quotes,
    };

    Workspace.globalSettings.push(
        new GlobalSetting("Background image URL", "A URL to set the background image to.", "https://images.alphacoders.com/126/thumb-1920-1268349.png")
    )

    // Update background
    $effect(() => {
        console.log(Workspace.globalSettings.find((s) => s.name === "Background image URL").value)
        console.log(document.getElementById("bg-image").style.backgroundImage)
		document.getElementById("bg-image").style.backgroundImage = "url(" + Workspace.globalSettings.find((s) => s.name === "Background image URL").value + ")"
	});

    

    $inspect(Workspace.widgets);
    $inspect(Workspace.draggables);
    $inspect(Workspace.settings);
</script>

<div>
    {#each Workspace.widgets as widget (widget.id)}
        {@const Component = components[widget.name]}
        <Component id={widget.id} />
    {/each}
    {#if Workspace.settingsOpen}
        <SettingsBox bind:open={Workspace.settingsOpen} />
    {/if}
</div>
