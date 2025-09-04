import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { intlayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
