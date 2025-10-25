<!-- src/components/DynamicCollectionWrapper.svelte -->
<script>
  import { selectedCollection } from '../../lib/stores';
  import GenericCollectionTable from '../components/GenericCollectionTable.svelte';
  let current = '';
  $: current = $selectedCollection; // 
</script>

<GenericCollectionTable collection={current} />