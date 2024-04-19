import { resolve, relative, join } from 'path';
import { getConfiguration, formatEnvVariable } from '@intlayer/config';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';

type PluginOptions = {
  // TODO: add options
};

const intlayerConfig = getConfiguration({
  verbose: true,
});

// Set all configuration values as environment variables
const env = formatEnvVariable('NEXT_PUBLIC_INTLAYER_');
const { mainDir, baseDir } = intlayerConfig.content;

const mergeEnvVariable = (
  nextEnv: Record<string, unknown> | undefined = {}
): Record<string, string> => Object.assign({}, nextEnv, env);

const mergeStats = (
  nextStats: Record<string, unknown> | undefined = {}
): Record<string, unknown> =>
  Object.assign({}, nextStats, {
    warnings: false,
  });

/**
 * A Next.js plugin that adds the intlayer configuration to the webpack configuration
 * and sets the environment variables
 *
 * Usage:
 *
 * // next.config.js
 * export default withIntlayer(nextConfig)
 *
 */
export const withIntlayer =
  (_pluginOptions: PluginOptions = {}) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => {
    if (typeof nextConfig !== 'object') nextConfig = {};

    return Object.assign({}, nextConfig, {
      env: mergeEnvVariable(nextConfig.env),

      stats: mergeStats(nextConfig.stats),

      webpack: (config: Parameters<NextJsWebpackConfig>['0']) => {
        const dictionariesPath = join(mainDir, 'dictionaries.cjs');
        const relativeDictionariesPath = relative(baseDir, dictionariesPath);

        config.externals.push({
          esbuild: 'esbuild',
          module: 'module',
          fs: 'fs',
        });

        config.resolve.alias['@intlayer/dictionaries-entry'] = resolve(
          relativeDictionariesPath
        );

        config.module.rules.push({
          test: /\.node$/,
          loader: 'node-loader',
        });

        return config;
      },
    });
  };
