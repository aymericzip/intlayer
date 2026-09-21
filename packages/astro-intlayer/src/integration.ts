import { resolve } from 'node:path';
import { getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import {
  formatProxyEnabledMessage,
  resolveProxyMode,
} from '@intlayer/core/localization';
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
 * Node-only half of the integration, loaded lazily by the `astro-intlayer`
 * entry when a hook runs.
 *
 * Pages import their hooks from that same entry, and Astro bundles the whole
 * package into the server build (`ssr.noExternal`), so the config loader,
 * `@intlayer/engine` and `vite-intlayer` must stay behind a dynamic import:
 * a static one would put them in the module graph of every page.
 */

type ConfigSetupOptions = Parameters<
  NonNullable<AstroIntegration['hooks']['astro:config:setup']>
>[0];

type BuildDoneOptions = Parameters<
  NonNullable<AstroIntegration['hooks']['astro:build:done']>
>[0];

/**
 * `astro:config:setup`:
 * 1. Prepares the Intlayer resources (dictionaries).
 * 2. Injects the Vite plugins for aliases, locale-based routing and build
 *    optimizations (prune).
 * 3. Configures the Vite aliases for dictionary access.
 * 4. Registers the `astro-intlayer/middleware`, which resolves the request
 *    locale into `Astro.locals.intlayer` for the hooks and redirects
 *    server-rendered requests to the visitor's locale.
 * 5. Injects the client-side locale redirect, which does the same for
 *    prerendered pages: served as static files, nothing else can read the
 *    stored locale there.
 *
 * The dev-time content watcher is not started here: the bundled
 * `vite-intlayer` plugin already starts one from `configureServer`, and
 * `watch()` subscribes anew on every call, so doing both would rebuild each
 * content edit twice.
 */
export const configSetup = async ({
  command,
  updateConfig,
  addMiddleware,
  injectScript,
}: ConfigSetupOptions): Promise<void> => {
  const configuration = getConfiguration();

  // Prepare once per process start to ensure generated entries exist
  await prepareIntlayer(configuration);

  // Runs before the user middleware so `Astro.locals.intlayer` is set
  // everywhere, including in a hand-written `src/middleware.ts`.
  addMiddleware({
    entrypoint: 'astro-intlayer/middleware',
    order: 'pre',
  });

  const proxyMode = resolveProxyMode(configuration.routing.enableProxy);

  if (proxyMode !== 'disabled') {
    injectScript(
      'page',
      `import { redirectToStoredLocale } from 'astro-intlayer/client/locale-redirect';\nredirectToStoredLocale();`
    );

    // `dev` and `build` are announced by the bundled `vite-intlayer` plugin.
    // `astro preview` runs no Vite plugin, so the served output is announced
    // here: the stored locale drives redirects again once the output is
    // served — by the middleware on server-rendered pages, by the injected
    // script on static ones.
    if (command === 'preview') {
      getAppLogger(configuration)(formatProxyEnabledMessage(false), {
        level: 'info',
      });
    }
  }

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
};

/**
 * `astro:build:done`: Astro renders each page from its canonical file-system
 * route, so a static build has no file for the localized paths declared in
 * `routing.rewrite`. Mirror them here, otherwise the URLs produced by
 * `getLocalizedUrl` (links, hreflang, sitemap) 404 once deployed.
 */
export const buildDone = async ({
  dir,
  logger,
}: BuildDoneOptions): Promise<void> => {
  const configuration = getConfiguration();

  const emittedPages = await emitRewrittenPages(configuration, dir);

  if (emittedPages.length > 0) {
    logger.info(
      `Emitted ${emittedPages.length} rewritten page(s): ${emittedPages
        .map(([from, to]) => `${from} \u2192 ${to}`)
        .join(', ')}`
    );
  }
};
