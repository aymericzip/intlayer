import { resolve } from 'node:path';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

/**
 * Builds the extension side panel (Preact) and background worker into `dist/`.
 *
 * The `public/` directory (manifest.json + icons) is copied verbatim to the
 * `dist/` root, so `dist/` can be loaded directly as an unpacked extension.
 */
export default defineConfig({
  plugins: [preact(), intlayer(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(import.meta.dirname, 'popup.html'),
        background: resolve(
          import.meta.dirname,
          'src/background/background.ts'
        ),
      },
      output: {
        // The manifest references the background worker by a fixed name.
        entryFileNames: (chunk) =>
          chunk.name === 'background'
            ? 'background.js'
            : 'assets/[name]-[hash].js',
      },
    },
  },
  resolve: {
    // Design-system components call `react-intlayer` hooks; point them at the
    // popup's Preact provider so they follow the selected locale.
    alias: { 'react-intlayer': 'preact-intlayer' },
    dedupe: ['preact', 'preact-intlayer'],
  },
});
