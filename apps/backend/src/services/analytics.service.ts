import { createHash } from 'node:crypto';
import {
  AnalyticsLiveActivityModel,
  AnalyticsRollupModel,
  AnalyticsShortTermRollupModel,
  AnalyticsVisitorModel,
} from '@schemas/analyticsEvent.schema';
import { ProjectModel } from '@schemas/project.schema';
import { load } from 'cheerio';
import type { AnyBulkWriteOperation, Types } from 'mongoose';
import type {
  AnalyticsLiveActivity,
  AnalyticsLiveActivitySchema,
  AnalyticsOverviewRow,
  AnalyticsRollupSchema,
  AnalyticsShortTermRollupSchema,
  AnalyticsVisitorSchema,
  AudienceBreakdownRow,
  AudienceGranularity,
  AudienceRange,
  AudienceSeriesPoint,
  AudienceStats,
  ContentStatRow,
  ExperimentResult,
  ExperimentVariantResult,
  IncomingAnalyticsEvent,
  LiveVisitor,
  LiveVisitorFlow,
  LiveVisitorFlowStep,
  PageMetadata,
} from '@/types/analytics.types';

/**
 * Context for one ingestion request, used to attribute anonymous visitors.
 */
export type IngestContext = {
  /** Raw client session id (hashed before storage). */
  sessionId?: string;
  /** ISO country code derived from the request, `ZZ` when unknown. */
  country?: string;
  /** City derived from the request's CDN geo headers. */
  city?: string;
  /** City-level latitude derived from the request's CDN geo headers. */
  latitude?: number;
  /** City-level longitude derived from the request's CDN geo headers. */
  longitude?: number;
};

/** One-way hash of a session id so no reversible identifier is stored. */
const hashSession = (sessionId: string): string =>
  createHash('sha256').update(sessionId).digest('hex');

/** How far in the past a client timestamp may claim to be (7 days). */
const MAX_EVENT_AGE_MS = 7 * 24 * 60 * 60 * 1000;
/** How far in the future a client timestamp may claim to be (1 hour of skew). */
const MAX_EVENT_SKEW_MS = 60 * 60 * 1000;
/** Per-field length caps — the endpoint is public, so nothing is trusted. */
const FIELD_LENGTH_LIMITS = {
  url: 512,
  locale: 35,
  ref: 256,
  dictionaryKey: 256,
  keyPath: 512,
  nodeType: 64,
  variant: 128,
  experimentKey: 256,
  goal: 128,
} as const;

const VALID_EVENT_TYPES: ReadonlySet<string> = new Set([
  'page_view',
  'content_exposure',
  'conversion',
]);

/** Returns the value when it is a string, truncated to `maxLength`; else `undefined`. */
const sanitizeString = (
  value: unknown,
  maxLength: number
): string | undefined =>
  typeof value === 'string' ? value.slice(0, maxLength) : undefined;

/**
 * Validates and normalizes one client-supplied event. The ingestion endpoint is
 * public: every field is attacker-controlled, so anything malformed is dropped
 * or clamped rather than trusted (a bad timestamp must not throw and a
 * non-finite `value` must never reach a `$inc`).
 *
 * @param event - The raw event from the request body.
 * @returns The sanitized event, or `null` when the event is not salvageable.
 */
const sanitizeEvent = (
  event: IncomingAnalyticsEvent
): IncomingAnalyticsEvent | null => {
  if (typeof event !== 'object' || event === null) return null;
  if (!VALID_EVENT_TYPES.has(event.type)) return null;

  const now = Date.now();
  const t =
    typeof event.t === 'number' &&
    Number.isFinite(event.t) &&
    event.t > now - MAX_EVENT_AGE_MS &&
    event.t < now + MAX_EVENT_SKEW_MS
      ? event.t
      : now;

  const value =
    typeof event.value === 'number' && Number.isFinite(event.value)
      ? event.value
      : undefined;

  const count =
    typeof event.count === 'number' && Number.isFinite(event.count)
      ? event.count
      : undefined;

  return {
    type: event.type,
    t,
    locale: sanitizeString(event.locale, FIELD_LENGTH_LIMITS.locale) ?? '',
    url: sanitizeString(event.url, FIELD_LENGTH_LIMITS.url) ?? '',
    ref: sanitizeString(event.ref, FIELD_LENGTH_LIMITS.ref),
    dictionaryKey: sanitizeString(
      event.dictionaryKey,
      FIELD_LENGTH_LIMITS.dictionaryKey
    ),
    keyPath: sanitizeString(event.keyPath, FIELD_LENGTH_LIMITS.keyPath),
    nodeType: sanitizeString(event.nodeType, FIELD_LENGTH_LIMITS.nodeType),
    variant: sanitizeString(event.variant, FIELD_LENGTH_LIMITS.variant),
    experimentKey: sanitizeString(
      event.experimentKey,
      FIELD_LENGTH_LIMITS.experimentKey
    ),
    goal: sanitizeString(event.goal, FIELD_LENGTH_LIMITS.goal),
    count,
    value,
  };
};

/** Field separator that will not appear inside content values. */
const DEDUP_SEPARATOR = '';

/**
 * Resolves the owning project for a public client id (`editor.clientId`).
 *
 * @param clientId - The public project key sent by the SDK.
 * @returns The project's ObjectId, or `null` when the key is unknown.
 */
export const resolveProjectIdByClientId = async (
  clientId: string
): Promise<Types.ObjectId | null> => {
  const project = await ProjectModel.findOne({
    'oAuth2Access.clientId': clientId,
  })
    .select('_id')
    .lean();

  return project?._id ?? null;
};

/** A project resolved for an ingest-token exchange. */
export type AnalyticsIngestProject = {
  id: Types.ObjectId;
  /**
   * Origins the project declares as its own, derived from the configuration it
   * pushed to the CMS. Empty when the project never declared one — a native app
   * (React Native, Lynx) has no origin to declare.
   */
  allowedOrigins: string[];
};

/** Reduces a configured URL to its origin, or `null` when it is not a URL. */
const toOrigin = (url: string | undefined): string | null => {
  if (!url) return null;

  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
};

