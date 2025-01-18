<script>
    import { Workspace } from "../widgets.svelte.ts";
    import subjx from "subjx";
    import "subjx/dist/style/subjx.css";
    import SettingsBox from "./settings/settings_box.svelte";

    // Import all widgets :3
    import Pomodoro from "./widgets/pomodoro.svelte";

    // there has to be a better way
    let components = {
        pomodoro: Pomodoro,
    };

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
