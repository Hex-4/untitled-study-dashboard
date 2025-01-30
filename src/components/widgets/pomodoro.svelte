<script lang="ts">
    import {
        X,
        Bolt,
        Play,
        Dot,
        Circle,
        Diamond,
        ChevronLast,
        CircleDotDashed,
    } from "lucide-svelte";

    import Widget from "./widget.svelte";

    import {
        Workspace,
        BooleanSetting,
        NumericalSetting,
    } from "../../widgets.svelte.ts";

    import { onMount } from "svelte";

    let { id, disabled = false } = $props();

    let me: HTMLDivElement;
    let text: HTMLElement;

    onMount(() => {
        text.innerText = timeToText(
            currentSettings.find((s) => s.name === "Work time (m)").value *
                60 *
                1000,
        );
    });

    let mySettings = [];
    mySettings.push(
        new NumericalSetting(
            "Work time (m)",
            "How long work sessions are, in minutes.",
            20,
        ),
    );
    mySettings.push(
        new NumericalSetting(
            "Short break time (m)",
            "How long short breaks are, in minutes.",
            7,
        ),
    );
    mySettings.push(
        new NumericalSetting(
            "Long break time (m)",
            "How long long breaks are, in minutes.",
            15,
        ),
    );
    mySettings.push(
        new NumericalSetting(
            "Cycles",
            "Amount of work periods before a long break.",
            3,
        ),
    );

    let currentSettings = $state(mySettings);

    let periods: number = $derived.by(() => {
        return currentSettings.find((s) => s.name === "Cycles").value * 2 - 1;
    });

    let currentPeriod = $state(0);

    let periodType = "work";

    let started = $state(false);
    let running = $state(false);
    var ding = new Audio("ding.mp3");

    // Timer logic
    function startTimer() {
        console.log("A");
        if (!disabled) {
            console.log("B");
            if (!started) {
                console.log("C");
                let mins: number = currentSettings.find(
                    (s) => s.name === "Work time (m)",
                ).value;
                document
                    .querySelector(
                        "#period-indicator :nth-child(" +
                            (currentPeriod + 1) +
                            ")",
                    )
                    .classList.add("!text-slate-100");
                var start = Date.now();
                started = true;
                running = true;
                let interval = setInterval(function () {
                    if (text && running) {
                        var delta = Date.now() - start; // milliseconds elapsed since start
                        const total = mins * 60 * 1000; //
                        let remaining = total - delta;
                        text.innerText = timeToText(remaining);
                        if (timeToText(remaining) == "00:00") {
                            clearInterval(interval);
                            ding.play();
                            if (currentPeriod == periods - 1) {
                                currentPeriod++;
                                periodType = "long";
                                longBreak();
                            } else {
                                currentPeriod++;
                                periodType = "short";
                                shortBreak();
                            }
                        }
                    } else if (!running) {
                        start = Date.now() - delta
                    }
                }, 100);
            } else {
                running = !running;
            }
        }
    }

    function shortBreak() {
        if (!disabled) {
            let mins: number = currentSettings.find(
                (s) => s.name === "Short break time (m)",
            ).value;
            var start = Date.now();
            document
                .querySelector(
                    "#period-indicator :nth-child(" + currentPeriod + ")",
                )
                .classList.remove("!text-slate-100"); // the one before
            document
                .querySelector(
                    "#period-indicator :nth-child(" + (currentPeriod + 1) + ")",
                )
                .classList.add("!text-slate-100");
            let interval = setInterval(function () {
                if (text && running) {
                    var delta = Date.now() - start; // milliseconds elapsed since start
                    const total = mins * 60 * 1000; //
                    let remaining = total - delta;
                    text.innerText = timeToText(remaining);
                    if (timeToText(remaining) == "00:00") {
                        clearInterval(interval);
                        currentPeriod++;
                        periodType = "work";
                        ding.play();
                        getToWork();
                    }
                } else if (!running) {
                    start = Date.now() - delta
                }
            }, 100);
        }
    }

    function getToWork() {
        if (!disabled) {
            let mins: number = currentSettings.find(
                (s) => s.name === "Work time (m)",
            ).value;
            var start = Date.now();
            document
                .querySelector(
                    "#period-indicator :nth-child(" + currentPeriod + ")",
                )
                .classList.remove("!text-slate-100"); // the one before
            document
                .querySelector(
                    "#period-indicator :nth-child(" + (currentPeriod + 1) + ")",
                )
                .classList.add("!text-slate-100");
            let interval = setInterval(function () {
                if (text && running) {
                    var delta = Date.now() - start; // milliseconds elapsed since start
                    const total = mins * 60 * 1000; //
                    let remaining = total - delta;
                    text.innerText = timeToText(remaining);
                    if (timeToText(remaining) == "00:00") {
                        clearInterval(interval);
                        ding.play();
                        console.log(currentPeriod + " " + periods);
                        if (currentPeriod == periods - 1) {
                            currentPeriod++;
                            periodType = "long";
                            longBreak();
                        } else {
                            currentPeriod++;
                            periodType = "short";
                            shortBreak();
                        }
                    }
                } else if (!running) {
                    start = Date.now() - delta
                }
            }, 100);
        }
    }

    function longBreak() {
        if (!disabled) {
            let mins: number = currentSettings.find(
                (s) => s.name === "Long break time (m)",
            ).value;
            var start = Date.now();
            document
                .querySelector(
                    "#period-indicator :nth-child(" + currentPeriod + ")",
                )
                .classList.remove("!text-slate-100"); // the one before
            document
                .querySelector(
                    "#period-indicator :nth-child(" + (currentPeriod + 1) + ")",
                )
                .classList.add("!text-slate-100");
            let interval = setInterval(function () {
                if (text && running) {
                    var delta = Date.now() - start; // milliseconds elapsed since start
                    const total = mins * 60 * 1000; //
                    let remaining = total - delta;
                    text.innerText = timeToText(remaining);
                    if (timeToText(remaining) == "00:00") {
                        ding.play();
                        clearInterval(interval);
                        currentPeriod = 0;
                        periodType = "work";
                    }
                } else if (!running) {
                    start = Date.now() - delta
                }
            }, 100);
        }
    }

    function timeToText(remaining: number) {
        let minutes = Math.floor(remaining / 60000);
        let seconds = Math.floor((remaining - minutes * 60000) / 1000);
        return (
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0")
        );
    }
