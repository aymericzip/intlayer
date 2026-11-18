import { extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';
import packageJson from './package.json' with { type: 'json' };

const entry: Record<string, string> = Object.fromEntries(
  fg
    .sync('src/**/*.{ts,tsx,js,jsx,mjs,cjs,vue}', {
      ignore: [
        'src/**/*.{stories,test,specs}.{json,ts,tsx,js,jsx,mjs,cjs,vue}',
        'src/**/*.d.ts',
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
  'solid-js',
];

const globals = {
  vue: 'Vue',
};

/**
 * Build modes:
 * - default: JSX compiled by the Solid 1 compiler (`dist/esm`, `dist/cjs`)
 *   plus type declarations, for tooling that ignores the `solid` condition.
 * - `solid`: JSX left uncompiled (`dist/solid`), served through the `solid`
 *   export condition so each app compiles it with its own Solid version —
 *   the compiled output imports a version-specific web runtime
 *   (`solid-js/web` in Solid 1, `@solidjs/web` in Solid 2).
 */
export default defineConfig(({ mode }) => {
  const isSolidSourceBuild = mode === 'solid';

  return {
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

    // Rolldown's native TSX transform keeps JSX; Vite's would emit it as JS.
    oxc: isSolidSourceBuild ? false : undefined,

    plugins: isSolidSourceBuild
      ? []
      : [
          solidPlugin(),
          dts({
            entryRoot: 'src',
            exclude: ['**/*.stories.*', '**/*.test.*'],
            outDirs: 'dist/types',
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
      // Uncompiled JSX is compiled (and minified) by the consuming app.
      minify: !isSolidSourceBuild,
      lib: {
        entry,
        name: 'SolidIntlayer',
      },
      rolldownOptions: {
        transform: isSolidSourceBuild ? { jsx: 'preserve' } : undefined,
        // external,
        external: (id) => {
          return (
            external.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)) ||
            id.startsWith('vue')
          );
        },
        output: isSolidSourceBuild
          ? [
              {
                format: 'es',
                // Only modules written in JSX keep a `.jsx` extension.
                entryFileNames: ({ name, facadeModuleId }) =>
                  `solid/${name}.${facadeModuleId?.endsWith('.tsx') ? 'jsx' : 'js'}`,
                chunkFileNames: 'solid/[name]-[hash].js',
                exports: 'named',
              },
            ]
          : [
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
  };
});
