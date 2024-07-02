import { join, relative, resolve } from 'path';
import { watch } from '@intlayer/chokidar';
import { getConfiguration, formatEnvVariable } from '@intlayer/config';
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

    // Set all configuration values as environment variables
    const env = formatEnvVariable('vite');

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()), ...env };

    const { mainDir, baseDir } = intlayerConfig.content;
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
    watch({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      persistent: (import.meta as any).env === 'development',
    });
  },
  configureServer: () => {
    // Custom server configuration, if needed
  },
});
