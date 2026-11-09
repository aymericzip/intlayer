import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, Types } from 'mongoose';

/**
 * The kind of signal an ingested analytics event carries. Mirrors the wire
 * contract emitted by `@intlayer/analytics`.
 */
export type AnalyticsEventType =
  | 'page_view'
  | 'content_exposure'
  | 'conversion';

/**
 * A single event as sent by the client SDK (short keys keep the payload small).
 */
export type IncomingAnalyticsEvent = {
  type: AnalyticsEventType;
  /** Client timestamp (ms since epoch). */
  t: number;
  /** Current locale being displayed. */
  locale: string;
  /** Page pathname. */
  url: string;
  /** Referrer host (page views). */
  ref?: string;
  /** Dictionary key (content exposures). */
  dictionaryKey?: string;
  /** Serialized key path (content exposures). */
  keyPath?: string;
  /** Interpreter node type (content exposures). */
  nodeType?: string;
  /** A/B variant (content exposures + conversions). */
  variant?: string;
  /** Coalesced exposure count. */
  count?: number;
  /** Experiment key (conversions). */
  experimentKey?: string;
  /** Conversion goal name. */
  goal?: string;
  /** Optional numeric conversion value. */
  value?: number;
};

/**
 * A pre-aggregated daily counter. One document per distinct dimension tuple per
 * day and project, incremented on ingestion — keeping reads cheap and avoiding
 * storage of any per-user data.
 */
