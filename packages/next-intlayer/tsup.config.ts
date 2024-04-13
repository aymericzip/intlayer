import { defineConfig, type Options } from 'tsup';

const options: Options = {
  entryPoints: ['src/**/*.ts'],
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  clean: true,
  sourcemap: true,
};

export default defineConfig(options);
