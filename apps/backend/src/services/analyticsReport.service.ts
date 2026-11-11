import {
  ANALYTICS_ACTIVE_USERS_RETENTION_DAYS,
  ANALYTICS_DIMENSION_DESCRIPTIONS,
  ANALYTICS_METRIC_DESCRIPTIONS,
  ANALYTICS_METRIC_DIMENSIONS,
  ANALYTICS_REALTIME_DIMENSIONS,
  ANALYTICS_REALTIME_MAX_MINUTES,
  ANALYTICS_REALTIME_METRICS,
  ANALYTICS_REPORT_DEFAULT_LIMIT,
  ANALYTICS_REPORT_DIMENSIONS,
  ANALYTICS_REPORT_METRICS,
  ANALYTICS_TIME_DIMENSIONS,
  type AnalyticsAnnotation,
  type AnalyticsAnnotationType,
  type AnalyticsDateRange,
  type AnalyticsDimensionFilter,
  type AnalyticsMetricFilter,
  type AnalyticsOrderBy,
  type AnalyticsRealtimeDimension,
  type AnalyticsRealtimeMetric,
  type AnalyticsReport,
  type AnalyticsReportDimension,
  type AnalyticsReportMetric,
  type AnalyticsReportRow,
  type AnalyticsSchemaInfo,
  PAGE_FLOW_ENTRANCE,
} from '@intlayer/backend-contract/analytics';
import {
  AnalyticsLiveActivityModel,
  AnalyticsPageTransitionModel,
  AnalyticsRollupModel,
  AnalyticsVisitorModel,
} from '@schemas/analyticsEvent.schema';
import { DictionaryModel } from '@schemas/dictionary.schema';
import { getFirstDataDay } from '@services/analytics.service';
import type { Model, PipelineStage, Types } from 'mongoose';

/** Thrown for a well-formed request the data cannot answer. */
export class AnalyticsReportError extends Error {
  constructor(readonly issues: string[]) {
    super(issues.join(' '));
    this.name = 'AnalyticsReportError';
  }
}

/** Label of a missing dimension value (ex: an exposure without variant). */
export const NOT_SET = '(not set)';
/** Groups read per aggregation before the report is reported as partial. */
export const MAX_GROUPED_ROWS = 50_000;
/** Label of the date range column when several ranges are compared. */
export const DATE_RANGE_COLUMN = 'dateRange';

const DAY_MS = 24 * 60 * 60 * 1000;

/** UTC day of a date, `YYYY-MM-DD`. */
const formatUtcDay = (date: Date): string => date.toISOString().slice(0, 10);

/** UTC minute of a date, `YYYY-MM-DDTHH:mm`. */
const formatUtcMinute = (date: Date): string => date.toISOString().slice(0, 16);

/**
 * Resolves a report date (`YYYY-MM-DD`, `today`, `yesterday`, `NdaysAgo`) to
 * an absolute UTC day.
 *
 * @param value - The date as requested.
 * @param now - Reference date.
 * @returns The UTC day, or `null` for an impossible calendar date.
 */
export const resolveReportDate = (value: string, now: Date): string | null => {
  if (value === 'today') return formatUtcDay(now);
  if (value === 'yesterday')
    return formatUtcDay(new Date(now.getTime() - DAY_MS));

  const daysAgo = value.match(/^(\d+)daysAgo$/)?.[1];

  if (daysAgo !== undefined) {
    return formatUtcDay(new Date(now.getTime() - Number(daysAgo) * DAY_MS));
  }

  const date = new Date(`${value}T00:00:00Z`);

  return Number.isNaN(date.getTime()) || formatUtcDay(date) !== value
    ? null
    : value;
};

export type ResolvedDateRange = {
  name: string;
  startDate: string;
  endDate: string;
};

/**
 * Resolves the requested ranges to absolute UTC days.
 *
 * @param dateRanges - The requested ranges.
 * @param now - Reference date.
 * @returns The resolved ranges, named `date_range_N` when unnamed.
 * @throws AnalyticsReportError on invalid, reversed or duplicate ranges.
 */
export const resolveDateRanges = (
  dateRanges: AnalyticsDateRange[],
  now: Date = new Date()
): ResolvedDateRange[] => {
  const issues: string[] = [];

  const resolvedRanges = dateRanges.map((dateRange, index) => {
    const startDate = resolveReportDate(dateRange.startDate, now);
    const endDate = resolveReportDate(dateRange.endDate, now);
    const name = dateRange.name ?? `date_range_${index}`;

    if (!startDate) issues.push(`Invalid startDate "${dateRange.startDate}".`);
    if (!endDate) issues.push(`Invalid endDate "${dateRange.endDate}".`);
    if (startDate && endDate && startDate > endDate) {
      issues.push(
        `Date range "${name}" starts (${startDate}) after it ends (${endDate}).`
      );
    }

    return { name, startDate: startDate ?? '', endDate: endDate ?? '' };
  });

  const names = resolvedRanges.map(({ name }) => name);

  if (new Set(names).size !== names.length) {
    issues.push('Date range names must be unique.');
  }

  if (issues.length) throw new AnalyticsReportError(issues);

  return resolvedRanges;
};

