import { resolve } from 'node:path';
import { prepareIntlayer } from '@intlayer/chokidar/build';
import { logConfigDetails } from '@intlayer/chokidar/cli';
import {
  formatNodeTypeToEnvVar,
  getUnusedNodeTypes,
} from '@intlayer/chokidar/utils';
import { watch } from '@intlayer/chokidar/watcher';
import { BLUE } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { getDictionaries } from '@intlayer/dictionaries-entry';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import type { PluginOption } from 'vite';
import { intlayerEditorPlugin } from './intlayerEditorPlugin';
import { intlayerOptimize } from './intlayerOptimizePlugin';

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
  configOptions?: GetConfigurationOptions
): PluginOption => {
  const intlayerConfig = getConfiguration(configOptions);
  logConfigDetails(configOptions);
  const appLogger = getAppLogger(intlayerConfig);

  const alias = getAlias({
    configuration: intlayerConfig,
    formatter: (value: string) => resolve(value),
  });

  const aliasPackages = Object.keys(alias);

  const plugins: PluginOption[] = [
    {
      name: 'vite-intlayer-plugin',

      config: async (_config, env) => {
        const { mode } = intlayerConfig.build;

        const isDevCommand =
          env.command === 'serve' && env.mode === 'development';
        const isBuildCommand = env.command === 'build';

        // Only call prepareIntlayer during `dev` or `build` (not during `start`)
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

        let define = {};

        if (isBuildCommand) {
          const dictionaries = getDictionaries(intlayerConfig);
          const unusedNodeTypes = getUnusedNodeTypes(dictionaries);

          if (unusedNodeTypes.length > 0) {
            appLogger(
              [
                'Filtering out unused plugins:',
                unusedNodeTypes.map((key) => colorize(key, BLUE)).join(', '),
              ],
              {
                isVerbose: true,
              }
            );
          }

          define = {
            ...define,
            ...formatNodeTypeToEnvVar(unusedNodeTypes, true),
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
          watch({ configuration: intlayerConfig });
        }
      },
    },
  ];

  plugins.push(intlayerEditorPlugin(intlayerConfig));

  // Add Babel transform plugin if enabled
  plugins.push(intlayerOptimize(intlayerConfig));

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
