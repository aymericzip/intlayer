import { type BuildOptions, build } from 'esbuild';

const commonBuildOptions = {
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'es2019',
  sourcemap: false,
  logLevel: 'silent',
  write: true,
  // Bundle relative/local files, but keep bare module imports external
  packages: 'external',
  loader: {
    '.js': 'js',
    '.jsx': 'jsx',
    '.mjs': 'js',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.cjs': 'js',
    '.json': 'json',
    '.md': 'text',
    '.mdx': 'text',
  },
} as const;

export const bundleJSFile = async (buildOptions: BuildOptions) =>
  await build({
    ...commonBuildOptions,
    ...buildOptions,
  });
