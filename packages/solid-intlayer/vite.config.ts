import fg from 'fast-glob';
import { fileURLToPath } from 'node:url';
import { extname, relative } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';

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
  'solid-js',
];

const globals = {
  vue: 'Vue',
};

export default defineConfig({
  resolve: {
    // **DEDUPE** Solid so that all imports of "solid-js" in your lib
    // and in the consumer app resolve to the same copy.
    dedupe: ['solid-js'],
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue', // enable resolving imports like './UI/ContentSelector.vue' :contentReference[oaicite:1]{index=1}:contentReference[oaicite:2]{index=2}
    ],
  },

  plugins: [
    solidPlugin(),
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
      name: 'SolidIntlayer',
    },
    rollupOptions: {
      // external,
      external: (id) => {
        return external.includes(id) || /^vue/.test(id);
      },
      output: [
        {
          format: 'es',
          entryFileNames: ({ name }) => `esm/${name}.mjs`,
          globals,
          exports: 'named',
        },
        {
          format: 'cjs',
          entryFileNames: ({ name }) => `cjs/${name}.cjs`,
          globals,
          exports: 'named',
        },
      ],
    },
  },
});
