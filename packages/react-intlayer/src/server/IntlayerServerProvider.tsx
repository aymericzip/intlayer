import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';

import type { FC, PropsWithChildren } from 'react';
import { createServerContext, getServerContext } from './serverContext';

const { defaultLocale } = configuration?.internationalization ?? {};

/**
 * Context that store the current locale on the server side
 */
export const IntlayerServerContext =
  createServerContext<LocalesValues>(defaultLocale);

/**
 * Hook that provides the current locale
 */
export const useIntlayer = () => getServerContext(IntlayerServerContext);

/**
 * Get the current locale
 */
export const locale = getServerContext(IntlayerServerContext);

export type IntlayerServerProviderProps = PropsWithChildren & {
  locale?: LocalesValues;
};

/**
 * Provider that store the current locale on the server side
 */
export const IntlayerServerProvider: FC<IntlayerServerProviderProps> = ({
  children,
  locale = defaultLocale,
}) => (
  <IntlayerServerContext.Provider value={locale}>
    {children}
  </IntlayerServerContext.Provider>
);
