import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import type {
  Dictionary,
  DictionaryKeys,
  LanguageContent,
} from '@intlayer/core';
import { computed, inject } from 'vue';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';
import { useLoadDynamic } from './useLoadDynamic';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryDynamic = <
  T extends Dictionary,
  K extends DictionaryKeys,
>(
  dictionaryPromise: LanguageContent<() => Promise<T>>,
  key: K,
  locale?: LocalesValues
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(
    () =>
      locale ??
      intlayer?.locale?.value ??
      configuration?.internationalization.defaultLocale
  );

  const dictionary = useLoadDynamic<T>(
    `${String(key)}.${localeTarget.value}`,
    dictionaryPromise[localeTarget.value]!()
  ) as T;

  return useDictionary(dictionary, localeTarget as any);
};
