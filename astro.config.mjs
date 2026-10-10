// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://paulkroy.tech',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [react(), svelte()],
  vite: {
    worker: { format: 'es' },
    // MapLibre is ~1 MB raw (~280 KB gzipped) but only loads when the map island is visible.
    build: { chunkSizeWarningLimit: 1200 },
  },
});
