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

export type IntlayerPluginOptions = GetConfigurationOptions & {
  /**
   * If true, wipes the entire .intlayer folder on dev server startup
   * to guarantee a fresh build from source files. Useful when dealing
   * with stale cache or key changes made while the server was offline.
   *
   * @default false
   */
  cleanOnStartup?: boolean;
};

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
  configOptions?: IntlayerPluginOptions
): PluginOption => {
  const { cleanOnStartup = false, ...intlayerConfigOptions } =
    configOptions || {};
  const intlayerConfig = getConfiguration(intlayerConfigOptions);
  const { watch: isWatchMode } = intlayerConfig.content;
  const { optimize } = intlayerConfig.build;

  const plugins: PluginOption[] = [
    {
      name: 'vite-intlayer-plugin',

      config: (config) => {
        // Update Vite's resolve alias
        config.resolve = {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            ...getAlias({
              configuration: intlayerConfig,
              formatter: (value: string) => resolve(value),
            }),
          },
        };

        if (isWatchMode) {
          config.optimizeDeps = {
            ...config.optimizeDeps,
            exclude: [
              ...(config.optimizeDeps?.exclude ?? []),
              '@intlayer/dictionaries-entry',
              '@intlayer/config/built',
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

      buildStart: async () => {
        // Code to run when Vite build starts
        await prepareIntlayer(intlayerConfig, {
          clean: cleanOnStartup,
          forceRun: cleanOnStartup,
        });
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
