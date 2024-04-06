import { defineConfig, type Options } from 'tsup';
import * as packageJson from './package.json';

const options: Options = {
  entryPoints: [packageJson.main, packageJson.bin.intlayer],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['fs', 'path'],
  clean: true,
  shims: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
};

export default defineConfig(options);
