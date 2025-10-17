import { extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fg from 'fast-glob';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';
import dts from 'vite-plugin-dts';
import packageJson from './package.json' with { type: 'json' };

// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Ensure automatic JSX runtime is used
    }),
    dts({
      entryRoot: 'src',
      exclude: ['**/*.stories.*', '**/*.test.*', '**/*.content.tsx'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(`${packageJson.name}/src/`, ''),
        content,
      }),
    }),
    preserveDirectives(),
    tailwindcss(),
    intlayer(),
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
          .sync('src/**/*.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}', {
            ignore: [
              'src/**/*.{stories,test,specs,content}.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}',
            ],
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
        const extension = format === 'es' ? 'mjs' : 'cjs';
        return `${entry}.${extension}`;
      },
    },

    rollupOptions: {
      external: [
        ...Object.keys(packageJson.dependencies),
        ...Object.keys(packageJson.peerDependencies),
        ...Object.keys(packageJson.devDependencies),
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@intlayer/config/client',
        '@intlayer/config/built',
        'path',
        'url',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },

    test: {
      environment: 'jsdom',
      globals: true,
      clearMocks: true,
      mockReset: true,
      restoreMocks: true,
      passWithNoTests: true,
      setupFiles: ['./test/setup.ts'],
      include: ['src/**/*.test.{js,jsx,ts,tsx}'],
      exclude: ['**/node_modules/**', '**/dist/**'],
    },
  },
}));
