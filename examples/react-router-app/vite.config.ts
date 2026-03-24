import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    intlayerProxy(), // Should be placed before the reactRouter plugin
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
