'use client';

import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import type { IntlShape } from 'react-intl';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'react-intlayer';
import { createIntlObject } from './createIntlObject';
import { createDictionaryLookup } from './useDictionary';

/**
 * Dynamic dictionary-accepting variant of `useIntl`.
 *
 * Counterpart to {@link useDictionary} for dictionaries imported lazily per
 * locale. Used internally by the build-time optimization.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends string,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K
): IntlShape => {
  const content = useDictionaryDynamicBase<T, K>(dictionaryPromise, key);
  const { locale } = useLocale();

  return useMemo(
    () =>
      createIntlObject(
        locale as LocalesValues,
        createDictionaryLookup(key, content)
      ),
    [locale, key, content]
  );
};