export interface AnalyticsRollup extends Document {
  id: Types.ObjectId;
  /** Owning project. */
  projectId: Types.ObjectId;
  /** UTC day bucket, `YYYY-MM-DD`. */
  day: string;
  /** Event type this counter aggregates. */
  type: AnalyticsEventType;
  /** Stable hash of every dimension below — the upsert key. */
  dedupKey: string;
  locale?: string;
  url?: string;
  dictionaryKey?: string;
  keyPath?: string;
  nodeType?: string;
  variant?: string;
  experimentKey?: string;
  goal?: string;
  /** Accumulated occurrences. */
  count: number;
  /** Accumulated numeric value (conversions). */
  valueSum: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AnalyticsRollupSchema = RenameId<AnalyticsRollup>;
export type AnalyticsRollupModelType = Model<AnalyticsRollup>;

/**
 * One anonymous visitor for a given day. Unique per project + day + hashed
 * session, so counting documents yields distinct daily visitors without storing
 * any personal data.
 */
export interface AnalyticsVisitor extends Document {
  id: Types.ObjectId;
  projectId: Types.ObjectId;
  /** UTC day bucket, `YYYY-MM-DD`. */
  day: string;
  /** SHA-256 of the client session id — not reversible to a user. */
  sessionHash: string;
  /** ISO country code derived from the ingestion request, `ZZ` when unknown. */
  country: string;
  /** Locale the visitor was first seen using that day. */
  locale?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AnalyticsVisitorSchema = RenameId<AnalyticsVisitor>;
export type AnalyticsVisitorModelType = Model<AnalyticsVisitor>;

/**
 * A short-lived page-view counter at sub-day resolution. The permanent daily
 * rollups cannot be sliced finer than a day, so the "last hour" / "last 24
 * hours" windows read from these instead. Documents expire automatically.
 *
 * Cardinality stays bounded by traffic rather than by site size: a slot can
 * only hold as many `(locale, url)` counters as it received page views.
 */
export interface AnalyticsShortTermRollup extends Document {
  id: Types.ObjectId;
  projectId: Types.ObjectId;
  /** UTC slot start, `YYYY-MM-DDTHH:mm`, aligned to the slot size. */
  slot: string;
  /** Locale the views were served in. */
  locale?: string;
  /** Pathname of the page the views were recorded on. */
  url?: string;
  /** Page views accumulated in this slot. */
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AnalyticsShortTermRollupSchema = RenameId<AnalyticsShortTermRollup>;
export type AnalyticsShortTermRollupModelType = Model<AnalyticsShortTermRollup>;

/**
 * Per-minute activity of one anonymous session on one page, kept for an hour.
 * Backs the `live` audience view: unlike the daily visitor markers it is
 * written on every flush, so it reflects who is active *now*, not who arrived.
 */
export interface AnalyticsLiveActivity extends Document {
  id: Types.ObjectId;
  projectId: Types.ObjectId;
  /** UTC minute, `YYYY-MM-DDTHH:mm`. */
  minute: string;
  /** SHA-256 of the client session id — not reversible to a user. */
  sessionHash: string;
  /** Pathname the session was active on. */
  url: string;
  /** Locale the session was using. */
  locale?: string;
  /** ISO country code derived from the ingestion request, `ZZ` when unknown. */
  country: string;
  /** Page views recorded in this minute (other events only mark activity). */
  views: number;
  /** City reported by the CDN geo headers, when available. */
  city?: string;
  /** City-level latitude (rounded to ~1 km), when available. */
  latitude?: number;
  /** City-level longitude (rounded to ~1 km), when available. */
  longitude?: number;
  /** Earliest event of this session on this page within the minute. */
  firstSeenAt: Date;
  /** Latest event of this session on this page within the minute. */
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type AnalyticsLiveActivitySchema = RenameId<AnalyticsLiveActivity>;

/**
 * Daily count of page-to-page navigations, one per project + day + transition.
 * `fromUrl` is {@link PAGE_FLOW_ENTRANCE} when the page opened a session.
 * Backs the averaged user-flow report.
 */
export interface AnalyticsPageTransition extends Document {
  id: Types.ObjectId;
  projectId: Types.ObjectId;
  /** UTC day bucket, `YYYY-MM-DD`. */
  day: string;
  /** Page navigated from. */
  fromUrl: string;
  /** Page navigated to. */
  toUrl: string;
  /** Navigations counted that day. */
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AnalyticsPageTransitionSchema = RenameId<AnalyticsPageTransition>;

/**
 * Selectable windows for the audience report. `live` is the realtime view:
 * sessions active in the last 30 minutes, bucketed per minute.
 */
export type AudienceRange =
  | 'live'
  | '1h'
  | '24h'
  | '7d'
  | '30d'
  | '90d'
  | '6mo'
  | '1y'
  | '3y';

/**
 * Bucket size of the evolution series. Derived from the requested range so a
 * three-year window does not return a thousand daily points.
 */
export type AudienceGranularity = 'minute' | 'hour' | 'day' | 'week' | 'month';

/** One point of the audience evolution series. */
export type AudienceSeriesPoint = {
  /**
   * UTC start of the bucket. `YYYY-MM-DDTHH:mm` for the `minute` and `hour`
   * granularities, `YYYY-MM-DD` for `day`, `week`, and `month`.
   */
  bucket: string;
  /** Distinct visitors first seen in this bucket. */
  users: number;
  /** Page views in this bucket. */
  views: number;
};

/** A ranked audience breakdown row (by locale, by country, or by page). */
export type AudienceBreakdownRow = {
  /** The locale code, country code, or page pathname. */
  key: string;
  /** Distinct visitors for this bucket. */
  users: number;
  /** Page views for this bucket. */
  views: number;
};

/** The full audience report backing the dashboard overview. */
export type AudienceStats = {
  /** Distinct visitors today (UTC). */
  usersToday: number;
  /** Distinct visitors over the last 7 days. */
  usersLast7Days: number;
  /** Distinct visitors over the requested window. */
  usersInRange: number;
  /** Page views over the requested window. */
  viewsInRange: number;
  /** The window this report covers. */
  range: AudienceRange;
  /** Number of hours covered by the window. */
  rangeHours: number;
  /** Bucket size of `series`. */
  granularity: AudienceGranularity;
  /** Evolution over the requested window, oldest bucket first. */
  series: AudienceSeriesPoint[];
  /** Most-consulted locales, highest first. */
  byLocale: AudienceBreakdownRow[];
  /** Visitor location breakdown, highest first. */
  byCountry: AudienceBreakdownRow[];
  /**
   * Most-consulted pages, highest first. Keyed by pathname, so a localized
   * route contributes one row per locale prefix (`/en/pricing`, `/fr/pricing`).
   * Visitors are not attributed per page — only `views` is populated.
   */
  byPage: AudienceBreakdownRow[];
  /** Active sessions with their location — `live` range only. */
  liveVisitors?: LiveVisitor[];
};

/** A session active in the `live` window, placed on the map. */
export type LiveVisitor = {
  /** Opaque, non-reversible visitor id (prefix of the hashed session). */
  visitorId: string;
  /** ISO country code, `ZZ` when unknown. */
  country: string;
  /** City reported by the CDN, when available. */
  city?: string;
  /** City-level latitude, when available. */
  latitude?: number;
  /** City-level longitude, when available. */
  longitude?: number;
  /** Locale the visitor is browsing in. */
  locale?: string;
  /** Page of the visitor's latest activity. */
  currentUrl: string;
  /** Pages the visitor was active on during the window. */
  pageCount: number;
  /** Page views during the window. */
  views: number;
  /** First activity in the window. */
  firstSeenAt: Date;
  /** Latest activity. */
  lastSeenAt: Date;
  /** Minutes (`YYYY-MM-DDTHH:mm`, UTC) the visitor was active in, oldest first. */
  activeMinutes: string[];
};

/** One step of a live visitor's journey, oldest first. */
export type LiveVisitorFlowStep = {
  url: string;
  locale?: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  views: number;
};

/**
 * Page journey of one live visitor over the `live` window. `visitor` is `null`
 * once the session has left the window.
 */
export type LiveVisitorFlow = {
  visitor: LiveVisitor | null;
  steps: LiveVisitorFlowStep[];
};

/** Aggregated page/locale totals for the dashboard overview. */
export type AnalyticsOverviewRow = {
  url: string;
  locale: string;
  views: number;
};

/** Aggregated per-content exposure totals. */
export type ContentStatRow = {
  dictionaryKey: string;
  keyPath: string;
  locale: string;
  exposures: number;
};

/** Per-variant A/B result with significance. */
export type ExperimentVariantResult = {
  variant: string;
  exposures: number;
  conversions: number;
  conversionRate: number;
};

/** Full A/B experiment result set. */
export type ExperimentResult = {
  experimentKey: string;
  variants: ExperimentVariantResult[];
  /** Two-proportion z-test p-value of the best variant vs. the control. */
  pValue: number | null;
  /** The best-performing variant, when there is enough data to pick one. */
  winner: string | null;
};

/** Page metadata (title and description) extracted from a page URL. */
export type PageMetadata = {
  title?: string;
  description?: string;
};

/** One page of a flow step; `url` is `null` for the "other pages" bucket. */
export type PageFlowNode = {
  url: string | null;
  /** Average navigations reaching this page at this step. */
  value: number;
  /** Part of `value` that left the site from this page (`null` if unknown). */
  exits: number | null;
};

/** Average navigations from a page of one step to a page of the next. */
export type PageFlowLink = {
  /** Step of the source page; the target is on `fromStep + 1`. */
  fromStep: number;
  fromUrl: string | null;
  toUrl: string | null;
  value: number;
};

/** Averaged navigation flow starting from one page. */
export type PageFlow = {
  startUrl: string;
  range: AudienceRange;
  /** Pages per step, the starting page alone on step 0. */
  steps: PageFlowNode[][];
  links: PageFlowLink[];
};
