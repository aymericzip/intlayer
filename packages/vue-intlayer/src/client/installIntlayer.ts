import configuration from '@intlayer/config/built';
import type { Locale, LocalesValues } from '@intlayer/types';
import { type App, type Ref, readonly, ref } from 'vue';
import { installIntlayerEditor } from '../editor';

export const INTLAYER_SYMBOL = Symbol('intlayer');

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

export type IntlayerProvider = {
  locale: Ref<Locale>;
  setLocale: (locale: LocalesValues) => void;
  isCookieEnabled?: boolean;
};

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (
  locale?: LocalesValues,
  isCookieEnabled = true
): IntlayerProvider => {
  if (instance) return instance;

  const { defaultLocale } = configuration.internationalization ?? {};

  const targetLocale = ref<Locale>((locale as Locale) ?? defaultLocale);

  const setLocale = (newLocale: LocalesValues) => {
    targetLocale.value = newLocale as Locale;
  };

  instance = {
    locale: readonly(targetLocale),
    setLocale,
    isCookieEnabled,
  };

  return instance;
};

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
 * app.use(installIntlayer);
 * app.mount('#app');
 * ```
 */
export const installIntlayer = (
  app: App,
  locale?: LocalesValues,
  isCookieEnabled = true
) => {
  const client = createIntlayerClient(locale, isCookieEnabled);

  app.provide(INTLAYER_SYMBOL, client);

  installIntlayerEditor(app, client);

  return app;
};
