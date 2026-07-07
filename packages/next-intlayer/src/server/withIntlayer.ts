import { createRequire } from 'node:module';
import { join, relative, resolve } from 'node:path';
import type { SwcExtraCallerConfig } from '@intlayer/config/callers';
import * as ANSIColors from '@intlayer/config/colors';
import { IMPORT_MODE } from '@intlayer/config/defaultValues';
import {
  formatDictionarySelectorEnvVar,
  formatNodeTypeToEnvVar,
  getConfigEnvVars,
} from '@intlayer/config/envVars';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import {
  compareVersions,
  getAlias,
  getHasDictionarySelector,
  getProjectRequire,
  getUnusedNodeTypes,
  isESModule,
  normalizePath,
} from '@intlayer/config/utils';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { logConfigDetails } from '@intlayer/engine/logConfigDetails';
import { buildComponentFilesList, runOnce } from '@intlayer/engine/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { IntlayerPlugin as IntlayerPluginType } from '@intlayer/webpack';
import { defu } from 'defu';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';
import nextPackageJSON from 'next/package.json' with { type: 'json' };

/**
 * A `require` bound to this module, usable in both the ESM and CJS builds.
 *
 * Used to lazily pull in heavy, situational dependencies (e.g.
 * `@intlayer/webpack`) only when they are actually needed, keeping the initial
 * `next.config` evaluation lightweight. Mirrors the `configESMxCJSRequire`
 * pattern from `@intlayer/config`.
 */
const withIntlayerRequire: NodeJS.Require = isESModule
  ? createRequire(import.meta.url)
  : require;

/**
 * Resolve the Next.js version from the *user's* project at runtime.
 * A static `import from 'next/package.json'` would resolve relative to
 * next-intlayer's own node_modules, which may differ in a monorepo.
 */
const getNextVersionFlags = (intlayerConfig: IntlayerConfig) => {
  let nextVersion = nextPackageJSON.version;

  try {
    const requireFunction =
      intlayerConfig.build?.require ?? getProjectRequire();
    const pkg = requireFunction('next/package.json') as { version: string };
    nextVersion = pkg.version;
  } catch {
    // keep default
  }

  return {
    isGteNext13: compareVersions(nextVersion, '≥', '13.0.0'),
    isGteNext15: compareVersions(nextVersion, '≥', '15.0.0'),
    isGteNext16: compareVersions(nextVersion, '≥', '16.0.0'),
    isTurbopackStable: compareVersions(nextVersion, '≥', '15.3.0'),
  };
};

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

// Check if Babel plugin is available
const getIsBabelExtractPluginAvailable = (intlayerConfig: IntlayerConfig) => {
  try {
    const requireFunction =
      intlayerConfig.build?.require ?? getProjectRequire();
    requireFunction.resolve('@intlayer/babel');
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
  isTurbopackEnabled: boolean,
  isDevCommand: boolean,
  isGteNext13: boolean,
  swcExtraCallers?: SwcExtraCallerConfig[]
): Partial<NextConfig> => {
  const { optimize } = intlayerConfig.build;
  const importMode =
    intlayerConfig.build.importMode ?? intlayerConfig.dictionary?.importMode;
  const {
    dictionariesDir,
    unmergedDictionariesDir,
    dynamicDictionariesDir,
    fetchDictionariesDir,
    mainDir,
  } = intlayerConfig.system;
  const { baseDir } = intlayerConfig.system;
  const logger = getAppLogger(intlayerConfig);

  if (optimize === false) {
    return {};
  }
  if (optimize === undefined && !isBuildCommand) {
    return {};
  }

  if (!isGteNext13) return {};

  const isSwcPluginAvailable = getIsSwcPluginAvailable(intlayerConfig);

  runOnce(
    join(baseDir, '.intlayer', 'cache', 'intlayer-prune-plugin-enabled.lock'),
    () => {
      if (isSwcPluginAvailable) {
        logger([
          `Build optimization ${colorize('enabled', ANSIColors.GREEN)}`,
          colorize(`(import mode:`, ANSIColors.GREY_DARK),
          colorize(importMode ?? IMPORT_MODE, ANSIColors.BLUE),
          colorize(`)`, ANSIColors.GREY_DARK),
        ]);
      } else {
        logger([
          colorize('Recommended: Install', ANSIColors.GREY),
          colorize('@intlayer/swc', ANSIColors.GREY_LIGHT),
          colorize(
            'package to enable build optimization. See documentation:',
            ANSIColors.GREY
          ),
          colorize(
            'https://intlayer.org/docs/bundle-optimization',
            ANSIColors.GREY_LIGHT
          ),
        ]);
      }
    },
    {
      cacheTimeoutMs: 1000 * 30, // 30 seconds
    }
  );

  runOnce(
    join(
      baseDir,
      '.intlayer',
      'cache',
      'intlayer-compiler-plugin-enabled.lock'
    ),
    () => {
      const isBabelExtractPluginAvailable =
        getIsBabelExtractPluginAvailable(intlayerConfig);

      if (isBabelExtractPluginAvailable) {
        let isEnabled = intlayerConfig.compiler?.enabled ?? true;

        if (isEnabled === 'build-only') {
          isEnabled = !isDevCommand;
        }

        if (isEnabled) {
          logger('Intlayer compiler enabled');
        } else {
          logger('Intlayer compiler disabled');
        }
      }
    },
    {
      cacheTimeoutMs: 1000 * 30, // 30 seconds
    }
  );

  if (!isSwcPluginAvailable) {
    return {};
  }

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

  const filesListPattern = buildComponentFilesList(intlayerConfig);

  const filesList = [
    ...filesListPattern,
    dictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
    unmergedDictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
  ];

  const dictionaries = getDictionaries(intlayerConfig);

  const dictionaryModeMap: Record<string, 'static' | 'dynamic' | 'fetch'> = {};

  (Object.values(dictionaries) as Dictionary[]).forEach((dictionary) => {
    dictionaryModeMap[dictionary.key] =
      dictionary.importMode ?? importMode ?? IMPORT_MODE;
  });

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
            dictionaryModeMap,
            extraCallers: swcExtraCallers ?? [],
          },
        ],
      ],
    },
  };
};

