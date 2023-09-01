<script lang="ts">
  import type { Coordinate, Map } from "../types";
  import Square from "./Square.svelte";

  export let layout: Map;

  const updateLayout = ({ x, y }: Coordinate) => {
    layout[y][x] = !layout[y][x];
  };
</script>

<div class="board">
  {#each layout as row, y}
    <div class="row">
      {#each row as value, x}
        <Square filled={value} on:click={() => updateLayout({ x, y })} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    margin: 0;
    padding: 0;
    height: 1rem;
    overflow: hidden;
  }
</style>
