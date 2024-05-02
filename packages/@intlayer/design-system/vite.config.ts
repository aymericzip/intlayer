import { fileURLToPath } from 'node:url';
import { extname, relative } from 'path';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';
import dts from 'vite-plugin-dts';
import * as packageJson from './package.json';

// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [
    react(),
    macrosPlugin(),
    dts({
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('@intlayer/design-system/src/', ''),
        content,
      }),
    }),
  ],
  define: {
    'process.env': {},
  },

  build: {
    lib: {
      entry: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx,js,jsx,mjs,cjs}', {
            ignore: 'src/**/*.{stories,test}.{ts,tsx,js,jsx,mjs,cjs}',
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      name: 'IntlayerDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format, entry) => `${entry}.${format}.js`,
    },

    manifest: true,
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],

      output: {
        banner: `"use client";`,
      },
    },
  },
}));
