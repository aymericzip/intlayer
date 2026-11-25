import type { DynamicLoaderMap } from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import type { MaybeRefOrGetter } from 'vue';
import type { useDictionary } from './useDictionary';
import { useDynamicContent } from './useDictionaryDynamic';

/**
 * Loads the chunk of a per-locale loader map and returns its reactive content,
 * through the same implementation as `useDictionaryDynamic`.
 *
 * If the locale is not provided, it will use the locale from the client context.
 * A selector can pin the locale or request `{ metadataOnly: true }`.
 */
export const useDictionaryAsync = <const T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  localeOrSelector?: MaybeRefOrGetter<
    LocalesValues | DictionarySelector | null | undefined
  >
): Promise<ReturnType<typeof useDictionary<T, any>>> =>
  useDynamicContent(
    dictionaryPromise as DynamicLoaderMap,
    '',
    localeOrSelector
  );
