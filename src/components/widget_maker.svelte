<script>
    import { Workspace } from "../widgets.svelte.js";
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
</script>

<div>
    {#each Workspace.widgets as widget (widget.id)}
        {@const Component = components[widget.name]}
        <Component id={widget.id} />
    {/each}
</div>
