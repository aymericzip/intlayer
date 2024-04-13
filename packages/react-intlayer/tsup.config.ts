import { defineConfig, type Options } from 'tsup';
import * as packageJson from './package.json';

const options: Options = {
  entryPoints: ['src/index.ts', 'src/server/index.ts', 'src/client/index.ts'],
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  external: ['@intlayer/dictionaries-entry'],
  clean: true,
  sourcemap: true,
};

export default defineConfig(options);
