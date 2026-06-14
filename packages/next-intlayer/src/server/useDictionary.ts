import type {
  Dictionary,
  DictionarySelector,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useDictionary as useDictionaryBase } from 'react-intlayer/server';
import { safeUseLocale } from './useIntlayer';

/**
 * On the server side, hook that transforms a dictionary (or qualified
 * dictionary group) and returns the content for the given locale or selector.
 *
 * If the locale is not provided, it will use the locale from the server context.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): ReturnType<typeof useDictionaryBase<T, A>> => {
  const storedLocale = safeUseLocale();

  return useDictionaryBase<T, A>(dictionary, localeOrSelector, storedLocale);
};
