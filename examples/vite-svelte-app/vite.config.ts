import { svelte } from '@sveltejs/vite-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    intlayer(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
