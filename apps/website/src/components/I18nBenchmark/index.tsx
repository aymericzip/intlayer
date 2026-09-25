import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H2 } from '@intlayer/design-system/headers';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Loader } from '@intlayer/design-system/loader';
import {
  External_Github_i18n_benchmark,
  Website_Benchmark_Path,
} from '@intlayer/design-system/routes';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { cn } from '@intlayer/design-system/utils';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { type FC, type ReactNode, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { useTheme } from '~/providers/ThemeProvider';
import { BenchmarkTable } from './BenchmarkTable';
import { fetchBenchmarkData } from './benchmarkData';
import { BENCHMARK_METRICS, type MetricId } from './benchmarkMetrics';
import { buildChartData, buildLibraries } from './benchmarkUtils';
import { ChartComponent, useLogoImages } from './ChartComponent';
import type { BenchmarkCategory, FrameworkKey } from './constants';
import { FrameworkSelector } from './FrameworkSelector';
import { LibCard } from './LibCard';

export type { FrameworkKey };

type RenderMode = 'graph' | 'table' | 'json';

const BENCHMARK_STALE_TIME_MS = 60 * 60 * 1000;

/** Metric tabs per row: bundle metrics first, then runtime metrics. */
const METRICS_PER_ROW = 4;

const METRIC_ROWS = [
  BENCHMARK_METRICS.slice(0, METRICS_PER_ROW),
  BENCHMARK_METRICS.slice(METRICS_PER_ROW),
];

/** Keys of invisible flex items keeping the last library row from stretching. */
const LIB_GRID_FILLER_KEYS = Array.from(
  { length: 6 },
  (_, fillerIndex) => `filler-${fillerIndex}`
);

const getCategory = (
  isDynamicEnabled: boolean,
  isScopedEnabled: boolean
): BenchmarkCategory => {
  if (isDynamicEnabled && isScopedEnabled) return 'scoped-dynamic';
  if (isDynamicEnabled) return 'dynamic';
  if (isScopedEnabled) return 'scoped-static';
  return 'static';
};

type CategoryToggleProps = {
  label: ReactNode;
  description: ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
};

const CategoryToggle: FC<CategoryToggleProps> = ({
  label,
  description,
  value,
  onChange,
}) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="font-bold text-lg">{label}</p>
      <p className="text-muted-foreground text-sm leading-snug">
        {description}
      </p>
    </div>
    <SwitchSelector size="sm" value={value} onChange={onChange} color="text" />
  </div>
);

type I18nBenchmarkProps = {
  /** Locks the benchmark to one framework and hides the framework selector. */
  initialFramework?: FrameworkKey;
  vertical?: boolean;
  /** Hides the loading strategy toggles and the render mode selector. */
  hideControls?: boolean;
};

