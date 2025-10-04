import { commonOptions } from '@utils/tsup-config';
import { defineConfig, type Options } from 'tsup';

const option: Options[] = [
  {
    ...commonOptions,
    format: ['cjs'],
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
