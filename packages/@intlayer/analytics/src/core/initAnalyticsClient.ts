import { analytics, editor } from '@intlayer/config/built';
import {
  type AnalyticsClient,
  createAnalyticsClient,
  DEFAULT_FLUSH_INTERVAL,
  DEFAULT_MAX_BUFFER_SIZE,
  DEFAULT_SAMPLE_RATE,
} from './AnalyticsClient';
import {
  decrementAnalyticsClientRefCount,
  getGlobalAnalyticsClient,
  incrementAnalyticsClientRefCount,
  setGlobalAnalyticsClient,
} from './globalManager';

/**
 * Initializes the Intlayer analytics client singleton.
 *
 * Behavior comes from the `analytics` config block (`flushInterval`,
 * `sampleRate`); attribution reuses the existing `editor` config
 * (`editor.backendURL` for the endpoint, `editor.clientId` for the project).
 *
 * Safe to call multiple times: returns the existing client and increments a
 * `window`-shared reference count so nested providers (or duplicated module
 * instances) don't stop the client prematurely.
 *
 * @returns The started analytics client singleton.
 */
export const initAnalyticsClient = (): AnalyticsClient => {
  incrementAnalyticsClientRefCount();

  const existing = getGlobalAnalyticsClient();
  if (existing) return existing;

  const client = createAnalyticsClient({
    backendURL: editor?.backendURL ?? '',
    clientId: editor?.clientId,
    flushInterval: analytics?.flushInterval ?? DEFAULT_FLUSH_INTERVAL,
    maxBufferSize: DEFAULT_MAX_BUFFER_SIZE,
    sampleRate: analytics?.sampleRate ?? DEFAULT_SAMPLE_RATE,
  });

  setGlobalAnalyticsClient(client);
  client.start();

  return client;
};

/**
 * Decrements the shared reference count and stops the global analytics client
 * only when the last provider unmounts (flushing any remaining events).
 *
 * Callers must pair each `stopAnalyticsClient` with a prior
 * `initAnalyticsClient` — never call it when init was skipped or cancelled.
 */
export const stopAnalyticsClient = (): void => {
  if (decrementAnalyticsClientRefCount() > 0) return;

  const client = getGlobalAnalyticsClient();
  client?.stop();
  setGlobalAnalyticsClient(null);
};
