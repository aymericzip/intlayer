import type {
  BenchmarkCategory,
  BenchmarkSummary,
  FrameworkKey,
} from './constants';

const GITHUB_RAW_BASE_URL =
  'https://raw.githubusercontent.com/intlayer-org/benchmark-i18n/main/report/scripts';

/** Framework segment used in the report file names. */
const REPORT_FRAMEWORK_NAMES: Record<FrameworkKey, string> = {
  nextjs: 'nextjs',
  tanstack: 'tanstack',
  'vite-vue': 'vite_vue',
  'vite-solid': 'vite_solid',
  'vite-svelte': 'vite_svelte',
};

/** Every loading strategy a summary is published for. */
export const BENCHMARK_CATEGORIES: readonly BenchmarkCategory[] = [
  'static',
  'dynamic',
  'scoped-static',
  'scoped-dynamic',
];

/** URL of the published JSON summary of one framework and category. */
export const getBenchmarkReportUrl = (
  framework: FrameworkKey,
  category: BenchmarkCategory
): string =>
  `${GITHUB_RAW_BASE_URL}/summarize-${REPORT_FRAMEWORK_NAMES[framework]}-${category}.json`;

/** Fetches the published benchmark summary of one framework and category. */
export const fetchBenchmarkData = async (
  framework: FrameworkKey,
  category: BenchmarkCategory
): Promise<BenchmarkSummary> => {
  const response = await fetch(getBenchmarkReportUrl(framework, category));

  if (!response.ok) {
    throw new Error(`Failed to fetch benchmark data: ${response.statusText}`);
  }

  return response.json();
};
