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
/**
 * Maximum events per network request. `sendBeacon` and `fetch(keepalive)`
 * reject bodies over ~64KB, so large batches are split into multiple sends.
 */
export const MAX_EVENTS_PER_SEND = 200;
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
  /** Records a content exposure (node level). Sampled + deduped per page view. */
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

  // Exposure keys already recorded for the current page view. React (and other
  // frameworks) resolve content nodes on every re-render; without this gate a
  // component re-rendering 60×/s would count 60 exposures per second. The set
  // is cleared on each page view so the recorded semantic is "shown at least
  // once during this page view".
  let seenExposureKeys = new Set<string>();

  const flush = (useBeacon = false): void => {
    const events = buffer.drain();

    // Split into bounded chunks so no single request exceeds transport limits.
    for (let start = 0; start < events.length; start += MAX_EVENTS_PER_SEND) {
      sendEvents(
        endpoint,
        {
          clientId: config.clientId,
          sessionId,
          sdkVersion: SDK_VERSION,
          events: events.slice(start, start + MAX_EVENTS_PER_SEND),
        },
        { useBeacon }
      );
    }
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

    // A new page view starts a fresh exposure window.
    seenExposureKeys = new Set<string>();

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

    const locale = event.locale ?? ambientLocale;
    // Joined with \x01 (never present in content keys) so parts cannot collide.
    const exposureKey = [
      event.dictionaryKey,
      event.keyPath,
      locale,
      event.experimentKey ?? '',
      event.variant ?? '',
    ].join('');

    // Deduplicate within the current page view (see `seenExposureKeys`).
    if (seenExposureKeys.has(exposureKey)) return;
    seenExposureKeys.add(exposureKey);

    enqueue({
      ...event,
      type: 'content_exposure',
      t: Date.now(),
      url: currentUrl(),
      locale,
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

    // Patch history.pushState so client-side route changes emit a page view.
    // `replaceState` is intentionally left untouched: routers use it for
    // same-page URL sync (scroll, params), which is not a navigation.
    const history = window.history;
    const originalPush = history.pushState;

    const patchedPushState = function patchedPush(
      this: History,
      ...args: Parameters<History['pushState']>
    ) {
      const result = originalPush.apply(this, args);
      trackPageView({ reason: 'route_change' });
      return result;
    };
    history.pushState = patchedPushState;

    detachListeners = (): void => {
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('pagehide', onPageHide, { capture: true });
      window.removeEventListener('popstate', onPopState);
      // Only restore if nothing else re-patched pushState after us; restoring
      // blindly would clobber another library's wrapper.
      if (history.pushState === patchedPushState) {
        history.pushState = originalPush;
      }
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
