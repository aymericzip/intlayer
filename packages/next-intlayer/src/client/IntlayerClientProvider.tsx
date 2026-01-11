'use client';

import type { FC, PropsWithChildren } from 'react';
import {
  IntlayerClientContext,
  IntlayerProvider,
  type IntlayerProviderProps,
  useIntlayerContext,
} from 'react-intlayer';
import { useLocale } from './useLocale';

export type IntlayerClientProviderProps = IntlayerProviderProps;

/**
 * A wrapper component that bridges the Next.js routing logic (from useLocale)
 * back into the Intlayer context.
 * * This ensures that any component using useIntlayer() or useIntlayerContext()
 * deep in the tree will still trigger Next.js navigation when calling setLocale.
 */
const IntlayerRouterBridge: FC<PropsWithChildren> = ({ children }) => {
  // Get the base context (state, storage, etc.)
  const context = useIntlayerContext();

  // Get the enhanced setLocale (routing + state) from the next-intlayer hook
  //    This works now because we are INSIDE the IntlayerProvider
  const { setLocale } = useLocale();

  // Re-provide the context with the enhanced setLocale
  return (
    <IntlayerClientContext.Provider value={{ ...context, setLocale }}>
      {children}
    </IntlayerClientContext.Provider>
  );
};

export const IntlayerClientProvider: FC<IntlayerProviderProps> = ({
  children,
  ...props
}) => (
  <IntlayerProvider {...props}>
    <IntlayerRouterBridge>{children}</IntlayerRouterBridge>
  </IntlayerProvider>
);
