import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Builds the extension popup (React) into `dist/`.
 *
 * The `public/` directory (manifest.json + icons) is copied verbatim to the
 * `dist/` root, so `dist/` can be loaded directly as an unpacked extension.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(import.meta.dirname, 'popup.html'),
      },
    },
  },
});
