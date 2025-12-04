import type {
  Dictionary,
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
import type { MaybeRefOrGetter } from 'vue';
import { useDictionaryAsync } from './useDictionaryAsync';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryDynamic = async <
  T extends Dictionary,
  K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  _key: K,
  locale?: MaybeRefOrGetter<LocalesValues>
) => await useDictionaryAsync(dictionaryPromise, locale);
