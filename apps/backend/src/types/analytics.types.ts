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

/** One point of the daily audience evolution series. */
export type AudienceSeriesPoint = {
  /** UTC day bucket, `YYYY-MM-DD`. */
  day: string;
  /** Distinct visitors that day. */
  users: number;
  /** Page views that day. */
  views: number;
};

/** A ranked audience breakdown row (by locale or by country). */
export type AudienceBreakdownRow = {
  /** The locale code or country code. */
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
  usersLast30Days: number;
  /** Page views over the requested window. */
  viewsLast30Days: number;
  /** Number of days covered by the series. */
  rangeDays: number;
  /** Daily evolution over the requested window, oldest first. */
  series: AudienceSeriesPoint[];
  /** Most-consulted locales, highest first. */
  byLocale: AudienceBreakdownRow[];
  /** Visitor location breakdown, highest first. */
  byCountry: AudienceBreakdownRow[];
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
