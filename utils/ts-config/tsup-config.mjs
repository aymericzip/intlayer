import { fixAliasPlugin } from './fixAliasPlugin.mjs';
import { fixExtensionsPlugin } from './fixExtensionsPlugin.mjs';
import { fixFolderImportsPlugin } from './fixFolderImportsPlugin.mjs';

/** @type {import('tsup').Options} */
export const commonOptions = {
  entry: ['src/**/*'],
  target: 'esnext',
  dts: true,
  external: ['fs', 'path'],
  clean: true,
  sourcemap: true,
  bundle: false,
  tsConfig: './tsconfig.json',
  esbuildPlugins: [
    fixAliasPlugin(),
    fixFolderImportsPlugin(),
    fixExtensionsPlugin(),
  ],
};

/** @type {import('tsup').Options[]} */
export const packageBuildOptions = [
  {
    ...commonOptions,
    format: ['cjs'],
    outDir: 'dist/cjs',
    outExtension: () => ({
      js: '.cjs',
    }),
  },
  {
    ...commonOptions,
    format: ['esm'],
    outDir: 'dist/esm',
    outExtension: () => ({
      js: '.mjs',
    }),
  },
];
