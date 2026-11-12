import {
  ANALYTICS_ANNOTATION_TYPES,
  ANALYTICS_METRIC_DIMENSIONS,
  ANALYTICS_REALTIME_DIMENSIONS,
  ANALYTICS_REALTIME_MAX_MINUTES,
  ANALYTICS_REALTIME_METRICS,
  ANALYTICS_REPORT_DIMENSIONS,
  ANALYTICS_REPORT_MAX_DATE_RANGES,
  ANALYTICS_REPORT_MAX_LIMIT,
  ANALYTICS_REPORT_METRICS,
  analyticsDateRangeSchema,
  analyticsDimensionFilterSchema,
  analyticsMetricFilterSchema,
  analyticsOrderBySchema,
} from '@intlayer/backend-contract/analytics';
import { z } from 'zod/mini';
import { authSchema, fail } from './api';
import { type APIToolsOptions, getAuthenticatedAPI } from './apiAuth';
import type { McpServer } from './docs';

type LoadAnalyticsTools = (
  server: McpServer,
  options?: APIToolsOptions
) => void;

const READ_ONLY = { readOnlyHint: true, openWorldHint: false } as const;

/** Compact JSON: reports can be long, indentation only costs tokens. */
const okCompact = (data: unknown) => ({
  content: [{ type: 'text' as const, text: JSON.stringify(data) }],
});

/** `metric: dimension, …` lines, generated so they never drift. */
export const COMPATIBILITY_TABLE: string = Object.entries(
  ANALYTICS_METRIC_DIMENSIONS
)
  .map(([metric, dimensions]) => `- ${metric}: ${dimensions.join(', ')}`)
  .join('\n');

/** Attaches a JSON-schema description to an input field. */
const describe = <Schema extends z.ZodMiniType>(
  schema: Schema,
  description: string
): Schema => {
  z.globalRegistry.add(schema as z.ZodMiniType, { description });

  return schema;
};

const RUN_REPORT_DESCRIPTION = `Aggregated analytics report of the Intlayer project: metrics broken down by dimensions over 1 to ${ANALYTICS_REPORT_MAX_DATE_RANGES} date ranges (all UTC). The main analytics tool: start here for traffic, locales, pages, content exposure and conversions.

Use instead:
- intlayer-analytics-run-realtime-report for the last ${ANALYTICS_REALTIME_MAX_MINUTES} minutes.
- intlayer-analytics-experiment for A/B significance (p-value, winner).
- intlayer-analytics-page-flow for navigation paths between pages.
- intlayer-analytics-list-annotations to explain a change (content edits, releases, new locales).

Each metric can only be broken down or filtered by these dimensions:
${COMPATIBILITY_TABLE}
Mixing metrics restricts the request to the dimensions they share.

Examples:
- Locales this month vs last: {"dateRanges":[{"startDate":"30daysAgo","endDate":"today","name":"current"},{"startDate":"60daysAgo","endDate":"31daysAgo","name":"previous"}],"dimensions":["locale"],"metrics":["pageViews","activeUsers"]}
- Weekly French blog traffic: {"dateRanges":[{"startDate":"90daysAgo","endDate":"today"}],"dimensions":["week"],"metrics":["pageViews"],"dimensionFilters":[{"dimension":"pagePath","operator":"beginsWith","value":"/fr/blog"}]}
- Most displayed fields of a dictionary: {"dateRanges":[{"startDate":"30daysAgo","endDate":"today"}],"dimensions":["keyPath","locale"],"metrics":["contentExposures"],"dimensionFilters":[{"dimension":"dictionaryKey","operator":"exact","value":"home-page"}],"limit":20}

Rows hold dimension values (missing: "(not set)") and metric values; with several date ranges a "dateRange" column is added. Read metadata.warnings. activeUsers is a distinct count: use totals, not the sum of rows.`;

/**
 * Registers the analytics tools for the project of the access key. They need
 * the `analytics:read` grant and only ever expose aggregated data.
 */
