import { prepareIntlayer, runOnce } from '@intlayer/chokidar';
import {
  ESMxCJSRequire,
  getAppLogger,
  getConfiguration,
  IntlayerConfig,
  normalizePath,
} from '@intlayer/config';
import { IntlayerPlugin } from '@intlayer/webpack';
import merge from 'deepmerge';
import fg from 'fast-glob';
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

// Check if SWC plugin is available
const getIsSwcPluginAvailable = () => {
  try {
    ESMxCJSRequire.resolve('@intlayer/swc');
    return true;
  } catch (e) {
    return false;
  }
};

const getPruneConfig = (
  intlayerConfig: IntlayerConfig
): Partial<NextConfig> => {
  const { optimize, traversePattern, importMode } = intlayerConfig.build;
  const { dictionariesDir, dynamicDictionariesDir, mainDir, baseDir } =
    intlayerConfig.content;

  if (!optimize) return {};

  if (!isGteNext13) return {};

  const isSwcPluginAvailable = getIsSwcPluginAvailable();

  if (!isSwcPluginAvailable) return {};

  const logger = getAppLogger(intlayerConfig);

  runOnce(
    join(baseDir, '.intlayer', 'cache', 'intlayer-prune-plugin-enabled.lock'),
    () => logger('Intlayer prune plugin is enabled'),
    1000 * 10 // 10 seconds
  );

  const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');

  const dynamicDictionariesEntryPath = join(
    mainDir,
    'dynamic_dictionaries.mjs'
  );

  const filesListPattern = fg
    .sync(traversePattern, {
      cwd: baseDir,
    })
    .map((file) => join(baseDir, file));

  const filesList = [
    ...filesListPattern,
    dictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
  ];

  return {
    experimental: {
      swcPlugins: [
        [
          ESMxCJSRequire.resolve('@intlayer/swc'),
          {
            dictionariesDir,
            dictionariesEntryPath,
            dynamicDictionariesDir,
            dynamicDictionariesEntryPath,
            importMode,
            filesList,
            replaceDictionaryEntry: false,
          } as any,
        ],
      ],
    },
  };
};

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
export const withIntlayer = async <T extends Partial<NextConfig>>(
  nextConfig: T = {} as T
): Promise<NextConfig & T> => {
  if (typeof nextConfig !== 'object') {
    nextConfig = {} as T;
  }

  const intlayerConfig = getConfiguration();

  const sentinelPath = join(
    intlayerConfig.content.baseDir,
    '.intlayer',
    'cache',
    'intlayer-prepared.lock'
  );

  // Only call prepareIntlayer once per server startup
  await runOnce(
    sentinelPath,
    async () => await prepareIntlayer(intlayerConfig)
  );

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
      // prefix by './' to consider the path as relative to the project root. This is necessary for turbopack to work correctly.
      // Normalize the path to avoid issues with the path separator on Windows
      '@intlayer/dictionaries-entry': normalizePath(
        `./${relativeDictionariesPath}`
      ),
      '@intlayer/unmerged-dictionaries-entry': normalizePath(
        `./${relativeUnmergedDictionariesPath}`
      ),
      '@intlayer/config/built': normalizePath(`./${relativeConfigurationPath}`),
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

      // Skip preparation when running next start (production mode)
      const isBuildCommand =
        process.env.npm_lifecycle_event === 'build' ||
        process.argv.some((arg) => arg === 'build');

      if (!isBuildCommand && isServer && nextRuntime === 'nodejs') {
        config.plugins.push(new IntlayerPlugin());
      }

      return config;
    },
  };

  const pruneConfig: Partial<NextConfig> = getPruneConfig(intlayerConfig);

  const intlayerNextConfig: Partial<NextConfig> = merge(pruneConfig, newConfig);

  // Merge the new config with the user's config
  const result = merge(nextConfig, intlayerNextConfig) as NextConfig & T;

  return result;
};
