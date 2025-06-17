import { prepareIntlayer, watch } from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';
import { join, relative, resolve } from 'path';

// @ts-ignore fix instantiation is excessively deep and possibly infinite
export const module: NuxtModule = defineNuxtModule({
  meta: {
    name: 'nuxt-intlayer',
  },
  setup({}, nuxt) {
    const configuration = getConfiguration();

    /**
     * -------------------------------------------------
     *  RUNTIME PLUGIN REGISTRATION
     * -------------------------------------------------
     * Automatically install `vue-intlayer` on the client
     * so developers don't need to add the plugin manually
     * in every Nuxt project.
     */
    const resolver = createResolver(import.meta.url);

    addPlugin({
      src: resolver.resolve('./runtime/intlayer-plugin'),
      mode: 'all',
    });

    addPlugin({
      src: resolver.resolve('./runtime/html-lang'),
      mode: 'all',
    });

    // Inject the intlayer middleware plugin into Nuxt's Vite config
    // nuxt.hook('vite:extendConfig', (viteConfig, { isServer }) => {
    //   // We only need the middleware on the server side during development
    //   // @ts-ignore -- viteConfig.plugins can be undefined at this stage
    //   (viteConfig.plugins ||= []).push(intLayerMiddlewarePlugin());
    // });

    // Equivalent to buildStart in Vite plugin
    nuxt.hook('build:before', async () => prepareIntlayer(configuration));

    // Equivalent to configureServer in Vite plugin
    nuxt.hook('ready', async () => {
      if (configuration.content.watch) {
        // Start watching when dev server is ready
        watch({ configuration });
      }
    });

    const { mainDir, baseDir, configDir } = configuration.content;

    const dictionariesPath = join(mainDir, 'dictionaries.mjs');
    const relativeDictionariesPath = relative(baseDir, dictionariesPath);

    const unmergedDictionariesPath = join(mainDir, 'unmerged_dictionaries.mjs');
    const relativeUnmergedDictionariesPath = relative(
      baseDir,
      unmergedDictionariesPath
    );

    const configurationPath = join(configDir, 'configuration.json');
    const relativeConfigurationPath = relative(baseDir, configurationPath);

    nuxt.options.alias = {
      ...nuxt.options.alias,
      '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
      '@intlayer/unmerged-dictionaries-entry': resolve(
        relativeUnmergedDictionariesPath
      ),
      '@intlayer/config/built': resolve(relativeConfigurationPath),
    };

    // After setting up aliases, extend Nuxt pages with locale-aware routes
    nuxt.hook('pages:extend', (pages) => {
      const {
        internationalization: { locales, defaultLocale },
        middleware: { prefixDefault, noPrefix },
      } = configuration;

      // If noPrefix strategy is enabled we keep Nuxt original routing untouched
      if (noPrefix) return;

      // Build a RegExp string with supported locales (e.g. "en|fr|de") to ensure the param only accepts known locales
      const filteredLocales = prefixDefault
        ? locales
        : locales.filter((l) => l !== defaultLocale);
      const localeGroupRegex = filteredLocales.map(String).join('|');

      // If no locales remain to prefix (e.g., only default locale and prefixDefault is false) skip extension
      if (!localeGroupRegex) return;

      // Clone the original page list to avoid infinite loops when pushing
      const originalPages = [...pages];

      for (const page of originalPages) {
        // Skip already localised routes (prevent double processing)
        if (page.path.startsWith('/:locale')) continue;

        // Determine the paths we need to add depending on prefixDefault flag
        // We always add the dynamic ":locale" prefixed variant so that `/fr/about` works
        const dynPathPrefix = `/:locale(${localeGroupRegex})`;
        const isIndex = page.path === '/';
        const prefixedPath = isIndex
          ? `${dynPathPrefix}`
          : `${dynPathPrefix}${page.path}`;

        // If prefixDefault is false and this is the default locale, we keep the original
        // route (already in pages) and add the dynamic variant which will match non default
        // locales. When prefixDefault is true, we still keep the original route for SSR
        // convenience (middleware will redirect anyway) but also expose locale variants.

        // Create a shallow copy of the page with the new path
        pages.push({
          ...page,
          path: prefixedPath,
          name: page.name ? `${page.name}___i18n` : undefined,
        });
      }
    });
  },
});
