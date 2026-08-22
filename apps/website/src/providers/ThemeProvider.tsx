import {
  ThemeProvider as DesignSystemThemeProvider,
  useTheme,
} from '@intlayer/design-system/providers';
import type { FC, PropsWithChildren } from 'react';

/**
 * Nonce baked into the `Content-Security-Policy` header at build time. The
 * theme bootstrap is inlined during SSR, so it needs the nonce to survive
 * `script-src-elem`.
 */
const cspNonce = import.meta.env.VITE_CSP_NONCE;

export { useTheme };

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <DesignSystemThemeProvider nonce={cspNonce}>
    {children}
  </DesignSystemThemeProvider>
);
