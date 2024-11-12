import { resolve, relative, join } from 'path';
import { getConfiguration, formatEnvVariable } from '@intlayer/config';
import { IntLayerPlugin } from '@intlayer/webpack';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';

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
export const withIntlayer = (
  nextConfig: Partial<NextConfig> = {}
): Partial<NextConfig> => {
  if (typeof nextConfig !== 'object') nextConfig = {};

  const intlayerConfig = getConfiguration();

  // Set all configuration values as environment variables
  const env = formatEnvVariable('next');

  const { mainDir, baseDir } = intlayerConfig.content;
  const dictionariesPath = join(mainDir, 'dictionaries.mjs');
  const relativeDictionariesPath = relative(baseDir, dictionariesPath);

  return Object.assign({}, nextConfig, {
    env: { ...nextConfig.env, ...env },

    serverExternalPackages: [
      '@intlayer/dictionaries-entry',
      '@intlayer/webpack',
      'module',
      'fs',
    ],

    experimental: {
      ...(nextConfig.experimental ?? {}),
      // Using Intlayer with Turbopack is not supported as long external modules can't be resolved (such as esbuild or fs)
      turbo: {
        ...(nextConfig.experimental?.turbo ?? {}),
        resolveAlias: {
          ...(nextConfig.experimental?.turbo?.resolveAlias ?? {}),
          '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
        },

        rules: {
          '*.node': {
            as: '*.node',
            loaders: ['node-loader'],
          },
        },
      },
    },

    webpack: (config: WebpackParams['0'], options: WebpackParams[1]) => {
      if (nextConfig.webpack) {
        // Invoke the existing webpack config if it exists
        config = nextConfig.webpack(config, options);
      }

      config.resolve.alias['@intlayer/dictionaries-entry'] = resolve(
        relativeDictionariesPath
      );

      config.externals.push({
        esbuild: 'esbuild',
        module: 'module',
        fs: 'fs',
        chokidar: 'chokidar',
        fsevents: 'fsevents',
      });
      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
      });

      const { isServer, nextRuntime } = options;

      // Apply IntLayerPlugin only on the server-side
      if (isServer && nextRuntime === 'nodejs') {
        config.plugins.push(new IntLayerPlugin());
      }

      return config;
    },
  } satisfies Partial<NextConfig>);
};
