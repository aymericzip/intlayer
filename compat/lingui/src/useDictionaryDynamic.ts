'use client';

import type { Dictionary } from '@intlayer/types/dictionary';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import type { I18nContext } from '@lingui/react';
import { useMemo } from 'react';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'react-intlayer';
import { I18nClass } from './I18nClass';

/**
 * Dynamic dictionary-accepting variant of `useLingui`.
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
): I18nContext => {
  const content = useDictionaryDynamicBase<T, K>(dictionaryPromise, key);
  const { locale } = useLocale();

  return useMemo(() => {
    const instance = new I18nClass({
      locale: locale as string,
    }).bindDictionaryContent(content);

    return {
      i18n: instance as unknown as I18nContext['i18n'],
      _: instance._.bind(instance) as I18nContext['_'],
    } as I18nContext;
  }, [locale, content]);
};
