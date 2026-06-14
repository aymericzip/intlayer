import type { QualifiedDynamicLoaderMap } from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useDictionaryDynamic as useDictionaryDynamicBase } from 'react-intlayer/server';
import { safeUseLocale } from './useIntlayer';

/**
 * On the server side, hook that lazily loads a dictionary (plain or qualified)
 * and returns the content for the given locale or selector.
 *
 * If the locale is not provided, it will use the locale from the server context.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = LocalesValues,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A
): ReturnType<typeof useDictionaryDynamicBase<T, A>> => {
  const storedLocale = safeUseLocale();

  return useDictionaryDynamicBase<T, A>(
    dictionaryPromise,
    key,
    localeOrSelector,
    storedLocale
  );
};
