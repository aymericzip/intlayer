import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { App } from 'vue';
import { createIntlayerClient, INTLAYER_SYMBOL } from './IntlayerClient';

/**
 * Vue plugin to install Intlayer in your application.
 *
 * It provides the Intlayer context to your app and enables the use of composables
 * like `useIntlayer` and `useLocale`.
 *
 * @param app - The Vue application instance.
 * @param locale - Initial locale to use.
 * @param isCookieEnabled - Whether to store the locale in cookies.
 * @returns The Vue application instance.
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { installIntlayer } from 'vue-intlayer';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 *
 * installIntlayer(app);
 *
 * app.mount('#app');
 * ```
 */
export const installIntlayer = (
  app: App,
  options?: {
    locale?: LocalesValues;
    isCookieEnabled?: boolean;
  }
) => {
  const { locale, isCookieEnabled } = options ?? {};

  const client = createIntlayerClient(locale, isCookieEnabled);

  app.provide(INTLAYER_SYMBOL, client);

  if (process.env['INTLAYER_EDITOR_ENABLED'] !== 'false') {
    import('../editor/useEditor').then(({ useEditor }) => {
      useEditor(app);
    });
  }

  return app;
};

/**
 * Vue plugin object for Intlayer. Can be used with `app.use(intlayer)`.
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { intlayer } from 'vue-intlayer';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 * app.use(intlayer);
 * app.mount('#app');
 * ```
 */
export const intlayer: {
  install: typeof installIntlayer;
} = {
  install: installIntlayer,
};
