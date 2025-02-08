/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { LocalesValues } from '@intlayer/config/client';
import { DeepTransformContent, type Dictionary } from '@intlayer/core';
import { useContext } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';
import { getDictionary } from '../getDictionary';

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

  return getDictionary<T, LocalesValues>(
    dictionary,
    localeTarget
  ) as any as DeepTransformContent<T['content']>;
};
