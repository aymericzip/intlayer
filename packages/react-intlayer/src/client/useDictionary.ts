'use client';

import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { useChangedContent } from '@intlayer/editor-react';
import { useContext } from 'react';
import { getDictionary } from '../getDictionary';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale;
  const { changedContent } = useChangedContent();

  if (changedContent?.[dictionary.key]) {
    // @ts-ignore fix instantiation is excessively deep and possibly infinite
    return getDictionary(changedContent?.[dictionary.key], localeTarget);
  }

  return getDictionary<T, LocalesValues>(dictionary, localeTarget);
};
