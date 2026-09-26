import type { NuxtI18nOptions } from './types';

export const nuxtjsI18nModule = (options?: NuxtI18nOptions, nuxt?: any) => {
  if (!nuxt && typeof (options as any)?.hook !== 'function') {
    return;
  }

  const nuxtApp = nuxt ?? options;

  nuxtApp.hook('vite:extendConfig', (viteConfig: any) => {
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = viteConfig.resolve.alias || {};

    viteConfig.resolve.alias['@nuxtjs/i18n'] = '@intlayer/nuxtjs-i18n';
    viteConfig.resolve.alias['#i18n'] = '@intlayer/nuxtjs-i18n';
  });
};

export default nuxtjsI18nModule;
