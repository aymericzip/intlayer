import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { intLayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
  resolve: {
    alias: {
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
