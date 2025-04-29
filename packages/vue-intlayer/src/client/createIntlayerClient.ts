import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { ref } from 'vue';
import { INTLAYER_SYMBOL } from '../constants';
import type { IntlayerProvider } from '../types/intlayer';

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (): IntlayerProvider => {
  if (instance) return instance;

  const { defaultLocale } = configuration.internationalization ?? {};

  const locale = ref<LocalesValues>(defaultLocale);

  const setLocale = (newLocale: LocalesValues) => {
    locale.value = newLocale;
  };

  instance = {
    locale,
    setLocale,
  };

  return instance;
};

/**
 * Helper to install the Intlayer provider into the app
 */
export const installIntlayer = (app: any) => {
  const client = createIntlayerClient();
  app.provide(INTLAYER_SYMBOL, client);
};
