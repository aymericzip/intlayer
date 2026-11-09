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

/**
 * Time windows of the audience report. `live` covers the sessions active in the
 * last 30 minutes, bucketed per minute.
 */
export const audienceRangeSchema = z.enum([
  'live',
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

/** A session active in the `live` window, placed on the map. */
export const liveVisitorSchema = z.object({
  /** Opaque, non-reversible visitor id (prefix of the hashed session). */
  visitorId: z.string(),
  /** ISO country code, `ZZ` when unknown. */
  country: z.string(),
  /** City reported by the CDN, when available. */
  city: z.optional(z.string()),
  /** City-level latitude (rounded to ~1 km), when available. */
  latitude: z.optional(z.number()),
  /** City-level longitude (rounded to ~1 km), when available. */
  longitude: z.optional(z.number()),
  /** Locale the visitor is browsing in. */
  locale: z.optional(z.string()),
  /** Page of the visitor's latest activity. */
  currentUrl: z.string(),
  /** Pages the visitor was active on during the window. */
  pageCount: z.number(),
  /** Page views during the window. */
  views: z.number(),
  /** ISO date of the visitor's first activity in the window. */
  firstSeenAt: z.string(),
  /** ISO date of the visitor's latest activity. */
  lastSeenAt: z.string(),
  /** Minutes (`YYYY-MM-DDTHH:mm`, UTC) the visitor was active in, oldest first. */
  activeMinutes: z.array(z.string()),
});

/** One step of a live visitor's journey, oldest first. */
export const liveVisitorFlowStepSchema = z.object({
  url: z.string(),
  locale: z.optional(z.string()),
  /** ISO date the visitor reached the page. */
  firstSeenAt: z.string(),
  /** ISO date of the visitor's latest activity on the page. */
  lastSeenAt: z.string(),
  views: z.number(),
});

/**
 * Page journey of one live visitor over the `live` window. `visitor` is `null`
 * once the session has left the window (not an error: it simply went quiet).
 */
export const liveVisitorFlowSchema = z.object({
  visitor: z.nullable(liveVisitorSchema),
  steps: z.array(liveVisitorFlowStepSchema),
});

/**
 * Pseudo-page a session starts from. Used as the flow's starting page, the
 * next step lists the landing pages.
 */
export const PAGE_FLOW_ENTRANCE = '(entrance)';

/** One page of a flow step; `url` is `null` for the "other pages" bucket. */
export const pageFlowNodeSchema = z.object({
  url: z.nullable(z.string()),
  /** Average navigations reaching this page at this step. */
  value: z.number(),
  /** Part of `value` that left the site from this page (`null` if unknown). */
  exits: z.nullable(z.number()),
});

/** Average navigations from a page of one step to a page of the next. */
export const pageFlowLinkSchema = z.object({
  /** Step of the source page; the target is on `fromStep + 1`. */
  fromStep: z.number(),
  fromUrl: z.nullable(z.string()),
  toUrl: z.nullable(z.string()),
  value: z.number(),
});

/** Averaged navigation flow starting from one page. */
export const pageFlowSchema = z.object({
  startUrl: z.string(),
  range: audienceRangeSchema,
  /** Pages per step, the starting page alone on step 0. */
  steps: z.array(z.array(pageFlowNodeSchema)),
  links: z.array(pageFlowLinkSchema),
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
  /** Active sessions with their location — `live` range only. */
  liveVisitors: z.optional(z.array(liveVisitorSchema)),
  /** First UTC day with collected data (`YYYY-MM-DD`), `null` before any. */
  dataSince: z.nullable(z.string()),
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
    getLiveVisitorFlow: defineRoute({
      method: 'GET',
      path: '/audience/live/visitors/:visitorId',
      summary: 'Page journey of a visitor active in the last 30 minutes',
      schemas: {
        params: z.object({
          visitorId: z.string().check(z.regex(/^[a-f0-9]{16}$/)),
        }),
        response: { 200: responseDataSchema(liveVisitorFlowSchema) },
      },
    }),
    getPageFlow: defineRoute({
      method: 'GET',
      path: '/page-flow',
      summary: 'Average page-to-page navigation flow from a starting page',
      schemas: {
        querystring: z.object({
          range: z.optional(z.string()),
          /** Starting page pathname; defaults to `/`. */
          startUrl: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(pageFlowSchema) },
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
export type LiveVisitor = z.output<typeof liveVisitorSchema>;
export type LiveVisitorFlowStep = z.output<typeof liveVisitorFlowStepSchema>;
export type LiveVisitorFlow = z.output<typeof liveVisitorFlowSchema>;
export type PageFlowNode = z.output<typeof pageFlowNodeSchema>;
export type PageFlowLink = z.output<typeof pageFlowLinkSchema>;
export type PageFlow = z.output<typeof pageFlowSchema>;
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
export type GetLiveVisitorFlowResult = ResponseData<LiveVisitorFlow>;
export type GetPageFlowResult = ResponseData<PageFlow>;
export type GetPageMetadataResult = ResponseData<PageMetadata>;
