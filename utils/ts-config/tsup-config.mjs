import { forceEsmExtensionsPlugin } from './forceEsmExtensionsPlugin.mjs';

const commonOptions = {
  entryPoints: ['src/**/*'],
  target: 'esnext',
  dts: true,
  external: ['fs', 'path'],
  clean: true,
  sourcemap: true,
  bundle: false,
};

export const packageBuildOptions = [
  {
    ...commonOptions,
    format: ['cjs'],
    outDir: 'dist/cjs',
    esbuildPlugins: [forceEsmExtensionsPlugin()],
    outExtension: () => ({
      js: '.cjs',
    }),
  },
  {
    ...commonOptions,
    format: ['esm'],
    outDir: 'dist/esm',
    esbuildPlugins: [forceEsmExtensionsPlugin()],
    outExtension: () => ({
      js: '.mjs',
    }),
  },
  // {
  //   ...commonOptions,
  //   format: ['esm'],
  //   dts: true,
  //   outDir: 'dist/types',
  // },
];
