import { prepareIntlayer } from '@intlayer/chokidar/build';
import { watch } from '@intlayer/chokidar/watcher';
import { BLUE } from '@intlayer/config/colors';
import {
  formatNodeTypeToEnvVar,
  getConfigEnvVars,
} from '@intlayer/config/envVars';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import {
  getAlias,
  getProjectRequire,
  getUnusedNodeTypesAsync,
} from '@intlayer/config/utils';
import { getDictionaries } from '@intlayer/dictionaries-entry';
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

      const isBuild = api.context.action === 'build';

      let defineVars = {};

      if (isBuild) {
        const appLogger = getAppLogger(configuration);

        const dictionaries = getDictionaries(configuration);

        if (Object.keys(dictionaries).length === 0) {
          appLogger('No dictionaries found. Please check your configuration.', {
            isVerbose: true,
          });
        }

        const unusedNodeTypes = await getUnusedNodeTypesAsync(dictionaries);

        if (unusedNodeTypes.length > 0) {
          appLogger(
            [
              'Filtering out unused plugins:',
              unusedNodeTypes.map((key) => colorize(key, BLUE)).join(', '),
            ],
            {
              isVerbose: true,
            }
          );
        }

        defineVars = {
          ...formatNodeTypeToEnvVar(
            unusedNodeTypes,
            (key) => `process.env.${key}`,
            (value) => `"${value}"`
          ),
          ...getConfigEnvVars(
            configuration,
            (key) => `process.env.${key}`,
            (value) => `"${value}"`
          ),
        };
      }

      // Merge Intlayer-specific environment variables and alias configuration.
      api.modifyRsbuildConfig(async (config, { mergeRsbuildConfig }) => {
        return mergeRsbuildConfig(config, {
          source: {
            define: defineVars,
          },
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
