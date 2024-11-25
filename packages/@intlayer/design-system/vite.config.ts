import { fileURLToPath } from 'node:url';
import { extname, relative } from 'path';
import react from '@vitejs/plugin-react';
import fg from 'fast-glob';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import * as packageJson from './package.json';

// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [
    react() as unknown as Plugin,
    dts({
      entryRoot: 'src',
      exclude: ['**/*.stories.*', '**/*.test.*'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(`${packageJson.name}/src/`, ''),
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
        fg
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
      fileName: (format, entry) => {
        const extention = format === 'es' ? 'mjs' : 'cjs';
        return `${entry}.${extention}`;
      },
    },

    rollupOptions: {
      external: [
        ...Object.keys(packageJson.dependencies),
        ...Object.keys(packageJson.peerDependencies),
        ...Object.keys(packageJson.devDependencies),
        '@intlayer/config/client',
      ],
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
