<script lang="ts">
  export let filled = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="square" class:filled on:click />

<style>
  .square {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border: 1px solid darkgray;
  }

  .filled {
    background-color: black;
  }
</style>
