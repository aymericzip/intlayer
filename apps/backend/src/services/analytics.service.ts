import { createHash } from 'node:crypto';
import {
  AnalyticsRollupModel,
  AnalyticsVisitorModel,
} from '@schemas/analyticsEvent.schema';
import { ProjectModel } from '@schemas/project.schema';
import type { AnyBulkWriteOperation, Types } from 'mongoose';
import type {
  AnalyticsOverviewRow,
  AnalyticsRollupSchema,
  AnalyticsVisitorSchema,
  AudienceBreakdownRow,
  AudienceSeriesPoint,
  AudienceStats,
  ContentStatRow,
  ExperimentResult,
  ExperimentVariantResult,
  IncomingAnalyticsEvent,
} from '@/types/analytics.types';

/**
 * Context for one ingestion request, used to attribute anonymous visitors.
 */
export type IngestContext = {
  /** Raw client session id (hashed before storage). */
  sessionId?: string;
  /** ISO country code derived from the request, `ZZ` when unknown. */
  country?: string;
};

/** One-way hash of a session id so no reversible identifier is stored. */
const hashSession = (sessionId: string): string =>
  createHash('sha256').update(sessionId).digest('hex');

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

/** UTC day bucket (`YYYY-MM-DD`) for a client timestamp. */
const toDay = (timestamp: number): string =>
  new Date(timestamp).toISOString().slice(0, 10);

/** Builds the stable per-dimension upsert key for a rollup counter. */
const buildDedupKey = (parts: (string | undefined)[]): string =>
  parts.map((part) => part ?? '').join(DEDUP_SEPARATOR);

/**
 * Ingests a batch of client events into daily rollups for a project.
 *
 * Every event maps to one counter increment; identical dimensions within (and
 * across) batches collapse onto the same document via an upsert on `dedupKey`.
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

  for (const event of events) {
    const day = toDay(event.t);
    const increment = Math.max(1, Math.min(event.count ?? 1, 10_000));

    // Remember which days this session was active on (page views only, so a
    // background exposure flush doesn't inflate the visitor count).
    if (event.type === 'page_view') {
      visitorDays.set(day, event.locale ?? visitorDays.get(day));
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
        $match: { projectId, type: 'content_exposure', variant: { $ne: null } },
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
 * Builds the audience report for a project over a rolling window: distinct
 * visitors today / 7d / window, page views, the daily evolution series, and
 * breakdowns by locale (most-consulted) and by country (visitor location).
 *
 * @param projectId - The project to report on.
 * @param rangeDays - Size of the rolling window in days (clamped 1..365).
 * @returns The audience statistics.
 */
export const getAudience = async (
  projectId: Types.ObjectId,
  rangeDays = 30
): Promise<AudienceStats> => {
  const days = Math.max(1, Math.min(rangeDays, 365));
  const today = dayOffset(0);
  const sinceDay = dayOffset(days - 1);
  const since7Day = dayOffset(6);

  const [
    usersToday,
    usersLast7Days,
    usersLast30Days,
    visitorsByDay,
    viewsByDay,
    visitorsByLocale,
    viewsByLocale,
    visitorsByCountry,
  ] = await Promise.all([
    AnalyticsVisitorModel.countDocuments({ projectId, day: today }),
    countDistinctVisitors(projectId, since7Day),
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
    AnalyticsVisitorModel.aggregate<{ _id: string; users: number }>([
      { $match: { projectId, day: { $gte: sinceDay } } },
      { $group: { _id: '$country', users: { $sum: 1 } } },
    ]),
  ]);

  // Build the continuous daily series (fill gaps with zeros).
  const usersByDay = new Map(visitorsByDay.map((row) => [row._id, row.users]));
  const viewsByDayMap = new Map(viewsByDay.map((row) => [row._id, row.views]));
  const series: AudienceSeriesPoint[] = [];
  for (let offset = days - 1; offset >= 0; offset--) {
    const day = dayOffset(offset);
    series.push({
      day,
      users: usersByDay.get(day) ?? 0,
      views: viewsByDayMap.get(day) ?? 0,
    });
  }

  // Merge locale users + views into a single ranked breakdown.
  const viewsByLocaleMap = new Map(
    viewsByLocale.map((row) => [row._id, row.views])
  );
  const localeKeys = new Set<string>([
    ...visitorsByLocale.map((row) => row._id),
    ...viewsByLocale.map((row) => row._id),
  ]);
  const byLocale: AudienceBreakdownRow[] = [...localeKeys]
    .filter((key) => Boolean(key))
    .map((key) => ({
      key,
      users: visitorsByLocale.find((row) => row._id === key)?.users ?? 0,
      views: viewsByLocaleMap.get(key) ?? 0,
    }))
    .sort((a, b) => b.views - a.views || b.users - a.users);

  const byCountry: AudienceBreakdownRow[] = visitorsByCountry
    .map((row) => ({ key: row._id || 'ZZ', users: row.users, views: 0 }))
    .sort((a, b) => b.users - a.users);

  const viewsLast30Days = series.reduce((sum, point) => sum + point.views, 0);

  return {
    usersToday,
    usersLast7Days,
    usersLast30Days,
    viewsLast30Days,
    rangeDays: days,
    series,
    byLocale,
    byCountry,
  };
};
