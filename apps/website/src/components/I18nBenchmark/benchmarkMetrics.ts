import type {
  BenchmarkSection,
  CategoryBenchmark,
  LibraryBenchmark,
  MetricData,
} from './constants';

export type MetricId =
  | 'lib-size'
  | 'comp-avg'
  | 'page-size'
  | 'locale-leak'
  | 'page-leak'
  | 'page-load'
  | 'hydration'
  | 'reactivity';

export type MetricDefinition = {
  id: MetricId;
  unit: 'KB' | '%' | 'ms';
  /** Reads the raw value of the metric, `null` when it was not measured. */
  extract: (
    categoryData: CategoryBenchmark,
    libraryData: LibraryBenchmark
  ) => MetricData | null;
  /** Converts a raw value into the displayed unit. */
  transform: (value: number) => number;
};

const readNumber = (
  source: Record<string, unknown> | undefined,
  field: string
): number | null => {
  const value = source?.[field];

  return typeof value === 'number' && Number.isFinite(value) ? value : null;
};

const isMetricData = (value: unknown): value is MetricData =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as MetricData).min === 'number' &&
  typeof (value as MetricData).max === 'number';

/**
 * Reads a section-level average and widens it with the min/max observed in
 * each locale's samples.
 */
export const extractAverageWithLocaleRange = (
  section: BenchmarkSection | undefined,
  averageField: string,
  byLocaleField: string
): MetricData | null => {
  const average = readNumber(section, averageField);
  if (average === null) return null;

  const localeStatistics = Object.values(section?.byLocale ?? {})
    .map((localeData) => localeData[byLocaleField])
    .filter(isMetricData);

  if (localeStatistics.length === 0) {
    return { avg: average, min: average, max: average };
  }

  return {
    avg: average,
    min: Math.min(...localeStatistics.map((statistics) => statistics.min)),
    max: Math.max(...localeStatistics.map((statistics) => statistics.max)),
  };
};

/** Reads `<prefix>Avg`, `<prefix>Min` and `<prefix>Max` fields of a section. */
export const extractAverageWithRangeFields = (
  section: BenchmarkSection | undefined,
  fieldPrefix: string
): MetricData | null => {
  const average = readNumber(section, `${fieldPrefix}Avg`);
  if (average === null) return null;

  return {
    avg: average,
    min: readNumber(section, `${fieldPrefix}Min`) ?? average,
    max: readNumber(section, `${fieldPrefix}Max`) ?? average,
  };
};

const toKilobytes = (bytes: number): number =>
  Number((bytes / 1024).toFixed(1));

const toOneDecimal = (value: number): number => Number(value.toFixed(1));

/** Metrics shown by the benchmark, in tab order. Labels live in the dictionary. */
export const BENCHMARK_METRICS: MetricDefinition[] = [
  {
    id: 'lib-size',
    unit: 'KB',
    extract: (_categoryData, libraryData) => {
      const libSize = libraryData.global?.libSize;
      if (libSize?.status !== 'ok' || typeof libSize.gzip !== 'number') {
        return null;
      }

      return { avg: libSize.gzip, min: libSize.gzip, max: libSize.gzip };
    },
    transform: toKilobytes,
  },
  {
    id: 'comp-avg',
    unit: 'KB',
    extract: (categoryData) =>
      extractAverageWithRangeFields(categoryData.components, 'gzip'),
    transform: toKilobytes,
  },
  {
    id: 'page-size',
    unit: 'KB',
    extract: (categoryData) =>
      extractAverageWithRangeFields(categoryData.pageBundle, 'jsGzip'),
    transform: toKilobytes,
  },
  {
    id: 'locale-leak',
    unit: '%',
    extract: (categoryData) =>
      extractAverageWithLocaleRange(
        categoryData.pageBundle,
        'localeLeakAvgPct',
        'localeLeakPct'
      ),
    transform: toOneDecimal,
  },
  {
    id: 'page-leak',
    unit: '%',
    extract: (categoryData) =>
      extractAverageWithLocaleRange(
        categoryData.pageBundle,
        'otherPageContentLeakAvgPct',
        'otherPageContentLeakPct'
      ),
    transform: toOneDecimal,
  },
  {
    id: 'page-load',
    unit: 'ms',
    extract: (categoryData) =>
      extractAverageWithLocaleRange(
        categoryData.rendering,
        'e2ePageLoadAvgMs',
        'e2ePageLoad'
      ),
    transform: toOneDecimal,
  },
  {
    id: 'hydration',
    unit: 'ms',
    extract: (categoryData) =>
      extractAverageWithLocaleRange(
        categoryData.rendering,
        'hydrationAvgMs',
        'hydration'
      ),
    transform: toOneDecimal,
  },
  {
    // Time from the locale <select> change event to the DOM reflecting it.
    id: 'reactivity',
    unit: 'ms',
    extract: (categoryData) =>
      extractAverageWithLocaleRange(categoryData.reactivity, 'e2eAvgMs', 'e2e'),
    transform: toOneDecimal,
  },
];
