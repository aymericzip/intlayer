'use client';

import type { FC } from 'react';
import { IntlayerProvider, type IntlayerProviderProps } from 'react-intlayer';
import { useLocale } from './useLocale';

export const IntlayerClientProvider: FC<IntlayerProviderProps> = (props) => {
  const { setLocale } = useLocale();
  return <IntlayerProvider setLocale={setLocale} {...props} />;
};
