import type { FC, PropsWithChildren } from 'react';
import { useAnalytics } from './useAnalytics';

/**
 * Runs {@link useAnalytics} and renders its children unchanged. Mounted inside
 * {@link IntlayerProvider} alongside `EditorProvider`.
 */
export const AnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  useAnalytics();

  return children;
};
