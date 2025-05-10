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
const nextVersion = getNextVersion();
const isGteNext13 = compareVersions(nextVersion, '≥', '13.0.0');
const isGteNext15 = compareVersions(nextVersion, '≥', '15.0.0');
const isTurbopackStable = compareVersions(nextVersion, '≥', '15.3.0');

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

  const unmergedDictionariesPath = join(mainDir, 'unmerged_dictionaries.mjs');
  const relativeUnmergedDictionariesPath = relative(
    baseDir,
    unmergedDictionariesPath
  );

  const configurationPath = join(configDir, 'configuration.json');
  const relativeConfigurationPath = relative(baseDir, configurationPath);

  // Only provide turbo-specific config if user explicitly sets it
  const turboConfig = {
    resolveAlias: {
      // "prefix by './' to consider the path as relative to the project root. This is necessary for turbo to work correctly."
      '@intlayer/dictionaries-entry': `./${relativeDictionariesPath}`,
      '@intlayer/unmerged-dictionaries-entry': `./${relativeUnmergedDictionariesPath}`,
      '@intlayer/config/built': `./${relativeConfigurationPath}`,
    },
    rules: {
      '*.node': {
        as: '*.node',
        loaders: ['node-loader'],
      },
    },
  };

  const serverExternalPackages = [
    'esbuild',
    'module',
    'fs',
    'chokidar',
    'fsevents',
  ];

  const newConfig: Partial<NextConfig> = {
    // Only add `serverExternalPackages` if Next.js is v15+
    ...(isGteNext15
      ? {
          // only for Next ≥15
          serverExternalPackages,
        }
      : {
          // only for Next ≥13 and <15.3
          ...(isGteNext13 && {
            serverComponentsExternalPackages: serverExternalPackages,
          }),
        }),

    ...(isTurbopackEnabled && {
      ...(isGteNext15 && isTurbopackStable
        ? {
            // only for Next ≥15.3
            turbopack: turboConfig,
          }
        : {
            experimental: {
              // only for Next ≥13 and <15.3
              turbo: turboConfig,
            },
          }),
    }),

    webpack: (config: WebpackParams['0'], options: WebpackParams[1]) => {
      // If the user has defined their own webpack config, call it
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      // Alias the dictionary entry for all builds
      config.resolve.alias = {
        ...config.resolve.alias,
        '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
        '@intlayer/unmerged-dictionaries-entry': resolve(
          relativeUnmergedDictionariesPath
        ),
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
