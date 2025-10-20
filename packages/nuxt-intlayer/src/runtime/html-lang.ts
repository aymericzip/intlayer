// @ts-nocheck -- Nuxt runtime types are provided at application level

import { getHTMLTextDir } from '@intlayer/core';
import type { Locale } from '@intlayer/types';
import { defineNuxtPlugin } from '#app';
import { useRoute } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    const locale = useRoute().params.locale as Locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  });
});