/**
 * Resolves the project behind a public client id, along with the origins it is
 * allowed to send analytics from.
 *
 * @param clientId - The public project key sent by the SDK.
 * @returns The project and its declared origins, or `null` when unknown.
 */
export const resolveIngestProjectByClientId = async (
  clientId: string
): Promise<AnalyticsIngestProject | null> => {
  const project = await ProjectModel.findOne({
    'oAuth2Access.clientId': clientId,
  })
    .select(
      '_id configuration.editor.applicationURL configuration.editor.cmsURL'
    )
    .lean();

  if (!project) return null;

  const editorConfiguration = project.configuration?.editor;

  const allowedOrigins = [
    toOrigin(editorConfiguration?.applicationURL),
    toOrigin(editorConfiguration?.cmsURL),
  ].filter((origin): origin is string => origin !== null);

  return { id: project._id, allowedOrigins };
};

/** UTC day bucket (`YYYY-MM-DD`) for a client timestamp. */
const toDay = (timestamp: number): string =>
  new Date(timestamp).toISOString().slice(0, 10);

/**
 * Width of a short-term page-view slot, in minutes. Twelve slots make up the
 * `1h` series and twelve slots aggregate into each point of the `24h` series.
 */
const SHORT_TERM_SLOT_MINUTES = 5;

/** UTC slot bucket (`YYYY-MM-DDTHH:mm`) for a timestamp, floored to the slot. */
const toSlot = (timestamp: number): string => {
  const date = new Date(timestamp);
  date.setUTCSeconds(0, 0);
  date.setUTCMinutes(
    Math.floor(date.getUTCMinutes() / SHORT_TERM_SLOT_MINUTES) *
      SHORT_TERM_SLOT_MINUTES
  );
  return date.toISOString().slice(0, 16);
};

/** One sub-day page-view counter accumulated while reading an ingest batch. */
type SlotViewCounter = {
  /** UTC slot start the views fall into. */
  slot: string;
  /** Locale the views were served in. */
  locale: string;
  /** Pathname the views were recorded on. */
  url: string;
  /** Views accumulated for this slot + locale + url. */
  views: number;
};

/** Builds the stable per-dimension upsert key for a rollup counter. */
const buildDedupKey = (parts: (string | undefined)[]): string =>
  parts.map((part) => part ?? '').join(DEDUP_SEPARATOR);

/** Length of the `live` audience window, in minutes. */
export const LIVE_WINDOW_MINUTES = 30;

const MINUTE_MS = 60 * 1000;

/** UTC minute bucket (`YYYY-MM-DDTHH:mm`) for a timestamp. */
const toMinute = (timestamp: number): string =>
  new Date(timestamp).toISOString().slice(0, 16);

/** Activity of the flushing session on one page during one minute. */
export type LiveActivityCounter = {
  /** UTC minute, `YYYY-MM-DDTHH:mm`. */
  minute: string;
  /** Pathname the session was active on. */
  url: string;
  /** Locale the session was using. */
  locale?: string;
  /** Page views in that minute; other event types only mark activity. */
  views: number;
  /** Earliest event time on the page within the minute (epoch ms). */
  firstSeenAt: number;
  /** Latest event time on the page within the minute (epoch ms). */
  lastSeenAt: number;
};

/**
 * Folds a flush of sanitized events into per-minute, per-page activity for the
 * `live` view. Any event type marks the session active (a reader scrolling a
 * page still sends exposures); only page views are counted as views. Events
 * older than the live window are skipped, and client clocks running ahead are
 * clamped to `now` so a future minute never shows up.
 *
 * @param events - Sanitized events of one flush.
 * @param now - Server time of the flush (epoch ms).
 * @returns One counter per minute + url + locale.
 */
export const collectLiveActivity = (
  events: IncomingAnalyticsEvent[],
  now: number
): LiveActivityCounter[] => {
  const windowStart = now - LIVE_WINDOW_MINUTES * MINUTE_MS;
  const counters = new Map<string, LiveActivityCounter>();

  for (const event of events) {
    if (!event.url || event.t < windowStart) continue;

    const eventTime = Math.min(event.t, now);
    const minute = toMinute(eventTime);
    const counterKey = buildDedupKey([minute, event.url, event.locale]);
    const views =
      event.type === 'page_view'
        ? Math.max(1, Math.min(event.count ?? 1, 10_000))
        : 0;
    const counter = counters.get(counterKey);

    if (counter) {
      counter.views += views;
      counter.firstSeenAt = Math.min(counter.firstSeenAt, eventTime);
      counter.lastSeenAt = Math.max(counter.lastSeenAt, eventTime);
    } else {
      counters.set(counterKey, {
        minute,
        url: event.url,
        locale: event.locale || undefined,
        views,
        firstSeenAt: eventTime,
        lastSeenAt: eventTime,
      });
    }
  }

  return [...counters.values()];
};

/**
 * Ingests a batch of client events into daily rollups for a project.
 *
 * Every event maps to one counter increment; identical dimensions within (and
 * across) batches collapse onto the same document via an upsert on `dedupKey`.
 * Page views are additionally mirrored into short-lived sub-day counters, which
 * the `1h` / `24h` audience windows read instead of the daily rollups.
 *
 * @param projectId - The resolved owning project.
 * @param events - The events from one client flush.
 * @param context - Session + geo context for anonymous visitor attribution.
 */
