<script lang="ts">
  import { selectedCollection } from "../../lib/stores";
  
 // export let selected: string;
  
</script>

<h1>{$selectedCollection}</h1>
<select
  class="p-2 border rounded text-black"
  bind:value={$selectedCollection}
>
  <option value="invoices">invoices</option>
  <option value="website">website</option>
  <option value="contacts">contacts</option>
</select>
<!-- 
on:change={(e) => onChange(((e.target as HTMLSelectElement)).value)} -->