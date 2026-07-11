import type { ComponentChildren, FunctionComponent } from 'preact';
import { useAnalytics } from './useAnalytics';

/**
 * Runs {@link useAnalytics} and renders its children unchanged. Mounted inside
 * {@link IntlayerProvider} alongside `EditorProvider`.
 */
export const AnalyticsProvider: FunctionComponent<{
  children?: ComponentChildren;
}> = ({ children }) => {
  useAnalytics();

  return <>{children}</>;
};
