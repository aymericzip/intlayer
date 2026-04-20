import { useMemo } from 'react';
import type { MetricDef } from './constants';

export const extractWithLocaleStats = (
  categoryData: any,
  averagePath: string[],
  byLocalePath: string[],
  metricKey: string
) => {
  let averageValue = categoryData;
  for (const key of averagePath) averageValue = averageValue?.[key];
  if (typeof averageValue !== 'number') return null;

  let min = averageValue;
  let max = averageValue;

  let byLocaleData = categoryData;
  for (const key of byLocalePath) byLocaleData = byLocaleData?.[key];

  if (byLocaleData && typeof byLocaleData === 'object') {
    let realMinimum = Infinity;
    let realMaximum = -Infinity;
    for (const locale of Object.values(byLocaleData) as any[]) {
      const localeData = locale?.[metricKey];
      if (localeData && typeof localeData.min === 'number')
        realMinimum = Math.min(realMinimum, localeData.min);
      if (localeData && typeof localeData.max === 'number')
        realMaximum = Math.max(realMaximum, localeData.max);
    }
    if (realMinimum !== Infinity) min = realMinimum;
    if (realMaximum !== -Infinity) max = realMaximum;
  }

  return { avg: averageValue, min, max };
};

export const useBenchmarkMetrics = (metricsContent: any) =>
  useMemo<MetricDef[]>(
    () => [
      {
        id: 'lib-size',
        label: metricsContent['lib-size'].label.value,
        extract: (_, libraryData) => {
          const libSize = libraryData.global?.libSize;
          if (libSize?.status !== 'ok' || typeof libSize.gzip !== 'number')
            return null;
          return {
            avg: libSize.gzip,
            min: libSize.gzip,
            max: libSize.gzip,
          };
        },
        unit: 'KB',
        transform: (value) => Number((value / 1024).toFixed(1)),
        whatIsIt: metricsContent['lib-size'].whatIsIt.value,
        whyItsImportant: metricsContent['lib-size'].whyItsImportant.value,
      },
      {
        id: 'comp-avg',
        label: metricsContent['comp-avg'].label.value,
        extract: (categoryData) => {
          if (typeof categoryData.components?.gzipAvg !== 'number') return null;
          return {
            avg: categoryData.components.gzipAvg,
            min:
              categoryData.components.gzipMin ??
              categoryData.components.gzipAvg,
            max:
              categoryData.components.gzipMax ??
              categoryData.components.gzipAvg,
          };
        },
        unit: 'KB',
        transform: (value) => Number((value / 1024).toFixed(1)),
        whatIsIt: metricsContent['comp-avg'].whatIsIt.value,
        whyItsImportant: metricsContent['comp-avg'].whyItsImportant.value,
      },
      {
        id: 'page-size',
        label: metricsContent['page-size'].label.value,
        extract: (categoryData) => {
          if (typeof categoryData.pageBundle?.jsGzipAvg !== 'number')
            return null;
          return {
            avg: categoryData.pageBundle.jsGzipAvg,
            min:
              categoryData.pageBundle.jsGzipMin ??
              categoryData.pageBundle.jsGzipAvg,
            max:
              categoryData.pageBundle.jsGzipMax ??
              categoryData.pageBundle.jsGzipAvg,
          };
        },
        unit: 'KB',
        transform: (value) => Number((value / 1024).toFixed(1)),
        whatIsIt: metricsContent['page-size'].whatIsIt.value,
        whyItsImportant: metricsContent['page-size'].whyItsImportant.value,
      },
      {
        id: 'locale-leak',
        label: metricsContent['locale-leak'].label.value,
        extract: (categoryData) =>
          extractWithLocaleStats(
            categoryData,
            ['pageBundle', 'localeLeakAvgPct'],
            ['pageBundle', 'byLocale'],
            'localeLeakPct'
          ),
        unit: '%',
        transform: (value) => Number(value.toFixed(1)),
        whatIsIt: metricsContent['locale-leak'].whatIsIt.value,
        whyItsImportant: metricsContent['locale-leak'].whyItsImportant.value,
      },
      {
        id: 'page-leak',
        label: metricsContent['page-leak'].label.value,
        extract: (categoryData) =>
          extractWithLocaleStats(
            categoryData,
            ['pageBundle', 'otherPageContentLeakAvgPct'],
            ['pageBundle', 'byLocale'],
            'otherPageContentLeakPct'
          ),
        unit: '%',
        transform: (value) => Number(value.toFixed(1)),
        whatIsIt: metricsContent['page-leak'].whatIsIt.value,
        whyItsImportant: metricsContent['page-leak'].whyItsImportant.value,
      },
      {
        id: 'page-load',
        label: metricsContent['page-load'].label.value,
        extract: (categoryData) =>
          extractWithLocaleStats(
            categoryData,
            ['rendering', 'e2ePageLoadAvgMs'],
            ['rendering', 'byLocale'],
            'e2ePageLoad'
          ),
        unit: 'ms',
        transform: (value) => Number(value.toFixed(1)),
        whatIsIt: metricsContent['page-load'].whatIsIt.value,
        whyItsImportant: metricsContent['page-load'].whyItsImportant.value,
      },
      {
        id: 'hydration',
        label: metricsContent.hydration.label.value,
        extract: (categoryData) =>
          extractWithLocaleStats(
            categoryData,
            ['rendering', 'hydrationAvgMs'],
            ['rendering', 'byLocale'],
            'hydration'
          ),
        unit: 'ms',
        transform: (value) => Number(value.toFixed(1)),
        whatIsIt: metricsContent.hydration.whatIsIt.value,
        whyItsImportant: metricsContent.hydration.whyItsImportant.value,
      },
      {
        id: 'profiler',
        label: metricsContent.profiler.label.value,
        extract: (categoryData) =>
          extractWithLocaleStats(
            categoryData,
            ['reactivity', 'profilerAvgMs'],
            ['reactivity', 'byLocale'],
            'profiler'
          ),
        unit: 'ms',
        transform: (value) => Number(value.toFixed(2)),
        whatIsIt: metricsContent.profiler.whatIsIt.value,
        whyItsImportant: metricsContent.profiler.whyItsImportant.value,
      },
      {
        id: 'reactivity',
        label: metricsContent.reactivity.label.value,
        extract: (categoryData) =>
          extractWithLocaleStats(
            categoryData,
            ['reactivity', 'e2eAvgMs'],
            ['reactivity', 'byLocale'],
            'e2e'
          ),
        unit: 'ms',
        transform: (value) => Number(value.toFixed(1)),
        whatIsIt: metricsContent.reactivity.whatIsIt.value,
        whyItsImportant: metricsContent.reactivity.whyItsImportant.value,
      },
    ],
    [metricsContent]
  );