const isTimeDimension = (dimension: string): boolean =>
  (ANALYTICS_TIME_DIMENSIONS as readonly string[]).includes(dimension);

/** Keeps the first occurrence of each value. */
const unique = <Value>(values: readonly Value[]): Value[] => [
  ...new Set(values),
];

/** A report request with its defaults applied. */
export type NormalizedReportRequest = {
  dimensions: AnalyticsReportDimension[];
  metrics: AnalyticsReportMetric[];
  dimensionFilters: AnalyticsDimensionFilter[];
  metricFilters: AnalyticsMetricFilter[];
  orderBys: AnalyticsOrderBy[];
  limit: number;
  offset: number;
};

/** Checks the operator of a filter carries the value(s) it needs. */
const getFilterValueIssue = (
  filter: Pick<AnalyticsDimensionFilter, 'operator' | 'value' | 'values'> & {
    dimension: string;
  }
): string | null => {
  if (filter.operator === 'inList') {
    return filter.values?.length
      ? null
      : `Filter on "${filter.dimension}": "inList" needs a non-empty "values".`;
  }

  return filter.value === undefined
    ? `Filter on "${filter.dimension}": "${filter.operator}" needs a "value".`
    : null;
};

/**
 * Validates a report against the data model: every dimension (requested or
 * filtered) must have been recorded with every requested metric.
 *
 * @param request - The parsed report request.
 * @param dateRangeCount - Number of compared date ranges.
 * @returns The normalized request.
 * @throws AnalyticsReportError listing every issue at once.
 */
export const normalizeReportRequest = (
  request: {
    dimensions?: AnalyticsReportDimension[];
    metrics: AnalyticsReportMetric[];
    dimensionFilters?: AnalyticsDimensionFilter[];
    metricFilters?: AnalyticsMetricFilter[];
    orderBys?: AnalyticsOrderBy[];
    limit?: number;
    offset?: number;
  },
  dateRangeCount: number
): NormalizedReportRequest => {
  const dimensions = unique(request.dimensions ?? []);
  const metrics = unique(request.metrics);
  const dimensionFilters = request.dimensionFilters ?? [];
  const metricFilters = request.metricFilters ?? [];
  const orderBys = request.orderBys ?? [];
  const issues: string[] = [];

  const getIncompatibleMetrics = (dimension: AnalyticsReportDimension) =>
    metrics.filter(
      (metric) =>
        !(ANALYTICS_METRIC_DIMENSIONS[metric] as readonly string[]).includes(
          dimension
        )
    );

  for (const dimension of dimensions) {
    for (const metric of getIncompatibleMetrics(dimension)) {
      issues.push(
        `Metric "${metric}" cannot be broken down by "${dimension}" (compatible: ${ANALYTICS_METRIC_DIMENSIONS[metric].join(', ')}).`
      );
    }
  }

  for (const filter of dimensionFilters) {
    if (isTimeDimension(filter.dimension)) {
      issues.push(
        `Cannot filter on time dimension "${filter.dimension}": use dateRanges.`
      );
      continue;
    }

    for (const metric of getIncompatibleMetrics(filter.dimension)) {
      issues.push(
        `Metric "${metric}" cannot be filtered by "${filter.dimension}" (compatible: ${ANALYTICS_METRIC_DIMENSIONS[metric].join(', ')}).`
      );
    }

    const valueIssue = getFilterValueIssue(filter);
    if (valueIssue) issues.push(valueIssue);
  }

  for (const filter of metricFilters) {
    if (!metrics.includes(filter.metric)) {
      issues.push(
        `Metric filter on "${filter.metric}", which is not requested.`
      );
    }
    if (filter.operator === 'between' && filter.toValue === undefined) {
      issues.push(
        `Metric filter on "${filter.metric}": "between" needs "toValue".`
      );
    }
  }

  const orderableFields = new Set<string>([
    ...dimensions,
    ...metrics,
    ...(dateRangeCount > 1 ? [DATE_RANGE_COLUMN] : []),
  ]);

  for (const orderBy of orderBys) {
    if (!orderableFields.has(orderBy.field)) {
      issues.push(
        `Cannot order by "${orderBy.field}": not a requested dimension or metric.`
      );
    }
  }

  if (issues.length) throw new AnalyticsReportError(issues);

  return {
    dimensions,
    metrics,
    dimensionFilters,
    metricFilters,
    orderBys,
    limit: request.limit ?? ANALYTICS_REPORT_DEFAULT_LIMIT,
    offset: request.offset ?? 0,
  };
};

/** Escapes a literal for use inside a regular expression. */
const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Builds the MongoDB condition of a dimension filter.
 *
 * @param filter - The dimension filter.
 * @returns The condition to set on the dimension's field.
 */
