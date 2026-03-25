/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  ssr: {
    noExternal: ['angular-intlayer'],
  },
  optimizeDeps: {
    exclude: ['angular-intlayer'],
  },
  plugins: [
    tsconfigPaths(),
    analog({
      ssr: false,
      static: true,
      prerender: {
        routes: [],
      },
    }),
    tailwindcss(),
    intlayer(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
}));
