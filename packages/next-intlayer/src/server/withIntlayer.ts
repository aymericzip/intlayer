import { join, relative, resolve } from 'node:path';
import { prepareIntlayer, runOnce } from '@intlayer/chokidar';
import {
  ANSIColors,
  colorize,
  compareVersions,
  type GetConfigurationOptions,
  getAlias,
  getAppLogger,
  getConfiguration,
  getProjectRequire,
  normalizePath,
} from '@intlayer/config';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { IntlayerConfig } from '@intlayer/types';
import { IntlayerPlugin } from '@intlayer/webpack';
import merge from 'deepmerge';
import fg from 'fast-glob';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';
import nextPackageJSON from 'next/package.json' with { type: 'json' };

const isGteNext13 = compareVersions(nextPackageJSON.version, '≥', '13.0.0');
const isGteNext15 = compareVersions(nextPackageJSON.version, '≥', '15.0.0');
const isGteNext16 = compareVersions(nextPackageJSON.version, '≥', '16.0.0');
const isTurbopackStable = compareVersions(
  nextPackageJSON.version,
  '≥',
  '15.3.0'
);

const isTurbopackEnabledFromCommand = isGteNext16
  ? // Next@16 enable turbopack by default, and offer the possibility to disable it if --webpack flag is used
    !process.env.npm_lifecycle_script?.includes('--webpack')
  : // Next@15 use --turbopack flag, Next@14 use --turbo flag
    process.env.npm_lifecycle_script?.includes('--turbo');

// Check if SWC plugin is available
const getIsSwcPluginAvailable = (intlayerConfig: IntlayerConfig) => {
  try {
    const requireFunction =
      intlayerConfig.build?.require ?? getProjectRequire();
    requireFunction.resolve('@intlayer/swc');
    return true;
  } catch (_e) {
    return false;
  }
};

const resolvePluginPath = (
  pluginPath: string,
  intlayerConfig: IntlayerConfig,
  isTurbopackEnabled: boolean
): string => {
  const requireFunction = intlayerConfig.build?.require ?? getProjectRequire();
  const pluginPathResolved = requireFunction?.resolve(pluginPath);

  if (isTurbopackEnabled)
    // Relative path for turbopack
    return normalizePath(`./${relative(process.cwd(), pluginPathResolved)}`);

  // Absolute path for webpack
  return pluginPathResolved;
};