export const buildFilterCondition = (
  filter: Pick<
    AnalyticsDimensionFilter,
    'operator' | 'value' | 'values' | 'caseSensitive' | 'not'
  >
): unknown => {
  const flags = filter.caseSensitive ? '' : 'i';
  const value = filter.value ?? '';

  if (filter.operator === 'inList') {
    const values = filter.values ?? [];
    const matchers = filter.caseSensitive
      ? values
      : values.map((item) => new RegExp(`^${escapeRegExp(item)}$`, 'i'));

    return filter.not ? { $nin: matchers } : { $in: matchers };
  }

  if (filter.operator === 'exact' && filter.caseSensitive) {
    return filter.not ? { $ne: value } : value;
  }

  const pattern = {
    exact: `^${escapeRegExp(value)}$`,
    contains: escapeRegExp(value),
    beginsWith: `^${escapeRegExp(value)}`,
    endsWith: `${escapeRegExp(value)}$`,
  }[filter.operator];

  const regExp = new RegExp(pattern, flags);

  return filter.not ? { $not: regExp } : regExp;
};

type ReportSourceName =
  | 'pageViews'
  | 'contentExposures'
  | 'conversions'
  | 'visitors'
  | 'entrances';

type ReportSource = {
  model: Model<any>;
  /** Fixed conditions selecting the source's documents. */
  baseMatch: Record<string, unknown>;
  /** Stored field of each non-time dimension. */
  fields: Partial<Record<AnalyticsReportDimension, string>>;
  /** Counts distinct `sessionHash` instead of summing counters. */
  isDistinctVisitors?: boolean;
};

const ROLLUP_FIELDS: ReportSource['fields'] = {
  locale: 'locale',
  pagePath: 'url',
  dictionaryKey: 'dictionaryKey',
  keyPath: 'keyPath',
  contentType: 'nodeType',
  variant: 'variant',
  experimentKey: 'experimentKey',
  goal: 'goal',
};

const REPORT_SOURCES: Record<ReportSourceName, ReportSource> = {
  pageViews: {
    model: AnalyticsRollupModel,
    baseMatch: { type: 'page_view' },
    fields: ROLLUP_FIELDS,
  },
  contentExposures: {
    model: AnalyticsRollupModel,
    baseMatch: { type: 'content_exposure' },
    fields: ROLLUP_FIELDS,
  },
  conversions: {
    model: AnalyticsRollupModel,
    baseMatch: { type: 'conversion' },
    fields: ROLLUP_FIELDS,
  },
  visitors: {
    model: AnalyticsVisitorModel,
    baseMatch: {},
    fields: { locale: 'locale', country: 'country' },
    isDistinctVisitors: true,
  },
  entrances: {
    model: AnalyticsPageTransitionModel,
    baseMatch: { fromUrl: PAGE_FLOW_ENTRANCE },
    fields: { pagePath: 'toUrl' },
  },
};

/** Source and accumulated stored field of each metric. */
const METRIC_SOURCES: Record<
  AnalyticsReportMetric,
  { source: ReportSourceName; field?: 'count' | 'valueSum' }
> = {
  pageViews: { source: 'pageViews', field: 'count' },
  contentExposures: { source: 'contentExposures', field: 'count' },
  conversions: { source: 'conversions', field: 'count' },
  conversionValue: { source: 'conversions', field: 'valueSum' },
  entrances: { source: 'entrances', field: 'count' },
  activeUsers: { source: 'visitors' },
};

/** Group key alias of a dimension (`$group` keys cannot contain dots). */
const getDimensionAlias = (index: number): string => `d${index}`;

/** MongoDB expression producing a dimension's value. */
const buildDimensionExpression = (
  dimension: AnalyticsReportDimension,
  source: ReportSource
): unknown => {
  if (dimension === 'date') return '$day';
  if (dimension === 'month') return { $substrBytes: ['$day', 0, 7] };
  if (dimension === 'week') {
    return {
      $dateToString: {
        format: '%G-W%V',
        date: { $dateFromString: { dateString: '$day' } },
      },
    };
  }

  return { $ifNull: [`$${source.fields[dimension]}`, NOT_SET] };
};

type GroupedRow = {
  _id: Record<string, string>;
  [metricKey: string]: unknown;
};

/**
 * Builds the aggregation of one source over one date range.
 *
 * @returns The pipeline; each output document holds the dimension values in
 *   `_id.dN` and the metric values under their names.
 */