export const I18nBenchmark: FC<I18nBenchmarkProps> = ({
  initialFramework,
  vertical = true,
  hideControls = false,
}) => {
  const {
    title,
    framework: frameworkLabel,
    seeBenchmark,
    readFullReport,
    whatIsThisMetric,
    whyItsImportant,
    renderLabel,
    renderGraph,
    renderTable,
    renderJson,
    metrics: metricsContent,
    noData,
    errorLoadingData,
    dynamicLoading,
    dynamicLoadingDesc,
    scopedNamespacing,
    scopedNamespacingDesc,
    library,
    value,
    range,
    version,
    baseApp,
    nextjs,
    tanstack,
    vite_vue,
    vite_solid,
    vite_svelte,
  } = useIntlayer('i18n-benchmark');

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const [framework, setFramework] = useState<FrameworkKey>(
    initialFramework ?? 'nextjs'
  );
  const [selectedMetricId, setSelectedMetricId] =
    useState<MetricId>('lib-size');
  // Only explicit toggles are stored; a library missing here is active.
  const [activeLibs, setActiveLibs] = useState<Record<string, boolean>>({});
  const [isDynamicEnabled, setIsDynamicEnabled] = useState(false);
  const [isScopedEnabled, setIsScopedEnabled] = useState(false);
  const [renderMode, setRenderMode] = useState<RenderMode>('graph');

  const category = getCategory(isDynamicEnabled, isScopedEnabled);

  const {
    data: summary,
    isLoading: isBenchmarkLoading,
    isError,
  } = useQuery({
    queryKey: ['benchmarkData', framework, category],
    queryFn: () => fetchBenchmarkData(framework, category),
    staleTime: BENCHMARK_STALE_TIME_MS,
  });

  const { data: logoImages = {}, isLoading: isLogosLoading } = useLogoImages();

  const isLoading = isBenchmarkLoading || isLogosLoading;

  const selectedMetric =
    BENCHMARK_METRICS.find((metric) => metric.id === selectedMetricId) ??
    BENCHMARK_METRICS[0];
  const selectedMetricContent = metricsContent[selectedMetric.id];

  // Dictionary nodes are rebuilt on every render: depend on `.value` only.
  const baseAppLabel = baseApp.value;

  const libraries = useMemo(
    () => buildLibraries(summary, baseAppLabel),
    [summary, baseAppLabel]
  );

  const chartData = useMemo(
    () =>
      buildChartData({
        metric: selectedMetric,
        summary,
        libraries,
        activeLibs,
        category,
        isDarkMode,
      }),
    [selectedMetric, summary, libraries, activeLibs, category, isDarkMode]
  );

  const toggleLib = (libId: string) =>
    setActiveLibs((previousActiveLibs) => ({
      ...previousActiveLibs,
      [libId]: !(previousActiveLibs[libId] ?? true),
    }));

  const renderChartContent = () => {
    if (isLoading) return <Loader className="h-full min-h-40" />;

    if (isError) {
      return (
        <div className="flex h-full items-center justify-center text-error text-sm">
          {errorLoadingData}
        </div>
      );
    }

    if (chartData.length === 0) {
      return (
        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
          {noData}
        </div>
      );
    }

    if (renderMode === 'table') {
      return (
        <BenchmarkTable
          data={chartData}
          unit={selectedMetric.unit}
          headers={{
            library: library.value,
            value: value.value,
            range: range.value,
            version: version.value,
          }}
        />
      );
    }

    if (renderMode === 'json') {
      return (
        <div className="size-full overflow-auto">
          <CodeBlock lang="json" className="h-full text-xs">
            {JSON.stringify(chartData, null, 2)}
          </CodeBlock>
        </div>
      );
    }

    return (
      <ChartComponent
        data={chartData}
        unit={selectedMetric.unit}
        logoImages={logoImages}
        isDarkMode={isDarkMode}
      />
    );
  };

  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-8',
          vertical ? 'flex-col' : 'lg:flex-row'
        )}
      >
        {/* Left sidebar */}
        <div className="flex h-auto flex-1 flex-col justify-between gap-10 lg:max-w-64">
          <div className="w-full shrink-0 space-y-6">
            {!initialFramework && (
              <div>
                <p className="mb-10 font-bold text-base text-muted-foreground">
                  {frameworkLabel}
                </p>
                <FrameworkSelector
                  value={framework}
                  onChange={setFramework}
                  labels={{
                    nextjs,
                    tanstack,
                    'vite-vue': vite_vue,
                    'vite-solid': vite_solid,
                    'vite-svelte': vite_svelte,
                  }}
                />
              </div>
            )}

            {!hideControls && (
              <div className="mt-20 space-y-4">
                <CategoryToggle
                  label={dynamicLoading}
                  description={dynamicLoadingDesc}
                  value={isDynamicEnabled}
                  onChange={setIsDynamicEnabled}
                />
                <CategoryToggle
                  label={scopedNamespacing}
                  description={scopedNamespacingDesc}
                  value={isScopedEnabled}
                  onChange={setIsScopedEnabled}
                />
              </div>
            )}
          </div>

          {!vertical && (
            <div className="flex flex-col gap-4">
              <Link
                label={seeBenchmark.value}
                variant="button-outlined"
                color="text"
                size="md"
                roundedSize="sm"
                to={External_Github_i18n_benchmark}
              >
                {seeBenchmark}
              </Link>
              <Link
                label={readFullReport.value}
                variant="button"
                color="text"
                size="md"
                roundedSize="sm"
                to={Website_Benchmark_Path}
              >
                <span className="flex items-center gap-1">
                  {readFullReport}
                  <ChevronRight />
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <H2>{title}</H2>

          <Container
            padding="md"
            roundedSize="2xl"
            background="none"
            border
            borderColor="neutral"
            className={cn(
              'flex',
              vertical ? 'flex-col' : 'flex-col md:flex-row'
            )}
          >
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${framework}-${selectedMetric.id}-${category}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="size-full"
                >
                  {renderChartContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Insight panel */}
            <div
              className={cn(
                'relative flex w-full flex-col gap-3 border-neutral/10 pt-10',
                vertical
                  ? 'md:w-full'
                  : 'md:w-56 md:shrink-0 md:border-l md:pl-6'
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMetric.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-full flex-col justify-between"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-lg">{whatIsThisMetric}</p>
                      <p className="text-neutral-500 text-xs leading-relaxed dark:text-muted-foreground">
                        {selectedMetricContent.whatIsIt}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-lg">{whyItsImportant}</p>
                      <p className="text-neutral-500 text-xs leading-relaxed dark:text-muted-foreground">
                        {selectedMetricContent.whyItsImportant}
                      </p>
                    </div>
                  </div>

                  {!hideControls && (
                    <div className="mt-6 flex flex-col gap-2 border-neutral/20 border-t pt-2 dark:border-neutral/10">
                      <p className="font-semibold text-sm">{renderLabel}</p>
                      <SwitchSelector<RenderMode>
                        size="sm"
                        choices={[
                          { content: renderGraph.value, value: 'graph' },
                          { content: renderTable.value, value: 'table' },
                          { content: renderJson.value, value: 'json' },
                        ]}
                        value={renderMode}
                        onChange={setRenderMode}
                        className="w-full"
                        color="text"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>

          <div className="flex w-full flex-col items-center gap-1.5">
            {METRIC_ROWS.map((metricRow) => (
              <div
                key={metricRow[0].id}
                className="flex flex-wrap justify-center gap-1.5"
              >
                {metricRow.map((metric) => {
                  const metricLabel = metricsContent[metric.id].label.value;

                  return (
                    <Button
                      key={metric.id}
                      label={metricLabel}
                      color="text"
                      variant="hoverable"
                      onClick={() => setSelectedMetricId(metric.id)}
                      className="cursor-pointer rounded-full px-3 py-1 font-semibold text-xs transition"
                      isActive={selectedMetric.id === metric.id}
                    >
                      {metricLabel}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Library selector */}
      <div className="max-h-60 overflow-y-auto rounded-lg border">
        <div className="flex flex-wrap">
          {libraries.map((libraryInfo, index) => (
            <div
              key={libraryInfo.id}
              className={cn(
                'min-w-max border-border border-r border-b border-dashed p-2',
                index < 2 ? 'flex-[2_2_16rem]' : 'flex-[1_1_10rem]'
              )}
            >
              <LibCard
                lib={libraryInfo}
                isActive={activeLibs[libraryInfo.id] ?? true}
                onToggle={() => toggleLib(libraryInfo.id)}
              />
            </div>
          ))}
          {LIB_GRID_FILLER_KEYS.map((fillerKey) => (
            <div
              key={fillerKey}
              className="m-0 h-0 flex-[1_1_10rem] border-0 p-0"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </>
  );
};
