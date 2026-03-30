import { internationalization } from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { computed, inject, type MaybeRefOrGetter, ref, watch } from 'vue';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: MaybeRefOrGetter<LocalesValues>
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(
    () =>
      locale ?? intlayer?.locale?.value ?? internationalization.defaultLocale
  );

  const dictionary = ref<T>(
    (await dictionaryPromise[
      localeTarget.value as keyof typeof dictionaryPromise
    ]?.()) as T
  );

  watch(
    () => localeTarget.value,
    async (locale) => {
      const newDictionary =
        await dictionaryPromise[locale as keyof typeof dictionaryPromise]?.();

      if (newDictionary) {
        dictionary.value = newDictionary as T;
      }
    }
  );

  return useDictionary(dictionary, localeTarget as any);
};