export const ingestEvents = async (
  projectId: Types.ObjectId,
  events: IncomingAnalyticsEvent[],
  context: IngestContext = {}
): Promise<void> => {
  const operations: AnyBulkWriteOperation<AnalyticsRollupSchema>[] = [];
  // Distinct (day → locale) markers for this session, to record visitors once.
  const visitorDays = new Map<string, string | undefined>();
  // Page views per slot + locale + url, backing the sub-day audience windows.
  const slotViews = new Map<string, SlotViewCounter>();
  // Sanitized events, replayed into the per-minute live activity afterwards.
  const sanitizedEvents: IncomingAnalyticsEvent[] = [];

  for (const rawEvent of events) {
    const event = sanitizeEvent(rawEvent);
    if (!event) continue;
    sanitizedEvents.push(event);

    const day = toDay(event.t);
    const increment = Math.max(1, Math.min(event.count ?? 1, 10_000));

    // Remember which days this session was active on (page views only, so a
    // background exposure flush doesn't inflate the visitor count).
    if (event.type === 'page_view') {
      visitorDays.set(day, event.locale ?? visitorDays.get(day));

      const slot = toSlot(event.t);
      const slotKey = buildDedupKey([slot, event.locale, event.url]);
      const counter = slotViews.get(slotKey);

      if (counter) {
        counter.views += increment;
      } else {
        slotViews.set(slotKey, {
          slot,
          locale: event.locale,
          url: event.url,
          views: increment,
        });
      }
    }

    let dimensions: Partial<AnalyticsRollupSchema> = {};

    if (event.type === 'page_view') {
      dimensions = { url: event.url, locale: event.locale };
    } else if (event.type === 'content_exposure') {
      if (!event.dictionaryKey) continue;
      dimensions = {
        dictionaryKey: event.dictionaryKey,
        keyPath: event.keyPath,
        locale: event.locale,
        nodeType: event.nodeType,
        experimentKey: event.experimentKey,
        variant: event.variant,
      };
    } else if (event.type === 'conversion') {
      if (!event.experimentKey) continue;
      dimensions = {
        experimentKey: event.experimentKey,
        variant: event.variant,
        goal: event.goal,
        locale: event.locale,
      };
    } else {
      continue;
    }

    const dedupKey = buildDedupKey([
      event.type,
      day,
      dimensions.url,
      dimensions.locale,
      dimensions.dictionaryKey,
      dimensions.keyPath,
      dimensions.nodeType,
      dimensions.variant,
      dimensions.experimentKey,
      dimensions.goal,
    ]);

    operations.push({
      updateOne: {
        filter: { projectId, dedupKey },
        update: {
          $setOnInsert: { projectId, day, type: event.type, ...dimensions },
          $inc: {
            count: increment,
            valueSum: event.type === 'conversion' ? (event.value ?? 0) : 0,
          },
        },
        upsert: true,
      },
    });
  }

  // Record one anonymous visitor marker per active day for this session.
  if (context.sessionId && visitorDays.size > 0) {
    const sessionHash = hashSession(context.sessionId);
    const country = context.country ?? 'ZZ';

    const visitorOperations: AnyBulkWriteOperation<AnalyticsVisitorSchema>[] = [
      ...visitorDays,
    ].map(([day, locale]) => ({
      updateOne: {
        filter: { projectId, day, sessionHash },
        update: {
          $setOnInsert: { projectId, day, sessionHash, country, locale },
        },
        upsert: true,
      },
    }));

    await AnalyticsVisitorModel.bulkWrite(visitorOperations, {
      ordered: false,
    });
  }

  // Mirror page views into the short-lived sub-day counters. These expire on
  // their own TTL and only exist so the `1h` / `24h` windows can be answered.
  if (slotViews.size > 0) {
    const slotOperations: AnyBulkWriteOperation<AnalyticsShortTermRollupSchema>[] =
      [...slotViews.values()].map(({ slot, locale, url, views }) => ({
        updateOne: {
          filter: { projectId, slot, locale, url },
          update: {
            $setOnInsert: { projectId, slot, locale, url },
            $inc: { count: views },
          },
          upsert: true,
        },
      }));

    await AnalyticsShortTermRollupModel.bulkWrite(slotOperations, {
      ordered: false,
    });
  }

  // Per-minute session activity for the `live` view (expires after an hour).
  if (context.sessionId) {
    const liveActivity = collectLiveActivity(sanitizedEvents, Date.now());

    if (liveActivity.length > 0) {
      const sessionHash = hashSession(context.sessionId);
      const { country = 'ZZ', city, latitude, longitude } = context;

      const liveOperations: AnyBulkWriteOperation<AnalyticsLiveActivitySchema>[] =
        liveActivity.map(
          ({ minute, url, locale, views, firstSeenAt, lastSeenAt }) => ({
            updateOne: {
              filter: { projectId, minute, sessionHash, url },
              update: {
                $setOnInsert: {
                  projectId,
                  minute,
                  sessionHash,
                  url,
                  locale,
                  country,
                  city,
                  latitude,
                  longitude,
                },
                $inc: { views },
                $min: { firstSeenAt: new Date(firstSeenAt) },
                $max: { lastSeenAt: new Date(lastSeenAt) },
              },
              upsert: true,
            },
          })
        );

      await AnalyticsLiveActivityModel.bulkWrite(liveOperations, {
        ordered: false,
      });
    }
  }

  if (operations.length === 0) return;

  await AnalyticsRollupModel.bulkWrite(operations, { ordered: false });
};

/**
 * Aggregated page/locale totals for the overview dashboard.
 *
 * @param projectId - The project to report on.
 * @returns Page views grouped by url + locale, highest first.
 */
export const getOverview = async (
  projectId: Types.ObjectId
): Promise<AnalyticsOverviewRow[]> => {
  const rows = await AnalyticsRollupModel.aggregate<{
    _id: { url: string; locale: string };
    views: number;
  }>([
    { $match: { projectId, type: 'page_view' } },
    {
      $group: {
        _id: { url: '$url', locale: '$locale' },
        views: { $sum: '$count' },
      },
    },
    { $sort: { views: -1 } },
    { $limit: 500 },
  ]);

  return rows.map((row) => ({
    url: row._id.url,
    locale: row._id.locale,
    views: row.views,
  }));
};

/**
 * Aggregated per-content exposure totals — "which content is actually shown".
 *
 * @param projectId - The project to report on.
 * @returns Exposures grouped by dictionary key / key path / locale.
 */
export const getContentStats = async (
  projectId: Types.ObjectId
): Promise<ContentStatRow[]> => {
  const rows = await AnalyticsRollupModel.aggregate<{
    _id: { dictionaryKey: string; keyPath: string; locale: string };
    exposures: number;
  }>([
    { $match: { projectId, type: 'content_exposure' } },
    {
      $group: {
        _id: {
          dictionaryKey: '$dictionaryKey',
          keyPath: '$keyPath',
          locale: '$locale',
        },
        exposures: { $sum: '$count' },
      },
    },
    { $sort: { exposures: -1 } },
    { $limit: 1000 },
  ]);

  return rows.map((row) => ({
    dictionaryKey: row._id.dictionaryKey,
    keyPath: row._id.keyPath,
    locale: row._id.locale,
    exposures: row.exposures,
  }));
};

