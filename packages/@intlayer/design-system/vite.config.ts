import { fileURLToPath } from 'node:url';
import { extname, relative } from 'path';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig, type Plugin } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';
import dts from 'vite-plugin-dts';
import * as packageJson from './package.json';

// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [
    react(),
    macrosPlugin(),
    dts({
      exclude: ['**/*.stories.*', '**/*.test.*'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('@intlayer/design-system/src/', ''),
        content,
      }),
    }),
    preserveDirectives() as Plugin,
  ],
  define: {
    'process.env': {},
  },

  build: {
    emptyOutDir: false,
    copyPublicDir: false,
    sourcemap: true,
    manifest: true,
    minify: false,
    target: ['esnext'],

    lib: {
      entry: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx,js,jsx,mjs,cjs}', {
            ignore: 'src/**/*.{stories,test,specs}.{ts,tsx,js,jsx,mjs,cjs}',
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

    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
}));
