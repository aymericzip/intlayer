import { defineNuxtRouteMiddleware } from '#app';
import { configuration, type Locales } from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';

export default defineNuxtRouteMiddleware((to) => {
  const client = createIntlayerClient();
  const { defaultLocale } = configuration.internationalization;

  // param is undefined for English root, or 'fr' / 'es'
  const lang = to.params.lang as Locales | undefined;
  console.log('lang', lang);

  client.setLocale(lang ?? defaultLocale);
});
