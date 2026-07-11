import type { Component, ParentProps } from 'solid-js';
import { useAnalytics } from './useAnalytics';

/**
 * Runs {@link useAnalytics} and renders its children unchanged. Mounted inside
 * {@link IntlayerProvider} alongside `EditorProvider`.
 */
export const AnalyticsProvider: Component<ParentProps> = ({ children }) => {
  useAnalytics();

  return children;
};