export const buildSourcePipeline = (
  projectId: Types.ObjectId,
  source: ReportSource,
  metrics: AnalyticsReportMetric[],
  dimensions: AnalyticsReportDimension[],
  dimensionFilters: AnalyticsDimensionFilter[],
  dateRange: ResolvedDateRange
): PipelineStage[] => {
  const match: Record<string, unknown> = {
    projectId,
    day: { $gte: dateRange.startDate, $lte: dateRange.endDate },
    ...source.baseMatch,
  };

  for (const filter of dimensionFilters) {
    const field = source.fields[filter.dimension];
    if (!field) continue;

    const condition = buildFilterCondition(filter);
    const existing = match[field];

    // Two filters on the same field are combined with `$and`.
    if (existing === undefined) {
      match[field] = condition;
    } else {
      match.$and = [
        ...((match.$and as unknown[]) ?? []),
        { [field]: condition },
      ];
    }
  }

  const dimensionKeys = Object.fromEntries(
    dimensions.map((dimension, index) => [
      getDimensionAlias(index),
      buildDimensionExpression(dimension, source),
    ])
  );

  if (source.isDistinctVisitors) {
    const regroupedKeys = Object.fromEntries(
      dimensions.map((_dimension, index) => [
        getDimensionAlias(index),
        `$_id.${getDimensionAlias(index)}`,
      ])
    );

    return [
      { $match: match },
      { $group: { _id: { ...dimensionKeys, session: '$sessionHash' } } },
      { $group: { _id: regroupedKeys, activeUsers: { $sum: 1 } } },
      { $limit: MAX_GROUPED_ROWS + 1 },
    ];
  }

  const accumulators = Object.fromEntries(
    metrics.map((metric) => [
      metric,
      { $sum: `$${METRIC_SOURCES[metric].field}` },
    ])
  );

  return [
    { $match: match },
    { $group: { _id: dimensionKeys, ...accumulators } },
    { $limit: MAX_GROUPED_ROWS + 1 },
  ];
};

/** Groups the requested metrics by the source that stores them. */
const groupMetricsBySource = (
  metrics: AnalyticsReportMetric[]
): Map<ReportSourceName, AnalyticsReportMetric[]> => {
  const metricsBySource = new Map<ReportSourceName, AnalyticsReportMetric[]>();

  for (const metric of metrics) {
    const { source } = METRIC_SOURCES[metric];
    metricsBySource.set(source, [
      ...(metricsBySource.get(source) ?? []),
      metric,
    ]);
  }

  return metricsBySource;
};

/** One aggregation result, tagged with the range it covers. */
export type SourceResult = {
  dateRangeName: string;
  metrics: AnalyticsReportMetric[];
  groupedRows: GroupedRow[];
};

/**
 * Merges per-source results into report rows: one row per date range and
 * dimension tuple, missing metrics counted as zero.
 */
export const mergeSourceResults = (
  results: SourceResult[],
  dimensions: string[],
  metrics: string[],
  includeDateRange: boolean
): AnalyticsReportRow[] => {
  const rowsByKey = new Map<string, AnalyticsReportRow>();

  for (const {
    dateRangeName,
    metrics: sourceMetrics,
    groupedRows,
  } of results) {
    for (const groupedRow of groupedRows) {
      const dimensionValues = dimensions.map(
        (_dimension, index) =>
          String(groupedRow._id?.[getDimensionAlias(index)] ?? NOT_SET) ||
          NOT_SET
      );
      const key = JSON.stringify([dateRangeName, ...dimensionValues]);

      let row = rowsByKey.get(key);

      if (!row) {
        row = {
          ...(includeDateRange && { [DATE_RANGE_COLUMN]: dateRangeName }),
          ...Object.fromEntries(
            dimensions.map((dimension, index) => [
              dimension,
              dimensionValues[index],
            ])
          ),
          ...Object.fromEntries(metrics.map((metric) => [metric, 0])),
        };
        rowsByKey.set(key, row);
      }

      for (const metric of sourceMetrics) {
        row[metric] = Number(row[metric]) + Number(groupedRow[metric] ?? 0);
      }
    }
  }

  return [...rowsByKey.values()];
};

/** Whether a row passes every metric filter. */
export const matchesMetricFilters = (
  row: AnalyticsReportRow,
  metricFilters: AnalyticsMetricFilter[]
): boolean =>
  metricFilters.every(({ metric, operator, value, toValue }) => {
    const metricValue = Number(row[metric] ?? 0);

    switch (operator) {
      case 'equal':
        return metricValue === value;
      case 'greaterThan':
        return metricValue > value;
      case 'greaterThanOrEqual':
        return metricValue >= value;
      case 'lessThan':
        return metricValue < value;
      case 'lessThanOrEqual':
        return metricValue <= value;
      case 'between':
        return metricValue >= value && metricValue <= (toValue ?? value);
    }
  });

/**
 * Sorts rows by the requested order, or by default: time dimensions
 * ascending first, then the first metric descending.
 */
