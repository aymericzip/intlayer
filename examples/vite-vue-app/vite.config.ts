import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { intlayerPlugin } from 'vite-intlayer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
