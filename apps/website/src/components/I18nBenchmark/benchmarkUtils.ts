import type { MetricDefinition } from './benchmarkMetrics';
import {
  type BenchmarkCategory,
  type BenchmarkSummary,
  type CategoryBenchmark,
  type ChartItem,
  getLibColor,
  isIntlayerLib,
  type LibInfo,
  type LibraryBenchmark,
} from './constants';

const APP_SUFFIX_PATTERN =
  /-app-(nextjs|tanstack|vite-vue|vite-solid|vite-svelte)$/;

/** Human readable name of a library id from the benchmark report. */
export const getDisplayName = (libId: string, baseAppLabel: string): string => {
  if (libId === 'base') return baseAppLabel;

  const cleanedId = libId.replace(APP_SUFFIX_PATTERN, '');

  if (cleanedId === 'intlayer') return 'Intlayer';
  if (cleanedId.startsWith('intlayer-compat-')) {
    return cleanedId.replace(/^intlayer-compat-/, '@intlayer/');
  }

  return cleanedId;
};

/** Higher scores are listed first: baseline, Intlayer, then by adoption. */
const POPULARITY_SCORES: Record<string, number> = {
  base: 1000,
  intlayer: 900,
  'next-intlayer': 900,
  'react-i18next': 140,
  'react-intl': 130,
  'next-i18next': 120,
  'next-intl': 110,
  lingui: 100,
  'next-translate': 90,
  'use-intl': 80,
  'next-international': 70,
  tolgee: 60,
  paraglide: 50,
  'paraglide-next': 50,
  'lingo.dev': 30,
  'gt-next': 20,
  'gt-react': 20,
  wuchale: 10,
};

const INTLAYER_COMPAT_SCORE = 890;
const DEFAULT_POPULARITY_SCORE = 50;

export const getPopularityScore = (libId: string): number =>
  POPULARITY_SCORES[libId] ??
  (isIntlayerLib(libId) ? INTLAYER_COMPAT_SCORE : DEFAULT_POPULARITY_SCORE);

/** Categories to read instead when a library has no result for the requested one. */
const CATEGORY_FALLBACKS: Record<BenchmarkCategory, BenchmarkCategory[]> = {
  'scoped-dynamic': ['dynamic', 'scoped-static', 'static'],
  dynamic: ['static'],
  'scoped-static': ['static'],
  static: [],
};

export const resolveCategoryData = (
  libraryData: LibraryBenchmark | undefined,
  category: BenchmarkCategory
): CategoryBenchmark | null => {
  for (const candidate of [category, ...CATEGORY_FALLBACKS[category]]) {
    const categoryData = libraryData?.[candidate];
    if (categoryData) return categoryData;
  }

  return null;
};

/** Libraries of a report, sorted by popularity. */
export const buildLibraries = (
  summary: BenchmarkSummary | undefined,
  baseAppLabel: string
): LibInfo[] =>
  Object.entries(summary?.libs ?? {})
    .map(([libId, libraryData]) => ({
      id: libId,
      name: getDisplayName(libId, baseAppLabel),
      version: libraryData.global?.version ?? null,
    }))
    .sort(
      (libraryA, libraryB) =>
        getPopularityScore(libraryB.id) - getPopularityScore(libraryA.id)
    );

/** Chart rows of the active libraries for a metric, sorted ascending. */
export const buildChartData = ({
  metric,
  summary,
  libraries,
  activeLibs,
  category,
  isDarkMode,
}: {
  metric: MetricDefinition;
  summary: BenchmarkSummary | undefined;
  libraries: LibInfo[];
  activeLibs: Record<string, boolean>;
  category: BenchmarkCategory;
  isDarkMode: boolean;
}): ChartItem[] => {
  if (!summary?.libs) return [];

  return libraries
    .filter((library) => activeLibs[library.id] ?? true)
    .flatMap((library): ChartItem[] => {
      const libraryData = summary.libs[library.id];
      const categoryData = resolveCategoryData(libraryData, category);
      if (!libraryData || !categoryData) return [];

      const metricData = metric.extract(categoryData, libraryData);
      if (!metricData) return [];

      return [
        {
          label: library.name,
          libId: library.id,
          value: metric.transform(metricData.avg),
          min: metric.transform(metricData.min),
          max: metric.transform(metricData.max),
          color: getLibColor(library.id, isDarkMode),
          version: library.version,
        },
      ];
    })
    .sort((itemA, itemB) => itemA.value - itemB.value);
};