/**
 * Standard normal cumulative distribution function (Abramowitz & Stegun 7.1.26).
 * Used to turn a z-score into a p-value without a stats dependency.
 */
const normalCdf = (z: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const probability =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - probability : probability;
};

/**
 * Two-proportion z-test p-value (two-sided) for a variant vs. the control.
 */
const twoProportionPValue = (
  control: ExperimentVariantResult,
  variant: ExperimentVariantResult
): number | null => {
  if (control.exposures === 0 || variant.exposures === 0) return null;

  const pooled =
    (control.conversions + variant.conversions) /
    (control.exposures + variant.exposures);
  const standardError = Math.sqrt(
    pooled * (1 - pooled) * (1 / control.exposures + 1 / variant.exposures)
  );
  if (standardError === 0) return null;

  const z = (variant.conversionRate - control.conversionRate) / standardError;
  return 2 * (1 - normalCdf(Math.abs(z)));
};

/**
 * Computes A/B results for one experiment: exposures, conversions, conversion
 * rate per variant, plus the winning variant and its significance vs. control.
 *
 * @param projectId - The project to report on.
 * @param experimentKey - The experiment to evaluate.
 * @returns The per-variant results with significance.
 */
export const getExperimentResults = async (
  projectId: Types.ObjectId,
  experimentKey: string
): Promise<ExperimentResult> => {
  const [exposureRows, conversionRows] = await Promise.all([
    AnalyticsRollupModel.aggregate<{ _id: string; total: number }>([
      {
        // Scoped to this experiment — exposures from concurrent experiments
        // sharing variant names must not pollute each other's denominators.
        $match: {
          projectId,
          type: 'content_exposure',
          experimentKey,
          variant: { $ne: null },
        },
      },
      { $group: { _id: '$variant', total: { $sum: '$count' } } },
    ]),
    AnalyticsRollupModel.aggregate<{ _id: string; total: number }>([
      { $match: { projectId, type: 'conversion', experimentKey } },
      { $group: { _id: '$variant', total: { $sum: '$count' } } },
    ]),
  ]);

  const exposureByVariant = new Map(
    exposureRows.map((row) => [row._id, row.total])
  );
  const conversionByVariant = new Map(
    conversionRows.map((row) => [row._id, row.total])
  );

  const variantNames = new Set<string>([
    ...exposureByVariant.keys(),
    ...conversionByVariant.keys(),
  ]);

  const variants: ExperimentVariantResult[] = [...variantNames].map(
    (variant) => {
      const exposures = exposureByVariant.get(variant) ?? 0;
      const conversions = conversionByVariant.get(variant) ?? 0;
      return {
        variant,
        exposures,
        conversions,
        conversionRate: exposures === 0 ? 0 : conversions / exposures,
      };
    }
  );

  // Control = first variant alphabetically for determinism.
  variants.sort((a, b) => a.variant.localeCompare(b.variant));
  const control = variants[0];
  const best = variants.reduce(
    (currentBest, candidate) =>
      candidate.conversionRate > currentBest.conversionRate
        ? candidate
        : currentBest,
    variants[0] ?? {
      variant: '',
      exposures: 0,
      conversions: 0,
      conversionRate: 0,
    }
  );

  const pValue =
    control && best && control.variant !== best.variant
      ? twoProportionPValue(control, best)
      : null;

  const winner = pValue !== null && pValue < 0.05 ? best.variant : null;

  return { experimentKey, variants, pValue, winner };
};

/** UTC day string (`YYYY-MM-DD`) offset by a number of days from today. */
const dayOffset = (days: number): string => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
};

/** Counts distinct visitor sessions for a project since a given day (inclusive). */
const countDistinctVisitors = async (
  projectId: Types.ObjectId,
  sinceDay: string
): Promise<number> => {
  const [result] = await AnalyticsVisitorModel.aggregate<{ total: number }>([
    { $match: { projectId, day: { $gte: sinceDay } } },
    { $group: { _id: '$sessionHash' } },
    { $count: 'total' },
  ]);
  return result?.total ?? 0;
};

/**
 * Maximum rows returned per breakdown. Locales and countries are naturally
 * bounded, but the page dimension is not — a site with dynamic routes can hold
 * thousands of distinct paths, and only the head of that list is readable.
 */
const MAX_BREAKDOWN_ROWS = 250;

/**
 * Merges per-key visitor and view counts into one ranked breakdown.
 *
 * A key missing from either side counts as zero, and empty keys are dropped —
 * an event that carried no locale or no url is not a bucket anyone can act on.
 *
 * @param usersByKey - Distinct visitors per key.
 * @param viewsByKey - Page views per key.
 * @param metric - Which count ranks the rows; the other breaks ties.
 * @returns The ranked rows, capped to {@link MAX_BREAKDOWN_ROWS}.
 */
export const buildBreakdownRows = (
  usersByKey: Map<string, number>,
  viewsByKey: Map<string, number>,
  metric: 'users' | 'views' = 'views'
): AudienceBreakdownRow[] =>
  [...new Set([...usersByKey.keys(), ...viewsByKey.keys()])]
    .filter((key) => Boolean(key))
    .map((key) => ({
      key,
      users: usersByKey.get(key) ?? 0,
      views: viewsByKey.get(key) ?? 0,
    }))
    .sort((rowA, rowB) =>
      metric === 'users'
        ? rowB.users - rowA.users || rowB.views - rowA.views
        : rowB.views - rowA.views || rowB.users - rowA.users
    )
    .slice(0, MAX_BREAKDOWN_ROWS);

/** Window size and series bucketing for every selectable audience range. */
const RANGE_DEFINITIONS: Record<
  AudienceRange,
  { hours: number; granularity: AudienceGranularity }
