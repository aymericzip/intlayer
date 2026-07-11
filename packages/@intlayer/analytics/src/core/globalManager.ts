import type { AnalyticsClient } from './AnalyticsClient';

/**
 * Key on `window` used to share the client singleton across multiple module
 * instances. When bundlers include `@intlayer/analytics` more than once (e.g.
 * a framework package plus the app), each copy has its own module-level
 * variables; storing the client on `window` ensures they all share one buffer
 * and one flush timer.
 */
const CLIENT_KEY = '__intlayer_analytics_client__';

/**
 * Key on `window` holding the provider reference count. It lives next to the
 * client (rather than in module scope) for the same reason the client does:
 * duplicated module instances must share one count, otherwise one copy's
 * `stopAnalyticsClient` could stop a client another copy still uses.
 */
const REF_COUNT_KEY = '__intlayer_analytics_ref_count__';

type WindowWithAnalyticsGlobals = typeof window & {
  [CLIENT_KEY]?: AnalyticsClient | null;
  [REF_COUNT_KEY]?: number;
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

/**
 * Increments the shared provider reference count.
 *
 * @returns The count after incrementing (`0` in SSR, where nothing is stored).
 */
export const incrementAnalyticsClientRefCount = (): number => {
  if (typeof window === 'undefined') return 0;
  const globals = window as WindowWithAnalyticsGlobals;
  globals[REF_COUNT_KEY] = (globals[REF_COUNT_KEY] ?? 0) + 1;
  return globals[REF_COUNT_KEY];
};

/**
 * Decrements the shared provider reference count, clamping at zero.
 *
 * @returns The count after decrementing (`0` in SSR, where nothing is stored).
 */
export const decrementAnalyticsClientRefCount = (): number => {
  if (typeof window === 'undefined') return 0;
  const globals = window as WindowWithAnalyticsGlobals;
  globals[REF_COUNT_KEY] = Math.max(0, (globals[REF_COUNT_KEY] ?? 0) - 1);
  return globals[REF_COUNT_KEY];
};
