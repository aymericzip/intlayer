import { z } from 'zod/mini';

/**
 * Report dimensions. Time dimensions are labelled `YYYY-MM-DD` (`date`),
 * `YYYY-Www` (`week`, ISO week) and `YYYY-MM` (`month`), all in UTC.
 */
export const ANALYTICS_REPORT_DIMENSIONS = [
  'date',
  'week',
  'month',
  'locale',
  'pagePath',
  'country',
  'dictionaryKey',
  'keyPath',
  'contentType',
  'variant',
  'experimentKey',
  'goal',
] as const;

export const ANALYTICS_REPORT_METRICS = [
  'pageViews',
  'activeUsers',
  'entrances',
  'contentExposures',
  'conversions',
  'conversionValue',
] as const;

export type AnalyticsReportDimension =
  (typeof ANALYTICS_REPORT_DIMENSIONS)[number];
export type AnalyticsReportMetric = (typeof ANALYTICS_REPORT_METRICS)[number];

/** Dimensions that bucket time; they cannot be used in dimension filters. */
export const ANALYTICS_TIME_DIMENSIONS = [
  'date',
  'week',
  'month',
] as const satisfies readonly AnalyticsReportDimension[];

const TIME_DIMENSIONS = ANALYTICS_TIME_DIMENSIONS;

/**
 * Dimensions each metric can be broken down by. The data is stored
 * pre-aggregated per event type, so a dimension a metric was not recorded with
 * cannot be applied to it (ex: visitors are not attributed per page).
 */
export const ANALYTICS_METRIC_DIMENSIONS = {
  pageViews: [...TIME_DIMENSIONS, 'locale', 'pagePath'],
  activeUsers: [...TIME_DIMENSIONS, 'locale', 'country'],
  entrances: [...TIME_DIMENSIONS, 'pagePath'],
  contentExposures: [
    ...TIME_DIMENSIONS,
    'locale',
    'dictionaryKey',
    'keyPath',
    'contentType',
    'variant',
    'experimentKey',
  ],
  conversions: [
    ...TIME_DIMENSIONS,
    'locale',
    'variant',
    'experimentKey',
    'goal',
  ],
  conversionValue: [
    ...TIME_DIMENSIONS,
    'locale',
    'variant',
    'experimentKey',
    'goal',
  ],
} as const satisfies Record<
  AnalyticsReportMetric,
  readonly AnalyticsReportDimension[]
>;

export const ANALYTICS_DIMENSION_DESCRIPTIONS: Record<
  AnalyticsReportDimension,
  string
> = {
  date: 'UTC day, `YYYY-MM-DD`.',
  week: 'ISO week, `YYYY-Www` (weeks start on Monday, UTC).',
  month: 'Month, `YYYY-MM` (UTC).',
  locale: 'Locale the content was displayed in (ex: `fr`, `en-GB`).',
  pagePath:
    'Page pathname, including any locale prefix (`/fr/pricing`). For `entrances`, the landing page.',
  country: 'ISO 3166-1 alpha-2 visitor country, `ZZ` when unknown.',
  dictionaryKey: 'Intlayer dictionary key of the displayed content.',
  keyPath: 'Path of the displayed field inside its dictionary.',
  contentType:
    'Intlayer node type of the displayed field (translation, enumeration, markdown…).',
  variant: 'A/B variant shown.',
  experimentKey: 'A/B experiment key.',
  goal: 'Conversion goal name.',
};

export const ANALYTICS_METRIC_DESCRIPTIONS: Record<
  AnalyticsReportMetric,
  string
> = {
  pageViews: 'Page views.',
  activeUsers:
    'Distinct anonymous visitor sessions (not additive across rows: a visitor seen in two locales counts in both). Kept 400 days.',
  entrances: 'Sessions that started on the page (landing pages).',
  contentExposures: 'Times a content field was displayed.',
  conversions: 'Conversion events.',
  conversionValue: 'Sum of the numeric value attached to conversions.',
};

export const ANALYTICS_REALTIME_DIMENSIONS = [
  'minute',
  'pagePath',
  'locale',
  'country',
] as const;

export const ANALYTICS_REALTIME_METRICS = ['activeUsers', 'pageViews'] as const;

export type AnalyticsRealtimeDimension =
  (typeof ANALYTICS_REALTIME_DIMENSIONS)[number];
export type AnalyticsRealtimeMetric =
  (typeof ANALYTICS_REALTIME_METRICS)[number];

