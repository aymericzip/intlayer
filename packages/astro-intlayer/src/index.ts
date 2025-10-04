import { join, resolve } from 'node:path';
import { prepareIntlayer, runOnce, watch } from '@intlayer/chokidar';
import { getAlias, getConfiguration } from '@intlayer/config';
import type { AstroIntegration } from 'astro';
import {
  intlayerPrune,
  intlayerMiddleware as viteIntlayerMiddlewarePlugin,
  intlayer as viteIntlayerPlugin,
} from 'vite-intlayer';

/**
 * Astro integration for Intlayer
 * - Adds Vite plugins: intlayer (aliases, watchers), middleware, prune (when optimize enabled)
 * - Prepares dictionaries at build start
 * - Starts watcher in dev
 */
export const intlayer = (): AstroIntegration =>
  ({
    name: 'astro-intlayer',
    hooks: {
      'astro:config:setup': async ({ updateConfig }) => {
        const configuration = getConfiguration();
        const { optimize } = configuration.build;

        // Prepare once per process start to ensure generated entries exist
        const sentinelPath = join(
          configuration.content.baseDir,
          '.intlayer',
          'cache',
          'intlayer-prepared.lock'
        );
        await runOnce(
          sentinelPath,
          async () => await prepareIntlayer(configuration)
        );

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
