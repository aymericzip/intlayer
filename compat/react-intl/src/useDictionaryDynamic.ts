'use client';

import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'react-intlayer';
import { createIntlObject } from './createIntlObject';
import type { DictionaryIntlShape } from './dictionaryIntlShape';
import { createDictionaryLookup } from './useDictionary';

/**
 * Dynamic dictionary-accepting variant of `useIntl`.
 *
 * Counterpart to {@link useDictionary} for dictionaries imported lazily per
 * locale. Used internally by the build-time optimization.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K
): DictionaryIntlShape<K> => {
  const content = useDictionaryDynamicBase<T, K>(dictionaryPromise, key);
  const { locale } = useLocale();

  return useMemo(
    () =>
      createIntlObject(
        locale as LocalesValues,
        createDictionaryLookup(key, content)
      ) as DictionaryIntlShape<K>,
    [locale, key, content]
  );
};
