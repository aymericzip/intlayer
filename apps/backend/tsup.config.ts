import { commonOptions } from '@utils/ts-config/tsup';
import { type Options, defineConfig } from 'tsup';

const option: Options[] = [
  {
    ...commonOptions,
    entryPoints: ['export.ts'],
    bundle: true,
    dts: false,
    outDir: 'dist/package',
    format: ['cjs'],
    outExtension: () => ({
      js: '.cjs',
    }),
  } as Options,
  {
    ...commonOptions,
    entryPoints: ['export.ts'],
    bundle: true,
    dts: true,
    outDir: 'dist/package',
    format: ['esm'],
    outExtension: () => ({
      dts: '.d.ts',
      js: '.mjs',
    }),
  } as Options,
  {
    ...commonOptions,
    format: ['esm'],
    outExtension: () => ({
      js: '.js',
    }),
    entryPoints: ['src/**/*'],
    sourcemap: false,
    bundle: false,
    dts: false,
    outDir: 'dist/build',
  } as Options,
];

export default defineConfig(option);
