import { resolve } from 'node:path';
import { type CompatCallerConfig, createPruneContext } from '@intlayer/babel';

export type { CompatCallerConfig } from '@intlayer/babel';

import { prepareIntlayer } from '@intlayer/chokidar/build';
import { logConfigDetails } from '@intlayer/chokidar/cli';
import { watch } from '@intlayer/chokidar/watcher';
import { BLUE } from '@intlayer/config/colors';
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
  getAlias,
  getHasDictionarySelector,
  getUnusedNodeTypesAsync,
} from '@intlayer/config/utils';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { PluginOption } from 'vite';
import { intlayerCompiler } from './IntlayerCompilerPlugin';
import { intlayerMinify } from './intlayerMinifyPlugin';
import { intlayerOptimize } from './intlayerOptimizePlugin';
import {
  type IntlayerProxyPluginOptions,
  intlayerProxy,
} from './intlayerProxyPlugin';
import { intlayerPrune } from './intlayerPrunePlugin';

/**
 * Extended options accepted by the intlayer Vite plugin.
 *
 * Extends {@link GetConfigurationOptions} with compat-adapter caller
 * configurations.  Compat adapter packages (e.g. `@intlayer/react-i18next/plugin`,
 * `@intlayer/vue-i18n/plugin`) inject their own caller configs here so the
 * field-usage analyser can recognise their translation function call patterns
 * and prune unused dictionary fields accordingly.
 */
export type IntlayerPluginOptions = GetConfigurationOptions & {
  /**
   * Compat-adapter namespace caller configurations to pass to the
   * field-usage analyser (Vite `buildStart` phase).
   *
   * Defined by each compat adapter package; the core `vite-intlayer` package
   * ships with an empty default to stay framework-agnostic.
   */
  compatCallers?: CompatCallerConfig[];

  /**
   * Options forwarded to the bundled locale-routing proxy (`intlayerProxy`).
   *
   * Since Intlayer v9 the proxy is plugged directly into the main `intlayer()`
   * plugin (controlled by `routing.enableProxy`, `true` by default). These
   * routing options let you tune that bundled proxy without registering it
   * separately — e.g. ignore API routes from locale routing.
   *
   * @example
   * ```ts
   * intlayer({ proxy: { ignore: (req) => req.url?.startsWith('/api') } })
   * ```
   */
  proxy?: Pick<IntlayerProxyPluginOptions, 'ignore'>;
};

/**
 * Vite plugin that integrates Intlayer into the Vite build process.
 *
 * It handles:
 * 1. Preparing Intlayer resources (dictionaries) before build.
 * 2. Configuring Vite aliases for dictionary access.
 * 3. Setting up dev-server watchers for content changes.
 * 4. Applying build optimizations (tree-shaking dictionaries).
 *
 * @param configOptions - Optional configuration to override default Intlayer settings.
 * @returns A Vite plugin option.
 *
 * @example
 * ```ts
 * import { intlayer } from 'vite-intlayer';
 *
 * export default defineConfig({
 *   plugins: [intlayer()],
 * });
 *
 * ```
 * @deprecated Rename to intlayer instead
 */
