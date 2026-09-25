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

/** Fetches the published benchmark summary of one framework and category. */
export const fetchBenchmarkData = async (
  framework: FrameworkKey,
  category: BenchmarkCategory
): Promise<BenchmarkSummary> => {
  const url = `${GITHUB_RAW_BASE_URL}/summarize-${REPORT_FRAMEWORK_NAMES[framework]}-${category}.json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch benchmark data: ${response.statusText}`);
  }

  return response.json();
};
