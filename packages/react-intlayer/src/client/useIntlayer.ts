'use client';

import type { Locales } from '@intlayer/config';
import { useContext } from 'react';
import {
  type DictionaryKeys,
  useIntlayerBase,
  type UseIntlayer,
} from '../useIntlayerBase';
import { LocaleContext } from './LocaleClientContextProvider';

export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const { locale: currentLocale } = useContext(LocaleContext);
  const localeTarget = locale ?? currentLocale;

  return useIntlayerBase(id, localeTarget);
};
