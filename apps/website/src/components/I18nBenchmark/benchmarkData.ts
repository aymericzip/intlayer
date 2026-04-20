import type { FrameworkKey } from './constants';

const GITHUB_RAW_BASE_URL =
  'https://raw.githubusercontent.com/intlayer-org/benchmark-bloom/main/report/scripts';

export const fetchBenchmarkData = async (
  framework: FrameworkKey,
  category: 'static' | 'dynamic' | 'scoped-static' | 'scoped-dynamic'
) => {
  let mappedFramework: string;

  switch (framework) {
    case 'tanstack':
      mappedFramework = 'tanstack';
      break;
    case 'vite-react':
      mappedFramework = 'vite-react';
      break;
    case 'nextjs':
    default:
      mappedFramework = 'nextjs';
      break;
  }

  const url = `${GITHUB_RAW_BASE_URL}/summarize-${mappedFramework}-${category}.json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch benchmark data: ${response.statusText}`);
  }

  return response.json();
};
