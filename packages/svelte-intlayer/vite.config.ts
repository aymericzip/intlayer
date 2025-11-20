import { extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fg from 'fast-glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import packageJson from './package.json' with { type: 'json' };

const entry: Record<string, string> = Object.fromEntries(
  fg
    .sync('src/**/*.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,vue}', {
      ignore: [
        'src/**/*.{stories,test,specs}.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx,vue}',
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
);

const external: string[] = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.peerDependencies),
  ...Object.keys(packageJson.devDependencies),
  '@intlayer/config/built',
  '@intlayer/config/client',
  'svelte',
];

const globals = {
  svelte: 'Svelte',
};

export default defineConfig({
  resolve: {
    // **DEDUPE** Svelte so that all imports of "svelte" in your lib
    // and in the consumer app resolve to the same copy.
    dedupe: ['svelte'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte'],
  },
  plugins: [
    svelte(),
    dts({
      entryRoot: 'src',
      exclude: ['**/*.stories.*', '**/*.test.*'],
      outDir: 'dist/types',
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(`${packageJson.name}/src/`, ''),
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
      name: 'SvelteIntlayer',
    },
    rollupOptions: {
      // external,
      external: (id) => external.includes(id) || /^svelte(\/|$)/.test(id),

      output: [
        {
          format: 'es',
          entryFileNames: ({ name }) => `esm/${name}.mjs`,
          globals,
          exports: 'named',
        },
        // {
        //   format: 'cjs',
        //   entryFileNames: ({ name }) => `cjs/${name}.cjs`,
        //   globals,
        //   exports: 'named',
        // },
      ],
    },
  },
});
