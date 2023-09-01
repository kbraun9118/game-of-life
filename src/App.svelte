<script lang="ts">
  import Board from "./lib/components/Board.svelte";
  import { tick, ticker } from "./lib/utils";

  const { start, stop, increase, decrease } = ticker(() => {
    handleTick();
  });

  const createlayout = () =>
    Array(maxY)
      .fill(null)
      .map(() => Array(maxX).fill(false));

  const maxX = 100;
  const maxY = 100;

  let layout = createlayout();

  function handleTick() {
    tick(layout, maxX, maxY);
    layout = layout;
  }

  function reset() {
    stop();
    layout = createlayout();
  }
</script>

<h1>Conway's Game of Life</h1>
<button on:click={() => start()}>Start</button>
<button on:click={() => stop()}>Stop</button>
<button on:click={() => increase()}>+</button>
<button on:click={() => decrease()}>-</button>
<button on:click={handleTick}>Tick</button>
<button on:click={reset}>Reset</button>
<Board bind:layout />
