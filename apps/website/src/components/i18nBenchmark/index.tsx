'use client';

import { Link } from '@components/Link/Link';
import {
  Button,
  ButtonColor,
  ButtonSize,
} from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H2, H3, H4 } from '@intlayer/design-system/headers';
import { CodeBlock } from '@intlayer/design-system/ide';
import {
  External_Examples,
  Website_Benchmark_Path,
} from '@intlayer/design-system/routes';
import {
  SwitchSelector,
  SwitchSelectorColor,
} from '@intlayer/design-system/switch-selector';
import { SmartTable } from '@intlayer/design-system/table';
import { TechLogo, TechLogoName } from '@intlayer/design-system/tech-logo';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

import { fetchBenchmarkData } from './benchmarkData';
import { ChartComponent, useLogoImages } from './ChartComponent';
import {
  type ChartItem,
  type FrameworkKey,
  LIB_COLORS,
  type LibInfo,
  type MetricData,
  type MetricDef,
} from './constants';
import { LibCard } from './LibCard';
import { LibLogo } from './LibLogo';
import { useBenchmarkMetrics } from './useBenchmarkMetrics';

export const getDisplayName = (id: string): string => {
  if (id === 'base') return 'Base App';
  return id
    .replace(/-app-nextjs$/, '')
    .replace(/-app-tanstack$/, '')
    .replace(/-app-vite-react$/, '');
};

const CATEGORY_FALLBACKS: Record<string, string[]> = {
  'scoped-dynamic': ['dynamic', 'scoped-static', 'static'],
  dynamic: ['static'],
  'scoped-static': ['static'],
  static: [],
};

const resolveCategoryData = (libData: any, category: string): any => {
  if (libData?.[category]) return libData[category];
  for (const fallback of CATEGORY_FALLBACKS[category] ?? []) {
    if (libData?.[fallback]) return libData[fallback];
  }
  return null;
};

const getMetricValue = (
  libraryData: any,
  metric: MetricDef,
  categories: string[]
): MetricData | null => {
  const availableCategories = categories
    .map((category) => resolveCategoryData(libraryData, category))
    .filter(Boolean);
  if (availableCategories.length === 0) return null;

  const values = availableCategories
    .map((categoryData) => metric.extract(categoryData, libraryData))
    .filter((value): value is MetricData => value !== null);

  if (values.length === 0) return null;

  const average =
    values.reduce((sum, current) => sum + current.avg, 0) / values.length;
  const minimum = Math.min(...values.map((current) => current.min));
  const maximum = Math.max(...values.map((current) => current.max));

  return { avg: average, min: minimum, max: maximum };
};

const buildChartData = (
  selectedMetric: MetricDef,
  currentFrameworkData: any,
  allLibs: LibInfo[],
  activeLibs: Record<string, boolean>,
  activeCategories: string[]
): ChartItem[] => {
  if (!selectedMetric || !currentFrameworkData?.libs) return [];

  return allLibs
    .filter((lib) => activeLibs[lib.id])
    .map((lib) => {
      const rawMetric = getMetricValue(
        currentFrameworkData.libs[lib.id],
        selectedMetric,
        activeCategories
      );

      if (!rawMetric) return null;

      return {
        label: lib.name,
        libId: lib.id,
        value: selectedMetric.transform(rawMetric.avg),
        min: selectedMetric.transform(rawMetric.min),
        max: selectedMetric.transform(rawMetric.max),
        color: LIB_COLORS[lib.id] || '#94a3b8',
        version: lib.version,
      };
    })
    .filter((d): d is ChartItem => d !== null)
    .sort((a, b) => (a?.value ?? 0) - (b?.value ?? 0));
};

export type { FrameworkKey };

