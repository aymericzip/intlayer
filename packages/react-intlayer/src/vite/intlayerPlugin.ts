import { join, relative, resolve } from 'path';
import process from 'process';
import { watch } from '@intlayer/chokidar';
import { getConfiguration, formatEnvVariable } from '@intlayer/config';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import { loadEnv, type Plugin } from 'vite';

// Plugin options type definition
type PluginOptions = {
  // Custom options for your plugin, if any
};

/**
 *
 * A Vite plugin that integrates IntLayer configuration into the build process
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intLayerPlugin() ],
 * });
 * ```
 *  */
export const intLayerPlugin = (_pluginOptions: PluginOptions = {}): Plugin => ({
  name: 'vite-intlayer-plugin',

  config: (config, { mode }) => {
    const intlayerConfig = getConfiguration();
    const { mainDir, baseDir, watch: isWatchMode } = intlayerConfig.content;

    // Set all configuration values as environment variables
    const env = formatEnvVariable('vite');

    process.env = {
      ...process.env,
      ...loadEnv(mode, process.cwd()),
      ...env,
    };

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

  buildStart: () => {
    // Code to run when Vite build starts
    watch();
  },
  configureServer: () => {
    // Custom server configuration, if needed
  },
});
