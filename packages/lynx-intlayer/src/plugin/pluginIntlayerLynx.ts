import { prepareIntlayer, watch } from '@intlayer/chokidar';
import { ESMxCJSRequire, getConfiguration } from '@intlayer/config';
import type { RsbuildPlugin } from '@rsbuild/core';
import { join, relative } from 'path';

/**
 * A Lynx plugin to integrate Intlayer into the Lynx build process.
 *
 * - Loads the Intlayer configuration and injects environment variables.
 * - If enabled, starts a file watcher for dictionary changes.
 * - On build, prepares the Intlayer configuration.
 * - Optionally checks for dictionary changes before compiling (hot reload).
 *
 * Usage in your lynx.config.ts:
 *
 *   import { defineConfig } from '@lynx-js/rspeedy'
 *   import { pluginIntlayerLynx } from '@intlayer/lynx-plugin'
 *
 *   export default defineConfig({
 *     plugins: [
 *       pluginIntlayerLynx(),
 *     ],
 *     // ...other configuration
 *   })
 */
export const pluginIntlayerLynx = (): RsbuildPlugin => {
  return {
    name: 'plugin-intlayer-lynx',

    async setup(api) {
      // Load the Intlayer configuration and format env variables for Lynx.
      const intlayerConfig = getConfiguration();

      await prepareIntlayer(intlayerConfig);

      // Compute the relative paths for alias configuration.
      const { mainDir, configDir, baseDir } = intlayerConfig.content;

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

      // If file watching is enabled in Intlayer's config, start it.
      if (intlayerConfig.content.watch) {
        watch(intlayerConfig);
      }

      // Merge Intlayer-specific environment variables and alias configuration.
      api.modifyRsbuildConfig(async (config, { mergeRsbuildConfig }) => {
        return mergeRsbuildConfig(config, {
          source: {
            alias: {
              '@intlayer/dictionaries-entry': relativeDictionariesPath,
              '@intlayer/unmerged-dictionaries-entry':
                relativeUnmergedDictionariesPath,
              '@intlayer/config/built': relativeConfigurationPath,
              react: ESMxCJSRequire.resolve('@lynx-js/react'),
            },
          },
        });
      });
    },
  };
};
