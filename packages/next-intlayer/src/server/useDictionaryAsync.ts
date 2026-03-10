import type { DeclaredLocales, StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import type { Dictionary } from '@intlayer/types/dictionary';
import { useDictionaryAsync as useDictionaryAsyncBase } from 'react-intlayer/server';
import { getLocale } from './getLocale';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionaryAsync = async <
  T extends Dictionary,
  L extends DeclaredLocales = DeclaredLocales,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: L
): ReturnType<typeof useDictionaryAsyncBase<T, L>> => {
  const storedLocale = await getLocale();

  return useDictionaryAsyncBase<T, L>(dictionaryPromise, locale, storedLocale);
};
