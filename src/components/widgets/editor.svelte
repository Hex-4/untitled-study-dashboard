<script lang="ts">
    import Widget from "./widget.svelte";
    import { Editor } from "@tadashi/svelte-editor-quill";
    import "../../quill.snow.css";

    let { id, disabled } = $props();

    let mySettings = $state([]);
    let currentSettings = $state(mySettings);

    const toolbarOptions = [
        [{ header: ["1", "2", "3", false] }],
        ["bold", "italic", "underline", "link"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],

        ["clean"],
    ];

    const options = {
        theme: "snow",
        plainclipboard: true,
        modules: {
            toolbar: toolbarOptions,
        },
    };

    let html = $state("");
    let text = $state("");

    const onTextChange = (markup, plaintext) => {
        html = markup;
        text = plaintext;
    };
</script>

<!-- MAKE SURE TO NULL CHECK ALL SETTINGS-->

<Widget
    {id}
    {disabled}
    {mySettings}
    inactive_state={inactive}
    flexible
    bind:currentSettings
>
    <div class="flex w-[550px] h-[300px] p-4">
        <Editor class="text-slate-100 text-pretty" {options} {onTextChange}
            >{@html $state.snapshot(html)}</Editor
        >
    </div>
</Widget>

{#snippet inactive()}
    <div class="w-full h-full p-8">
        <div class="content-center">
            <h1 class="text-7xl font-mono font-bold text-slate-100">03:14</h1>
            <p
                class="text-2xl font-bold text-slate-400 text-center w-full mt-2"
            >
                AM
            </p>
        </div>
    </div>
{/snippet}
