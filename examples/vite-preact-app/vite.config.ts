import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intLayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    intlayerPlugin(),
    intLayerMiddlewarePlugin(),
    tailwindcss(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
