import { join, relative, resolve } from 'path';
import { buildAndWatchIntlayer } from '@intlayer/chokidar';
import { getConfiguration, formatEnvVariable } from '@intlayer/config';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import { loadEnv, type PluginOption } from 'vite';

// Plugin options type definition
type PluginOptions = {
  // Custom options for your plugin, if any
};

let mode: string; // Shared variable to store the mode

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

  config: (config, envObject) => {
    // Store the mode
    mode = envObject.mode;

    const viteEnvVar = loadEnv(mode, process.cwd());
    const intlayerEnvVar = formatEnvVariable('vite');

    process.env = {
      ...process.env, // Env var eventually provided by other plugins
      ...viteEnvVar, // Env var loaded by vite .env files
      ...intlayerEnvVar, // Env var related to intlayer
    };

    const intlayerConfig = getConfiguration();
    const { mainDir, baseDir, watch: isWatchMode } = intlayerConfig.content;

    const dictionariesPath = join(mainDir, 'dictionaries.mjs');
    const relativeDictionariesPath = relative(baseDir, dictionariesPath);

    // Update Vite's resolve alias
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
      },
    };

    if (isWatchMode) {
      // Ajout de l'option optimizeDeps.exclude
      config.optimizeDeps = {
        ...config.optimizeDeps,
        exclude: [
          ...(config.optimizeDeps?.exclude || []),
          '@intlayer/dictionaries-entry',
        ],
      };
    }

    const externals: string[] = (config.build?.rollupOptions?.external ??
      []) as string[];

    config.build = {
      ...config.build,
      rollupOptions: {
        ...config.build?.rollupOptions,
        external: [...externals, 'module'],
      },
    };

    return config;
  },

  buildStart: async () => {
    // Code to run when Vite build starts
    try {
      await buildAndWatchIntlayer();
    } catch (error) {
      console.error('Error starting the watch process:', error);
    }
  },
});
