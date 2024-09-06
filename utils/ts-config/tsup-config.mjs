import { forceExtensionsPlugin } from './forceEsmExtensionsPlugin.mjs';

/** @type {import('tsup').Options} */
export const commonOptions = {
  entryPoints: ['src/**/*'],
  target: 'esnext',
  dts: true,
  external: ['fs', 'path'],
  clean: true,
  sourcemap: true,
  bundle: false,
  esbuildPlugins: [forceExtensionsPlugin()],
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
