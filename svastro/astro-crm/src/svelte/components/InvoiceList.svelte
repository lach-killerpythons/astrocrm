<script lang="ts">
  import { GET_Items } from '../../lib/crud';
  
  // Start fetching immediately
  const promise = GET_Items('invoices');
</script>

<!-- TODO: change to generic table view / set prop for which collection  -->

{#await promise}
  <p>Loading contacts...</p>
{:then records}
<table class="min-w-full table-fixed border border-gray-700 rounded-lg bg-gray-900 text-gray-100">
    {#if records.length > 0}
      <thead class="bg-gray-500">
        <tr>
          {#each Object.keys(records[0]) as key}
            <th>{key}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each records as record}
          <tr>
            {#each Object.entries(record) as [key, value]}
              <td class="hover:bg-green-300">{value}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {:else}
      <p>No records found</p>
    {/if}
  </table>
{/await}