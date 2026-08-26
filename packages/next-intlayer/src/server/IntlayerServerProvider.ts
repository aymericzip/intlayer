import {
  IntlayerServerProvider as IntlayerServerProviderBase,
  type IntlayerServerProviderProps as IntlayerServerProviderPropsBase,
} from 'react-intlayer/server';

/**
 * @deprecated Use `IntlayerProviderProps` from `next-intlayer/server` instead.
 */
export type IntlayerServerProviderProps = IntlayerServerProviderPropsBase;

/**
 * @deprecated Use `IntlayerProvider` from `next-intlayer/server` instead
 *
 * Mount `IntlayerProvider` once in the locale layout seeds both server and client contexts
 *
 * ```tsx
 * import { IntlayerProvider } from 'next-intlayer/server';
 *
 * const LocaleLayout = async ({ children, params }) => {
 *   const { locale } = await params;
 *
 *   return <IntlayerProvider locale={locale}>{children}</IntlayerProvider>;
 * };
 * ```
 */
export const IntlayerServerProvider = IntlayerServerProviderBase;
