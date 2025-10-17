import configuration from '@intlayer/config/built';
import type { Locales, LocalesValues } from '@intlayer/types';
import { type App, type Ref, readonly, ref } from 'vue';
import { installIntlayerEditor } from '../editor';

export const INTLAYER_SYMBOL = Symbol('intlayer');

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

export type IntlayerProvider = {
  locale: Ref<Locales>;
  setLocale: (locale: LocalesValues) => void;
};

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (
  locale?: LocalesValues
): IntlayerProvider => {
  if (instance) return instance;

  const { defaultLocale } = configuration.internationalization ?? {};

  const targetLocale = ref<Locales>((locale as Locales) ?? defaultLocale);

  const setLocale = (newLocale: LocalesValues) => {
    targetLocale.value = newLocale as Locales;
  };

  instance = {
    locale: readonly(targetLocale),
    setLocale,
  };

  return instance;
};

/**
 * Helper to install the Intlayer provider into the app
 */
export const installIntlayer = (app: App, locale?: LocalesValues) => {
  const client = createIntlayerClient(locale);

  app.provide(INTLAYER_SYMBOL, client);

  installIntlayerEditor(app);
};
