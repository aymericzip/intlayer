import { svelteI18nVitePlugin } from '@intlayer/svelte-i18n/plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    /**
     * Aliases `svelte-i18n` to `@intlayer/svelte-i18n` and registers the
     * intlayer vite plugin (dictionary build, optimize, purge, minify).
     */
    svelteI18nVitePlugin(),
  ],
});
