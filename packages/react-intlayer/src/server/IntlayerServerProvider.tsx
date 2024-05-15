import { type Locales, getConfiguration } from '@intlayer/config/client';
import type { FC, PropsWithChildren } from 'react';
import { createServerContext, getServerContext } from './serverContext';

const { defaultLocale } = getConfiguration().internationalization;

/**
 * Context that store the current locale on the server side
 */
export const IntlayerServerContext =
  createServerContext<Locales>(defaultLocale);

/**
 * Hook that provides the current locale
 */
export const useIntlayer = () => getServerContext(IntlayerServerContext);

/**
 * Get the current locale
 */
export const locale = getServerContext(IntlayerServerContext);

export type IntlayerServerProviderProps = PropsWithChildren & {
  locale?: Locales;
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
