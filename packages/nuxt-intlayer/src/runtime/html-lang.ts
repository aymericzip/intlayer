// @ts-nocheck -- Nuxt runtime types are provided at application level

import { getHTMLTextDir, type Locales } from 'intlayer';
import { defineNuxtPlugin } from '#app';
import { useRoute } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    const locale = useRoute().params.locale as Locales;
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  });
});
