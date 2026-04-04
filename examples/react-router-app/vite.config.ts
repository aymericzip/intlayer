import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
  plugins: [
    intlayerProxy(), // Should be placed before the reactRouter plugin
    tailwindcss(),
    reactRouter(),

    intlayer(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
