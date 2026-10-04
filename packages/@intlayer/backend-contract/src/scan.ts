import { z } from 'zod/mini';
import { dateTimeSchema, paginationQueryShape } from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
  type RouteParams,
  type RouteQuerystring,
} from './defineRoute';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
  type ResponseData,
  responseDataSchema,
} from './responseData';

/**
 * Locale routing strategies detected on a website. Mirrors
 * `@intlayer/engine/scan` (asserted equal there: engine depends on the
 * contract, not the reverse).
 */
export const routingStrategySchema = z.enum([
  'prefix-all',
  'prefix-no-default',
  'search-params',
  'subdomain',
  'domain',
  'no-prefix',
  'unknown',
]);

/** Technology categories of the scan signatures (mirrors engine). */
export const technologyCategorySchema = z.enum([
  'framework',
  'i18n-library',
  'tms',
  'translation-proxy',
  'cms',
]);

/** Where a host scan came from. */
export const hostScanSourceSchema = z.enum([
  'scan',
  'recursive',
  'extension',
  'background',
]);

/** Technology detected on a host. */
export const hostTechnologySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: technologyCategorySchema,
  version: z.optional(z.string()),
});

/** One scan of a host. */
export const hostScanSchema = z.object({
  url: z.string(),
  source: hostScanSourceSchema,
  score: z.optional(z.number()),
  title: z.optional(z.string()),
  technologies: z.array(hostTechnologySchema),
  routingStrategy: z.optional(routingStrategySchema),
  locales: z.optional(z.array(z.string())),
  scannedAt: dateTimeSchema,
});

export const scannedHostSummarySchema = z.object({
  id: z.string(),
  host: z.string(),
  title: z.optional(z.string()),
  technologies: z.array(hostTechnologySchema),
  routingStrategy: z.optional(routingStrategySchema),
  locales: z.optional(z.array(z.string())),
  lastScore: z.optional(z.number()),
  lastScannedAt: dateTimeSchema,
  scanCount: z.number(),
});

export const scannedHostDetailSchema = z.object({
  ...scannedHostSummarySchema.shape,
  scans: z.array(hostScanSchema),
});

/** Usage of a technology across scanned hosts. */
export const technologyUsageSchema = z.object({
  ...hostTechnologySchema.shape,
  hostCount: z.number(),
  lastSeenAt: dateTimeSchema,
});

