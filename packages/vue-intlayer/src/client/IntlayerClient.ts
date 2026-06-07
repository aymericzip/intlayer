import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { type Ref, readonly, ref } from 'vue';

export const INTLAYER_SYMBOL = Symbol('intlayer');

export type IntlayerProvider = {
  locale: Ref<Locale>;
  setLocale: (locale: LocalesValues) => void;
  isCookieEnabled?: boolean;
};

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (
  locale?: LocalesValues,
  isCookieEnabled = true
): IntlayerProvider => {
  if (instance) return instance;

  setIntlayerIdentifier();

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
