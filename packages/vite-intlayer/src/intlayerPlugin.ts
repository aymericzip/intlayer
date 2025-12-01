import { resolve } from 'node:path';
import { prepareIntlayer, watch } from '@intlayer/chokidar';
import {
  type GetConfigurationOptions,
  getAlias,
  getConfiguration,
} from '@intlayer/config';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import type { PluginOption } from 'vite';
import { intlayerPrune } from './intlayerPrunePlugin';

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
 *  */
export const intlayerPlugin = (
  configOptions?: GetConfigurationOptions
): PluginOption => {
  const intlayerConfig = getConfiguration(configOptions);

  const alias = getAlias({
    configuration: intlayerConfig,
    formatter: (value: string) => resolve(value),
  });

  const aliasPackages = Object.keys(alias);

  const plugins: PluginOption[] = [
    {
      name: 'vite-intlayer-plugin',

      config: async (config, env) => {
        const isDevCommand =
          env.command === 'serve' && env.mode === 'development';
        const isBuildCommand = env.command === 'build';

        // Only call prepareIntlayer during `dev` or `build` (not during `start`)
        // If prod: clean and rebuild once
        // If dev: rebuild only once if it's more than 1 hour since last rebuild
        if (isDevCommand || isBuildCommand) {
          // prepareIntlayer use runOnce to ensure to run only once because will run twice on client and server side otherwise
          await prepareIntlayer(intlayerConfig, {
            clean: isBuildCommand,
            cacheTimeoutMs: isBuildCommand
              ? 1000 * 30 // 30 seconds for build (to ensure to rebuild all dictionaries)
              : 1000 * 60 * 60, // 1 hour for dev (default cache timeout)
          });
        }

        // Update Vite's resolve alias
        config.resolve = {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            ...alias,
          },
        };

        config.optimizeDeps = {
          ...config.optimizeDeps,
          exclude: [...(config.optimizeDeps?.exclude ?? []), ...aliasPackages],
        };

        // Update Vite's SSR Externalization
        // We must ensure that intlayer packages are processed by Vite (bundled)
        // so that the aliases defined above are actually applied
        if (config.ssr?.noExternal !== true) {
          const currentNoExternal = Array.isArray(config.ssr?.noExternal)
            ? config.ssr.noExternal
            : config.ssr?.noExternal
              ? [config.ssr.noExternal]
              : [];

          config.ssr = {
            ...config.ssr,
            noExternal: [
              ...(currentNoExternal as (string | RegExp)[]),
              // Regex to bundle all intlayer related packages
              /(^@intlayer\/|intlayer$)/,
            ],
          };
        }

        return config;
      },

      configureServer: async (_server) => {
        if (intlayerConfig.content.watch) {
          // Start watching (assuming watch is also async)
          watch({ configuration: intlayerConfig });
        }
      },
    },
  ];

  // Add Babel transform plugin if enabled
  plugins.push(intlayerPrune(intlayerConfig));

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
