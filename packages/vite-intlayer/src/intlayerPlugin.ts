import {
  checkDictionaryChanges,
  cleanOutputDir,
  prepareIntlayer,
  runOnce,
  watch,
} from '@intlayer/chokidar';
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
export const intlayerPlugin = (): PluginOption => {
  const {
    mainDir,
    dictionariesDir,
    unmergedDictionariesDir,
    dynamicDictionariesDir,
    configDir,
    baseDir,
    watch: isWatchMode,
  } = intlayerConfig.content;
  const { hotReload } = intlayerConfig.editor;
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

        if (hotReload) {
          // If hotReload is enabled, ensure Intlayer virtual entries aren't pre-bundled
          config.optimizeDeps = {
            ...config.optimizeDeps,
            exclude: [
              ...(config.optimizeDeps?.exclude ?? []),
              '@intlayer/dictionaries-entry',
              '@intlayer/unmerged-dictionaries-entry',
              '@intlayer/config/built',
            ],
          };

          // Also externalize any imports that point to generated .intlayer paths during build
          const previousExternal = config.build?.rollupOptions?.external;
          config.build = {
            ...config.build,
            rollupOptions: {
              ...(config.build?.rollupOptions ?? {}),
              external: (
                source: string,
                importer?: string,
                isResolved?: boolean
              ) => {
                const isIntlayerGenerated =
                  source.includes(mainDir) ||
                  source.includes(dictionariesDir) ||
                  source.includes(unmergedDictionariesDir) ||
                  source.includes(dynamicDictionariesDir);

                if (typeof previousExternal === 'function') {
                  return (
                    isIntlayerGenerated ||
                    Boolean(
                      previousExternal(source, importer, isResolved ?? false)
                    )
                  );
                }

                if (Array.isArray(previousExternal)) {
                  return (
                    isIntlayerGenerated || previousExternal.includes(source)
                  );
                }

                return isIntlayerGenerated || false;
              },
            },
          };
        }

        return config;
      },

      configureServer: async (server) => {
        if (intlayerConfig.content.watch) {
          // Start watching (assuming watch is also async)
          watch({ configuration: intlayerConfig });
        }

        if (hotReload) {
          // Start SSE listener to rebuild dictionaries on remote changes
          await checkDictionaryChanges();
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
          async () => await prepareIntlayer(intlayerConfig)
        );
      },
    },
  ];

  // Add Babel transform plugin if enabled
  if (optimize) {
    plugins.push(IntlayerPrunePlugin(intlayerConfig));
  }

  return plugins;
};