const getCommandsEvent = () => {
  const lifecycleEvent = process.env['npm_lifecycle_event'];
  const lifecycleScript = process.env['npm_lifecycle_script'] ?? '';

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
  swcExtraCallers?: SwcExtraCallerConfig[];
};

/**
 * Pin the env file used to resolve the Intlayer configuration to the Next.js
 * command being run (`dev` → `development`, `build`/`start` → `production`).
 *
 * Next.js loads the config file in several processes during a single command
 * (the main `build` process plus one or more Turbopack/webpack workers), and
 * `process.env.NODE_ENV` is not guaranteed to hold the same value in all of
 * them. Since `getConfiguration` falls back to `NODE_ENV` to pick its env file
 * (`.env.development.local` vs `.env.production.local`), those processes could
 * otherwise resolve *different* env values (e.g. `applicationURL`,
 * `INTLAYER_CLIENT_ID`). The resulting configuration would differ between
 * processes, defeating the `isCachedConfigurationUpToDate` check and forcing a
 * redundant full dictionary rebuild.
 *
 * Passing an explicit `env` keeps configuration resolution deterministic across
 * every process of the command. An `env` already set by the caller is
 * respected, and when the command cannot be determined we fall back to
 * `getConfiguration`'s own default (i.e. leave `env` unset).
 */
