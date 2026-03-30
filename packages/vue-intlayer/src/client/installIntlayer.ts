import { internationalization } from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { type App, type Ref, readonly, ref } from 'vue';
import { useEditor } from '../editor/useEditor';

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

  const { defaultLocale } = internationalization ?? {};

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

  useEditor(app);

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
