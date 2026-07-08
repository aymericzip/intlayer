import { onIdle } from '../utils/idle';
import { assignVariant } from './abTesting';
import { createEventBuffer, type EventBuffer } from './eventBuffer';
import { isSampledIn } from './sampling';
import { getSessionId } from './session';
import { sendEvents } from './transport';
import type {
  AnalyticsClientConfig,
  AnalyticsEvent,
  ContentExposureEvent,
  ConversionEvent,
  PageViewEvent,
  TrackableEvent,
} from './types';

/**
 * Caller-supplied fields for a page view. Everything is optional — the client
 * fills `url`, `locale`, viewport, and referrer from the environment when omitted.
 */
export type PageViewInput = {
  /** Explicit pathname / screen name (native runtimes have no `location`). */
  url?: string;
  /** Explicit locale; falls back to the client's ambient locale. */
  locale?: string;
  /** Referrer host override. */
  ref?: string;
  /** Viewport width override. */
  vw?: number;
  /** Viewport height override. */
  vh?: number;
  /** Why the view was recorded. */
  reason?: PageViewEvent['reason'];
};

/** Default flush cadence — one network request per 20 seconds. */
export const DEFAULT_FLUSH_INTERVAL = 20_000;
/** Default cap on distinct buffered events before an early flush. */
export const DEFAULT_MAX_BUFFER_SIZE = 500;
/** Default sampling — keep every session. */
export const DEFAULT_SAMPLE_RATE = 1;
/** Identifies the producing SDK in the ingest envelope. */
const SDK_VERSION = 'intlayer-analytics/1';

/**
 * The public surface of the analytics client singleton. Framework bindings hold
 * a reference to this and forward provider/node/conversion signals into it.
 */
export type AnalyticsClient = {
  /** Sets the ambient locale stamped onto subsequent events. */
  setLocale: (locale: string) => void;
  /** Records a page/locale view (provider level). */
  trackPageView: (event?: PageViewInput) => void;
  /** Records a content exposure (node level). Sampled + coalesced. */
  trackContentExposure: (
    event: Omit<TrackableEvent<ContentExposureEvent>, 'type'>
  ) => void;
  /** Records a conversion tied to an experiment variant. */
  trackConversion: (
    event: Omit<TrackableEvent<ConversionEvent>, 'type'>
  ) => void;
  /** Deterministically resolves this session's variant for an experiment. */
  getVariant: (
    experimentKey: string,
    variants: string[],
    weights?: number[]
  ) => string;
  /** Sends the buffered batch now. */
  flush: (useBeacon?: boolean) => void;
  /** Starts the flush loop and lifecycle listeners (idempotent). */
  start: () => void;
  /** Stops timers/listeners and flushes any remaining events. */
  stop: () => void;
};

/**
 * Reads the current page pathname. Search params are intentionally excluded to
 * avoid capturing anything sensitive.
 */
const currentUrl = (): string => {
  if (typeof window === 'undefined' || !window.location) return '';
  return window.location.pathname;
};

/**
 * Reduces the referrer to its host — never the full URL — for privacy.
 */
const referrerHost = (): string | undefined => {
  if (typeof document === 'undefined' || !document.referrer) return undefined;
  try {
    return new URL(document.referrer).host;
  } catch {
    return undefined;
  }
};

/**
 * Creates an analytics client. Prefer {@link initAnalyticsClient} in application
 * code — it manages a shared singleton so there is only ever one flush timer.
 *
 * @param config - Resolved client configuration.
 * @returns A started-on-demand {@link AnalyticsClient}.
 */
