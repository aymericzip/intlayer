import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
// import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    port: 8000,
  },
  plugins: [
    preact(),
    intlayer(),
    tailwindcss(),
    // visualizer({
    //   emitFile: true,
    //   template: 'network',
    //   filename: 'stats.html',
    // }),
  ],
  resolve: {
    alias: { 'react-intlayer': 'preact-intlayer' },
    dedupe: ['preact', 'preact-intlayer'],
  },
});
