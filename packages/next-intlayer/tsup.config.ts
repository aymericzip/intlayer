import { defineConfig, type Options } from 'tsup';
import * as packageJson from './package.json';

const options: Options = {
  entryPoints: [packageJson.main],
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  clean: true,
  sourcemap: true,
};

export default defineConfig(options);
