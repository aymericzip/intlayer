'use client';

import type { FC } from 'react';

import { IntlayerProvider, type IntlayerProviderProps } from 'react-intlayer';

export type IntlayerClientProviderProps = IntlayerProviderProps;

export const IntlayerClientProvider: FC<IntlayerProviderProps> = (props) => (
  <IntlayerProvider {...props} />
);
