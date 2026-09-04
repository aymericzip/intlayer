import { resolve } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { prepareIntlayer } from '@intlayer/engine/build';
import type { AstroIntegration } from 'astro';
import type { PluginOption } from 'vite';
import {
  INTLAYER_NO_EXTERNAL_PATTERN,
  intlayer as viteIntlayerPlugin,
} from 'vite-intlayer';
import { emitRewrittenPages } from './emitRewrittenPages';

/**
 * Keeps the intlayer packages out of Node's native module loader in *every*
 * Vite environment Astro renders from.
 *
 * A static dev server renders from `ssr`, but other setups render from Astro's
 * `astro` or `prerender` environments, and a top-level `ssr.noExternal` only
 * seeds the `ssr` one. Declaring it per environment covers the rest.
 */
const intlayerNoExternalEnvironments = (): PluginOption => ({
  name: 'astro-intlayer-no-external',
  configEnvironment: () => ({
    resolve: { noExternal: [INTLAYER_NO_EXTERNAL_PATTERN] },
  }),
});

/**
 * Astro integration for Intlayer.
 *
 * It handles:
 * 1. Preparing Intlayer resources (dictionaries) at config setup.
 * 2. Injecting Vite plugins for aliases, locale-based routing (middleware), and build optimizations (prune).
 * 3. Configuring Vite aliases for dictionary access.
 * 4. Emitting the prerendered pages at their rewritten (localized) URLs.
 *
 * The dev-time content watcher is not started here: the bundled
 * `vite-intlayer` plugin already starts one from `configureServer`, and
 * `watch()` subscribes anew on every call, so doing both would rebuild each
 * content edit twice.
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
              viteIntlayerPlugin(),
              intlayerNoExternalEnvironments(),
            ] as PluginOption[],
            resolve: {
              alias: {
                ...getAlias({
                  configuration,
                  formatter: (value) => resolve(value),
                }),
              },
            },
            // `astro-intlayer` is tagged with the `astro` keyword, so Astro
            // treats it as an Astro package and crawls its dependency tree
            // (`vitefu`), force-externalizing every dependency it finds —
            // `@intlayer/core`, `@intlayer/config`, … — into
            // `resolve.external`. Vite checks `external` before `noExternal`,
            // so the `ssr.noExternal` that `vite-intlayer` returns from its
            // Vite `config` hook loses that race and the packages are loaded
            // natively by Node, stranding dictionary edits behind Node's
            // require cache. Declaring it here instead runs before the crawl,
            // which drops explicitly no-externalized packages from its result.
            ssr: {
              noExternal: [INTLAYER_NO_EXTERNAL_PATTERN],
            },
          },
        });
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

/**
 * Alias of {@link intlayer}, kept so `astro add astro-intlayer` works.
 *
 * Astro's CLI codemod always writes a default import
 * (`import intlayer from 'astro-intlayer'`) without checking what the package
 * exports, so the integration has to be reachable that way too. The named
 * export stays the documented one.
 */
export default intlayer;
