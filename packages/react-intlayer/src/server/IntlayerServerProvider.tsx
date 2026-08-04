import { internationalization } from '@intlayer/config/built';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';

import type { FC, PropsWithChildren } from 'react';
import { createServerContext, getServerContext } from './serverContext';

const { defaultLocale } = internationalization ?? {};

/**
 * Context that store the current locale on the server side
 */
export const IntlayerServerContext =
  createServerContext<LocalesValues>(defaultLocale);

/**
 * Context that stores the ambient variant on the server side.
 *
 * Kept separate from {@link IntlayerServerContext} so the locale context keeps
 * its plain `LocalesValues` shape for the packages already reading it.
 */
export const IntlayerServerVariantContext =
  createServerContext<ProviderVariant>(undefined);

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
  /**
   * Ambient variant applied to every dictionary read below this provider — for
   * a dimension resolved once per request (tenant, school type, plan tier…).
   *
   * Accepts a name (`'school1'`), an ordered preference chain
   * (`['school1', 'default']`), or a per-key map
   * (`{ key1: 'school1', default: 'base' }`). A call-site selector wins.
   */
  variant?: ProviderVariant;
};

/**
 * Provider that store the current locale on the server side
 */
export const IntlayerServerProvider: FC<IntlayerServerProviderProps> = ({
  children,
  locale = defaultLocale,
  variant,
}) => (
  <IntlayerServerContext.Provider value={locale}>
    <IntlayerServerVariantContext.Provider value={variant}>
      {children}
    </IntlayerServerVariantContext.Provider>
  </IntlayerServerContext.Provider>
);
