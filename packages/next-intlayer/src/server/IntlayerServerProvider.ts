import {
  IntlayerServerProvider as IntlayerServerProviderBase,
  type IntlayerServerProviderProps as IntlayerServerProviderPropsBase,
} from 'react-intlayer/server';

/**
 * @deprecated Use `IntlayerProviderProps` from `next-intlayer/server` instead.
 */
export type IntlayerServerProviderProps = IntlayerServerProviderPropsBase;

/**
 * @deprecated Use `IntlayerProvider` from `next-intlayer/server` instead — and
 * in most trees, no replacement at all. Mounting `IntlayerProvider` once in the
 * locale layout already seeds both the server context and the client provider
 * for every page below it, and the server hooks fall back to the locale carried
 * by the request when the layout is skipped on client-side navigations. This
 * component's only remaining use is a page that must seed the locale itself
 * (statically rendered routes on Next.js < 16); prefer the imperative
 * `setLocale` over wrapping the tree even there.
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
