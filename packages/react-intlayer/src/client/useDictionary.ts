'use client';

import { getDictionarySelectorCacheKey } from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useContext, useMemo } from 'react';
import { getDictionary } from '../getDictionary';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Client-side hook that transforms a dictionary (or qualified dictionary
 * group) and returns the content.
 *
 * If the locale is not provided (directly or through the selector), it will
 * use the locale from the client context.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};

  const isSelector =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    typeof localeOrSelector === 'object' &&
    localeOrSelector !== null;

  // Stable identity of the second argument for memoization
  const localeOrSelectorIdentity = isSelector
    ? `${localeOrSelector.locale ?? ''}|${getDictionarySelectorCacheKey(localeOrSelector)}`
    : localeOrSelector;

  return useMemo(() => {
    if (isSelector) {
      return getDictionary(dictionary, {
        ...localeOrSelector,
        locale: localeOrSelector.locale ?? currentLocale,
      } as A);
    }

    const localeTarget = (localeOrSelector ?? currentLocale) as A;

    return getDictionary<T, A>(dictionary, localeTarget);
  }, [dictionary.key, currentLocale, localeOrSelectorIdentity]);
};
