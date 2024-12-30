<script>
    import { X, Bolt } from "lucide-svelte";
    import { draggable } from '@neodrag/svelte';
</script>

<div use:draggable={{ handle: '#topbar', defaultClassDragging: 'transition-none' }} class="bg-slate-800/80 p-8 outline outline-1 outline-slate-600 rounded-2xl flex absolute transition-all before:transition-none backdrop-blur-sm group">
    <div id="topbar"class="min-w-full absolute top-0 left-0 h-8 bg-slate-800 rounded-t-2xl flex px-2">
        <button class="group/button">
            <Bolt class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2] group-hover/button:rotate-[60deg]"/>
        </button>
        
        <div class="grow"></div>
        
        <div class="grow"></div>
        
        <button class="group/button">
            <X class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"/>
        </button>
    </div>
    <div class="flex content-center w-full mt-6">
        <h1 class="text-7xl font-mono font-bold text-slate-100">00:49</h1>
    </div>
    

</div>
