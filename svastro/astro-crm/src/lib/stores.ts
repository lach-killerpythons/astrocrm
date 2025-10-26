//Writable store (for global/shared state) ⚡

// <script>
//   import { selectedFruit } from './stores.ts';
// </script>

// <select bind:value={$selectedFruit}>...</select>

import { writable } from 'svelte/store';
export const selectedCollection = writable('contacts');
export const lastEmoji = writable('✅');