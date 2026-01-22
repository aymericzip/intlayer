'use client';

import type { FC } from 'react';

import { IntlayerProvider, type IntlayerProviderProps } from 'react-intlayer';

export type IntlayerClientProviderProps = IntlayerProviderProps;

/**
 * Provider for client-side components in Next.js.
 *
 * This component wraps the `IntlayerProvider` from `react-intlayer` and is intended
 * to be used within Next.js App Router client components.
 *
 * @param props - The provider props.
 * @returns The provider component.
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { IntlayerClientProvider } from 'next-intlayer';
 *
 * export default function ClientLayout({ children, locale }) {
 *   return (
 *     <IntlayerClientProvider locale={locale}>
 *       {children}
 *     </IntlayerClientProvider>
 *   );
 * }
 * ```
 */
export const IntlayerClientProvider: FC<IntlayerProviderProps> = (props) => (
  <IntlayerProvider {...props} />
);
