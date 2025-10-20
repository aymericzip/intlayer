// @ts-nocheck -- Nuxt runtime types are provided at application level

import type { Locale } from '@intlayer/config';
import { createIntlayerClient, installIntlayer } from 'vue-intlayer';
import { defineNuxtPlugin } from '#app';
import { useRoute } from '#imports';

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

  const route = useRoute();

  // Helper that applies the `:locale` route param (if any) to Intlayer.
  const syncLocale = () => {
    const localeParam = route.params.locale as Locale | undefined;
    if (localeParam) setLocale(localeParam);
  };

  // Initial sync (client & server) once the plugin is executed.
  syncLocale();

  // Keep Intlayer locale in sync on every navigation.
  nuxtApp.hook('page:start', () => {
    syncLocale();
  });
});
