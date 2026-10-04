import { z } from 'zod/mini';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
} from './defineRoute';
import { type ResponseData, responseDataSchema } from './responseData';

/** Kind of analytics event sent by the SDK. */
export const analyticsEventTypeSchema = z.enum([
  'page_view',
  'content_exposure',
  'conversion',
]);

/** One event as sent by the SDK (batched). */
export const incomingAnalyticsEventSchema = z.looseObject({
  type: analyticsEventTypeSchema,
  /** Client timestamp (epoch ms). */
  t: z.number(),
  locale: z.string(),
  url: z.string(),
  ref: z.optional(z.string()),
  dictionaryKey: z.optional(z.string()),
  keyPath: z.optional(z.string()),
  nodeType: z.optional(z.string()),
  variant: z.optional(z.string()),
  count: z.optional(z.number()),
  experimentKey: z.optional(z.string()),
  goal: z.optional(z.string()),
  value: z.optional(z.number()),
});

/** Time windows of the audience report. */
export const audienceRangeSchema = z.enum([
  '1h',
  '24h',
  '7d',
  '30d',
  '90d',
  '6mo',
  '1y',
  '3y',
]);

export const audienceGranularitySchema = z.enum([
  'minute',
  'hour',
  'day',
  'week',
  'month',
]);

export const audienceSeriesPointSchema = z.object({
  /** ISO bucket start. */
  bucket: z.string(),
  users: z.number(),
  views: z.number(),
});

const audienceBreakdownRowSchema = z.object({
  key: z.string(),
  users: z.number(),
  views: z.number(),
});

export const audienceStatsSchema = z.object({
  usersToday: z.number(),
  usersLast7Days: z.number(),
  usersInRange: z.number(),
  viewsInRange: z.number(),
  range: audienceRangeSchema,
  rangeHours: z.number(),
  granularity: audienceGranularitySchema,
  series: z.array(audienceSeriesPointSchema),
  byLocale: z.array(audienceBreakdownRowSchema),
  byCountry: z.array(audienceBreakdownRowSchema),
  byPage: z.array(audienceBreakdownRowSchema),
});

const analyticsOverviewRowSchema = z.object({
  url: z.string(),
  locale: z.string(),
  views: z.number(),
});

const contentStatRowSchema = z.object({
  dictionaryKey: z.string(),
  keyPath: z.string(),
  locale: z.string(),
  exposures: z.number(),
});

const experimentResultSchema = z.object({
  experimentKey: z.string(),
  variants: z.array(
    z.object({
      variant: z.string(),
      exposures: z.number(),
      conversions: z.number(),
      conversionRate: z.number(),
    })
  ),
  pValue: z.nullable(z.number()),
  winner: z.nullable(z.string()),
});

const pageMetadataSchema = z.object({
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});

/** REST contract of the `/api/analytics` routes. */
export const analyticsContract = defineRouteGroup({
  prefix: '/api/analytics',
  tag: 'Analytics',
  routes: {
    ingestAnalyticsEvents: defineRoute({
      method: 'POST',
      path: '/events',
      summary: 'Ingest SDK events (public browser token, rate limited)',
      schemas: {
        /** Sent as `text/plain` JSON by `navigator.sendBeacon`. */
        body: z.looseObject({
          /** Token from `POST /api/public/token` (`analytics:ingest`). */
          token: z.optional(z.string()),
          /** @deprecated Superseded by `token`; still accepted. */
          clientId: z.optional(z.string()),
          sessionId: z.string(),
          sdkVersion: z.string(),
          events: z.array(incomingAnalyticsEventSchema),
        }),
        response: {
          200: responseDataSchema(z.object({ accepted: z.number() })),
        },
      },
    }),
    getAnalyticsOverview: defineRoute({
      method: 'GET',
      path: '/overview',
      summary: 'Page views per page and locale',
      schemas: {
        response: {
          200: responseDataSchema(z.array(analyticsOverviewRowSchema)),
        },
      },
    }),
    getAnalyticsAudience: defineRoute({
      method: 'GET',
      path: '/audience',
      summary: 'Audience report over a time window',
      schemas: {
        querystring: z.object({
          range: z.optional(z.string()),
          /** Legacy: converted to the closest range. */
          days: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(audienceStatsSchema) },
      },
    }),
    getContentStats: defineRoute({
      method: 'GET',
      path: '/content-stats',
      summary: 'Content exposures per dictionary key path and locale',
      schemas: {
        response: { 200: responseDataSchema(z.array(contentStatRowSchema)) },
      },
    }),
    getExperimentResults: defineRoute({
      method: 'GET',
      path: '/experiments/:experimentKey',
      summary: 'A/B test results of an experiment',
      schemas: {
        params: z.object({ experimentKey: z.string().check(z.minLength(1)) }),
        response: { 200: responseDataSchema(experimentResultSchema) },
      },
    }),
    getPageMetadata: defineRoute({
      method: 'GET',
      path: '/page-metadata',
      summary: 'Title and description of a page of the project',
      schemas: {
        querystring: z.object({ url: z.optional(z.string()) }),
        response: { 200: responseDataSchema(pageMetadataSchema) },
      },
    }),
  },
});

/** Route definitions of the `/api/analytics` group, by name. */
export type AnalyticsRoutes = (typeof analyticsContract)['routes'];

export type AnalyticsEventType = z.output<typeof analyticsEventTypeSchema>;
export type IncomingAnalyticsEvent = z.output<
  typeof incomingAnalyticsEventSchema
>;
export type AudienceRange = z.output<typeof audienceRangeSchema>;
export type AudienceGranularity = z.output<typeof audienceGranularitySchema>;
export type AudienceSeriesPoint = z.output<typeof audienceSeriesPointSchema>;
export type AudienceBreakdownRow = z.output<typeof audienceBreakdownRowSchema>;
export type AudienceStats = z.output<typeof audienceStatsSchema>;
export type AnalyticsOverviewRow = z.output<typeof analyticsOverviewRowSchema>;
export type ContentStatRow = z.output<typeof contentStatRowSchema>;
export type ExperimentResult = z.output<typeof experimentResultSchema>;
export type PageMetadata = z.output<typeof pageMetadataSchema>;

export type IngestAnalyticsBody = RouteBodyInput<
  AnalyticsRoutes['ingestAnalyticsEvents']
>;
export type IngestAnalyticsResult = ResponseData<{ accepted: number }>;
export type GetAnalyticsOverviewResult = ResponseData<AnalyticsOverviewRow[]>;
export type GetContentStatsResult = ResponseData<ContentStatRow[]>;
export type GetExperimentResultsResult = ResponseData<ExperimentResult>;
export type GetAudienceResult = ResponseData<AudienceStats>;
export type GetPageMetadataResult = ResponseData<PageMetadata>;
