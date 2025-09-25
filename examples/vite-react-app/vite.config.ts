import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer, intlayerMiddleware } from 'vite-intlayer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer(),
    intlayerMiddleware(),
    tailwindcss(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});