export const loadAnalyticsTools: LoadAnalyticsTools = (
  server,
  options = {}
) => {
  const getAPI = (clientId?: string, clientSecret?: string) =>
    getAuthenticatedAPI({ clientId, clientSecret }, options);

  server.registerTool(
    'intlayer-analytics-get-schema',
    {
      title: 'Analytics Schema',
      description:
        "Lists what the analytics reports can answer for the project: dimensions and metrics with their compatibility, data retention, first day with data, the project's locales, and its A/B experiments (variants, goals). Call it once before building non-trivial reports.",
      inputSchema: { ...authSchema },
      annotations: READ_ONLY,
    },
    async ({ clientId, clientSecret }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.analytics.getSchema();

        return okCompact(result.data ?? result);
      } catch (error) {
        return fail('Get analytics schema', error);
      }
    }
  );

  server.registerTool(
    'intlayer-analytics-run-report',
    {
      title: 'Run Analytics Report',
      description: RUN_REPORT_DESCRIPTION,
      inputSchema: {
        ...authSchema,
        dateRanges: describe(
          z.array(analyticsDateRangeSchema),
          'Date ranges. Dates: YYYY-MM-DD, today, yesterday or NdaysAgo. Name them when comparing.'
        ),
        dimensions: describe(
          z.optional(z.array(z.enum(ANALYTICS_REPORT_DIMENSIONS))),
          'Up to 4 dimensions. date = YYYY-MM-DD, week = YYYY-Www (ISO), month = YYYY-MM.'
        ),
        metrics: describe(
          z.array(z.enum(ANALYTICS_REPORT_METRICS)),
          'Metrics to compute.'
        ),
        dimensionFilters: describe(
          z.optional(z.array(analyticsDimensionFilterSchema)),
          'AND-combined filters. Operators: exact, contains, beginsWith, endsWith (use "value"), inList (use "values"). Case-insensitive unless caseSensitive; "not" inverts. Time dimensions cannot be filtered: use dateRanges.'
        ),
        metricFilters: describe(
          z.optional(z.array(analyticsMetricFilterSchema)),
          'AND-combined filters on requested metrics: equal, greaterThan, greaterThanOrEqual, lessThan, lessThanOrEqual, between (value..toValue).'
        ),
        orderBys: describe(
          z.optional(z.array(analyticsOrderBySchema)),
          'Sort fields (requested dimensions, metrics, or dateRange). Default: time ascending, then the first metric descending.'
        ),
        limit: describe(
          z.optional(z.number()),
          `Rows to return (default 100, max ${ANALYTICS_REPORT_MAX_LIMIT}).`
        ),
        offset: describe(z.optional(z.number()), 'Rows to skip, for paging.'),
      },
      annotations: READ_ONLY,
    },
    async ({ clientId, clientSecret, ...report }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.analytics.runReport(report);

        return okCompact(result.data ?? result);
      } catch (error) {
        return fail('Run analytics report', error);
      }
    }
  );

  server.registerTool(
    'intlayer-analytics-run-realtime-report',
    {
      title: 'Run Realtime Analytics Report',
      description: `Activity of the last minutes (max ${ANALYTICS_REALTIME_MAX_MINUTES}, default 30): active visitors and page views, optionally by ${ANALYTICS_REALTIME_DIMENSIONS.join(', ')} (minute = YYYY-MM-DDTHH:mm, UTC). Aggregated only. Example: {"dimensions":["pagePath"],"metrics":["activeUsers","pageViews"],"minutesAgo":5}`,
      inputSchema: {
        ...authSchema,
        dimensions: describe(
          z.optional(z.array(z.enum(ANALYTICS_REALTIME_DIMENSIONS))),
          'Up to 3 dimensions.'
        ),
        metrics: describe(
          z.array(z.enum(ANALYTICS_REALTIME_METRICS)),
          'Metrics to compute.'
        ),
        minutesAgo: describe(
          z.optional(z.number()),
          `Window in minutes (1-${ANALYTICS_REALTIME_MAX_MINUTES}, default 30).`
        ),
        dimensionFilters: describe(
          z.optional(
            z.array(
              z.extend(analyticsDimensionFilterSchema, {
                dimension: z.enum(ANALYTICS_REALTIME_DIMENSIONS),
              })
            )
          ),
          'Same filters as intlayer-analytics-run-report, on realtime dimensions.'
        ),
        limit: describe(
          z.optional(z.number()),
          'Rows to return (default 100).'
        ),
      },
      annotations: READ_ONLY,
    },
    async ({ clientId, clientSecret, ...report }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.analytics.runRealtimeReport(report);

        return okCompact(result.data ?? result);
      } catch (error) {
        return fail('Run realtime report', error);
      }
    }
  );

  server.registerTool(
    'intlayer-analytics-list-annotations',
    {
      title: 'List Analytics Annotations',
      description:
        'Dated events that can explain a traffic or conversion change, generated from Intlayer data: dictionary created / new content version / last edit, dictionary committed to the repository (with link), first traffic of a locale, start of an A/B experiment. Most recent first. Use it to answer "why did X change around date Y?".',
      inputSchema: {
        ...authSchema,
        startDate: describe(
          z.optional(z.string()),
          'YYYY-MM-DD, today, yesterday or NdaysAgo (default 90daysAgo).'
        ),
        endDate: describe(z.optional(z.string()), 'Default today.'),
        types: describe(
          z.optional(z.array(z.enum(ANALYTICS_ANNOTATION_TYPES))),
          'Only these annotation types.'
        ),
        limit: describe(
          z.optional(z.number()),
          'Maximum annotations (default 100, max 500).'
        ),
      },
      annotations: READ_ONLY,
    },
    async ({ clientId, clientSecret, ...query }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.analytics.getAnnotations(query);

        return okCompact(result.data ?? result);
      } catch (error) {
        return fail('List annotations', error);
      }
    }
  );

  server.registerTool(
    'intlayer-analytics-page-flow',
    {
      title: 'Analytics Page Flow',
      description:
        'Averaged navigation paths from a starting page: which pages visitors open next, step by step, and where they leave. Use "(entrance)" as startUrl to start from the landing pages.',
      inputSchema: {
        ...authSchema,
        startUrl: describe(
          z.optional(z.string()),
          'Starting page pathname (default "/").'
        ),
        range: describe(
          z.optional(
            z.enum(['24h', '7d', '30d', '90d', '6mo', '1y', '3y'] as const)
          ),
          'Window (default 30d).'
        ),
      },
      annotations: READ_ONLY,
    },
    async ({ clientId, clientSecret, startUrl, range }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.analytics.getPageFlow(
          range ?? '30d',
          startUrl ?? '/'
        );

        return okCompact(result.data ?? result);
      } catch (error) {
        return fail('Get page flow', error);
      }
    }
  );

  server.registerTool(
    'intlayer-analytics-experiment',
    {
      title: 'Analytics A/B Experiment',
      description:
        'Statistical result of an A/B experiment: exposures, conversions and conversion rate per variant, two-proportion z-test p-value against the control, and the winner (p < 0.05). Experiment keys are listed by intlayer-analytics-get-schema.',
      inputSchema: {
        ...authSchema,
        experimentKey: describe(z.string(), 'Key of the experiment.'),
      },
      annotations: READ_ONLY,
    },
    async ({ clientId, clientSecret, experimentKey }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.analytics.getExperimentResults(experimentKey);

        return okCompact(result.data ?? result);
      } catch (error) {
        return fail('Get experiment results', error);
      }
    }
  );
};