const resolveConfigOptions = (
  configOptions?: WithIntlayerOptions
): WithIntlayerOptions | undefined => {
  // Respect an explicit override from the caller (idempotent on re-entry).
  if (configOptions?.env) return configOptions;

  const { isDevCommand, isBuildCommand, isStartCommand } = getCommandsEvent();

  const env = isDevCommand
    ? 'development'
    : isBuildCommand || isStartCommand
      ? 'production'
      : undefined;

  if (!env) return configOptions;

  return {
    ...configOptions,
    env,
  };
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

  const resolvedConfigOptions = resolveConfigOptions(configOptions);

  const intlayerConfig = getConfiguration(resolvedConfigOptions);

  logConfigDetails(resolvedConfigOptions);

  const appLogger = getAppLogger(intlayerConfig);

  const { isGteNext13, isGteNext15, isGteNext16, isTurbopackStable } =
    getNextVersionFlags(intlayerConfig);

  const isTurbopackEnabledFromCommand = isGteNext16
    ? // Next@16 enables turbopack by default; disable with --webpack
      !process.env['npm_lifecycle_script']?.includes('--webpack')
    : // Next@15 uses --turbopack, Next@14 uses --turbo
      process.env['npm_lifecycle_script']?.includes('--turbo');

  const isTurbopackEnabled =
    configOptions?.enableTurbopack ?? isTurbopackEnabledFromCommand;

  if (isTurbopackEnabled && typeof nextConfig.webpack !== 'undefined') {
    appLogger(
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
    'recast',
    '@intlayer/engine',
    '@intlayer/webpack',
  ];

  let env: Record<string, string> = {};

  if (isBuildCommand) {
    const dictionaries = getDictionaries(intlayerConfig);

    if (Object.keys(dictionaries).length === 0) {
      appLogger('No dictionaries found. Please check your configuration.', {
        isVerbose: true,
      });
    }

    const unusedNodeTypes = getUnusedNodeTypes(dictionaries);

    if (unusedNodeTypes && unusedNodeTypes.length > 0) {
      appLogger(
        [
          'Filtering out unused logic:',
          unusedNodeTypes
            .filter(
              (key) => !['reactNode', 'solidNode', 'preactNode'].includes(key)
            )
            .map((key) => colorize(key, ANSIColors.BLUE))
            .join(', '),
        ],
        {
          isVerbose: true,
        }
      );
    }

    env = {
      ...env,

      // Tree shacking based on unused node types
      ...formatNodeTypeToEnvVar(unusedNodeTypes),

      // Tree shacking the dictionary selector logic
      // (collections / variants)
      ...formatDictionarySelectorEnvVar(getHasDictionarySelector(dictionaries)),

      // Tree shacking based on config
      ...getConfigEnvVars(intlayerConfig),
    };
  }

  const getNewConfig = (): Partial<NextConfig> => {
    let config: Partial<NextConfig> = {
      env,
    };

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

          // Mark server-only modules as externals (function form handles subpaths)
          const externalExact = new Set([
            'esbuild',
            'module',
            'fs',
            'chokidar',
            'fsevents',
            'recast',
          ]);
          const externalPrefixes = ['@intlayer/engine', '@intlayer/webpack'];
          config.externals.push(
            (
              { request }: { request?: string },
              callback: (err: Error | null, result?: string) => void
            ) => {
              if (
                request &&
                (externalExact.has(request) ||
                  externalPrefixes.some(
                    (prefix) =>
                      request === prefix || request.startsWith(`${prefix}/`)
                  ))
              ) {
                return callback(null, `commonjs ${request}`);
              }
              callback(null);
            }
          );

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
            // Lazily load `@intlayer/webpack` only on the dev server's Node
            // runtime — the single place the plugin is needed. This keeps it out
            // of the initial `next.config` load and out of the (default)
            // Turbopack path entirely. `require` is used because Next.js invokes
            // the webpack config callback synchronously.
            const { IntlayerPlugin } = withIntlayerRequire(
              '@intlayer/webpack'
            ) as { IntlayerPlugin: typeof IntlayerPluginType };

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
    isTurbopackEnabled ?? false,
    isDevCommand,
    isGteNext13,
    configOptions?.swcExtraCallers
  );

  const intlayerNextConfig: Partial<NextConfig> = defu(
    getNewConfig(),
    pruneConfig
  );

  // Merge the new config with the user's config
  const result = defu(intlayerNextConfig, nextConfig) as NextConfig & T;

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
export const withIntlayer = async <T extends NextConfig | Partial<NextConfig>>(
  nextConfig: T | Promise<T> = {} as T,
  configOptions?: WithIntlayerOptions
): Promise<NextConfig & T> => {
  const { isBuildCommand, isDevCommand, isStartCommand } = getCommandsEvent();

  process.env.INTLAYER_IS_DEV_COMMAND = isDevCommand ? 'true' : 'false';

  const resolvedConfigOptions = resolveConfigOptions(configOptions);

  const intlayerConfig = getConfiguration(resolvedConfigOptions);

  const { mode } = intlayerConfig.build;

  // Only call prepareIntlayer during `dev` or `build` (not during `start`)
  // If prod: clean and rebuild once
  // If dev: rebuild only once if it's more than 1 hour since last rebuild
  if (!isStartCommand && (isDevCommand || isBuildCommand || mode === 'auto')) {
    // Lazily load the heavy build pipeline (`@intlayer/engine/build`) only when
    // a rebuild is actually required, keeping `next.config` evaluation cheap for
    // commands (e.g. `start`) that never touch it.
    const { prepareIntlayer } = await import('@intlayer/engine/build');

    // prepareIntlayer use runOnce to ensure to run only once because will run twice on client and server side otherwise
    await prepareIntlayer(intlayerConfig, {
      clean: isBuildCommand,
      cacheTimeoutMs: isBuildCommand
        ? 1000 * 30 // 30 seconds for build (to ensure to rebuild all dictionaries)
        : 1000 * 60 * 60, // 1 hour for dev (default cache timeout)
      env: isBuildCommand ? 'prod' : 'dev',
    });
  }

  const nextConfigResolved = await nextConfig;

  return withIntlayerSync(nextConfigResolved, resolvedConfigOptions);
};
