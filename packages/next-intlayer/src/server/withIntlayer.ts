import { getConfiguration } from '@intlayer/config';
import { IntlayerPlugin } from '@intlayer/webpack';
import merge from 'deepmerge';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';
import { join, relative, resolve } from 'path';
import { compareVersions } from './compareVersion';
import { getNextVersion } from './getNextVertion';

// Extract from the start script if --turbo or --turbopack flag is used
const isTurbopackEnabled =
  process.env.npm_lifecycle_script?.includes('--turbo');
const isNext15 = compareVersions(getNextVersion(), '15.0.0', 'gte');
const isTurbopackStable = compareVersions(getNextVersion(), '15.3.0', 'gte');

type WebpackParams = Parameters<NextJsWebpackConfig>;

/**
 * A Next.js plugin that adds the intlayer configuration to the webpack configuration
 * and sets the environment variablesi
 *
 * Usage:
 *
 * ```ts
 * // next.config.js
 * export default withIntlayer(nextConfig)
 * ```
 */
export const withIntlayer = <T extends Partial<NextConfig>>(
  nextConfig: T = {} as T
): NextConfig & T => {
  if (typeof nextConfig !== 'object') {
    nextConfig = {} as T;
  }

  const intlayerConfig = getConfiguration();

  // Format all configuration values as environment variables
  const { mainDir, configDir, baseDir } = intlayerConfig.content;

  const dictionariesPath = join(mainDir, 'dictionaries.mjs');
  const relativeDictionariesPath = relative(baseDir, dictionariesPath);

  const configurationPath = join(configDir, 'configuration.json');
  const relativeConfigurationPath = relative(baseDir, configurationPath);

  // Only provide turbo-specific config if user explicitly sets it
  const turboConfig = {
    resolveAlias: {
      '@intlayer/dictionaries-entry': relativeDictionariesPath,
      '@intlayer/config/built': relativeConfigurationPath,
    },
    rules: {
      '*.node': {
        as: '*.node',
        loaders: ['node-loader'],
      },
    },
  };

  const newConfig: Partial<NextConfig> = {
    // Only add `serverExternalPackages` if Next.js is v15+
    ...(isNext15
      ? {
          serverExternalPackages: [
            'esbuild',
            'module',
            'fs',
            'chokidar',
            'fsevents',
          ],
          experimental: {
            turbo:
              isTurbopackEnabled && !isTurbopackStable
                ? turboConfig
                : undefined,
          },
          turbopack:
            isTurbopackEnabled && isTurbopackStable ? turboConfig : undefined,
        }
      : {}),

    webpack: (config: WebpackParams['0'], options: WebpackParams[1]) => {
      // If the user has defined their own webpack config, call it
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      // Alias the dictionary entry for all builds
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
        '@intlayer/config/built': resolve(relativeConfigurationPath),
      };

      // Mark these modules as externals
      config.externals.push({
        esbuild: 'esbuild',
        module: 'module',
        fs: 'fs',
        chokidar: 'chokidar',
        fsevents: 'fsevents',
      });

      // Use `node-loader` for any `.node` files
      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
      });

      // Only add Intlayer plugin on server side (node runtime)
      const { isServer, nextRuntime } = options;

      if (isServer && nextRuntime === 'nodejs') {
        config.plugins.push(new IntlayerPlugin());
      }

      return config;
    },
  };

  // Merge the new config with the user's config
  return merge(nextConfig, newConfig) as NextConfig & T;
};
