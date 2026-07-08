import type { AnalyticsIngestBody } from './types';

/**
 * Sends a batch of events to the backend. Every path is non-blocking and
 * no-throw — analytics must never break, slow, or delay the host application.
 *
 * Strategy:
 * 1. `navigator.sendBeacon` for the flush-on-hide path — survives page unload
 *    and never blocks navigation.
 * 2. `fetch(..., { keepalive: true })` for interval flushes — survives short
 *    navigations without holding the main thread.
 * 3. Plain `fetch` fallback for runtimes without `keepalive` (older RN/Lynx).
 *
 * @param endpoint - Fully-qualified ingestion URL.
 * @param body - The batched payload.
 * @param options - Transport options.
 * @param options.useBeacon - Prefer `sendBeacon` (used when the page is hiding).
 * @returns `true` when a send was dispatched, `false` otherwise.
 */
export const sendEvents = (
  endpoint: string,
  body: AnalyticsIngestBody,
  { useBeacon = false }: { useBeacon?: boolean } = {}
): boolean => {
  try {
    const payload = JSON.stringify(body);

    if (
      useBeacon &&
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function'
    ) {
      const blob = new Blob([payload], { type: 'application/json' });
      return navigator.sendBeacon(endpoint, blob);
    }

    if (typeof fetch === 'function') {
      // keepalive lets the request outlive a same-tab navigation.
      void fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
        // Analytics is best-effort; never send credentials.
        credentials: 'omit',
        mode: 'cors',
      }).catch(() => {
        /* swallow — best-effort delivery */
      });
      return true;
    }

    return false;
  } catch {
    // JSON serialization or Blob construction failed — drop the batch silently.
    return false;
  }
};
