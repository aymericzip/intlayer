import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fg from 'fast-glob';
import { fileURLToPath } from 'node:url';
import { extname, relative } from 'path';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
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
      exclude: ['**/*.stories.*', '**/*.test.*'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(`${packageJson.name}/src/`, ''),
        content,
      }),
    }),
    preserveDirectives(),
    tailwindcss(),
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
              'src/**/*.{stories,test,specs}.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}',
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
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}));