const getPruneConfig = (
  intlayerConfig: IntlayerConfig,
  isBuildCommand: boolean,
  isTurbopackEnabled: boolean
): Partial<NextConfig> => {
  const { optimize, traversePattern, importMode } = intlayerConfig.build;
  const {
    dictionariesDir,
    unmergedDictionariesDir,
    dynamicDictionariesDir,
    fetchDictionariesDir,
    mainDir,
    baseDir,
  } = intlayerConfig.content;
  const logger = getAppLogger(intlayerConfig);

  if (optimize === false) {
    return {};
  }
  if (optimize === undefined && !isBuildCommand) {
    return {};
  }

  if (!isGteNext13) return {};

  const isSwcPluginAvailable = getIsSwcPluginAvailable(intlayerConfig);

  if (!isSwcPluginAvailable) {
    logger([
      colorize('Recommended: Install', ANSIColors.GREY),
      colorize('@intlayer/swc', ANSIColors.GREY_LIGHT),
      colorize(
        'package to enable build optimization. See documentation: ',
        ANSIColors.GREY
      ),
      colorize(
        'https://intlayer.org/docs/en/bundle_optimization',
        ANSIColors.GREY_LIGHT
      ),
    ]);
    return {};
  }

  runOnce(
    join(baseDir, '.intlayer', 'cache', 'intlayer-prune-plugin-enabled.lock'),
    () => logger('Build optimization enabled'),
    {
      cacheTimeoutMs: 1000 * 10, // 10 seconds
    }
  );

  const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');

  const dynamicDictionariesEntryPath = join(
    mainDir,
    'dynamic_dictionaries.mjs'
  );

  const unmergedDictionariesEntryPath = join(
    mainDir,
    'unmerged_dictionaries.mjs'
  );

  const fetchDictionariesEntryPath = join(mainDir, 'fetch_dictionaries.mjs');

  const filesListPattern = fg.sync(traversePattern, {
    cwd: baseDir,
  });

  const filesList = [
    ...filesListPattern,
    dictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
    unmergedDictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
  ];

  const dictionaries = getDictionaries(intlayerConfig);

  const liveSyncKeys = Object.values(dictionaries)
    .filter((dictionary) => dictionary.live)
    .map((dictionary) => dictionary.key);

  return {
    experimental: {
      swcPlugins: [
        [
          resolvePluginPath(
            '@intlayer/swc',
            intlayerConfig,
            isTurbopackEnabled
          ),
          {
            dictionariesDir,
            dictionariesEntryPath,
            unmergedDictionariesEntryPath,
            unmergedDictionariesDir,
            dynamicDictionariesDir,
            dynamicDictionariesEntryPath,
            fetchDictionariesDir,
            fetchDictionariesEntryPath,
            importMode,
            filesList,
            replaceDictionaryEntry: true,
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

type WithIntlayerOptions = GetConfigurationOptions & {
  enableTurbopack?: boolean;
};

/**
 * A Next.js plugin that adds the intlayer configuration to the webpack configuration
 * and sets the environment variables
 *
 * Usage:
 *
 * ```ts
 * // next.config.js
 * export default withIntlayerSync(nextConfig)
 * ```
 */
export const withIntlayerSync = <T extends Partial<NextConfig>>(
  nextConfig: T = {} as T,
  configOptions?: WithIntlayerOptions
): NextConfig & T => {
  if (typeof nextConfig !== 'object') {
    nextConfig = {} as T;
  }

  const intlayerConfig = getConfiguration(configOptions);
  const logger = getAppLogger(intlayerConfig);

  const isTurbopackEnabled =
    configOptions?.enableTurbopack ?? isTurbopackEnabledFromCommand;

  if (isTurbopackEnabled && typeof nextConfig.webpack !== 'undefined') {
    logger(
      'Turbopack is enabled but a custom webpack config is present. It will be ignored.'
    );
  }

  const { isBuildCommand, isDevCommand } = getCommandsEvent();

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
            // @ts-ignore exist in next@14
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

          // Rspack set external as false by default
          // Overwrite it to allow pushing the desired externals
          if (config.externals === false) {
            config.externals = [];
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
            // Optional as rspack not support plugin yet
            config.plugins.push(new IntlayerPlugin(intlayerConfig));
          }

          return config;
        },
      };
    }

    return config;
  };

  const pruneConfig: Partial<NextConfig> = getPruneConfig(
    intlayerConfig,
    isBuildCommand,
    isTurbopackEnabled ?? false
  );

  const intlayerNextConfig: Partial<NextConfig> = merge(
    pruneConfig,
    getNewConfig()
  );

  // Merge the new config with the user's config
  const result = merge(nextConfig, intlayerNextConfig) as NextConfig & T;

  return result;
};

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
 * > Node withIntlayer is a promise function. Use withIntlayerSync instead if you want to use it synchronously.
 * > Using the promise allows to prepare the intlayer dictionaries before the build starts.
 *
 */
export const withIntlayer = async <T extends Partial<NextConfig>>(
  nextConfig: T = {} as T,
  configOptions?: WithIntlayerOptions
): Promise<NextConfig & T> => {
  const { isBuildCommand, isDevCommand } = getCommandsEvent();

  // Only call prepareIntlayer during `dev` or `build` (not during `start`)
  // If prod: clean and rebuild once
  // If dev: rebuild only once if it's more than 1 hour since last rebuild
  if (isDevCommand || isBuildCommand) {
    const intlayerConfig = getConfiguration(configOptions);

    // prepareIntlayer use runOnce to ensure to run only once because will run twice on client and server side otherwise
    await prepareIntlayer(intlayerConfig, {
      clean: isBuildCommand,
      cacheTimeoutMs: isBuildCommand
        ? 1000 * 30 // 30 seconds for build (to ensure to rebuild all dictionaries)
        : 1000 * 60 * 60, // 1 hour for dev (default cache timeout)
    });
  }

  return withIntlayerSync(nextConfig, configOptions);
};
