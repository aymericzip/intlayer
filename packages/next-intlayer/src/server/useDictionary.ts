import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import type { Dictionary } from '@intlayer/types/dictionary';
import { useDictionary as useDictionaryBase } from 'react-intlayer/server';
import { safeUseLocale } from './useIntlayer';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionary = <
  T extends Dictionary,
  L extends DeclaredLocales = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
): ReturnType<typeof useDictionaryBase<T, L>> => {
  const storedLocale = safeUseLocale();

  return useDictionaryBase<T, L>(dictionary, locale, storedLocale);
};
