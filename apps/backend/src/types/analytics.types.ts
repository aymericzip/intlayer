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

/** Selectable rolling windows for the audience report. */
export type AudienceRange =
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
