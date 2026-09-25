import { describe, expect, it } from 'vitest';
import { BENCHMARK_METRICS, type MetricId } from './benchmarkMetrics';
import {
  buildChartData,
  buildLibraries,
  getDisplayName,
  resolveCategoryData,
} from './benchmarkUtils';
import type { BenchmarkSummary } from './constants';

const getMetric = (metricId: MetricId) => {
  const metric = BENCHMARK_METRICS.find(({ id }) => id === metricId);
  if (!metric) throw new Error(`Unknown metric ${metricId}`);
  return metric;
};

const summary: BenchmarkSummary = {
  libs: {
    base: {
      global: { version: null },
      static: {
        reactivity: {
          status: 'ok',
          e2eAvgMs: 8,
          byLocale: {
            en: { e2e: { avg: 8, min: 7, max: 9 } },
            fr: { e2e: { avg: 8, min: 6.5, max: 12 } },
          },
        },
        rendering: { hydrationAvgMs: 4 },
      },
    },
    intlayer: {
      global: { version: '9.0.0', libSize: { status: 'ok', gzip: 2048 } },
      static: {
        reactivity: { status: 'ok', e2eAvgMs: 3.25 },
        rendering: {
          hydrationAvgMs: 5,
          byLocale: {
            en: {
              hydration: { avg: 5, min: 2, max: 9 },
              hydrationInstrumented: true,
            },
          },
        },
      },
    },
    'react-i18next': {
      global: { version: '15.0.0' },
      static: { reactivity: { status: 'missing' } },
    },
  },
};

const baseOptions = {
  summary,
  libraries: buildLibraries(summary, 'Base App'),
  activeLibs: {},
  category: 'static' as const,
  isDarkMode: false,
};

describe('getDisplayName', () => {
  it('maps ids to readable names', () => {
    expect(getDisplayName('base', 'Base App')).toBe('Base App');
    expect(getDisplayName('intlayer-app-tanstack', 'Base App')).toBe(
      'Intlayer'
    );
    expect(getDisplayName('intlayer-compat-next-intl', 'Base App')).toBe(
      '@intlayer/next-intl'
    );
    expect(getDisplayName('next-intl', 'Base App')).toBe('next-intl');
  });
});

describe('buildLibraries', () => {
  it('sorts libraries by popularity and reads versions', () => {
    expect(buildLibraries(summary, 'Base App')).toEqual([
      { id: 'base', name: 'Base App', version: null },
      { id: 'intlayer', name: 'Intlayer', version: '9.0.0' },
      { id: 'react-i18next', name: 'react-i18next', version: '15.0.0' },
    ]);
  });
});

describe('resolveCategoryData', () => {
  it('falls back to a less specific category', () => {
    expect(resolveCategoryData(summary.libs.intlayer, 'scoped-dynamic')).toBe(
      summary.libs.intlayer.static
    );
    expect(resolveCategoryData(undefined, 'static')).toBeNull();
  });
});

describe('buildChartData', () => {
  it('reports locale switch reactivity with the per-locale range', () => {
    const chartData = buildChartData({
      ...baseOptions,
      metric: getMetric('reactivity'),
    });

    expect(
      chartData.map(({ libId, value, min, max }) => ({
        libId,
        value,
        min,
        max,
      }))
    ).toEqual([
      { libId: 'intlayer', value: 3.3, min: 3.3, max: 3.3 },
      { libId: 'base', value: 8, min: 6.5, max: 12 },
    ]);
  });

  it('reports hydration time', () => {
    const chartData = buildChartData({
      ...baseOptions,
      metric: getMetric('hydration'),
    });

    expect(chartData.map(({ libId, min, max }) => [libId, min, max])).toEqual([
      ['base', 4, 4],
      ['intlayer', 2, 9],
    ]);
  });

  it('converts library size to KB and skips unmeasured libraries', () => {
    const chartData = buildChartData({
      ...baseOptions,
      metric: getMetric('lib-size'),
    });

    expect(chartData).toHaveLength(1);
    expect(chartData[0]).toMatchObject({ libId: 'intlayer', value: 2 });
  });

  it('hides libraries toggled off', () => {
    const chartData = buildChartData({
      ...baseOptions,
      activeLibs: { base: false },
      metric: getMetric('reactivity'),
    });

    expect(chartData.map(({ libId }) => libId)).toEqual(['intlayer']);
  });
});
