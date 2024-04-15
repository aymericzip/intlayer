'use client';

import { useContext } from 'react';
import { LocaleClientContext } from './LocaleClientContextProvider';

export const useLocale = () => {
  const { locale } = useContext(LocaleClientContext);

  return { locale };
};
