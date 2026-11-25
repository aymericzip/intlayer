import type { DictionarySelector } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type MaybeRefOrGetter, toValue } from 'vue';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { useResolvedContent } from './useDictionary';

/**
 * Vue composable that picks one dictionary by its key and returns its reactive content.
 *
 * This hook provides deep reactivity, meaning your components will automatically
 * update when the locale changes. It shares its implementation with
 * `useDictionary`, which the build optimization rewrites it into.
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param localeOrSelector - Optional reactive locale or selector (or getter) overriding the provider locale.
 * @returns A reactive proxy to the dictionary content.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useIntlayer } from 'vue-intlayer';
 *
 * const content = useIntlayer('my-dictionary-key');
 * </script>
 *
 * <template>
 *   <div>{{ content.myField.value }}</div>
 * </template>
 * ```
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: MaybeRefOrGetter<A | null | undefined>
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  ExtractSelectorLocale<A>
> =>
  useResolvedContent({
    getSource: () => toValue(key) as T,
    getDictionaryKey: (currentKey) => currentKey as string,
    readContent: (currentKey, argument) =>
      getIntlayer(currentKey, argument as A),
    localeOrSelector: localeOrSelector as MaybeRefOrGetter<
      LocalesValues | DictionarySelector | null | undefined
    >,
  });
