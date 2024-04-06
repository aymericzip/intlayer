import { defineConfig, type Options } from 'tsup';
import * as packageJson from './package.json';

const options: Options = {
  entryPoints: ['bin/cli.ts'],
  format: ['cjs'],
  dts: true,
  external: ['fs', 'path'],
  outDir: 'dist/bin',
  clean: true,
  shims: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  bundle: true,
};

export default defineConfig(options);
