import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
