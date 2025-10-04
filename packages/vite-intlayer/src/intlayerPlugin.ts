import { join, resolve } from 'node:path';
import { prepareIntlayer, runOnce, watch } from '@intlayer/chokidar';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import { getAlias, getAppLogger } from '@intlayer/config';
import intlayerConfig from '@intlayer/config/built';
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
  const appLogger = getAppLogger(intlayerConfig);

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

      configureServer: async (server) => {
        if (intlayerConfig.content.watch) {
          // Start watching (assuming watch is also async)
          watch({ configuration: intlayerConfig });
        }
      },

      buildStart: async () => {
        const sentinelPath = join(
          intlayerConfig.content.baseDir,
          '.intlayer',
          'cache',
          'intlayer-prepared.lock'
        );

        // Code to run when Vite build starts
        // Only call prepareIntlayer once per server startup
        await runOnce(
          sentinelPath,
          async () => await prepareIntlayer(intlayerConfig),
          () => appLogger('Intlayer prepared')
        );
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