export const I18nBenchmark = ({
  initialFramework,
}: {
  initialFramework?: FrameworkKey;
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
    dynamicLoading,
    dynamicLoadingDesc,
    scopedNamespacing,
    scopedNamespacingDesc,
    library,
    value,
    range,
    version,
  } = useIntlayer('i18n-benchmark');

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const METRICS = useBenchmarkMetrics(metricsContent);

  const [framework, setFramework] = useState<FrameworkKey>(
    initialFramework ?? 'nextjs'
  );
  const [selectedMetricIndex, setSelectedMetricIndex] = useState(0);
  const [activeLibs, setActiveLibs] = useState<Record<string, boolean>>({});
  const [dynamicEnabled, setDynamicEnabled] = useState(false);
  const [scopedEnabled, setScopedEnabled] = useState(false);
  const [renderMode, setRenderMode] = useState<'graph' | 'table' | 'json'>(
    'graph'
  );

  const activeCategories = useMemo(() => {
    if (dynamicEnabled && scopedEnabled) return ['scoped-dynamic'];
    if (dynamicEnabled) return ['dynamic'];
    if (scopedEnabled) return ['scoped-static'];
    return ['static'];
  }, [dynamicEnabled, scopedEnabled]);

  const [currentFrameworkData, setCurrentFrameworkData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      const category = activeCategories[0];
      try {
        const data = await fetchBenchmarkData(framework, category);
        if (isMounted) setCurrentFrameworkData(data);
      } catch (err) {
        console.error('Error loading benchmark data', err);
        if (isMounted) setCurrentFrameworkData(null);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [framework, activeCategories]);

  const allLibs = useMemo<LibInfo[]>(() => {
    if (!currentFrameworkData?.libs) return [];
    return Object.keys(currentFrameworkData.libs).map((id) => ({
      id,
      name: getDisplayName(id),
      version: currentFrameworkData.libs[id].global?.version ?? null,
    }));
  }, [currentFrameworkData]);

  useEffect(() => {
    setActiveLibs(Object.fromEntries(allLibs.map((lib) => [lib.id, true])));
  }, [allLibs]);

  const toggleLib = (id: string) =>
    setActiveLibs((prev) => ({ ...prev, [id]: !prev[id] }));

  const logoImagesReady = useLogoImages();
  const selectedMetric = METRICS[selectedMetricIndex];

  const chartData = useMemo<ChartItem[]>(
    () =>
      buildChartData(
        selectedMetric,
        currentFrameworkData,
        allLibs,
        activeLibs,
        activeCategories
      ),
    [
      allLibs,
      activeLibs,
      selectedMetric,
      currentFrameworkData,
      activeCategories,
    ]
  );

  const chartHeight = useMemo(
    () => Math.max(280, chartData.length * 38 + 48),
    [chartData.length]
  );

  return (
    <>
      <div className="flex flex-col gap-8 px-10 lg:flex-row">
        {/* ── Left Sidebar ── */}
        <div className="flex h-auto flex-1 flex-col justify-between gap-10 lg:max-w-64">
          <div className="w-full shrink-0 space-y-6">
            {/* Framework selector */}
            {!initialFramework && (
              <div>
                <H3 className="mb-10 text-neutral">{frameworkLabel}</H3>
                <SwitchSelector
                  size="sm"
                  choices={[
                    {
                      content: (
                        <span className="flex items-center gap-1.5 px-1">
                          <TechLogo
                            name={TechLogoName.Nextjs}
                            className="size-3.5"
                          />
                          Next.js
                        </span>
                      ) as any,
                      value: 'nextjs',
                    },
                    {
                      content: (
                        <span className="flex items-center gap-1.5 px-1">
                          <TechLogo
                            name={TechLogoName.Tanstack}
                            className="size-3.5"
                          />
                          TanStack
                        </span>
                      ) as any,
                      value: 'tanstack',
                    },
                  ]}
                  value={framework}
                  onChange={(value) => setFramework(value as FrameworkKey)}
                  className="w-full"
                  color={SwitchSelectorColor.LIGHT}
                />
              </div>
            )}

            {/* Category toggles */}
            <div className="mt-20 space-y-4">
              {[
                {
                  id: 'dynamic',
                  label: dynamicLoading,
                  desc: dynamicLoadingDesc,
                  value: dynamicEnabled,
                  onChange: setDynamicEnabled,
                },
                {
                  id: 'scoped',
                  label: scopedNamespacing,
                  desc: scopedNamespacingDesc,
                  value: scopedEnabled,
                  onChange: setScopedEnabled,
                },
              ].map(({ id, label, desc, value, onChange }) => (
                <div
                  key={id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <H4>{label}</H4>
                    <p className="text-neutral text-sm leading-snug">{desc}</p>
                  </div>
                  <SwitchSelector
                    size="sm"
                    value={value}
                    onChange={onChange}
                    color={SwitchSelectorColor.LIGHT}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              label={seeBenchmark.value}
              variant="button-outlined"
              color={ButtonColor.TEXT}
              size={ButtonSize.SM}
              href={External_Examples}
            >
              {seeBenchmark}
            </Link>
            <Link
              label={readFullReport.value}
              variant="button"
              color="text"
              size="sm"
              href={Website_Benchmark_Path}
            >
              <span className="flex items-center gap-1">
                {readFullReport}
                <ChevronRight />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <H2>{title}</H2>

          {/* Metric tabs */}
          <div className="flex w-full flex-wrap justify-center gap-1.5">
            {METRICS.map((metric, index) => (
              <Button
                label={metric.label}
                key={metric.id}
                color="text"
                variant="hoverable"
                onClick={() => {
                  setSelectedMetricIndex(index);
                }}
                className="cursor-pointer rounded-full px-3 py-1 font-semibold text-xs transition"
                isActive={selectedMetricIndex === index}
              >
                {metric.label}
              </Button>
            ))}
          </div>

          {/* Chart + insight panel */}
          <Container
            padding="md"
            roundedSize="2xl"
            background="none"
            border
            borderColor="neutral"
          >
            <div className="flex flex-col gap-8 md:flex-row">
              {/* Chart */}
              <div className="min-w-0 flex-1" style={{ height: chartHeight }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${framework}-${selectedMetricIndex}-${activeCategories.join(',')}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="h-full w-full"
                  >
                    {chartData.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-neutral text-sm">
                        {noData}
                      </div>
                    ) : renderMode === 'graph' ? (
                      <ChartComponent
                        data={chartData}
                        unit={selectedMetric?.unit}
                        logoImages={logoImagesReady}
                      />
                    ) : renderMode === 'table' ? (
                      <div className="h-full w-full overflow-auto text-sm">
                        <SmartTable isInteractive displayModal>
                          <thead>
                            <tr>
                              <th className="px-4 py-2 font-semibold">
                                {library.value}
                              </th>
                              <th className="px-4 py-2 text-right font-semibold">
                                {value.value} ({selectedMetric?.unit})
                              </th>
                              <th className="px-4 py-2 text-right font-semibold">
                                {range.value}
                              </th>
                              <th className="px-4 py-2 font-semibold">
                                {version.value}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {chartData.map((d) => (
                              <tr key={d.libId}>
                                <td className="flex items-center gap-2 px-4 py-2">
                                  <LibLogo
                                    id={d.libId}
                                    className="h-4 w-auto max-w-[60px]"
                                  />
                                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                    {d.label}
                                  </span>
                                </td>
                                <td className="px-4 py-2 text-right text-neutral-800 dark:text-neutral-200">
                                  {d.value.toFixed(1)}
                                </td>
                                <td className="px-4 py-2 text-right text-neutral-800 dark:text-neutral-200">
                                  {d.min !== d.max
                                    ? `${d.min.toFixed(1)} - ${d.max.toFixed(1)}`
                                    : '-'}
                                </td>
                                <td className="px-4 py-2 text-neutral text-xs">
                                  {d.version ? `v${d.version}` : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </SmartTable>
                      </div>
                    ) : (
                      <div className="h-full w-full overflow-auto">
                        <CodeBlock
                          lang="json"
                          isDarkMode={isDarkMode}
                          className="h-full text-xs"
                        >
                          {JSON.stringify(chartData, null, 2)}
                        </CodeBlock>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Insight panel */}
              <div className="relative flex w-full flex-col gap-3 border-background pt-10 md:w-56 md:shrink-0 md:border-l md:pl-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMetricIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.18 }}
                    className="flex h-full flex-col justify-between"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <H4>{whatIsThisMetric}</H4>
                        <p className="text-neutral-500 text-xs leading-relaxed dark:text-neutral">
                          {selectedMetric?.whatIsIt}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <H4>{whyItsImportant}</H4>
                        <p className="text-neutral-500 text-xs leading-relaxed dark:text-neutral">
                          {selectedMetric?.whyItsImportant}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 border-neutral/20 border-t pt-2 dark:border-neutral/10">
                      <H4 className="font-semibold text-sm">
                        {renderLabel.value}
                      </H4>
                      <SwitchSelector
                        size="sm"
                        choices={[
                          { content: renderGraph.value, value: 'graph' },
                          { content: renderTable.value, value: 'table' },
                          { content: renderJson.value, value: 'json' },
                        ]}
                        value={renderMode}
                        onChange={(value) => setRenderMode(value as any)}
                        className="w-full"
                        color={SwitchSelectorColor.LIGHT}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Library selector — 2-row scrollable grid */}
      <div className="grid grid-cols-4 gap-2 px-20">
        {allLibs.map((lib) => (
          <LibCard
            key={lib.id}
            lib={lib}
            isActive={activeLibs[lib.id] ?? true}
            onToggle={() => toggleLib(lib.id)}
          />
        ))}
      </div>
    </>
  );
};
