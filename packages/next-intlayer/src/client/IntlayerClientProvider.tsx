'use client';

import type { FC } from 'react';

import { IntlayerProvider, type IntlayerProviderProps } from 'react-intlayer';

/**
 * @deprecated Use `IntlayerProviderProps` from `next-intlayer/server` instead.
 */
export type IntlayerClientProviderProps = IntlayerProviderProps;

/**
 * Client boundary mounted by the unified `IntlayerProvider`.
 *
 * Wraps the `IntlayerProvider` from `react-intlayer` so that client components
 * rendered below a Next.js App Router server component receive the locale and
 * the ambient variant through context.
 *
 * @param props - The provider props.
 * @returns The provider component.
 */
export const IntlayerClientProviderBase: FC<IntlayerProviderProps> = (
  props
) => <IntlayerProvider {...props} />;

/**
 * @deprecated Use `IntlayerProvider` from `next-intlayer/server` instead
 *
 * Mount `IntlayerProvider` once in the locale layout seeds both server and client contexts
 *
 * ```tsx
 * import { IntlayerProvider } from 'next-intlayer';
 *
 * const LocaleLayout = async ({ children, params }) => {
 *   const { locale } = await params;
 *
 *   return <IntlayerProvider locale={locale}>{children}</IntlayerProvider>;
 * };
 * ```
 */
export const IntlayerClientProvider = IntlayerClientProviderBase;