export const intlayerPlugin = (
  configOptions?: IntlayerPluginOptions
): PluginOption => {
  const { compatCallers, proxy, ...getConfigOptions } = configOptions ?? {};
  const intlayerConfig = getConfiguration(getConfigOptions);
  logConfigDetails(getConfigOptions);
  const appLogger = getAppLogger(intlayerConfig);

  const alias = getAlias({
    configuration: intlayerConfig,
    formatter: (value: string) => resolve(value),
  });

  const aliasPackages = Object.keys(alias);

  const plugins: PluginOption[] = [
    {
      name: 'vite-intlayer-plugin',

      apply: (_config, env) => {
        // Don't apply intlayer plugin during `preview` command
        const isPreviewCommand =
          env.command === 'serve' && env.mode === 'production';

        // But if liveSync is enabled, ensure the data are fresh
        const isLiveSyncEnabled = intlayerConfig.editor.liveSync;

        return !isPreviewCommand || isLiveSyncEnabled;
      },

      config: async (_config, env) => {
        const { mode } = intlayerConfig.build;

        const isDevCommand =
          env.command === 'serve' && env.mode === 'development';
        const isBuildCommand = env.command === 'build';

        // Only call prepareIntlayer during `dev` or `build` (not during `preview`)
        // If prod: clean and rebuild once
        // If dev: rebuild only once if it's more than 1 hour since last rebuild
        if (isDevCommand || isBuildCommand || mode === 'auto') {
          // prepareIntlayer use runOnce to ensure to run only once because will run twice on client and server side otherwise
          await prepareIntlayer(intlayerConfig, {
            clean: isBuildCommand,
            cacheTimeoutMs: isBuildCommand
              ? 1000 * 30 // 30 seconds for build (to ensure to rebuild all dictionaries)
              : 1000 * 60 * 60, // 1 hour for dev (default cache timeout)
            env: isBuildCommand ? 'prod' : 'dev',
          });
        }

        let define: Record<string, string> = {
          // Preset an env var to avoid 'process is not defined' error
          // Needed for some libraries that does not add process.env
          'process.env.INTLAYER': '"true"',
        };

        if (isBuildCommand) {
          const dictionaries = getDictionaries(intlayerConfig);

          if (Object.keys(dictionaries).length === 0) {
            appLogger(
              'No dictionaries found. Please check your configuration.',
              {
                isVerbose: true,
              }
            );
          }

          const unusedNodeTypes = await getUnusedNodeTypesAsync(dictionaries);

          if (unusedNodeTypes.length > 0) {
            appLogger(
              [
                'Filtering out unused logic:',
                unusedNodeTypes
                  .filter(
                    (key) =>
                      !['reactNode', 'solidNode', 'preactNode'].includes(key)
                  )
                  .map((key) => colorize(key, BLUE))
                  .join(', '),
              ],
              {
                isVerbose: true,
              }
            );
          }

          define = {
            ...define,

            // Tree shacking env var based on config
            ...formatNodeTypeToEnvVar(
              unusedNodeTypes,
              (key) => `process.env.${key}`,
              (value) => `"${value}"`
            ),

            // Tree shacking env var for the dictionary selector logic
            // (collections / variants)
            ...formatDictionarySelectorEnvVar(
              getHasDictionarySelector(dictionaries),
              (key) => `process.env.${key}`,
              (value) => `"${value}"`
            ),

            // Tree shacking env var based on config
            ...getConfigEnvVars(
              intlayerConfig,
              (key) => `process.env.${key}`,
              (value) => `"${value}"` // Wrap by "" to ensure env var set properly
            ),
          };
        }

        // mergeConfig handles both array and record alias formats,
        // and correctly appends to optimizeDeps.exclude / ssr.noExternal
        return {
          define,
          resolve: {
            alias,
          },
          optimizeDeps: {
            // Exclude alias entry points since they're local files, not npm packages
            exclude: aliasPackages,
          },
          ssr: {
            // Ensure intlayer packages are bundled so aliases are applied
            noExternal: [/(^@intlayer\/|intlayer$)/],
          },
        };
      },

      configureServer: async (server) => {
        if (server.config.mode === 'development') {
          // Start watching (assuming watch is also async)
          await watch({ configuration: intlayerConfig });
        }
      },
    },
  ];

  // Shared mutable state: the optimize plugin writes field-usage data during
  // buildStart; the prune and minify plugins read it during transform.
  const pruneContext = createPruneContext();

  // Babel transform: rewrites useIntlayer/getIntlayer calls and injects
  // JSON / dynamic-mjs imports.  Also runs the usage analyser in buildStart.
  plugins.push(intlayerOptimize(intlayerConfig, pruneContext, compatCallers));

  // Prune: removes unused content fields from dictionary JSON files.
  // Runs with enforce:'pre' so it intercepts raw JSON before Vite's
  // built-in JSON → ESM conversion.
  plugins.push(intlayerPrune(intlayerConfig, pruneContext));

  // Minify: compacts dictionary JSON files (parse + re-stringify).
  // Registered after prune so it receives already-pruned output when both options are active.
  plugins.push(intlayerMinify(intlayerConfig, pruneContext));

  // Compiler: extracts content declared inline in components into dictionaries.
  // Bundled directly into the main plugin so users no longer need to register
  // `intlayerCompiler()` separately. Only added when the compiler is enabled and
  // an `output` path is configured. Registering `intlayerCompiler()` manually as
  // well is safe — the compiler deduplicates itself.
  if (intlayerConfig.compiler?.enabled && intlayerConfig.compiler?.output) {
    plugins.push(intlayerCompiler({ configOptions: getConfigOptions }));
  }

  // Proxy: locale-routing middleware (detection / redirect / rewrite) for dev,
  // preview, and production SSR. Bundled directly into the main plugin and
  // controlled by the `routing.enableProxy` option (true by default).
  // Registering `intlayerProxy()` manually as well is safe — the proxy
  // deduplicates itself.
  if (intlayerConfig.routing.enableProxy) {
    plugins.push(intlayerProxy({ ...proxy, configOptions: getConfigOptions }));
  }

  return plugins;
};

/**
 * A Vite plugin that integrates Intlayer configuration into the build process
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayer() ],
 * });
 * ```
 */
export const intlayer = intlayerPlugin;
/**
 * @deprecated Rename to intlayer instead
 *
 * A Vite plugin that integrates Intlayer configuration into the build process
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayer() ],
 * });
 * ```
 */
export const intLayerPlugin = intlayerPlugin;
