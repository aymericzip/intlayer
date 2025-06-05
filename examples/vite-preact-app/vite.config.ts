import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { intLayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    intlayerPlugin(),
    intLayerMiddlewarePlugin(),
    tailwindcss(),
  ],
});