export const sortReportRows = (
  rows: AnalyticsReportRow[],
  orderBys: AnalyticsOrderBy[],
  dimensions: string[],
  metrics: string[],
  includeDateRange: boolean
): AnalyticsReportRow[] => {
  const effectiveOrderBys: Required<AnalyticsOrderBy>[] = orderBys.length
    ? orderBys.map(({ field, desc }) => ({
        field,
        desc: desc ?? metrics.includes(field),
      }))
    : [
        ...(includeDateRange
          ? [{ field: DATE_RANGE_COLUMN, desc: false }]
          : []),
        ...dimensions
          .filter(
            (dimension) => isTimeDimension(dimension) || dimension === 'minute'
          )
          .map((field) => ({ field, desc: false })),
        ...(metrics[0] ? [{ field: metrics[0], desc: true }] : []),
      ];

  return [...rows].sort((rowA, rowB) => {
    for (const { field, desc } of effectiveOrderBys) {
      const valueA = rowA[field];
      const valueB = rowB[field];
      const comparison =
        typeof valueA === 'number' && typeof valueB === 'number'
          ? valueA - valueB
          : String(valueA ?? '').localeCompare(String(valueB ?? ''));

      if (comparison !== 0) return desc ? -comparison : comparison;
    }

    return 0;
  });
};

/** Runs one aggregation, flagging a result cut by {@link MAX_GROUPED_ROWS}. */
const runPipeline = async (
  model: Model<any>,
  pipeline: PipelineStage[]
): Promise<{ groupedRows: GroupedRow[]; isCapped: boolean }> => {
  const groupedRows = await model
    .aggregate<GroupedRow>(pipeline)
    .allowDiskUse(true);

  return {
    groupedRows: groupedRows.slice(0, MAX_GROUPED_ROWS),
    isCapped: groupedRows.length > MAX_GROUPED_ROWS,
  };
};

export type RunReportInput = {
  dateRanges: AnalyticsDateRange[];
  dimensions?: AnalyticsReportDimension[];
  metrics: AnalyticsReportMetric[];
  dimensionFilters?: AnalyticsDimensionFilter[];
  metricFilters?: AnalyticsMetricFilter[];
  orderBys?: AnalyticsOrderBy[];
  limit?: number;
  offset?: number;
};

/**
 * Runs an aggregated report over the project's analytics.
 *
 * Each metric is read from the collection it is recorded in, per date range,
 * then merged on the dimension values. No per-visitor data leaves the
 * database: `activeUsers` is computed as a distinct count in MongoDB.
 *
 * @param projectId - Project to report on.
 * @param input - The report request.
 * @param now - Reference date for relative ranges.
 * @returns The report.
 * @throws AnalyticsReportError when the request cannot be answered.
 */
export const runReport = async (
  projectId: Types.ObjectId,
  input: RunReportInput,
  now: Date = new Date()
): Promise<AnalyticsReport> => {
  const dateRanges = resolveDateRanges(input.dateRanges, now);
  const request = normalizeReportRequest(input, dateRanges.length);
  const includeDateRange = dateRanges.length > 1;
  const metricsBySource = groupMetricsBySource(request.metrics);
  const warnings: string[] = [];

  const sourceQueries = dateRanges.flatMap((dateRange) =>
    [...metricsBySource].map(async ([sourceName, metrics]) => {
      const source = REPORT_SOURCES[sourceName];
      const { groupedRows, isCapped } = await runPipeline(
        source.model,
        buildSourcePipeline(
          projectId,
          source,
          metrics,
          request.dimensions,
          request.dimensionFilters,
          dateRange
        )
      );

      return { dateRangeName: dateRange.name, metrics, groupedRows, isCapped };
    })
  );

  // Distinct visitors do not add up across rows: totals need their own count.
  const activeUsersTotalQueries = request.metrics.includes('activeUsers')
    ? dateRanges.map(async (dateRange) => {
        const { groupedRows } = await runPipeline(
          AnalyticsVisitorModel,
          buildSourcePipeline(
            projectId,
            REPORT_SOURCES.visitors,
            ['activeUsers'],
            [],
            request.dimensionFilters,
            dateRange
          )
        );

        return [
          dateRange.name,
          Number(groupedRows[0]?.activeUsers ?? 0),
        ] as const;
      })
    : [];

  const [sourceResults, activeUsersTotals, dataSince] = await Promise.all([
    Promise.all(sourceQueries),
    Promise.all(activeUsersTotalQueries),
    getFirstDataDay(projectId),
  ]);

  if (sourceResults.some(({ isCapped }) => isCapped)) {
    warnings.push(
      `More than ${MAX_GROUPED_ROWS} groups matched: the report only covers part of them. Add dimension filters or remove a dimension.`
    );
  }

  const allRows = mergeSourceResults(
    sourceResults,
    request.dimensions,
    request.metrics,
    includeDateRange
  );

  const activeUsersTotalByRange = new Map(activeUsersTotals);

  const totals = dateRanges.map(({ name }) => {
    const rangeRows = allRows.filter(
      (row) => !includeDateRange || row[DATE_RANGE_COLUMN] === name
    );

    return {
      [DATE_RANGE_COLUMN]: name,
      ...Object.fromEntries(
        request.metrics.map((metric) => [
          metric,
          metric === 'activeUsers'
            ? (activeUsersTotalByRange.get(name) ?? 0)
            : rangeRows.reduce((sum, row) => sum + Number(row[metric]), 0),
        ])
      ),
    };
  });

  const filteredRows = sortReportRows(
    allRows.filter((row) => matchesMetricFilters(row, request.metricFilters)),
    request.orderBys,
    request.dimensions,
    request.metrics,
    includeDateRange
  );

  const rows = filteredRows.slice(
    request.offset,
    request.offset + request.limit
  );

  if (request.metrics.includes('activeUsers')) {
    const retentionStart = formatUtcDay(
      new Date(now.getTime() - ANALYTICS_ACTIVE_USERS_RETENTION_DAYS * DAY_MS)
    );

    if (dateRanges.some(({ startDate }) => startDate < retentionStart)) {
      warnings.push(
        `activeUsers only covers the last ${ANALYTICS_ACTIVE_USERS_RETENTION_DAYS} days (since ${retentionStart}); older days count no visitors.`
      );
    }

    if (request.dimensions.some((dimension) => !isTimeDimension(dimension))) {
      warnings.push(
        'activeUsers is a distinct count: rows do not add up to the total (a visitor can appear in several rows). Use `totals`.'
      );
    }
  }

  if (dataSince && dateRanges.some(({ startDate }) => startDate < dataSince)) {
    warnings.push(`No data was collected before ${dataSince}.`);
  }

  return {
    dimensions: [
      ...(includeDateRange ? [DATE_RANGE_COLUMN] : []),
      ...request.dimensions,
    ],
    metrics: request.metrics,
    dateRanges,
    rows,
    rowCount: filteredRows.length,
    totals,
    metadata: {
      timeZone: 'UTC',
      dataSince,
      truncated: filteredRows.length > rows.length,
      warnings,
    },
  };
};

