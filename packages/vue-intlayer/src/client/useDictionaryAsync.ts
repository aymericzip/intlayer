import configuration from '@intlayer/config/built';
import type {
  Dictionary,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { computed, inject } from 'vue';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: LocalesValues
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(
    () =>
      locale ??
      intlayer?.locale?.value ??
      configuration?.internationalization.defaultLocale
  );

  const dictionary = await dictionaryPromise[localeTarget.value]?.();

  return useDictionary(dictionary, localeTarget as any);
};
