// @ts-nocheck -- Nuxt runtime types are provided at application level

import { internationalization, routing } from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import { createIntlayerClient, installIntlayer } from 'vue-intlayer';
import { defineNuxtPlugin } from '#app';
import { useRoute, useRouter } from '#imports';

/**
 * Nuxt client plugin injected by `nuxt-intlayer` module.
 * It installs the Intlayer Vue composables in the current Nuxt application and keeps
 * the active locale in sync with the current route (e.g. `/fr/about` → `fr`).
 */
export default defineNuxtPlugin((nuxtApp) => {
  /**
   * Register the Intlayer provider. We don't pass an explicit locale here so it
   * will fallback to the `defaultLocale` defined in the user configuration.
   * We will synchronise the active locale afterwards, once the current route
   * information is reliably available.
   */
  installIntlayer(nuxtApp.vueApp);

  // Obtain a reference to the singleton Intlayer client so we can update the
  // locale reactively whenever the route changes.
  const { setLocale } = createIntlayerClient();

  // With prefixed routing, a route without `:locale` is the default locale.
  // Resetting it matters on the server, where the client singleton outlives
  // the request: `/` rendered after `/fr` would otherwise stay in French.
  const isPrefixedRouting =
    routing?.mode === 'prefix-no-default' || routing?.mode === 'prefix-all';

  /** Applies a route's `:locale` param (if any) to Intlayer. */
  const syncLocale = (localeParam: Locale | undefined) => {
    if (localeParam) {
      setLocale(localeParam);
    } else if (isPrefixedRouting) {
      setLocale(internationalization.defaultLocale);
    }
  };

  // Initial sync (client & server) once the plugin is executed.
  syncLocale(useRoute().params.locale as Locale | undefined);

  // Keep Intlayer locale in sync on every navigation. The target route is
  // read from the router: `useRoute()` still holds the previous route until
  // the new page has rendered, so plain links (`/fr`, back / forward) would
  // otherwise keep the old locale.
  useRouter().afterEach((to, _from, failure) => {
    if (failure) return;

    syncLocale(to.params.locale as Locale | undefined);
  });
});