const REALTIME_FIELDS: Record<AnalyticsRealtimeDimension, string> = {
  minute: 'minute',
  pagePath: 'url',
  locale: 'locale',
  country: 'country',
};

export type RunRealtimeReportInput = {
  dimensions?: AnalyticsRealtimeDimension[];
  metrics: AnalyticsRealtimeMetric[];
  minutesAgo?: number;
  dimensionFilters?: (Omit<AnalyticsDimensionFilter, 'dimension'> & {
    dimension: AnalyticsRealtimeDimension;
  })[];
  limit?: number;
};

/** Default realtime window, in minutes. */
const DEFAULT_REALTIME_MINUTES = 30;

/**
 * Activity of the last minutes, from the per-minute session activity. Only
 * aggregates are returned (no session, city or coordinates).
 *
 * @param projectId - Project to report on.
 * @param input - The realtime request.
 * @param now - Reference date.
 * @returns The report, its single date range spanning the window's minutes.
 */
export const runRealtimeReport = async (
  projectId: Types.ObjectId,
  input: RunRealtimeReportInput,
  now: Date = new Date()
): Promise<AnalyticsReport> => {
  const dimensions = unique(input.dimensions ?? []);
  const metrics = unique(input.metrics);
  const dimensionFilters = input.dimensionFilters ?? [];
  const minutesAgo = Math.min(
    input.minutesAgo ?? DEFAULT_REALTIME_MINUTES,
    ANALYTICS_REALTIME_MAX_MINUTES
  );
  const limit = input.limit ?? ANALYTICS_REPORT_DEFAULT_LIMIT;

  const valueIssues = dimensionFilters
    .map(getFilterValueIssue)
    .filter((issue): issue is string => Boolean(issue));

  if (valueIssues.length) throw new AnalyticsReportError(valueIssues);

  const startMinute = formatUtcMinute(
    new Date(now.getTime() - minutesAgo * 60_000)
  );
  const match: Record<string, unknown> = {
    projectId,
    minute: { $gte: startMinute },
  };

  for (const filter of dimensionFilters) {
    match.$and = [
      ...((match.$and as unknown[]) ?? []),
      { [REALTIME_FIELDS[filter.dimension]]: buildFilterCondition(filter) },
    ];
  }

  const buildPipeline = (
    groupDimensions: AnalyticsRealtimeDimension[]
  ): PipelineStage[] => {
    const dimensionKeys = Object.fromEntries(
      groupDimensions.map((dimension, index) => [
        getDimensionAlias(index),
        { $ifNull: [`$${REALTIME_FIELDS[dimension]}`, NOT_SET] },
      ])
    );
    const regroupedKeys = Object.fromEntries(
      groupDimensions.map((_dimension, index) => [
        getDimensionAlias(index),
        `$_id.${getDimensionAlias(index)}`,
      ])
    );

    return [
      { $match: match },
      {
        $group: {
          _id: { ...dimensionKeys, session: '$sessionHash' },
          pageViews: { $sum: '$views' },
        },
      },
      {
        $group: {
          _id: regroupedKeys,
          activeUsers: { $sum: 1 },
          pageViews: { $sum: '$pageViews' },
        },
      },
      { $limit: MAX_GROUPED_ROWS + 1 },
    ];
  };

  const [{ groupedRows, isCapped }, totalResult] = await Promise.all([
    runPipeline(AnalyticsLiveActivityModel, buildPipeline(dimensions)),
    runPipeline(AnalyticsLiveActivityModel, buildPipeline([])),
  ]);

  const allRows = sortReportRows(
    mergeSourceResults(
      [{ dateRangeName: 'realtime', metrics, groupedRows }] as SourceResult[],
      dimensions,
      metrics,
      false
    ),
    [],
    dimensions,
    metrics,
    false
  );
  const rows = allRows.slice(0, limit);
  const totalRow = totalResult.groupedRows[0];

  return {
    dimensions,
    metrics,
    dateRanges: [
      {
        name: 'realtime',
        startDate: startMinute,
        endDate: formatUtcMinute(now),
      },
    ],
    rows,
    rowCount: allRows.length,
    totals: [
      {
        [DATE_RANGE_COLUMN]: 'realtime',
        ...Object.fromEntries(
          metrics.map((metric) => [metric, Number(totalRow?.[metric] ?? 0)])
        ),
      },
    ],
    metadata: {
      timeZone: 'UTC',
      dataSince: null,
      truncated: allRows.length > rows.length,
      warnings: [
        ...(isCapped
          ? [
              `More than ${MAX_GROUPED_ROWS} groups matched: the report is partial.`,
            ]
          : []),
        ...(dimensions.length && metrics.includes('activeUsers')
          ? [
              'activeUsers is a distinct count: rows do not add up to the total. Use `totals`.',
            ]
          : []),
      ],
    },
  };
};

