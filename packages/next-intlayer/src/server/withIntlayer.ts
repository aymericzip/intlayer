import { prepareIntlayer, runOnce } from '@intlayer/chokidar';
import {
  ESMxCJSRequire,
  getAlias,
  getAppLogger,
  getConfiguration,
  IntlayerConfig,
  normalizePath,
} from '@intlayer/config';
import dictionaries from '@intlayer/dictionaries-entry';
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

const resolvePluginPath = (pluginPath: string): string => {
  const pluginPathResolved = ESMxCJSRequire.resolve(pluginPath);

  if (isTurbopackEnabled)
    // Relative path for turbopack
    return normalizePath(`./${relative(process.cwd(), pluginPathResolved)}`);

  // Absolute path for webpack
  return pluginPathResolved;
};

const getPruneConfig = (
  intlayerConfig: IntlayerConfig
): Partial<NextConfig> => {
  const { optimize, traversePattern, importMode } = intlayerConfig.build;
  const {
    dictionariesDir,
    dynamicDictionariesDir,
    fetchDictionariesDir,
    mainDir,
    baseDir,
  } = intlayerConfig.content;

  if (!optimize) return {};

  if (!isGteNext13) return {};

  const isSwcPluginAvailable = getIsSwcPluginAvailable();

  if (!isSwcPluginAvailable) return {};

  const logger = getAppLogger(intlayerConfig);

  runOnce(
    join(baseDir, '.intlayer', 'cache', 'intlayer-prune-plugin-enabled.lock'),
    () => logger('Intlayer prune plugin is enabled'),
    undefined,
    1000 * 10 // 10 seconds
  );

  const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');

  const dynamicDictionariesEntryPath = join(
    mainDir,
    'dynamic_dictionaries.mjs'
  );

  const fetchDictionariesEntryPath = join(mainDir, 'fetch_dictionaries.mjs');

  const filesListPattern = fg
    .sync(traversePattern, {
      cwd: baseDir,
    })
    .map((file) => join(baseDir, file));

  const filesList = [
    ...filesListPattern,
    dictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
  ];

  const liveSyncKeys = Object.values(dictionaries)
    .filter((dictionary) => dictionary.live)
    .map((dictionary) => dictionary.key);

  return {
    experimental: {
      swcPlugins: [
        [
          resolvePluginPath('@intlayer/swc'),
          {
            dictionariesDir,
            dictionariesEntryPath,
            dynamicDictionariesDir,
            dynamicDictionariesEntryPath,
            fetchDictionariesDir,
            fetchDictionariesEntryPath,
            importMode,
            filesList,
            replaceDictionaryEntry: false,
            liveSyncKeys,
          } as any,
        ],
      ],
    },
  };
};

const getCommandsEvent = () => {
  const lifecycleEvent = process.env.npm_lifecycle_event;
  const lifecycleScript = process.env.npm_lifecycle_script ?? '';

  const isDevCommand =
    lifecycleEvent === 'dev' ||
    process.argv.some((arg) => arg === 'dev') ||
    /(^|\s)(next\s+)?dev(\s|$)/.test(lifecycleScript);

  const isBuildCommand =
    lifecycleEvent === 'build' ||
    process.argv.some((arg) => arg === 'build') ||
    /(^|\s)(next\s+)?build(\s|$)/.test(lifecycleScript);

  const isStartCommand =
    lifecycleEvent === 'start' ||
    process.argv.some((arg) => arg === 'start') ||
    /(^|\s)(next\s+)?start(\s|$)/.test(lifecycleScript);

  return {
    isDevCommand,
    isBuildCommand,
    isStartCommand,
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
  const { isDevCommand, isBuildCommand } = getCommandsEvent();
  const appLogger = getAppLogger(intlayerConfig);

  const sentinelPath = join(
    intlayerConfig.content.baseDir,
    '.intlayer',
    'cache',
    'intlayer-prepared.lock'
  );

  // Only call prepareIntlayer during `dev` or `build` (not during `start`)

  if (isBuildCommand || isDevCommand) {
    await runOnce(
      sentinelPath,
      async () => await prepareIntlayer(intlayerConfig),
      () => appLogger('Intlayer prepared')
    );
  }

  // Only provide turbo-specific config if user explicitly sets it
  const turboConfig = {
    resolveAlias: getAlias({
      configuration: intlayerConfig,
      formatter: (value: string) => `./${value}`, // prefix by './' to consider the path as relative to the project root. This is necessary for turbopack to work correctly.
    }),

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

  const getNewConfig = (): Partial<NextConfig> => {
    let config: Partial<NextConfig> = {};

    if (isGteNext15) {
      config = {
        ...config,
        serverExternalPackages,
      };
    }

    if (isGteNext13 && !isGteNext15) {
      config = {
        ...config,
        experimental: {
          ...(config?.experimental ?? {}),
          serverComponentsExternalPackages: serverExternalPackages,
        },
      };
    }

    if (isTurbopackEnabled) {
      if (isGteNext15 && isTurbopackStable) {
        config = {
          ...config,
          turbopack: turboConfig,
        };
      } else {
        config = {
          ...config,
          experimental: {
            ...(config?.experimental ?? {}),
            turbo: turboConfig,
          },
        };
      }
    } else {
      config = {
        ...config,
        webpack: (config: WebpackParams['0'], options: WebpackParams[1]) => {
          // Only add Intlayer plugin on server side (node runtime)
          const { isServer, nextRuntime } = options;

          // If the user has defined their own webpack config, call it
          if (typeof nextConfig.webpack === 'function') {
            config = nextConfig.webpack(config, options);
          }

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

          // Always alias on the server (node/edge) for stability.
          // On the client, alias only when not using live sync.
          config.resolve.alias = {
            ...config.resolve.alias,
            ...getAlias({
              configuration: intlayerConfig,
              formatter: (value: string) => resolve(value), // get absolute path
            }),
          };

          // Activate watch mode webpack plugin
          if (isDevCommand && isServer && nextRuntime === 'nodejs') {
            config.plugins.push(new IntlayerPlugin());
          }

          return config;
        },
      };
    }

    return config;
  };

  let pruneConfig: Partial<NextConfig> = {};

  if (isBuildCommand) {
    pruneConfig = getPruneConfig(intlayerConfig);
  }

  const intlayerNextConfig: Partial<NextConfig> = merge(
    pruneConfig,
    getNewConfig()
  );

  // Merge the new config with the user's config
  const result = merge(nextConfig, intlayerNextConfig) as NextConfig & T;

  return result;
};