> = {
  live: { hours: LIVE_WINDOW_MINUTES / 60, granularity: 'minute' },
  '1h': { hours: 1, granularity: 'minute' },
  '24h': { hours: 24, granularity: 'hour' },
  '7d': { hours: 7 * 24, granularity: 'day' },
  '30d': { hours: 30 * 24, granularity: 'day' },
  '90d': { hours: 90 * 24, granularity: 'day' },
  '6mo': { hours: 183 * 24, granularity: 'week' },
  '1y': { hours: 365 * 24, granularity: 'week' },
  '3y': { hours: 1095 * 24, granularity: 'month' },
};

/** The window used when none is requested. */
export const DEFAULT_AUDIENCE_RANGE: AudienceRange = '30d';

/** Narrows an untrusted string to a supported audience range. */
export const isAudienceRange = (value: string): value is AudienceRange =>
  Object.hasOwn(RANGE_DEFINITIONS, value);

/**
 * Maps a legacy `?days=` window onto the closest supported range, so clients
 * predating the named ranges keep working.
 *
 * @param days - The requested window in days.
 * @returns The narrowest range that covers at least `days`.
 */
export const audienceRangeFromDays = (days: number): AudienceRange => {
  const dayRanges: AudienceRange[] = ['7d', '30d', '90d', '6mo', '1y', '3y'];
  const requestedHours = Math.max(1, days) * 24;

  return (
    dayRanges.find(
      (range) => RANGE_DEFINITIONS[range].hours >= requestedHours
    ) ?? '3y'
  );
};

/** UTC date of the Monday starting the ISO week that contains `day`. */
const startOfIsoWeek = (day: string): string => {
  const date = new Date(`${day}T00:00:00Z`);
  // getUTCDay() is Sunday-based; shift so Monday is 0.
  const weekdayIndex = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - weekdayIndex);
  return date.toISOString().slice(0, 10);
};

/**
 * Collapses a daily series into wider buckets so long windows stay plottable —
 * a three-year window is 1095 daily points, which is neither useful on a chart
 * nor cheap to transfer.
 *
 * Users are summed across the days in a bucket, so a weekly point counts
 * visitor-days rather than distinct weekly visitors. The headline
 * `usersInRange` remains a true distinct count.
 *
 * @param daily - The daily points, oldest first.
 * @param granularity - Target bucket size.
 * @returns The bucketed series, oldest first.
 */
export const bucketDailySeries = (
  daily: AudienceSeriesPoint[],
  granularity: AudienceGranularity
): AudienceSeriesPoint[] => {
  if (granularity === 'day') return daily;

  // Insertion order is preserved and `daily` is oldest-first, so the resulting
  // buckets come out in chronological order without a re-sort.
  const buckets = new Map<string, AudienceSeriesPoint>();

  for (const point of daily) {
    const key =
      granularity === 'month'
        ? `${point.bucket.slice(0, 7)}-01`
        : startOfIsoWeek(point.bucket);

    const bucket = buckets.get(key);

    if (bucket) {
      bucket.users += point.users;
      bucket.views += point.views;
    } else {
      buckets.set(key, {
        bucket: key,
        users: point.users,
        views: point.views,
      });
    }
  }

  return [...buckets.values()];
};

/**
 * Audience report for a sub-day window (`1h`, `24h`), read from the short-term
 * page-view counters (which carry the page dimension) and the anonymous
 * visitor markers.
 *
 * Visitors are attributed by first sight (`createdAt`), so a bucket counts
 * visitors that *arrived* in it rather than every session still active — the
 * markers carry no heartbeat to derive the latter from.
 */
const getSubDayAudience = async (
  projectId: Types.ObjectId,
  range: AudienceRange,
  granularity: AudienceGranularity,
  hours: number
): Promise<Omit<AudienceStats, 'usersToday' | 'usersLast7Days'>> => {
  const bucketMinutes = granularity === 'minute' ? SHORT_TERM_SLOT_MINUTES : 60;
  const bucketMs = bucketMinutes * 60 * 1000;

  // Align the window to bucket boundaries so points stay stable between polls,
  // and extend it to the end of the running bucket so live data is included.
  const endMs = Math.ceil(Date.now() / bucketMs) * bucketMs;
  const startMs = endMs - hours * 60 * 60 * 1000;
  const startDate = new Date(startMs);
  const startSlot = toSlot(startMs);

  /**
   * Groups the visitor markers inside the window by a `$group` key expression.
   *
   * @typeParam TKey - Type the key expression evaluates to.
   */
  const groupVisitorsBy = <TKey>(expression: unknown) =>
    AnalyticsVisitorModel.aggregate<{ _id: TKey; users: number }>([
      { $match: { projectId, createdAt: { $gte: startDate } } },
      { $group: { _id: expression, users: { $sum: 1 } } },
    ]);

  const [
    distinctVisitors,
    visitorsByBucket,
    viewsBySlot,
    viewsByLocale,
    viewsByPage,
    visitorsByLocale,
    visitorsByCountry,
  ] = await Promise.all([
    AnalyticsVisitorModel.aggregate<{ total: number }>([
      { $match: { projectId, createdAt: { $gte: startDate } } },
      { $group: { _id: '$sessionHash' } },
      { $count: 'total' },
    ]),
    groupVisitorsBy<number>({
      $subtract: [
        { $toLong: '$createdAt' },
        { $mod: [{ $toLong: '$createdAt' }, bucketMs] },
      ],
    }),
    AnalyticsShortTermRollupModel.aggregate<{ _id: string; views: number }>([
      { $match: { projectId, slot: { $gte: startSlot } } },
      { $group: { _id: '$slot', views: { $sum: '$count' } } },
    ]),
    AnalyticsShortTermRollupModel.aggregate<{ _id: string; views: number }>([
      { $match: { projectId, slot: { $gte: startSlot } } },
      { $group: { _id: '$locale', views: { $sum: '$count' } } },
    ]),
    AnalyticsShortTermRollupModel.aggregate<{ _id: string; views: number }>([
      { $match: { projectId, slot: { $gte: startSlot } } },
      { $group: { _id: '$url', views: { $sum: '$count' } } },
      { $sort: { views: -1 } },
      { $limit: MAX_BREAKDOWN_ROWS },
    ]),
    groupVisitorsBy<string>('$locale'),
    groupVisitorsBy<string>('$country'),
  ]);

  const usersByBucketStart = new Map(
    visitorsByBucket.map((row) => [row._id, row.users])
  );
  // Short-term counters are stored per 5-minute slot; an hourly bucket sums the
  // twelve slots that fall inside it.
  const viewsByBucketStart = new Map<number, number>();
  for (const row of viewsBySlot) {
    const slotMs = new Date(`${row._id}:00.000Z`).getTime();
    if (!Number.isFinite(slotMs) || slotMs < startMs) continue;
    const bucketStart = Math.floor(slotMs / bucketMs) * bucketMs;
    viewsByBucketStart.set(
      bucketStart,
      (viewsByBucketStart.get(bucketStart) ?? 0) + row.views
    );
  }

  const series: AudienceSeriesPoint[] = [];
  for (
    let bucketStart = startMs;
    bucketStart < endMs;
    bucketStart += bucketMs
  ) {
    series.push({
      bucket: new Date(bucketStart).toISOString().slice(0, 16),
      users: usersByBucketStart.get(bucketStart) ?? 0,
      views: viewsByBucketStart.get(bucketStart) ?? 0,
    });
  }

  const byLocale = buildBreakdownRows(
    new Map(visitorsByLocale.map((row) => [row._id, row.users])),
    new Map(viewsByLocale.map((row) => [row._id, row.views]))
  );

  const byCountry = buildBreakdownRows(
    new Map(visitorsByCountry.map((row) => [row._id || 'ZZ', row.users])),
    new Map(),
    'users'
  );

  const byPage = buildBreakdownRows(
    new Map(),
    new Map(viewsByPage.map((row) => [row._id, row.views]))
  );

  return {
    usersInRange: distinctVisitors[0]?.total ?? 0,
    viewsInRange: series.reduce((sum, point) => sum + point.views, 0),
    range,
    rangeHours: hours,
    granularity,
    series,
    byLocale,
    byCountry,
    byPage,
  };
};

