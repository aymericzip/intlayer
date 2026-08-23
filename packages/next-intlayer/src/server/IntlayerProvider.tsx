import type { FC } from 'react';
import type { IntlayerProviderProps as IntlayerClientProviderProps } from 'react-intlayer';
import {
  IntlayerServerProvider,
  type IntlayerServerProviderProps,
} from 'react-intlayer/server';
import { IntlayerClientProvider } from '../client/IntlayerClientProvider';

export type IntlayerProviderProps = IntlayerClientProviderProps &
  IntlayerServerProviderProps;

/**
 * Unified Intlayer provider for the Next.js App Router.
 *
 * Server component that seeds the request-scoped server context (locale and
 * ambient variant) read by the server hooks, and mounts the client provider so
 * client components receive the same values — one provider for both halves.
 *
 * Mount it once, in the locale layout:
 *
 * ```tsx
 * import { IntlayerProvider } from 'next-intlayer/server';
 *
 * const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
 *   const { locale } = await params;
 *
 *   return (
 *     <IntlayerProvider locale={locale}>
 *       <html lang={locale}>
 *         <body>{children}</body>
 *       </html>
 *     </IntlayerProvider>
 *   );
 * };
 * ```
 *
 * The server context is request-scoped, not tree-scoped: on client-side
 * navigations that only re-render the page segment, the layout — and with it
 * this provider — does not re-run. The server hooks then fall back to the
 * locale carried by the request (the `x-intlayer-locale` header set by the
 * intlayer proxy, then the locale cookie), so content stays correct without a
 * per-page provider. The ambient `variant` has no request-carried fallback:
 * seed it per request with `setVariant` when server components read it outside
 * a full render of this provider.
 */
export const IntlayerProvider: FC<IntlayerProviderProps> = ({
  children,
  locale,
  variant,
  ...clientProps
}) => (
  <IntlayerServerProvider locale={locale} variant={variant}>
    <IntlayerClientProvider locale={locale} variant={variant} {...clientProps}>
      {children}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
