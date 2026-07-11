import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createAnalyticsClient,
  DEFAULT_FLUSH_INTERVAL,
  MAX_EVENTS_PER_SEND,
} from './AnalyticsClient';
import { sendEvents } from './transport';
import type { AnalyticsClientConfig, ContentExposureEvent } from './types';

vi.mock('./transport', () => ({
  sendEvents: vi.fn(() => true),
}));

const sendEventsMock = vi.mocked(sendEvents);

const config: AnalyticsClientConfig = {
  backendURL: 'https://back.example.org',
  clientId: 'client-1',
  flushInterval: DEFAULT_FLUSH_INTERVAL,
  maxBufferSize: 500,
  sampleRate: 1,
};

const exposure = (
  overrides: Partial<ContentExposureEvent> = {}
): Omit<ContentExposureEvent, 'type' | 't' | 'url' | 'locale'> & {
  locale?: string;
} => ({
  dictionaryKey: 'hero',
  keyPath: 'title',
  ...overrides,
});

/** Collects every event sent across all `sendEvents` calls. */
const sentEvents = () =>
  sendEventsMock.mock.calls.flatMap(([, body]) => body.events);

describe('createAnalyticsClient', () => {
  beforeEach(() => {
    sendEventsMock.mockClear();
  });

  it('deduplicates repeated exposures of the same node within one page view', () => {
    const client = createAnalyticsClient(config);

    // Simulates a component re-rendering: same node resolved many times.
    for (let render = 0; render < 50; render++) {
      client.trackContentExposure(exposure());
    }
    client.flush();

    const events = sentEvents().filter(
      (event) => event.type === 'content_exposure'
    ) as ContentExposureEvent[];
    expect(events).toHaveLength(1);
    expect(events[0].count).toBe(1);
  });

  it('records the same node again after a new page view', () => {
    const client = createAnalyticsClient(config);

    client.trackContentExposure(exposure());
    client.trackPageView({ url: '/next' });
    client.trackContentExposure(exposure());
    client.flush();

    // Both exposures share the same jsdom URL, so the buffer coalesces them
    // into one event — but the count proves the second page view re-recorded.
    const events = sentEvents().filter(
      (event) => event.type === 'content_exposure'
    ) as ContentExposureEvent[];
    expect(events).toHaveLength(1);
    expect(events[0].count).toBe(2);
  });

  it('keeps exposures with different experiment variants separate', () => {
    const client = createAnalyticsClient(config);

    client.trackContentExposure(
      exposure({ experimentKey: 'hero-test', variant: 'a' })
    );
    client.trackContentExposure(
      exposure({ experimentKey: 'hero-test', variant: 'b' })
    );
    client.flush();

    const events = sentEvents().filter(
      (event) => event.type === 'content_exposure'
    );
    expect(events).toHaveLength(2);
  });

  it('splits large batches into multiple bounded sends', () => {
    const client = createAnalyticsClient({ ...config, maxBufferSize: 10_000 });

    for (let index = 0; index < MAX_EVENTS_PER_SEND + 1; index++) {
      client.trackContentExposure(exposure({ keyPath: `key-${index}` }));
    }
    client.flush();

    expect(sendEventsMock).toHaveBeenCalledTimes(2);
    for (const [, body] of sendEventsMock.mock.calls) {
      expect(body.events.length).toBeLessThanOrEqual(MAX_EVENTS_PER_SEND);
    }
  });

  it('flushes conversions immediately', () => {
    const client = createAnalyticsClient(config);

    client.trackConversion({
      experimentKey: 'hero-test',
      variant: 'a',
      goal: 'cta_click',
    });

    expect(sendEventsMock).toHaveBeenCalledTimes(1);
    expect(sentEvents()[0].type).toBe('conversion');
  });

  it('does not send anything when the buffer is empty', () => {
    const client = createAnalyticsClient(config);
    client.flush();
    expect(sendEventsMock).not.toHaveBeenCalled();
  });
});