/**
 * Audience report for a window of a day or more, read from the permanent daily
 * rollups and visitor markers. The daily series is collapsed to weekly or
 * monthly points for the longer windows.
 */
const getDailyAudience = async (
  projectId: Types.ObjectId,
  range: AudienceRange,
  granularity: AudienceGranularity,
  hours: number
): Promise<Omit<AudienceStats, 'usersToday' | 'usersLast7Days'>> => {
  const days = hours / 24;
  const sinceDay = dayOffset(days - 1);

  const [
    usersInRange,
    visitorsByDay,
    viewsByDay,
    visitorsByLocale,
    viewsByLocale,
    viewsByPage,
    visitorsByCountry,
  ] = await Promise.all([
    countDistinctVisitors(projectId, sinceDay),
    AnalyticsVisitorModel.aggregate<{ _id: string; users: number }>([
      { $match: { projectId, day: { $gte: sinceDay } } },
      { $group: { _id: '$day', users: { $sum: 1 } } },
    ]),
    AnalyticsRollupModel.aggregate<{ _id: string; views: number }>([
      { $match: { projectId, type: 'page_view', day: { $gte: sinceDay } } },
      { $group: { _id: '$day', views: { $sum: '$count' } } },
    ]),
    AnalyticsVisitorModel.aggregate<{ _id: string; users: number }>([
      { $match: { projectId, day: { $gte: sinceDay } } },
      { $group: { _id: '$locale', users: { $sum: 1 } } },
    ]),
    AnalyticsRollupModel.aggregate<{ _id: string; views: number }>([
      { $match: { projectId, type: 'page_view', day: { $gte: sinceDay } } },
      { $group: { _id: '$locale', views: { $sum: '$count' } } },
    ]),
    AnalyticsRollupModel.aggregate<{ _id: string; views: number }>([
      { $match: { projectId, type: 'page_view', day: { $gte: sinceDay } } },
      { $group: { _id: '$url', views: { $sum: '$count' } } },
      { $sort: { views: -1 } },
      { $limit: MAX_BREAKDOWN_ROWS },
    ]),
    AnalyticsVisitorModel.aggregate<{ _id: string; users: number }>([
      { $match: { projectId, day: { $gte: sinceDay } } },
      { $group: { _id: '$country', users: { $sum: 1 } } },
    ]),
  ]);

  // Build the continuous daily series (fill gaps with zeros).
  const usersByDay = new Map(visitorsByDay.map((row) => [row._id, row.users]));
  const viewsByDayMap = new Map(viewsByDay.map((row) => [row._id, row.views]));
  const daily: AudienceSeriesPoint[] = [];
  for (let offset = days - 1; offset >= 0; offset--) {
    const day = dayOffset(offset);
    daily.push({
      bucket: day,
      users: usersByDay.get(day) ?? 0,
      views: viewsByDayMap.get(day) ?? 0,
    });
  }

  // Merge locale users + views into a single ranked breakdown.
  const byLocale = buildBreakdownRows(
    new Map(visitorsByLocale.map((row) => [row._id, row.users])),
    new Map(viewsByLocale.map((row) => [row._id, row.views]))
  );

  const byCountry = buildBreakdownRows(
    new Map(visitorsByCountry.map((row) => [row._id || 'ZZ', row.users])),
    new Map(),
    'users'
  );

  // Visitor markers carry no url, so pages are ranked on views alone.
  const byPage = buildBreakdownRows(
    new Map(),
    new Map(viewsByPage.map((row) => [row._id, row.views]))
  );

  return {
    usersInRange,
    viewsInRange: daily.reduce((sum, point) => sum + point.views, 0),
    range,
    rangeHours: hours,
    granularity,
    series: bucketDailySeries(daily, granularity),
    byLocale,
    byCountry,
    byPage,
  };
};

/**
 * Lays per-minute activity onto a continuous `live` series, filling quiet
 * minutes with zeros so the chart keeps a steady time axis.
 *
 * @param activityByMinute - Distinct sessions and views per UTC minute.
 * @param now - Report time (epoch ms); its running minute is the last point.
 * @returns {@link LIVE_WINDOW_MINUTES} points, oldest first.
 */
