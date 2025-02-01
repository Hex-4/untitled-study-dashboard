<script lang="ts">
    import Widget from "./widget.svelte";
    import { Editor } from "@tadashi/svelte-editor-quill";
    import "../../quill.snow.css";

    let { id, disabled } = $props();

    let mySettings = $state([]);
    let currentSettings = $state(mySettings);

    const toolbarOptions = [
        [{ header: ["1", "2", "3", false] }],
        [{ size: [ 'small', false, 'large', 'huge' ]}],
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
    <div class="flex w-[316px] h-72 p-4">
        <Editor class="text-slate-100 text-pretty" {options} {onTextChange}
            ></Editor
        >
    </div>
{/snippet}
