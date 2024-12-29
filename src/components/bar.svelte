<script>
    import { Menu, BadgePlus, Settings, ChevronLeft, ChevronRight } from 'lucide-svelte';
    
    let barOpen = $state(true)

    function toggleBar(){
        barOpen = !barOpen
        console.log("Bar toggled!")
    }
</script>
<div id="bar" class="bg-slate-800/60 h-10 rounded-full flex max-w-min absolute bottom-1 left-1 transition-all {!barOpen && '-translate-x-40'}">
    <button class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700">
        <Menu class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"/>
        
        
    </button>
    
    <button class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700">
        <BadgePlus class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"/>
        
    </button>
    
    <button class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700">
        <Settings class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"/>
        
    </button>
    <button class="bg-slate-800 rounded-full m-1 px-3 content-center group transition-all hover:bg-slate-700" onclick={toggleBar}>
        
        
        
        {#if barOpen}
            <ChevronLeft class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"/>
        {:else}
            <ChevronRight class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover:text-amber-500 group-hover:scale-[1.2]"/>
        {/if}
    </button>
</div>