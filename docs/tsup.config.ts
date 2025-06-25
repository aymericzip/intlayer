import { commonOptions } from '@utils/tsup-config';
import { type Options, defineConfig } from 'tsup';

const option: Options[] = [
  {
    ...commonOptions,
    format: ['cjs'],
    entry: ['src/**/*.ts'],
    outDir: 'dist/cjs',
    outExtension: () => ({
      js: '.cjs',
      dts: '.d.ts',
    }),
    loader: {
      '.md': 'copy',
    },
  },
  {
    ...commonOptions,
    format: ['esm'],
    entry: ['src/**/*.ts'],
    outDir: 'dist/esm',
    outExtension: () => ({
      js: '.mjs',
      dts: '.d.ts',
    }),
    loader: {
      '.md': 'copy',
    },
  },
];

export default defineConfig(option);
