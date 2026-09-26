// @ts-nocheck -- Nuxt runtime types are provided at application level

import { createI18n } from '@intlayer/vue-i18n';
import { defineNuxtPlugin } from '#app';
import {
  createLocalePath,
  createLocaleRoute,
  createRouteBaseName,
  createSwitchLocalePath,
  getLocaleHead,
} from './routing';

/**
 * Installs vue-i18n's globals (`$t`, `$d`, `$n`, `v-t`…) and the
 * @nuxtjs/i18n helpers (`$localePath`, `$switchLocalePath`…) on the app.
 *
 * Registered after `nuxt-intlayer`'s plugin, which installs the intlayer
 * client every helper reads the locale from.
 */
export default defineNuxtPlugin({
  name: 'intlayer:nuxtjs-i18n',
  setup: (nuxtApp) => {
    const i18n = createI18n({});
    nuxtApp.vueApp.use(i18n);

    const router = nuxtApp.$router;

    return {
      provide: {
        i18n: i18n.global,
        localePath: createLocalePath(router),
        switchLocalePath: createSwitchLocalePath(router),
        localeRoute: createLocaleRoute(router),
        getRouteBaseName: createRouteBaseName(router),
        localeHead: (options) => getLocaleHead(options, router),
      },
    };
  },
});
