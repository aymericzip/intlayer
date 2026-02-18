import { resolve } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { IntlayerPlugin } from '@intlayer/webpack'; // adjust path if needed
import { defu } from 'defu';
/** @ts-ignore Configuration type exist but raise error */
import type { Configuration as WebpackConfig } from 'webpack';

export const mergeConfig = (baseConfig: WebpackConfig): WebpackConfig => {
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
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: 'commonjs' }]],
              plugins: [
                [
                  '@babel/plugin-syntax-import-attributes',
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

  return defu(config, baseConfig) as WebpackConfig;
};
