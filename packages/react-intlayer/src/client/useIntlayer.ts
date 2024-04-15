'use client';

import type { Locales } from '@intlayer/config/client';
import { useContext } from 'react';
import {
  type DictionaryKeys,
  useIntlayerBase,
  type UseIntlayer,
} from '../useIntlayerBase';
import { LocaleClientContext } from './LocaleClientContextProvider';

export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const { locale: currentLocale } = useContext(LocaleClientContext);
  const localeTarget = locale ?? currentLocale;

  return useIntlayerBase(id, localeTarget);
};
