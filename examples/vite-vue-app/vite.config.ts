import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { intlayer, intlayerMiddleware } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerMiddleware(), vue()],

  resolve: {
    dedupe: ['vue'],

    alias: {
      vue: createRequire(import.meta.url).resolve('vue'),
      '@': fileURLToPath(new URL('./src', import.meta.url)), // optionnel mais souvent utile
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@composables': fileURLToPath(
        new URL('./src/composables', import.meta.url)
      ),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
    },
  },
});
