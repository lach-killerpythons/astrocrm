// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import svelteIntegration from '@astrojs/svelte';


export default defineConfig({
  integrations: [
    tailwind({applyBaseStyles: true}),
    svelteIntegration()
  ], 
});