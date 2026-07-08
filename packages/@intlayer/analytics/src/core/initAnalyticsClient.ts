import { editor } from '@intlayer/config/built';
import {
  type AnalyticsClient,
  createAnalyticsClient,
  DEFAULT_FLUSH_INTERVAL,
  DEFAULT_MAX_BUFFER_SIZE,
  DEFAULT_SAMPLE_RATE,
} from './AnalyticsClient';
import {
  getGlobalAnalyticsClient,
  setGlobalAnalyticsClient,
} from './globalManager';

/** Reference count — tracks how many providers have called init. */
let _clientRefCount = 0;

/**
 * Initializes the Intlayer analytics client singleton.
 *
 * Configuration is reused from the existing `editor` config block
 * (`editor.backendURL` for the endpoint, `editor.clientId` for project
 * attribution) — analytics does not introduce its own config schema.
 *
 * Safe to call multiple times: returns the existing client and increments a
 * reference count so nested providers don't stop the client prematurely.
 *
 * @returns The started analytics client singleton.
 */
export const initAnalyticsClient = (): AnalyticsClient => {
  _clientRefCount++;

  const existing = getGlobalAnalyticsClient();
  if (existing) return existing;

  const client = createAnalyticsClient({
    backendURL: editor?.backendURL ?? '',
    clientId: editor?.clientId,
    flushInterval: DEFAULT_FLUSH_INTERVAL,
    maxBufferSize: DEFAULT_MAX_BUFFER_SIZE,
    sampleRate: DEFAULT_SAMPLE_RATE,
  });

  setGlobalAnalyticsClient(client);
  client.start();

  return client;
};

/**
 * Decrements the reference count and stops the global analytics client only
 * when the last provider unmounts (flushing any remaining events).
 */
export const stopAnalyticsClient = (): void => {
  _clientRefCount = Math.max(0, _clientRefCount - 1);
  if (_clientRefCount > 0) return;

  const client = getGlobalAnalyticsClient();
  client?.stop();
  setGlobalAnalyticsClient(null);
};
