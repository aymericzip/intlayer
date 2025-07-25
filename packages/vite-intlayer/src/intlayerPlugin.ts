import { cleanOutputDir, prepareIntlayer, watch } from '@intlayer/chokidar';
import intlayerConfig from '@intlayer/config/built';
import { join, relative, resolve } from 'path';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import { type PluginOption } from 'vite';
import { IntlayerPrunePlugin } from './intlayerPrunePlugin';

cleanOutputDir();

/**
 *
 * A Vite plugin that integrates Intlayer configuration into the build process
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerPlugin() ],
 * });
 * ```
 *  */
export const intlayerPlugin = (pluginOptions = {}): PluginOption => {
  const {
    mainDir,
    configDir,
    baseDir,
    watch: isWatchMode,
  } = intlayerConfig.content;
  const { optimize } = intlayerConfig.build;

  const plugins: PluginOption[] = [
    {
      name: 'vite-intlayer-plugin',

      config: (config) => {
        const dictionariesPath = join(mainDir, 'dictionaries.mjs');
        const relativeDictionariesPath = relative(baseDir, dictionariesPath);

        const unmergedDictionariesPath = join(
          mainDir,
          'unmerged_dictionaries.mjs'
        );
        const relativeUnmergedDictionariesPath = relative(
          baseDir,
          unmergedDictionariesPath
        );

        const configurationPath = join(configDir, 'configuration.json');
        const relativeConfigurationPath = relative(baseDir, configurationPath);

        // Update Vite's resolve alias
        config.resolve = {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
            '@intlayer/unmerged-dictionaries-entry': resolve(
              relativeUnmergedDictionariesPath
            ),
            '@intlayer/config/built': resolve(relativeConfigurationPath),
          },
        };

        if (isWatchMode) {
          // Ajout de l'option optimizeDeps.exclude
          config.optimizeDeps = {
            ...config.optimizeDeps,
            exclude: [
              ...(config.optimizeDeps?.exclude ?? []),
              '@intlayer/dictionaries-entry',
              '@intlayer/unmerged-dictionaries-entry',
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
        // Code to run when Vite build starts
        await prepareIntlayer(intlayerConfig);
      },
    },
  ];

  // Add Babel transform plugin if enabled
  if (optimize) {
    plugins.push(IntlayerPrunePlugin(intlayerConfig));
  }

  return plugins;
};
