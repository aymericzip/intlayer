import { getConfiguration } from '@intlayer/config';
import { getPrefix } from '@intlayer/core';
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';
import { intlayer, intlayerProxy } from 'vite-intlayer';

// @ts-ignore fix instantiation is excessively deep and possibly infinite
export const module: NuxtModule = defineNuxtModule({
  meta: {
    name: 'nuxt-intlayer',
  },
  setup(_options, nuxt) {
    const configuration = getConfiguration();

    nuxt.options.typescript = nuxt.options.typescript || {};
    nuxt.options.typescript.tsConfig = nuxt.options.typescript.tsConfig || {};
    nuxt.options.typescript.tsConfig.include =
      nuxt.options.typescript.tsConfig.include || [];

    if (
      !nuxt.options.typescript.tsConfig.include.includes(
        '../.intlayer/types/**/*.ts'
      )
    ) {
      nuxt.options.typescript.tsConfig.include.push(
        '../.intlayer/types/**/*.ts'
      );
    }

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

    // // Inject the intlayer middleware plugin into Nuxt's Vite config
    nuxt.hook('vite:extendConfig', (viteConfig, { isServer }) => {
      if (isServer) {
        // We only need the middleware on the server side during development
        // viteConfig.plugins can be undefined at this stage
        (viteConfig.plugins ?? []).push(intlayerProxy());
      }

      viteConfig.plugins?.push(intlayer());
    });

    // After setting up aliases, extend Nuxt pages with locale-aware routes
    nuxt.hook('pages:extend', (pages) => {
      const {
        internationalization: { locales, defaultLocale },
        routing: { mode },
      } = configuration;

      // Build a RegExp string with supported locales (e.g. "en|fr|de") to ensure the param only accepts known locales
      const filteredLocales = locales.filter((locale) => {
        const { localePrefix } = getPrefix(locale, {
          mode,
          defaultLocale,
        });
        return localePrefix !== undefined;
      });
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
