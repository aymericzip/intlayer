import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer, intlayerMiddlewarePlugin } from 'vite-intlayer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    intlayer(),
    intlayerMiddlewarePlugin(),
    tailwindcss(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
