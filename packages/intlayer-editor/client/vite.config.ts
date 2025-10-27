import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
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
  build: {
    rollupOptions: {
      treeshake: { moduleSideEffects: false },
    },
    minify: false,
  },
  plugins: [
    react(),
    intlayer(),
    tailwindcss(),
    // visualizer({
    //   emitFile: true,
    //   template: 'network',
    //   filename: 'stats.html',
    // }),
  ],
});