export const buildLiveSeries = (
  activityByMinute: Map<string, { users: number; views: number }>,
  now: number
): AudienceSeriesPoint[] => {
  const currentMinuteStart = Math.floor(now / MINUTE_MS) * MINUTE_MS;

  return Array.from({ length: LIVE_WINDOW_MINUTES }, (_, index) => {
    const minute = toMinute(
      currentMinuteStart - (LIVE_WINDOW_MINUTES - 1 - index) * MINUTE_MS
    );
    const activity = activityByMinute.get(minute);

    return {
      bucket: minute,
      users: activity?.users ?? 0,
      views: activity?.views ?? 0,
    };
  });
};

/** Distinct sessions and views grouped under one key, from `$facet`. */
type LiveGroupRow = { _id: string; users: number; views: number };

/** Most visitors placed on the live map, most recently active first. */
const MAX_LIVE_VISITORS = 500;

/** Hex length of the public visitor id (prefix of the session hash). */
const VISITOR_ID_LENGTH = 16;

/** Public, non-reversible visitor id for a hashed session. */
const toVisitorId = (sessionHash: string): string =>
  sessionHash.slice(0, VISITOR_ID_LENGTH);

/** One session's activity aggregated over the live window, from `$facet`. */
type LiveVisitorRow = Omit<LiveVisitor, 'visitorId'> & { _id: string };

/** First live window minute (`YYYY-MM-DDTHH:mm`) for a report at `now`. */
const getLiveWindowStartMinute = (now: number): string =>
  toMinute(
    Math.floor(now / MINUTE_MS) * MINUTE_MS -
      (LIVE_WINDOW_MINUTES - 1) * MINUTE_MS
  );

/** Activity fields read back to rebuild a visitor's journey. */
type LiveActivityRow = Pick<
  AnalyticsLiveActivity,
  | 'url'
  | 'locale'
  | 'country'
  | 'city'
  | 'latitude'
  | 'longitude'
  | 'views'
  | 'firstSeenAt'
  | 'lastSeenAt'
>;

/**
 * Turns a session's per-minute activity into its page journey: rows are
 * ordered by arrival time and consecutive rows on the same page (the same page
 * spanning several minutes) collapse into one step.
 *
 * @param rows - The session's activity rows, in any order.
 * @returns The journey, oldest step first.
 */
export const buildVisitorFlowSteps = (
  rows: LiveActivityRow[]
): LiveVisitorFlowStep[] => {
  const steps: LiveVisitorFlowStep[] = [];
  const orderedRows = [...rows].sort(
    (rowA, rowB) => rowA.firstSeenAt.getTime() - rowB.firstSeenAt.getTime()
  );

  for (const row of orderedRows) {
    const previousStep = steps.at(-1);

    if (previousStep?.url === row.url) {
      previousStep.views += row.views;
      if (row.lastSeenAt > previousStep.lastSeenAt) {
        previousStep.lastSeenAt = row.lastSeenAt;
      }
      continue;
    }

    steps.push({
      url: row.url,
      locale: row.locale,
      firstSeenAt: row.firstSeenAt,
      lastSeenAt: row.lastSeenAt,
      views: row.views,
    });
  }

  return steps;
};

/**
 * Journey of one visitor over the `live` window.
 *
 * @param projectId - The project the visitor belongs to.
 * @param visitorId - The public visitor id from the live report.
 * @returns The visitor and its steps; `visitor` is `null` once it went quiet.
 */
export const getLiveVisitorFlow = async (
  projectId: Types.ObjectId,
  visitorId: string
): Promise<LiveVisitorFlow> => {
  // The route validates the id as 16 hex characters, so it is regex-safe.
  const rows = await AnalyticsLiveActivityModel.find(
    {
      projectId,
      minute: { $gte: getLiveWindowStartMinute(Date.now()) },
      sessionHash: { $regex: `^${visitorId}` },
    },
    {
      url: 1,
      locale: 1,
      country: 1,
      city: 1,
      latitude: 1,
      longitude: 1,
      views: 1,
      firstSeenAt: 1,
      lastSeenAt: 1,
    }
  ).lean<LiveActivityRow[]>();

  const steps = buildVisitorFlowSteps(rows);
  const firstStep = steps[0];
  const lastStep = steps.at(-1);

  if (!firstStep || !lastStep) return { visitor: null, steps: [] };

  const latestRow = rows.reduce((latest, row) =>
    row.lastSeenAt > latest.lastSeenAt ? row : latest
  );

  return {
    visitor: {
      visitorId,
      country: latestRow.country || 'ZZ',
      city: latestRow.city,
      latitude: latestRow.latitude,
      longitude: latestRow.longitude,
      locale: latestRow.locale,
      currentUrl: latestRow.url,
      pageCount: new Set(steps.map((step) => step.url)).size,
      views: steps.reduce((sum, step) => sum + step.views, 0),
      firstSeenAt: firstStep.firstSeenAt,
      lastSeenAt: latestRow.lastSeenAt,
    },
    steps,
  };
};

/**
 * Audience report for the `live` window: sessions active during the last
 * {@link LIVE_WINDOW_MINUTES} minutes, per minute, page, locale and country.
 * Reads the per-minute activity documents, so a session counts in every minute
 * it sent an event, not only the one it arrived in.
 */
