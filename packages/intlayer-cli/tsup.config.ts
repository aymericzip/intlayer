import { defineConfig, type Options } from 'tsup';
import * as packageJson from './package.json';

const options: Options = {
  entryPoints: [packageJson.main],
  format: ['cjs'],
  dts: false,
  outDir: 'dist/',
  clean: true,
  sourcemap: false,
  bundle: true,
};

export default defineConfig(options);
