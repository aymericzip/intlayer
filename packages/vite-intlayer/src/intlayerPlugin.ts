import { prepareIntlayer, watch } from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import { join, relative, resolve } from 'path';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import { type PluginOption } from 'vite';

// Plugin options type definition
type PluginOptions = {
  // Custom options for your plugin, if any
};

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
export const intlayerPlugin = (
  _pluginOptions: PluginOptions = {}
): PluginOption => ({
  name: 'vite-intlayer-plugin',

  config: (config) => {
    const intlayerConfig = getConfiguration();
    const {
      mainDir,
      configDir,
      baseDir,
      watch: isWatchMode,
    } = intlayerConfig.content;

    const dictionariesPath = join(mainDir, 'dictionaries.mjs');
    const relativeDictionariesPath = relative(baseDir, dictionariesPath);

    const unmergedDictionariesPath = join(mainDir, 'unmerged_dictionaries.mjs');
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

  configureServer: async () => {
    // Runs when the dev server starts
    const intlayerConfig = getConfiguration();

    if (intlayerConfig.content.watch) {
      // Start watching (assuming watch is also async)
      watch({ configuration: intlayerConfig });
    }
  },

  buildStart: async () => {
    // Code to run when Vite build starts
    const intlayerConfig = getConfiguration();
    await prepareIntlayer(intlayerConfig);
  },
});
