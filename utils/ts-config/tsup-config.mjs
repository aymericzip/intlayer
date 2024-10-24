import { fixImportsPlugin } from './fixImportPlugin.mjs';

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
  esbuildPlugins: [fixImportsPlugin()],
};

/** @type {import('tsup').Options[]} */
export const packageBuildOptions = [
  {
    ...commonOptions,
    format: ['cjs'],
    outDir: 'dist/cjs',
    outExtension: () => ({
      js: '.cjs',
      dts: '.d.ts',
    }),
  },
  {
    ...commonOptions,
    format: ['esm'],
    outDir: 'dist/esm',
    outExtension: () => ({
      js: '.mjs',
      dts: '.d.ts',
    }),
  },
];
