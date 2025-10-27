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
 * Helper to install the Intlayer provider into the app
 */
export const installIntlayer = (
  app: App,
  locale?: LocalesValues,
  isCookieEnabled = true
) => {
  const client = createIntlayerClient(locale, isCookieEnabled);

  app.provide(INTLAYER_SYMBOL, client);

  installIntlayerEditor(app);
};
