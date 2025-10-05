import { resolve } from 'node:path';
import { prepareIntlayer, watch } from '@intlayer/chokidar';
import { getAlias } from '@intlayer/config';
import intlayerConfig from '@intlayer/config/built';
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
export const intlayerPlugin = (): PluginOption => {
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
          // Ajout de l'option optimizeDeps.exclude
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
        await prepareIntlayer(intlayerConfig);
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
