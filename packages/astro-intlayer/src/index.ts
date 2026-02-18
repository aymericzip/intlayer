import { resolve } from 'node:path';
import { prepareIntlayer } from '@intlayer/chokidar/build';
import { watch } from '@intlayer/chokidar/watcher';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import type { AstroIntegration } from 'astro';
import {
  intlayerPrune,
  intlayerMiddleware as viteIntlayerMiddlewarePlugin,
  intlayer as viteIntlayerPlugin,
} from 'vite-intlayer';

/**
 * Astro integration for Intlayer.
 *
 * It handles:
 * 1. Preparing Intlayer resources (dictionaries) at config setup.
 * 2. Injecting Vite plugins for aliases, locale-based routing (middleware), and build optimizations (prune).
 * 3. Configuring Vite aliases for dictionary access.
 * 4. Starting a file watcher for dictionary changes during development.
 *
 * @returns An Astro integration object.
 *
 * @example
 * ```ts
 * // astro.config.mjs
 * import { defineConfig } from 'astro/config';
 * import { intlayer } from 'astro-intlayer';
 *
 * export default defineConfig({
 *   integrations: [intlayer()],
 * });
 * ```
 */
export const intlayer = (): AstroIntegration =>
  ({
    name: 'astro-intlayer',
    hooks: {
      'astro:config:setup': async ({ updateConfig }) => {
        const configuration = getConfiguration();
        const { optimize } = configuration.build;

        // Prepare once per process start to ensure generated entries exist
        await prepareIntlayer(configuration);

        updateConfig({
          vite: {
            plugins: [
              // Aliases + watcher + buildStart prep
              viteIntlayerPlugin(),
              // Dev-time middleware for locale routing
              viteIntlayerMiddlewarePlugin(),
              // Tree-shake/prune content when enabled
              ...(optimize ? [intlayerPrune(configuration) as any] : []),
            ],
            resolve: {
              alias: {
                ...getAlias({
                  configuration,
                  formatter: (value: string) => resolve(value),
                }),
              },
            },
          },
        });
      },

      'astro:server:setup': async () => {
        const configuration = getConfiguration();
        if (configuration.content.watch) {
          watch({ configuration });
        }
      },
    },
  }) satisfies AstroIntegration;