/** Retention of the realtime activity, in minutes. */
export const ANALYTICS_REALTIME_MAX_MINUTES = 60;
/** Retention of the distinct visitor markers behind `activeUsers`, in days. */
export const ANALYTICS_ACTIVE_USERS_RETENTION_DAYS = 400;
/** Default and maximum number of rows a report returns. */
export const ANALYTICS_REPORT_DEFAULT_LIMIT = 100;
export const ANALYTICS_REPORT_MAX_LIMIT = 10_000;
/** Maximum date ranges compared in one report. */
export const ANALYTICS_REPORT_MAX_DATE_RANGES = 4;

/**
 * Date of a report range: `YYYY-MM-DD`, `today`, `yesterday` or `NdaysAgo`
 * (ex: `30daysAgo`). Days are UTC.
 */
const relativeDateSchema = z
  .string()
  .check(
    z.regex(
      /^(\d{4}-\d{2}-\d{2}|today|yesterday|\d+daysAgo)$/,
      'Expected YYYY-MM-DD, today, yesterday or NdaysAgo'
    )
  );

export const analyticsDateRangeSchema = z.object({
  startDate: relativeDateSchema,
  endDate: relativeDateSchema,
  /** Label of the range in the rows (`dateRange` column) when comparing. */
  name: z.optional(z.string().check(z.maxLength(64))),
});

const dimensionFilterOperatorSchema = z.enum([
  'exact',
  'contains',
  'beginsWith',
  'endsWith',
  'inList',
]);

export const analyticsDimensionFilterSchema = z.object({
  dimension: z.enum(ANALYTICS_REPORT_DIMENSIONS),
  operator: dimensionFilterOperatorSchema,
  /** Compared value (every operator but `inList`). */
  value: z.optional(z.string().check(z.maxLength(512))),
  /** Accepted values (`inList`). */
  values: z.optional(
    z.array(z.string().check(z.maxLength(512))).check(z.maxLength(100))
  ),
  /** Defaults to `false`. */
  caseSensitive: z.optional(z.boolean()),
  /** Keeps the rows that do NOT match. */
  not: z.optional(z.boolean()),
});

const metricFilterOperatorSchema = z.enum([
  'equal',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
  'between',
]);

export const analyticsMetricFilterSchema = z.object({
  metric: z.enum(ANALYTICS_REPORT_METRICS),
  operator: metricFilterOperatorSchema,
  value: z.number(),
  /** Upper bound (inclusive) of `between`. */
  toValue: z.optional(z.number()),
});

export const analyticsOrderBySchema = z.object({
  /** A requested dimension or metric, or `dateRange`. */
  field: z.string(),
  /** Descending order. Defaults to `true` for metrics, `false` otherwise. */
  desc: z.optional(z.boolean()),
});

export const analyticsReportRequestSchema = z.object({
  dateRanges: z
    .array(analyticsDateRangeSchema)
    .check(z.minLength(1), z.maxLength(ANALYTICS_REPORT_MAX_DATE_RANGES)),
  dimensions: z._default(
    z.array(z.enum(ANALYTICS_REPORT_DIMENSIONS)).check(z.maxLength(4)),
    []
  ),
  metrics: z
    .array(z.enum(ANALYTICS_REPORT_METRICS))
    .check(z.minLength(1), z.maxLength(ANALYTICS_REPORT_METRICS.length)),
  dimensionFilters: z.optional(
    z.array(analyticsDimensionFilterSchema).check(z.maxLength(10))
  ),
  metricFilters: z.optional(
    z.array(analyticsMetricFilterSchema).check(z.maxLength(10))
  ),
  orderBys: z.optional(z.array(analyticsOrderBySchema).check(z.maxLength(4))),
  limit: z.optional(
    z
      .number()
      .check(z.int(), z.minimum(1), z.maximum(ANALYTICS_REPORT_MAX_LIMIT))
  ),
  offset: z.optional(z.number().check(z.int(), z.minimum(0))),
});

export const analyticsRealtimeReportRequestSchema = z.object({
  dimensions: z._default(
    z.array(z.enum(ANALYTICS_REALTIME_DIMENSIONS)).check(z.maxLength(3)),
    []
  ),
  metrics: z
    .array(z.enum(ANALYTICS_REALTIME_METRICS))
    .check(z.minLength(1), z.maxLength(ANALYTICS_REALTIME_METRICS.length)),
  /** Window, in minutes before now. Defaults to 30. */
  minutesAgo: z.optional(
    z
      .number()
      .check(z.int(), z.minimum(1), z.maximum(ANALYTICS_REALTIME_MAX_MINUTES))
  ),
  dimensionFilters: z.optional(
    z
      .array(
        z.object({
          dimension: z.enum(ANALYTICS_REALTIME_DIMENSIONS),
          operator: dimensionFilterOperatorSchema,
          value: z.optional(z.string().check(z.maxLength(512))),
          values: z.optional(
            z.array(z.string().check(z.maxLength(512))).check(z.maxLength(100))
          ),
          caseSensitive: z.optional(z.boolean()),
          not: z.optional(z.boolean()),
        })
      )
      .check(z.maxLength(10))
  ),
  limit: z.optional(
    z
      .number()
      .check(z.int(), z.minimum(1), z.maximum(ANALYTICS_REPORT_MAX_LIMIT))
  ),
});

