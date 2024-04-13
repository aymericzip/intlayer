import { defineConfig, type Options } from 'tsup';

const options: Options = {
  entry: ['src/index.ts', 'src/envConfiguration.ts'],
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  external: ['fs', 'path'],
  clean: true,
  sourcemap: true,
};

export default defineConfig(options);
