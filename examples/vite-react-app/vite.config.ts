import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer, intlayerCompiler, intlayerProxy } from 'vite-intlayer';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    intlayerProxy(),
    react(),
    intlayer(),
    intlayerCompiler(),
    tailwindcss(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
