<script>
  import { fade } from 'svelte/transition';
    import SelectFruits from './SelectFruits.svelte';
    import Emoj from './Emoj.svelte';
    import EmojBox from '../wrappers/EmojBox.svelte';
  let open = false;
</script>

<div class="relative inline-block">
  <!-- Trigger area  (mouseenter/mouseleave)-->
  <button

    on:click={() => (open = true)} 
    on:dblclick={() => (open = false)}
  >
    Hover me
  </button>

  <!-- Popup box -->
  {#if open}
    <div
      class="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 p-2 bg-white border rounded-lg shadow-lg"
      transition:fade={{ duration: 150 }}

    >
      <EmojBox />
    </div>
  {/if}
</div>
<!-- 
      on:mouseenter={() => (open = true)}
      on:mouseleave={() => (open = false)} -->