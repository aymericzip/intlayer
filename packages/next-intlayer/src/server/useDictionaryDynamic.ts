import type {
  DeclaredLocales,
  Dictionary,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { useDictionaryDynamic as useDictionaryDynamicBase } from 'react-intlayer/server';
import { safeUseLocale } from './useIntlayer';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionaryDynamic = <
  T extends Dictionary,
  L extends DeclaredLocales = DeclaredLocales,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: string,
  locale?: L
): ReturnType<typeof useDictionaryDynamicBase<T, L>> => {
  const storedLocale = safeUseLocale();

  return useDictionaryDynamicBase<T, L>(
    dictionaryPromise,
    key,
    locale,
    storedLocale
  );
};
