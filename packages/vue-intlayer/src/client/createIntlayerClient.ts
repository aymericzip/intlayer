import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { type App, readonly, ref } from 'vue';
import { INTLAYER_SYMBOL } from '../constants';

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

export interface IntlayerProvider {
  locale: {
    value: LocalesValues;
  };
  setLocale: (locale: LocalesValues) => void;
}

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (
  locale?: LocalesValues
): IntlayerProvider => {
  if (instance) return instance;

  const { defaultLocale } = configuration.internationalization ?? {};

  const targetLocale = ref<LocalesValues>(locale ?? defaultLocale);

  const setLocale = (newLocale: LocalesValues) => {
    targetLocale.value = newLocale;
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
};
