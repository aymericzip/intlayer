import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    intlayerMiddlewarePlugin(),
    tailwindcss(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
  optimizeDeps: {
    exclude: [
      '@intlayer/dictionaries-entry',
      '@intlayer/unmerged-dictionaries-entry',
      '@intlayer/dynamic-dictionaries-entry',
    ],
  }, // don’t prebundle in dev
  ssr: {
    external: [
      '@intlayer/dictionaries-entry',
      '@intlayer/unmerged-dictionaries-entry',
      '@intlayer/dynamic-dictionaries-entry',
    ],
  }, // SSR external
  build: {
    rollupOptions: {
      external: [
        '@intlayer/dictionaries-entry',
        '@intlayer/unmerged-dictionaries-entry',
        '@intlayer/dynamic-dictionaries-entry',
      ],
    },
  },
});
