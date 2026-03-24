import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';

export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
