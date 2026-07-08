/**
 * Wire contract shared between the analytics client, `@intlayer/api`, and the
 * backend ingestion endpoint. Keys are intentionally short to keep the batched
 * payload small on the network.
 */

/**
 * The kind of signal an event carries.
 */
export type AnalyticsEventType =
  | 'page_view'
  | 'content_exposure'
  | 'conversion';

/**
 * Fields present on every event regardless of its type.
 */
export type BaseAnalyticsEvent = {
  /** Client timestamp in milliseconds since epoch. */
  t: number;
  /** Current locale being displayed when the event was captured. */
  locale: string;
  /** Pathname of the page (search params excluded by default for privacy). */
  url: string;
};

/**
 * A page/locale level event, emitted at the provider level on first mount,
 * on client-side navigation, and on locale change.
 */
export type PageViewEvent = BaseAnalyticsEvent & {
  type: 'page_view';
  /** Referrer host only (never the full URL) — omitted when unavailable. */
  ref?: string;
  /** Viewport width in CSS pixels. */
  vw?: number;
  /** Viewport height in CSS pixels. */
  vh?: number;
  /** Why the view was recorded (initial load vs. locale switch vs. route change). */
  reason?: 'initial' | 'locale_change' | 'route_change';
};

/**
 * A node level event, emitted when a specific piece of dictionary content is
 * resolved for display. Coalesced by the buffer so repeated exposures of the
 * same node within a flush window collapse into a single event with a `count`.
 */
export type ContentExposureEvent = BaseAnalyticsEvent & {
  type: 'content_exposure';
  /** The dictionary the resolved node belongs to. */
  dictionaryKey: string;
  /** Stable-serialized `KeyPath[]` locating the node inside the dictionary. */
  keyPath: string;
  /** The interpreter node type (translation, enumeration, markdown, …). */
  nodeType?: string;
  /** A/B variant that produced this exposure, when part of an experiment. */
  variant?: string;
  /** Number of coalesced exposures represented by this event. */
  count?: number;
};

/**
 * A conversion event tying a goal to the A/B variant the session was exposed to.
 */
export type ConversionEvent = BaseAnalyticsEvent & {
  type: 'conversion';
  /** The experiment this conversion is attributed to. */
  experimentKey: string;
  /** The variant the session was assigned. */
  variant: string;
  /** The goal that was reached (e.g. `"signup"`, `"cta_click"`). */
  goal: string;
  /** Optional numeric value associated with the conversion (e.g. revenue). */
  value?: number;
};

/**
 * The union of every event the client can emit.
 */
export type AnalyticsEvent =
  | PageViewEvent
  | ContentExposureEvent
  | ConversionEvent;

/**
 * An event as it is handed to the client trackers, before the buffer stamps the
 * shared `BaseAnalyticsEvent` fields (`t`, `url`, and the ambient `locale`).
 */
export type TrackableEvent<E extends AnalyticsEvent = AnalyticsEvent> = Omit<
  E,
  't' | 'url' | 'locale'
> & {
  /** Optional explicit locale; falls back to the client's ambient locale. */
  locale?: string;
};

/**
 * The batched request body sent to `POST /api/analytics/events`.
 */
export type AnalyticsIngestBody = {
  /** Public project key — reused from `editor.clientId`. */
  clientId?: string;
  /** Anonymous, rotating, per-tab session identifier. */
  sessionId: string;
  /** Version of the analytics SDK that produced the batch. */
  sdkVersion: string;
  /** The events collected during the flush window. */
  events: AnalyticsEvent[];
};

/**
 * Resolved runtime options for the analytics client. All values have safe
 * defaults so the client can run with only a `backendURL`.
 */
export type AnalyticsClientConfig = {
  /** Base URL of the Intlayer backend — reused from `editor.backendURL`. */
  backendURL: string;
  /** Public project key — reused from `editor.clientId`. */
  clientId?: string;
  /** Milliseconds between automatic flushes. Defaults to 20000. */
  flushInterval: number;
  /** Maximum number of buffered events before an early flush. Defaults to 500. */
  maxBufferSize: number;
  /** Fraction of content-exposure events to keep, 0..1. Defaults to 1. */
  sampleRate: number;
};
