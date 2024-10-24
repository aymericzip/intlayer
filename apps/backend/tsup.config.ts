import { commonOptions } from '@utils/ts-config/tsup';
import { type Options, defineConfig } from 'tsup';

const option: Options[] = [
  {
    // Package build code
    ...commonOptions,
    entryPoints: ['src/**/*', 'export.ts'],
    bundle: true,
    tsconfig: 'tsconfig.package.json',
    dts: false,
    outDir: 'dist/package',
    format: ['cjs'],
    outExtension: () => ({
      js: '.cjs',
    }),
  } as Options,
  {
    // Package build code
    ...commonOptions,
    entryPoints: ['src/**/*', 'export.ts'],
    bundle: false,
    tsconfig: 'tsconfig.package.json',
    dts: true,
    outDir: 'dist/package',
    format: ['esm'],
    outExtension: () => ({
      dts: '.d.ts',
      js: '.mjs',
    }),
  } as Options,
  {
    // Backend build code
    ...commonOptions,
    format: ['esm'],
    outExtension: () => ({
      js: '.js',
    }),
    tsconfig: 'tsconfig.package.json',
    entryPoints: ['src/**/*'],
    sourcemap: false,
    bundle: false,
    dts: false,
    outDir: 'dist/build',
  } as Options,
];

export default defineConfig(option);
