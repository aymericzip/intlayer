import { resolve } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { prepareIntlayer } from '@intlayer/engine/build';
import { watch } from '@intlayer/engine/watcher';
import type { AstroIntegration } from 'astro';
import type { PluginOption } from 'vite';
import {
  intlayer as viteIntlayerPlugin,
  intlayerProxy as viteIntlayerProxyPlugin,
} from 'vite-intlayer';
import { emitRewrittenPages } from './emitRewrittenPages';

/**
 * Astro integration for Intlayer.
 *
 * It handles:
 * 1. Preparing Intlayer resources (dictionaries) at config setup.
 * 2. Injecting Vite plugins for aliases, locale-based routing (middleware), and build optimizations (prune).
 * 3. Configuring Vite aliases for dictionary access.
 * 4. Starting a file watcher for dictionary changes during development.
 * 5. Emitting the prerendered pages at their rewritten (localized) URLs.
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

        // Prepare once per process start to ensure generated entries exist
        await prepareIntlayer(configuration);

        updateConfig({
          vite: {
            plugins: [
              // Aliases + watcher + buildStart prep
              // (also handles optimize/prune/minify internally)
              viteIntlayerPlugin(),
              // Dev-time middleware for locale routing
              viteIntlayerProxyPlugin(),
            ] as PluginOption[],
            resolve: {
              alias: {
                ...getAlias({
                  configuration,
                  formatter: (value) => resolve(value),
                }),
              },
            },
          },
        });
      },

      'astro:server:setup': async () => {
        const configuration = getConfiguration();

        if (configuration.content.watch) {
          await watch({ configuration });
        }
      },

      // Astro renders each page from its canonical file-system route, so a
      // static build has no file for the localized paths declared in
      // `routing.rewrite`. Mirror them here, otherwise the URLs produced by
      // `getLocalizedUrl` (links, hreflang, sitemap) 404 once deployed.
      'astro:build:done': async ({ dir, logger }) => {
        const configuration = getConfiguration();

        const emittedPages = await emitRewrittenPages(configuration, dir);

        if (emittedPages.length > 0) {
          logger.info(
            `Emitted ${emittedPages.length} rewritten page(s): ${emittedPages
              .map(([from, to]) => `${from} \u2192 ${to}`)
              .join(', ')}`
          );
        }
      },
    },
  }) satisfies AstroIntegration;
