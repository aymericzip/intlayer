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
  const { optimize } = intlayerConfig.build;

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

        // Code to run when Vite build starts
        if (isDevCommand || isBuildCommand) {
          await prepareIntlayer(intlayerConfig, {
            forceRun: isBuildCommand,
            clean: isBuildCommand,
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
  if (optimize) {
    plugins.push(intlayerPrune(intlayerConfig));
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
