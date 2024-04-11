import { defineConfig, type Options } from 'tsup';
import * as packageJson from './package.json';

const options: Options = {
  entryPoints: [packageJson.main],
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  external: ['fs', 'path'],
  clean: true,
  sourcemap: true,
};

export default defineConfig(options);
