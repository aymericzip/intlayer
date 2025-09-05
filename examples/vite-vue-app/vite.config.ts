import vue from '@vitejs/plugin-vue';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { intlayer, intlayerMiddlewarePlugin } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerMiddlewarePlugin(), vue()],

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