const getLiveAudience = async (
  projectId: Types.ObjectId
): Promise<Omit<AudienceStats, 'usersToday' | 'usersLast7Days'>> => {
  const now = Date.now();
  const startMinute = getLiveWindowStartMinute(now);

  /** Groups the window by `key`, counting distinct sessions and summing views. */
  const groupBy = (key: string) => [
    {
      $group: {
        _id: { key, session: '$sessionHash' },
        views: { $sum: '$views' },
      },
    },
    {
      $group: {
        _id: '$_id.key',
        users: { $sum: 1 },
        views: { $sum: '$views' },
      },
    },
  ];

  const [facets] = await AnalyticsLiveActivityModel.aggregate<{
    total: { users: number; views: number }[];
    byMinute: LiveGroupRow[];
    byPage: LiveGroupRow[];
    byLocale: LiveGroupRow[];
    byCountry: LiveGroupRow[];
    visitors: LiveVisitorRow[];
  }>([
    { $match: { projectId, minute: { $gte: startMinute } } },
    {
      $facet: {
        total: [
          { $group: { _id: '$sessionHash', views: { $sum: '$views' } } },
          {
            $group: {
              _id: null,
              users: { $sum: 1 },
              views: { $sum: '$views' },
            },
          },
        ],
        byMinute: groupBy('$minute'),
        byPage: groupBy('$url'),
        byLocale: groupBy('$locale'),
        byCountry: groupBy('$country'),
        visitors: [
          // Oldest first, so `$last` picks each session's latest page / place.
          { $sort: { lastSeenAt: 1 } },
          {
            $group: {
              _id: '$sessionHash',
              country: { $last: '$country' },
              city: { $last: '$city' },
              latitude: { $last: '$latitude' },
              longitude: { $last: '$longitude' },
              locale: { $last: '$locale' },
              currentUrl: { $last: '$url' },
              pages: { $addToSet: '$url' },
              views: { $sum: '$views' },
              firstSeenAt: { $min: '$firstSeenAt' },
              lastSeenAt: { $max: '$lastSeenAt' },
            },
          },
          { $sort: { lastSeenAt: -1 } },
          { $limit: MAX_LIVE_VISITORS },
          { $set: { pageCount: { $size: '$pages' } } },
          { $unset: 'pages' },
        ],
      },
    },
  ]);

  const toUsers = (rows: LiveGroupRow[] = []) =>
    new Map(rows.map((row) => [row._id || '', row.users]));
  const toViews = (rows: LiveGroupRow[] = []) =>
    new Map(rows.map((row) => [row._id || '', row.views]));

  return {
    usersInRange: facets?.total[0]?.users ?? 0,
    viewsInRange: facets?.total[0]?.views ?? 0,
    range: 'live',
    rangeHours: RANGE_DEFINITIONS.live.hours,
    granularity: 'minute',
    series: buildLiveSeries(
      new Map(
        (facets?.byMinute ?? []).map((row) => [
          row._id,
          { users: row.users, views: row.views },
        ])
      ),
      now
    ),
    byLocale: buildBreakdownRows(
      toUsers(facets?.byLocale),
      toViews(facets?.byLocale),
      'users'
    ),
    byCountry: buildBreakdownRows(
      new Map(
        (facets?.byCountry ?? []).map((row) => [row._id || 'ZZ', row.users])
      ),
      new Map(),
      'users'
    ),
    byPage: buildBreakdownRows(
      toUsers(facets?.byPage),
      toViews(facets?.byPage),
      'users'
    ),
    liveVisitors: (facets?.visitors ?? []).map(
      ({ _id: sessionHash, country, ...visitor }) => ({
        ...visitor,
        visitorId: toVisitorId(sessionHash),
        country: country || 'ZZ',
      })
    ),
  };
};

/**
 * Builds the audience report for a project over a rolling window: distinct
 * visitors today / 7d / window, page views, the evolution series, and
 * breakdowns by locale (most-consulted), by country (visitor location), and by
 * page (most-consulted paths).
 *
 * The `live` window reads the per-minute session activity (last hour only).
 * Sub-day windows (`1h`, `24h`) are served from the short-term counters, which
 * only retain about two days; everything longer reads the permanent daily
 * rollups.
 *
 * @param projectId - The project to report on.
 * @param range - The rolling window to report over.
 * @returns The audience statistics.
 */
export const getAudience = async (
  projectId: Types.ObjectId,
  range: AudienceRange = DEFAULT_AUDIENCE_RANGE
): Promise<AudienceStats> => {
  const { hours, granularity } = RANGE_DEFINITIONS[range];
  const isSubDay = granularity === 'minute' || granularity === 'hour';

  const [usersToday, usersLast7Days, windowStats] = await Promise.all([
    AnalyticsVisitorModel.countDocuments({ projectId, day: dayOffset(0) }),
    countDistinctVisitors(projectId, dayOffset(6)),
    range === 'live'
      ? getLiveAudience(projectId)
      : isSubDay
        ? getSubDayAudience(projectId, range, granularity, hours)
        : getDailyAudience(projectId, range, granularity, hours),
  ]);

  return { usersToday, usersLast7Days, ...windowStats };
};

const PAGE_METADATA_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_METADATA_CACHE_SIZE = 500;
const pageMetadataCache = new Map<
  string,
  { data: PageMetadata; timestamp: number }
>();

/**
 * Fetches page metadata (title and meta description) from a target URL.
 * Parses HTML via Cheerio and extracts title/og:title and description/og:description.
 * Caches responses in-memory for 24 hours.
 */
export const getPageMetadata = async (
  targetUrl: string
): Promise<PageMetadata> => {
  const cached = pageMetadataCache.get(targetUrl);
  if (cached && Date.now() - cached.timestamp < PAGE_METADATA_CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const parsedUrl = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { title: '', description: '' };
    }

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; IntlayerBot/1.0; +https://intlayer.org)',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(6000),
      redirect: 'follow',
    });

    if (!response.ok) {
      return { title: '', description: '' };
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (
      contentType &&
      !contentType.includes('text/html') &&
      !contentType.includes('xhtml')
    ) {
      return { title: '', description: '' };
    }

    const html = await response.text();
    const $ = load(html);

    const title =
      $('title').first().text().trim() ||
      $('meta[property="og:title"]').attr('content')?.trim() ||
      $('meta[name="twitter:title"]').attr('content')?.trim() ||
      '';

    const description =
      $('meta[name="description"]').attr('content')?.trim() ||
      $('meta[property="og:description"]').attr('content')?.trim() ||
      $('meta[name="twitter:description"]').attr('content')?.trim() ||
      '';

    const result: PageMetadata = { title, description };

    if (pageMetadataCache.size >= MAX_METADATA_CACHE_SIZE) {
      const firstKey = pageMetadataCache.keys().next().value;
      if (firstKey) pageMetadataCache.delete(firstKey);
    }
    pageMetadataCache.set(targetUrl, { data: result, timestamp: Date.now() });

    return result;
  } catch {
    return { title: '', description: '' };
  }
};