type ExperimentSummary = AnalyticsSchemaInfo['experiments'][number];

/** Experiments with collected data, most recently started first. */
const getExperimentSummaries = async (
  projectId: Types.ObjectId
): Promise<ExperimentSummary[]> => {
  const experiments = await AnalyticsRollupModel.aggregate<{
    _id: string;
    variants: (string | null)[];
    goals: (string | null)[];
    firstSeen: string;
  }>([
    {
      $match: {
        projectId,
        type: { $in: ['content_exposure', 'conversion'] },
        experimentKey: { $nin: [null, ''] },
      },
    },
    {
      $group: {
        _id: '$experimentKey',
        variants: { $addToSet: '$variant' },
        goals: { $addToSet: '$goal' },
        firstSeen: { $min: '$day' },
      },
    },
    { $sort: { firstSeen: -1 } },
    { $limit: 100 },
  ]).allowDiskUse(true);

  const isDefined = (value: string | null): value is string => Boolean(value);

  return experiments.map(({ _id, variants, goals, firstSeen }) => ({
    experimentKey: _id,
    variants: variants.filter(isDefined).sort(),
    goals: goals.filter(isDefined).sort(),
    firstSeen,
  }));
};

/**
 * Describes what can be reported on: dimensions, metrics, their
 * compatibility, retention, the project's locales and its experiments.
 *
 * @param projectId - Project to describe.
 * @param locales - Locales configured on the project.
 */
export const getSchemaInfo = async (
  projectId: Types.ObjectId,
  locales: string[]
): Promise<AnalyticsSchemaInfo> => {
  const [dataSince, experiments] = await Promise.all([
    getFirstDataDay(projectId),
    getExperimentSummaries(projectId),
  ]);

  return {
    timeZone: 'UTC',
    dataSince,
    locales,
    retention: {
      activeUsersDays: ANALYTICS_ACTIVE_USERS_RETENTION_DAYS,
      realtimeMinutes: ANALYTICS_REALTIME_MAX_MINUTES,
    },
    dimensions: ANALYTICS_REPORT_DIMENSIONS.map((name) => ({
      name,
      description: ANALYTICS_DIMENSION_DESCRIPTIONS[name],
    })),
    metrics: ANALYTICS_REPORT_METRICS.map((name) => ({
      name,
      description: ANALYTICS_METRIC_DESCRIPTIONS[name],
      compatibleDimensions: [...ANALYTICS_METRIC_DIMENSIONS[name]],
    })),
    realtime: {
      dimensions: [...ANALYTICS_REALTIME_DIMENSIONS],
      metrics: [...ANALYTICS_REALTIME_METRICS],
    },
    experiments,
  };
};

/** Edits closer than this to the dictionary creation are part of it. */
const SAME_EVENT_TOLERANCE_MS = 60_000;

type DictionaryHistory = {
  key: string;
  createdAt?: Date;
  updatedAt?: Date;
  sourceSync?: {
    status: string;
    url?: string;
    commitSha?: string;
    message?: string;
    syncedAt: Date;
  };
  versions: { name: string; createdAt?: Date }[];
};

/**
 * Turns dictionary history into annotations. Only the latest edit of a
 * dictionary is known (`updatedAt`), plus the creation of each version.
 */