/** A report row: dimension values (strings) and metric values (numbers). */
export const analyticsReportRowSchema = z.record(
  z.string(),
  z.union([z.string(), z.number()])
);

export const analyticsReportSchema = z.object({
  dimensions: z.array(z.string()),
  metrics: z.array(z.string()),
  /** Resolved ranges (absolute UTC days), in request order. */
  dateRanges: z.array(
    z.object({ name: z.string(), startDate: z.string(), endDate: z.string() })
  ),
  rows: z.array(analyticsReportRowSchema),
  /** Rows matching the filters, before `offset` / `limit`. */
  rowCount: z.number(),
  /** Per date range totals, ignoring `metricFilters`. */
  totals: z.array(analyticsReportRowSchema),
  metadata: z.object({
    timeZone: z.literal('UTC'),
    /** First UTC day with collected data, `null` before any. */
    dataSince: z.nullable(z.string()),
    /** Rows were left out by `limit` / `offset`. */
    truncated: z.boolean(),
    /** Caveats the reader should know about (retention, sampling…). */
    warnings: z.array(z.string()),
  }),
});

export const analyticsSchemaInfoSchema = z.object({
  timeZone: z.literal('UTC'),
  dataSince: z.nullable(z.string()),
  /** Locales configured on the project. */
  locales: z.array(z.string()),
  retention: z.object({
    activeUsersDays: z.number(),
    realtimeMinutes: z.number(),
  }),
  dimensions: z.array(z.object({ name: z.string(), description: z.string() })),
  metrics: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      compatibleDimensions: z.array(z.string()),
    })
  ),
  realtime: z.object({
    dimensions: z.array(z.string()),
    metrics: z.array(z.string()),
  }),
  /** Experiments with collected data, with the goals converted on. */
  experiments: z.array(
    z.object({
      experimentKey: z.string(),
      variants: z.array(z.string()),
      goals: z.array(z.string()),
      firstSeen: z.string(),
    })
  ),
});

export const ANALYTICS_ANNOTATION_TYPES = [
  'dictionary_created',
  'content_version_created',
  'dictionary_updated',
  'source_synced',
  'locale_first_traffic',
  'experiment_started',
] as const;

export const analyticsAnnotationSchema = z.object({
  /** ISO date-time, or the UTC day for traffic-derived annotations. */
  date: z.string(),
  type: z.enum(ANALYTICS_ANNOTATION_TYPES),
  title: z.string(),
  dictionaryKey: z.optional(z.string()),
  locale: z.optional(z.string()),
  experimentKey: z.optional(z.string()),
  /** Link to the commit / pull request (`source_synced`). */
  url: z.optional(z.string()),
});

export const analyticsAnnotationsQuerySchema = z.object({
  /** `YYYY-MM-DD`, `today`, `yesterday` or `NdaysAgo`. Defaults to 90daysAgo. */
  startDate: z.optional(relativeDateSchema),
  endDate: z.optional(relativeDateSchema),
  types: z.optional(z.string()),
  limit: z.optional(z.string()),
});

export type AnalyticsDateRange = z.output<typeof analyticsDateRangeSchema>;
export type AnalyticsDimensionFilter = z.output<
  typeof analyticsDimensionFilterSchema
>;
export type AnalyticsMetricFilter = z.output<
  typeof analyticsMetricFilterSchema
>;
export type AnalyticsOrderBy = z.output<typeof analyticsOrderBySchema>;
export type AnalyticsReportRequest = z.input<
  typeof analyticsReportRequestSchema
>;
export type AnalyticsRealtimeReportRequest = z.input<
  typeof analyticsRealtimeReportRequestSchema
>;
export type AnalyticsReportRow = z.output<typeof analyticsReportRowSchema>;
export type AnalyticsReport = z.output<typeof analyticsReportSchema>;
export type AnalyticsSchemaInfo = z.output<typeof analyticsSchemaInfoSchema>;
export type AnalyticsAnnotationType =
  (typeof ANALYTICS_ANNOTATION_TYPES)[number];
export type AnalyticsAnnotation = z.output<typeof analyticsAnnotationSchema>;
export type AnalyticsAnnotationsQuery = z.output<
  typeof analyticsAnnotationsQuerySchema
>;
