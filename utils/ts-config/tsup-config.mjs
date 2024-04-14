import { forceEsmExtensionsPlugin } from './forceEsmExtensionsPlugin.mjs';

export const packageBuildOptions = {
  entryPoints: ['src/**/*'],
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  external: ['fs', 'path'],
  clean: true,
  sourcemap: true,
  bundle: false,
  esbuildPlugins: [forceEsmExtensionsPlugin()],
};
