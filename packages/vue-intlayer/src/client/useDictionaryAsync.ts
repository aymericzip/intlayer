import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary, LanguageContent } from '@intlayer/core';
import { computed, inject } from 'vue';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <T extends Dictionary>(
  dictionaryPromise: LanguageContent<() => Promise<T>>,
  locale?: LocalesValues
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(
    () =>
      locale ??
      intlayer?.locale?.value ??
      configuration?.internationalization.defaultLocale
  );

  const dictionary = await dictionaryPromise[localeTarget.value]!();

  return useDictionary(dictionary, localeTarget as any);
};
