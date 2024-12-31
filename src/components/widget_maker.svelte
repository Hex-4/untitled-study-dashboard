<script>
    import { Workspace } from "../widgets.svelte.js"

    // Import all widgets :3
    import Pomodoro from "./widgets/pomodoro.svelte";

    // there has to be a better way
    let components = {
        'pomodoro': Pomodoro,
    }
    


    




</script>

<div>
    {#each Workspace.widgets as widget (widget.id)}
        {@const Component = components[widget.name]}
        <Component id={widget.id} />
    {/each}
</div>