export const buildDictionaryAnnotations = (
  dictionaries: DictionaryHistory[]
): AnalyticsAnnotation[] =>
  dictionaries.flatMap((dictionary) => {
    const annotations: AnalyticsAnnotation[] = [];
    const createdAt = dictionary.createdAt?.getTime();
    const isPartOfCreation = (date?: Date) =>
      createdAt !== undefined &&
      date !== undefined &&
      Math.abs(date.getTime() - createdAt) < SAME_EVENT_TOLERANCE_MS;

    if (dictionary.createdAt) {
      annotations.push({
        date: dictionary.createdAt.toISOString(),
        type: 'dictionary_created',
        title: `Dictionary "${dictionary.key}" created`,
        dictionaryKey: dictionary.key,
      });
    }

    for (const version of dictionary.versions) {
      if (!version.createdAt || isPartOfCreation(version.createdAt)) continue;

      annotations.push({
        date: version.createdAt.toISOString(),
        type: 'content_version_created',
        title: `Version "${version.name}" of "${dictionary.key}" created`,
        dictionaryKey: dictionary.key,
      });
    }

    if (dictionary.updatedAt && !isPartOfCreation(dictionary.updatedAt)) {
      annotations.push({
        date: dictionary.updatedAt.toISOString(),
        type: 'dictionary_updated',
        title: `Dictionary "${dictionary.key}" last edited`,
        dictionaryKey: dictionary.key,
      });
    }

    const { sourceSync } = dictionary;

    if (
      sourceSync &&
      (sourceSync.status === 'committed' ||
        sourceSync.status === 'pull-request')
    ) {
      annotations.push({
        date: new Date(sourceSync.syncedAt).toISOString(),
        type: 'source_synced',
        title: `"${dictionary.key}" ${sourceSync.status === 'committed' ? 'committed' : 'proposed in a pull request'}${sourceSync.commitSha ? ` (${sourceSync.commitSha.slice(0, 7)})` : ''}${sourceSync.message ? `: ${sourceSync.message}` : ''}`,
        dictionaryKey: dictionary.key,
        ...(sourceSync.url && { url: sourceSync.url }),
      });
    }

    return annotations;
  });

/** Default and maximum annotations returned. */
const DEFAULT_ANNOTATION_LIMIT = 100;
const MAX_ANNOTATION_LIMIT = 500;

export type GetAnnotationsInput = {
  startDate?: string;
  endDate?: string;
  types?: AnalyticsAnnotationType[];
  limit?: number;
};

/**
 * Dated events that explain traffic changes, derived from data Intlayer
 * already holds: dictionary history, repository syncs, the first traffic of
 * each locale, and the start of each experiment. Most recent first.
 *
 * @param projectId - Project to annotate.
 * @param input - Window (default: last 90 days), types and limit.
 * @param now - Reference date.
 */
export const getAnnotations = async (
  projectId: Types.ObjectId,
  input: GetAnnotationsInput = {},
  now: Date = new Date()
): Promise<AnalyticsAnnotation[]> => {
  const [{ startDate, endDate }] = resolveDateRanges(
    [
      {
        startDate: input.startDate ?? '90daysAgo',
        endDate: input.endDate ?? 'today',
      },
    ],
    now
  );
  const limit = Math.min(
    Math.max(1, input.limit ?? DEFAULT_ANNOTATION_LIMIT),
    MAX_ANNOTATION_LIMIT
  );
  const types = input.types?.length ? new Set(input.types) : null;

  const [dictionaries, localeFirstDays, experiments] = await Promise.all([
    DictionaryModel.aggregate<DictionaryHistory>([
      { $match: { projectIds: projectId } },
      {
        $project: {
          key: 1,
          createdAt: 1,
          updatedAt: 1,
          sourceSync: 1,
          versions: {
            $map: {
              input: { $objectToArray: { $ifNull: ['$content', {}] } },
              as: 'version',
              in: { name: '$$version.k', createdAt: '$$version.v.createdAt' },
            },
          },
        },
      },
    ]),
    AnalyticsRollupModel.aggregate<{ _id: string; firstDay: string }>([
      {
        $match: { projectId, type: 'page_view', locale: { $nin: [null, ''] } },
      },
      { $group: { _id: '$locale', firstDay: { $min: '$day' } } },
    ]),
    getExperimentSummaries(projectId),
  ]);

  const annotations: AnalyticsAnnotation[] = [
    ...buildDictionaryAnnotations(dictionaries),
    ...localeFirstDays.map(({ _id, firstDay }) => ({
      date: firstDay,
      type: 'locale_first_traffic' as const,
      title: `First page views in locale "${_id}"`,
      locale: _id,
    })),
    ...experiments.map(({ experimentKey, firstSeen }) => ({
      date: firstSeen,
      type: 'experiment_started' as const,
      title: `Experiment "${experimentKey}" started`,
      experimentKey,
    })),
  ];

  return annotations
    .filter((annotation) => {
      const day = annotation.date.slice(0, 10);

      return (
        day >= startDate &&
        day <= endDate &&
        (!types || types.has(annotation.type))
      );
    })
    .sort((annotationA, annotationB) =>
      annotationB.date.localeCompare(annotationA.date)
    )
    .slice(0, limit);
};