export const createAnalyticsClient = (
  config: AnalyticsClientConfig
): AnalyticsClient => {
  const sessionId = getSessionId();
  const sampledIn = isSampledIn(sessionId, config.sampleRate);
  const buffer: EventBuffer = createEventBuffer({ max: config.maxBufferSize });
  const endpoint = `${config.backendURL.replace(/\/$/, '')}/api/analytics/events`;

  let ambientLocale = '';
  let flushTimer: ReturnType<typeof setInterval> | null = null;
  let started = false;
  let detachListeners: (() => void) | null = null;

  const flush = (useBeacon = false): void => {
    const events = buffer.drain();
    if (events.length === 0) return;

    sendEvents(
      endpoint,
      {
        clientId: config.clientId,
        sessionId,
        sdkVersion: SDK_VERSION,
        events,
      },
      { useBeacon }
    );
  };

  /** Pushes an event and triggers an early flush if the buffer is full. */
  const enqueue = (event: AnalyticsEvent): void => {
    const size = buffer.push(event);
    if (size >= config.maxBufferSize) flush();
  };

  const setLocale = (locale: string): void => {
    ambientLocale = locale;
  };

  const trackPageView: AnalyticsClient['trackPageView'] = (event = {}) => {
    if (!sampledIn) return;
    enqueue({
      type: 'page_view',
      t: Date.now(),
      url: event.url ?? currentUrl(),
      locale: event.locale ?? ambientLocale,
      ref: event.ref ?? referrerHost(),
      vw:
        event.vw ??
        (typeof window !== 'undefined' ? window.innerWidth : undefined),
      vh:
        event.vh ??
        (typeof window !== 'undefined' ? window.innerHeight : undefined),
      reason: event.reason ?? 'initial',
    });
  };

  const trackContentExposure: AnalyticsClient['trackContentExposure'] = (
    event
  ) => {
    if (!sampledIn) return;
    enqueue({
      ...event,
      type: 'content_exposure',
      t: Date.now(),
      url: currentUrl(),
      locale: event.locale ?? ambientLocale,
    });
  };

  const trackConversion: AnalyticsClient['trackConversion'] = (event) => {
    // Conversions are never sampled out — they are rare and decisive for A/B.
    enqueue({
      ...event,
      type: 'conversion',
      t: Date.now(),
      url: currentUrl(),
      locale: event.locale ?? ambientLocale,
    });
    // Flush conversions promptly so they are not lost on immediate navigation.
    flush();
  };

  const getVariant: AnalyticsClient['getVariant'] = (
    experimentKey,
    variants,
    weights
  ) => assignVariant(sessionId, experimentKey, variants, weights);

  /** Attaches lifecycle + SPA-navigation listeners without blocking render. */
  const attachListeners = (): void => {
    if (typeof window === 'undefined') return;

    const onHidden = (): void => {
      if (document.visibilityState === 'hidden') flush(true);
    };
    const onPageHide = (): void => flush(true);
    const onPopState = (): void => trackPageView({ reason: 'route_change' });

    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('pagehide', onPageHide, { capture: true });
    window.addEventListener('popstate', onPopState);

    // Patch history so client-side route changes emit a page view.
    const history = window.history;
    const originalPush = history.pushState;
    const originalReplace = history.replaceState;

    history.pushState = function patchedPushState(
      this: History,
      ...args: Parameters<History['pushState']>
    ) {
      const result = originalPush.apply(this, args);
      trackPageView({ reason: 'route_change' });
      return result;
    };
    history.replaceState = function patchedReplaceState(
      this: History,
      ...args: Parameters<History['replaceState']>
    ) {
      return originalReplace.apply(this, args);
    };

    detachListeners = (): void => {
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('pagehide', onPageHide, { capture: true });
      window.removeEventListener('popstate', onPopState);
      history.pushState = originalPush;
      history.replaceState = originalReplace;
    };
  };

  const start = (): void => {
    if (started) return;
    started = true;

    flushTimer = setInterval(flush, config.flushInterval);
    // Some runtimes (Node during SSR) keep the process alive on timers.
    (flushTimer as { unref?: () => void })?.unref?.();

    onIdle(attachListeners);
  };

  const stop = (): void => {
    if (!started) return;
    started = false;

    if (flushTimer) {
      clearInterval(flushTimer);
      flushTimer = null;
    }
    detachListeners?.();
    detachListeners = null;
    flush(true);
  };

  return {
    setLocale,
    trackPageView,
    trackContentExposure,
    trackConversion,
    getVariant,
    flush,
    start,
    stop,
  };
};
