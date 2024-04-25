import { getConfiguration } from '@intlayer/config/client';
import type { FC } from 'react';
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from './client/IntlayerClientProvider';
import {
  IntlayerServerProvider,
  type IntlayerServerProviderProps,
} from './server/IntlayerServerProvider';

const { defaultLocale } = getConfiguration().internationalization;

type IntlayerProviderProps = IntlayerClientProviderProps &
  IntlayerServerProviderProps;

export const IntlayerProvider: FC<IntlayerProviderProps> = ({
  children,
  locale = defaultLocale,
}) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
  </IntlayerServerProvider>
);