const recursiveAuditJobSchema = z.looseObject({
  _id: z.string(),
  targetUrl: z.string(),
  userId: z.optional(z.string()),
  status: z.enum([
    'pending',
    'running',
    'paused',
    'cancelled',
    'completed',
    'failed',
  ]),
  progress: z.number(),
  totalPageCount: z.number(),
  completedPageCount: z.number(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

const recursiveAuditPageSchema = z.looseObject({
  _id: z.string(),
  url: z.string(),
  status: z.enum(['pending', 'running', 'completed', 'failed']),
  score: z.optional(z.number()),
  error: z.optional(z.string()),
  results: z.optional(z.array(z.unknown())),
});

export const recursiveAuditStatusSchema = z.object({
  job: recursiveAuditJobSchema,
  pages: z.array(recursiveAuditPageSchema),
});

const urlQuerySchema = z.object({ url: z.string().check(z.minLength(1)) });
const jobIdParamsSchema = z.object({ jobId: z.string().check(z.minLength(1)) });
const successSchema = z.object({ success: z.boolean() });

/** Recursive audit job control routes share the same shape. */
const jobControlRoute = (
  path: `/recursive/:jobId/${string}`,
  summary: string
) =>
  defineRoute({
    method: 'POST',
    path,
    summary,
    schemas: {
      params: jobIdParamsSchema,
      response: { 200: successSchema },
    },
  });

/** REST contract of the `/api/scan` routes (i18n website scanner). */
export const scanContract = defineRouteGroup({
  prefix: '/api/scan',
  tag: 'Scan',
  routes: {
    scan: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'Audit the i18n of a page (server-sent events stream)',
      schemas: {
        querystring: z.object({
          url: z.string().check(z.minLength(1)),
          /** `true` to bypass the one-hour audit cache. */
          refresh: z.optional(z.string()),
        }),
      },
    }),
    getTechnologyUsage: defineRoute({
      method: 'GET',
      path: '/technologies',
      summary: 'Technologies seen across scanned hosts',
      schemas: {
        querystring: z.object({ category: z.optional(z.string()) }),
        response: { 200: responseDataSchema(z.array(technologyUsageSchema)) },
      },
    }),
    getScannedHosts: defineRoute({
      method: 'GET',
      path: '/hosts',
      summary: 'List scanned hosts',
      schemas: {
        querystring: z.object({
          ...paginationQueryShape,
          technologyId: z.optional(z.string()),
          category: z.optional(z.string()),
          search: z.optional(z.string()),
        }),
        response: { 200: paginatedResponseSchema(scannedHostSummarySchema) },
      },
    }),
    getScannedHost: defineRoute({
      method: 'GET',
      path: '/hosts/:host',
      summary: 'Scan history of a host',
      schemas: {
        params: z.object({
          host: z.string().check(z.maxLength(253), z.regex(/^[a-zA-Z0-9.-]+$/)),
        }),
        response: { 200: responseDataSchema(scannedHostDetailSchema) },
      },
    }),
    reportHostDetection: defineRoute({
      method: 'POST',
      path: '/hosts/detections',
      summary: 'Public detection report of the Chrome extension (rate limited)',
      schemas: {
        /** Every field bounded: names and categories are resolved server-side. */
        body: z.strictObject({
          url: z.string().check(z.maxLength(2048), z.regex(/^https?:\/\//)),
          technologies: z
            .array(
              z.strictObject({
                id: z.string().check(z.maxLength(64), z.regex(/^[a-z0-9-]+$/)),
                version: z.optional(z.string().check(z.maxLength(64))),
              })
            )
            .check(z.maxLength(50)),
          routingStrategy: z.optional(routingStrategySchema),
          locales: z.optional(
            z
              .array(
                z
                  .string()
                  .check(
                    z.maxLength(35),
                    z.regex(/^[a-zA-Z]{2,3}([_-][a-zA-Z0-9]{2,8})*$/)
                  )
              )
              .check(z.maxLength(100))
          ),
          title: z.optional(z.string().check(z.maxLength(300))),
        }),
        response: {
          200: responseDataSchema(
            z.object({ isBackgroundScanQueued: z.boolean() })
          ),
        },
      },
    }),
    discoverUrls: defineRoute({
      method: 'GET',
      path: '/recursive/discover',
      summary: 'Discover the crawlable URLs of a website',
      schemas: {
        querystring: urlQuerySchema,
        response: { 200: z.object({ urls: z.array(z.string()) }) },
      },
    }),
    startRecursive: defineRoute({
      method: 'POST',
      path: '/recursive/start',
      summary: 'Start a recursive audit of a website',
      schemas: {
        querystring: urlQuerySchema,
        body: z.optional(z.object({ urls: z.optional(z.array(z.string())) })),
        response: { 200: z.object({ jobId: z.string() }) },
      },
    }),
    getRecursiveStatus: defineRoute({
      method: 'GET',
      path: '/recursive/:jobId',
      summary: 'Progress and page results of a recursive audit',
      schemas: {
        params: jobIdParamsSchema,
        response: { 200: recursiveAuditStatusSchema },
      },
    }),
    cancelRecursive: jobControlRoute(
      '/recursive/:jobId/cancel',
      'Cancel a recursive audit'
    ),
    pauseRecursive: jobControlRoute(
      '/recursive/:jobId/pause',
      'Pause a recursive audit'
    ),
    resumeRecursive: jobControlRoute(
      '/recursive/:jobId/resume',
      'Resume a recursive audit'
    ),
  },
});

/** Route definitions of the `/api/scan` group, by name. */
export type ScanRoutes = (typeof scanContract)['routes'];

export type RoutingStrategy = z.output<typeof routingStrategySchema>;
export type TechnologyCategory = z.output<typeof technologyCategorySchema>;
export type HostScanSource = z.output<typeof hostScanSourceSchema>;
export type HostTechnology = z.output<typeof hostTechnologySchema>;
export type HostScan = z.output<typeof hostScanSchema>;
export type ScannedHostSummary = z.output<typeof scannedHostSummarySchema>;
export type ScannedHostDetail = z.output<typeof scannedHostDetailSchema>;
export type TechnologyUsage = z.output<typeof technologyUsageSchema>;

export type ReportHostDetectionBody = RouteBodyInput<
  ScanRoutes['reportHostDetection']
>;
export type ReportHostDetectionResult = ResponseData<{
  isBackgroundScanQueued: boolean;
}>;
export type GetTechnologyUsageQuery = RouteQuerystring<
  ScanRoutes['getTechnologyUsage']
>;
export type GetTechnologyUsageResult = ResponseData<TechnologyUsage[]>;
export type GetScannedHostsQuery = RouteQuerystring<
  ScanRoutes['getScannedHosts']
>;
export type GetScannedHostsResult = PaginatedResponse<ScannedHostSummary>;
export type GetScannedHostParams = RouteParams<ScanRoutes['getScannedHost']>;
export type GetScannedHostResult = ResponseData<ScannedHostDetail>;
export type DiscoverUrlsResult = { urls: string[] };
export type StartRecursiveAuditResult = { jobId: string };
export type GetRecursiveAuditStatusResult = z.output<
  typeof recursiveAuditStatusSchema
>;

// Scan stream (`GET /api/scan`): one message per audit step
type AuditDetails =
  | null
  | undefined
  | string
  | number
  | boolean
  | AuditDetails[]
  | { [key: string]: AuditDetails };

type UrlAuditCheck =
  | 'url_hasCanonical'
  | 'url_hasLocalizedLinks'
  | 'url_currentLocale'
  | 'url_htmlLang'
  | 'url_htmlDir'
  | 'url_ogLocale'
  | 'url_hreflang'
  | 'url_hreflangReciprocal'
  | 'url_hasXDefault'
  | 'url_allAnchorsLocalized'
  | 'url_hasLangSelector'
  | 'url_unusedBundleContent';

/** Audit check identifier (`url_*` checks are suffixed with the URL). */
export type AuditDataList<Url extends string = string> =
  | `${UrlAuditCheck}${Url}`
  | 'robots_robotsPresent'
  | 'robots_noLocalizedUrlsForgotten'
  | 'sitemap_sitemapPresent'
  | 'sitemap_noLocalizedUrlsForgotten'
  | 'sitemap_hasXDefault'
  | 'sitemap_hasAlternates';

export type AuditData = {
  successDetails?: AuditDetails;
  warningsDetails?: AuditDetails;
  errorsDetails?: AuditDetails;
};

/** Locale routing detected on a page (mirrors engine `RoutingDetection`). */
export type RoutingDetection = {
  strategy: RoutingStrategy;
  confidence: 'high' | 'low';
  locales: string[];
  defaultLocale?: string;
  searchParamName?: string;
  hostLocales?: Record<string, string>;
  urlLocale?: string;
  evidence: string;
};

/** Technology detected on a page (mirrors engine `DetectedTechnology`). */
export type DetectedTechnology = HostTechnology & { evidence: string };

export type DomainData = {
  discoveredUrls: Record<string, string[]>;
  discoveredLocales: string[];
  defaultLocale: string;
  image: string;
  title: string;
  description: string;
  routing: RoutingDetection;
  technologies: DetectedTechnology[];
};

export type AuditEvent = {
  type?: AuditDataList;
  status?: 'started' | 'success' | 'warning' | 'error';
  data?: AuditData;
  score?: number;
  progress?: number;
  message?: string;
  globalError?: string;
  domainData?: Partial<DomainData>;
  /** ISO date, sent first when the result is replayed from the cache. */
  cachedAt?: string;
};
