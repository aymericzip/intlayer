import { extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import packageJson from './package.json' with { type: 'json' };

const entry: Record<string, string> = Object.fromEntries(
  fg
    .sync('src/**/*.{ts,tsx,js,jsx,mjs,cjs}', {
      ignore: ['src/**/*.{stories,test,specs}.{json,ts,tsx,js,jsx,mjs,cjs}'],
    })
    .map((file) => [
      relative('src', file.slice(0, file.length - extname(file).length)),
      fileURLToPath(new URL(file, import.meta.url)),
    ])
);

const external: string[] = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.peerDependencies),
  ...Object.keys(packageJson.devDependencies),
  'lit',
  'lit/decorators.js',
  'lit/directives/unsafe-html.js',
];

export default defineConfig({
  resolve: {
    dedupe: ['lit'],
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
  },

  plugins: [
    dts({
      entryRoot: 'src',
      exclude: ['**/*.stories.*', '**/*.test.*'],
      outDir: 'dist/types',
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/dist/types/src/', '/dist/types/'),
        content,
      }),
    }),
  ],

  build: {
    emptyOutDir: false,
    copyPublicDir: false,
    sourcemap: false,
    manifest: false,
    minify: true,
    lib: {
      entry,
      name: 'LitIntlayer',
    },
    rolldownOptions: {
      external: (id) =>
        external.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)) ||
        /^lit/.test(id),
      output: [
        {
          format: 'es',
          entryFileNames: ({ name }) => `esm/${name}.mjs`,
          exports: 'named',
        },
        {
          format: 'cjs',
          entryFileNames: ({ name }) => `cjs/${name}.cjs`,
          exports: 'named',
        },
      ],
    },
  },
});
