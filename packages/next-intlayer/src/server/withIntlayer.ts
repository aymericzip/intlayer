import { resolve, relative, join } from 'path';
import { getConfiguration, formatEnvVariable } from '@intlayer/config';
import { IntLayerPlugin } from '@intlayer/webpack';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';

type PluginOptions = {
  // TODO: add options
};

type WebpackParams = Parameters<NextJsWebpackConfig>;

/**
 * A Next.js plugin that adds the intlayer configuration to the webpack configuration
 * and sets the environment variables
 *
 * Usage:
 *
 * ```ts
 * // next.config.js
 * export default withIntlayer(nextConfig)
 * ```
 *
 */
export const withIntlayer =
  (_pluginOptions: PluginOptions = {}) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => {
    if (typeof nextConfig !== 'object') nextConfig = {};

    const intlayerConfig = getConfiguration();

    // Set all configuration values as environment variables
    const env = formatEnvVariable('next');

    const { mainDir, baseDir } = intlayerConfig.content;

    return Object.assign({}, nextConfig, {
      env: { ...nextConfig.env, ...env },

      webpack: (
        config: WebpackParams['0'],
        { isServer, nextRuntime }: WebpackParams[1]
      ) => {
        const dictionariesPath = join(mainDir, 'dictionaries.cjs');
        const relativeDictionariesPath = relative(baseDir, dictionariesPath);

        config.resolve.alias['@intlayer/dictionaries-entry'] = resolve(
          relativeDictionariesPath
        );

        config.externals.push({
          esbuild: 'esbuild',
          module: 'module',
          fs: 'fs',
        });
        config.module.rules.push({
          test: /\.node$/,
          loader: 'node-loader',
        });

        // Apply IntLayerPlugin only on the server-side
        if (isServer && nextRuntime === 'nodejs') {
          config.plugins.push(new IntLayerPlugin());
        }

        return config;
      },
    });
  };
