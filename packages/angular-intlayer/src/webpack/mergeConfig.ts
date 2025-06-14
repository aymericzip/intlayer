import { getConfiguration } from '@intlayer/config';
import { IntlayerPlugin } from '@intlayer/webpack'; // adjust path if needed
import merge from 'deepmerge';
import { join, relative, resolve } from 'path';
import type { Configuration as WebpackConfig } from 'webpack';

export const mergeConfig = (baseConfig: WebpackConfig): WebpackConfig => {
  const intlayerConfig = getConfiguration();

  // Format all configuration values as environment variables
  const { mainDir, configDir, baseDir } = intlayerConfig.content;

  const dictionariesPath = join(mainDir, 'dictionaries.mjs');
  const relativeDictionariesPath = relative(baseDir, dictionariesPath);

  const unmergedDictionariesPath = join(mainDir, 'unmerged_dictionaries.mjs');
  const relativeUnmergedDictionariesPath = relative(
    baseDir,
    unmergedDictionariesPath
  );

  const configurationPath = join(configDir, 'configuration.json');
  const relativeConfigurationPath = relative(baseDir, configurationPath);

  const config = {
    resolve: {
      alias: {
        '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
        '@intlayer/unmerged-dictionaries-entry': resolve(
          relativeUnmergedDictionariesPath
        ),
        '@intlayer/config/built': resolve(relativeConfigurationPath),
      },
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
    plugins: [new IntlayerPlugin()],
  };

  return merge(baseConfig, config);
};