</script>

<Widget
    {id}
    {disabled}
    {mySettings}
    inactive_state={inactive}
    bind:currentSettings
>
    <div class="flex w-full h-full p-8 px-12 mb-10">
        <div class="content-center">
            <h1
                class="text-7xl font-mono font-bold text-slate-100"
                bind:this={text}
            >
                01:30
            </h1>
        </div>
    </div>

    <div
        class="bg-slate-800 min-w-full h-10 absolute bottom-0 rounded-b-2xl flex align-middle justify-between"
    >
        <button
            class="content-center ml-2 p-0.5 rounded-full px-2 group/button bg-slate-700 my-auto flex"
            onclick={startTimer}
        >
            <Play
                class="text-slate-100 size-6 inline relative  transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
            />
        </button>

        <div
            class="flex content-center self-center gap-1"
            id="period-indicator"
        >
            {#each Array.from({ length: currentSettings.find((s) => s.name === "Cycles").value }, (x, i) => i) as c}
                {@const cycles = Array.from(
                    {
                        length: currentSettings.find((s) => s.name === "Cycles")
                            .value,
                    },
                    (x, i) => i,
                )}
                <Circle class="text-slate-500 size-5 before:text-slate-100" />
                {#if cycles[cycles.length - 1] != c}
                    <CircleDotDashed
                        class="text-slate-500 size-5 before:text-slate-100"
                    />
                {/if}
            {/each}
            <Diamond class="text-slate-500 size-5 before:text-slate-100" />
        </div>

        <button
            class="content-center mr-2 p-0.5 rounded-full px-2 group/button bg-slate-700 my-auto flex"
            onclick={startTimer}
        >
            <ChevronLast
                class="text-slate-100 size-6 inline relative  transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
            />
        </button>
    </div>
</Widget>

{#snippet inactive()}
    <div class="flex w-full h-full p-8 px-12 mb-10">
        <div class="content-center">
            <h1 class="text-7xl font-mono font-bold text-slate-100">01:30</h1>
        </div>
    </div>

    <div
        class="bg-slate-800 min-w-full h-10 absolute bottom-0 rounded-b-2xl flex align-middle"
    >
        <button
            class="content-center ml-2 p-0.5 rounded-full px-2 group/button bg-slate-700 my-auto"
        >
            <Play
                class="text-slate-100 size-5 inline relative bottom-0.5 transition-all group-hover/button:text-amber-500 group-hover/button:scale-[1.2]"
            />
        </button>
    </div>
{/snippet}
