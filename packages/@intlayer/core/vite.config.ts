import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import * as packageJson from './package.json';
import { glob } from 'glob';
import { relative, extname } from 'path';
import { fileURLToPath } from 'url';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig(() => ({
  plugins: [
    dts({
      entryRoot: 'src',
      exclude: ['**/*.test.*'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(`${packageJson.name}/src/`, ''),
        content,
      }),
    }),
    preserveDirectives() as Plugin,
  ],

  optimizeDeps: {
    include: [],
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
          .sync('src/**/*.{ts,js,mjs,cjs}', {
            ignore: 'src/**/*.{test,specs}.{ts,js,mjs,cjs}',
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
      name: packageJson.name,
      formats: ['es', 'cjs'],
      fileName: (format, entry) => {
        const extension = format === 'es' ? 'mjs' : 'cjs';
        return `${entry}.${extension}`;
      },
    },

    rollupOptions: {
      external: [
        ...Object.keys(packageJson.dependencies),
        ...Object.keys(packageJson.devDependencies),
        ...Object.keys(packageJson.peerDependencies),
        '@intlayer/config/client',
        'fs/promises',
        'fs',
        'path',
        'url',
        'vm',
      ],
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
}));
