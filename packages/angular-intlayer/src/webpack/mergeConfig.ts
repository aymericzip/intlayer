import { resolve } from 'node:path';
import { getAlias, getConfiguration } from '@intlayer/config';
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
      ],
    },
    plugins: [new IntlayerPlugin(intlayerConfig)],
  };

  return defu(config, baseConfig) as WebpackConfig;
};
