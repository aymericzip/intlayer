import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { IntlayerPlugin } from '@intlayer/webpack'; // adjust path if needed
import { defu } from 'defu';

const _require =
  typeof require !== 'undefined' ? require : createRequire(import.meta.url);
export const mergeConfig = (
  baseConfig: import('webpack').Configuration
): import('webpack').Configuration => {
  const intlayerConfig = getConfiguration();

  const config = {
    resolve: {
      alias: getAlias({
        configuration: intlayerConfig,
        formatter: (value: string) => resolve(value), // get absolute path
      }),
    },
    externals: {
      esbuild: 'esbuild',
      module: 'module',
      fs: 'fs',
      chokidar: 'chokidar',
      fsevents: 'fsevents',
    },
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: 'node-loader',
        },

        // Fix `import _48DQ2FD8DPGT8SPgqAmt from '../dictionary/app.json' with { type: 'json' };` syntax
        {
          test: /\.mjs$/,
          include: [/[\\/]\.intlayer[\\/]/],
          type: 'javascript/auto',
          enforce: 'pre',
          use: {
            loader: _require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  _require.resolve('@babel/preset-env'),
                  { modules: 'commonjs' },
                ],
              ],
              plugins: [
                [
                  _require.resolve('@babel/plugin-syntax-import-attributes'),
                  { deprecatedAssert: true },
                ],
              ],
            },
          },
        },
      ],
    },
    plugins: [new IntlayerPlugin(intlayerConfig)],
  };

  return defu(config, baseConfig) as import('webpack').Configuration;
};
