import { prepareIntlayer, watch } from '@intlayer/chokidar';
import {
  getAlias,
  getConfiguration,
  getProjectRequire,
} from '@intlayer/config';
import type { RsbuildPlugin } from '@rsbuild/core';

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
      const configuration = getConfiguration();

      await prepareIntlayer(configuration);

      // If file watching is enabled in Intlayer's config, start it.
      if (configuration.content.watch) {
        watch({ configuration });
      }

      // Merge Intlayer-specific environment variables and alias configuration.
      api.modifyRsbuildConfig(async (config, { mergeRsbuildConfig }) => {
        return mergeRsbuildConfig(config, {
          resolve: {
            alias: {
              ...getAlias({ configuration }),
              react: getProjectRequire().resolve('@lynx-js/react'),
            },
          },
        });
      });
    },
  };
};
