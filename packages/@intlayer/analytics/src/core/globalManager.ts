import type { AnalyticsClient } from './AnalyticsClient';

/**
 * Key on `window` used to share the client singleton across multiple module
 * instances. When bundlers include `@intlayer/analytics` more than once (e.g.
 * a framework package plus the app), each copy has its own module-level
 * variables; storing the client on `window` ensures they all share one buffer
 * and one flush timer.
 */
const CLIENT_KEY = '__intlayer_analytics_client__';

type WindowWithAnalyticsGlobals = typeof window & {
  [CLIENT_KEY]?: AnalyticsClient | null;
};

/**
 * Returns the global analytics client, or `null` in SSR or before init.
 */
export const getGlobalAnalyticsClient = (): AnalyticsClient | null => {
  if (typeof window === 'undefined') return null;
  return (window as WindowWithAnalyticsGlobals)[CLIENT_KEY] ?? null;
};

/**
 * Sets (or clears) the global analytics client singleton.
 *
 * @param client - The client to store globally, or `null` to clear it.
 */
export const setGlobalAnalyticsClient = (
  client: AnalyticsClient | null
): void => {
  if (typeof window === 'undefined') return;
  (window as WindowWithAnalyticsGlobals)[CLIENT_KEY] = client;
};
