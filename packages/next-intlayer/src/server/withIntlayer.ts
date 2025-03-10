import { resolve, relative, join } from 'path';
import {
  getConfiguration,
  formatEnvVariable,
  ESMxCJSRequire,
} from '@intlayer/config';
import { IntlayerPlugin } from '@intlayer/webpack';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';
import { readFileSync } from 'fs';

const getNextVersion = () => {
  try {
    const nextConfigPath = ESMxCJSRequire.resolve('next/package.json');

    const nextPkg = JSON.parse(readFileSync(nextConfigPath, 'utf-8'));

    return parseInt(nextPkg.version.split('.')[0], 10);
  } catch (e) {
    return undefined;
  }
};

const nextMajorVersion = getNextVersion();

// Extract from the start script if --turbo or --turbopack flag is used
const isTurbopackEnabled =
  process.env.npm_lifecycle_script?.includes('--turbo');

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
  const turboConfig = isTurbopackEnabled
    ? {
        turbo: {
          ...(nextConfig.experimental?.turbo ?? {}),
          resolveAlias: {
            ...(nextConfig.experimental?.turbo?.resolveAlias ?? {}),
            '@intlayer/dictionaries-entry': relativeDictionariesPath,
            '@intlayer/config/built': relativeConfigurationPath,
          },
          rules: {
            '*.node': {
              as: '*.node',
              loaders: ['node-loader'],
            },
          },
        },
      }
    : {};

  const newConfig: Partial<NextConfig> = {
    // Only add `serverExternalPackages` if Next.js is v15+
    ...(!nextMajorVersion || nextMajorVersion >= 15
      ? {
          serverExternalPackages: [
            ...(nextConfig.serverExternalPackages ?? []),
            'esbuild',
            'module',
            'fs',
            'chokidar',
            'fsevents',
          ],
        }
      : {}),

    experimental: {
      ...(nextConfig.experimental ?? {}),
      ...turboConfig,
    },

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
  return { ...nextConfig, ...newConfig };
};
