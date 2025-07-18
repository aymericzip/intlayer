// @ts-nocheck -- Nuxt runtime types are provided at application level
import { defineNuxtPlugin } from '#app';
import { useRoute } from '#imports';
import { getHTMLTextDir, type Locales } from 'intlayer';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    const locale = useRoute().params.locale as Locales;
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  });
});
