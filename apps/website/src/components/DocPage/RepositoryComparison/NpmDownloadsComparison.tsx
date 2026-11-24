import { buildDatasetJsonLd } from '@intlayer/design-system/structured-data';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { JsonLd } from '~/components/JsonLd';
import {
  loadDownloadCounts,
  NPM_DOWNLOAD_PERIODS,
  type NpmDownloadPeriod,
  type PeriodDownloadCounts,
} from '~/serverFunctions/repositoryStats';
import { ComparisonBarChart } from './ComparisonBarChart';

export type NpmDownloadsComparisonProps = {
  /** npm package names, e.g. `next-intl`. */
  packageNames: string[];
  /** Period selected first, `last-6-months` by default. */
  initialPeriod?: NpmDownloadPeriod;
};

type DownloadCountsByPeriod = Record<NpmDownloadPeriod, PeriodDownloadCounts>;

type NpmDownloadsChartProps = {
  packageNames: string[];
  period: NpmDownloadPeriod;
  onPeriodChange: (period: NpmDownloadPeriod) => void;
  /** Counts of every period, undefined while they load (null if they failed). */
  downloadCountsByPeriod?: DownloadCountsByPeriod | null;
};

/** The chart and its dataset, pending until `downloadCountsByPeriod` is given. */
const NpmDownloadsChart: FC<NpmDownloadsChartProps> = ({
  packageNames,
  period,
  onPeriodChange,
  downloadCountsByPeriod,
}) => {
  const {
    downloads,
    unavailable,
    downloadsSource,
    periods,
    downloadsDatasetName,
    downloadsDatasetDescription,
  } = useIntlayer('repository-comparison');
  const periodDownloadCounts = downloadCountsByPeriod?.[period];

  const items = packageNames.map((packageName) => ({
    label: packageName,
    libraryId: packageName,
    value:
      periodDownloadCounts?.downloadCounts.find(
        (downloadCount) => downloadCount.packageName === packageName
      )?.downloadCount ?? null,
  }));

  return (
    <>
      <JsonLd
        jsonLd={buildDatasetJsonLd({
          name: `${downloadsDatasetName.value} (${periods[period].value})`,
          description: `${downloadsDatasetDescription.value} ${packageNames.join(', ')}.`,
          keywords: ['i18n', 'npm', 'downloads', ...packageNames],
          isBasedOn: packageNames.map(
            (packageName) => `https://www.npmjs.com/package/${packageName}`
          ),
          measurementTechnique: 'npm registry downloads API',
          // The range the counts were taken over, baked with them at build time
          ...(periodDownloadCounts
            ? {
                temporalCoverage: periodDownloadCounts.dateRange.replace(
                  ':',
                  '/'
                ),
              }
            : {}),
          variableMeasured: items.map((item) => ({
            name: item.label,
            value: item.value,
            unitText: downloads.value,
          })),
        })}
      />
      <ComparisonBarChart
        items={items}
        isPending={downloadCountsByPeriod === undefined}
        unit={downloads}
        unavailableLabel={unavailable}
        header={
          <div className="overflow-x-auto">
            <SwitchSelector<NpmDownloadPeriod>
              size="sm"
              color="text"
              choices={NPM_DOWNLOAD_PERIODS.map((downloadPeriod) => ({
                content: periods[downloadPeriod],
                value: downloadPeriod,
              }))}
              value={period}
              onChange={onPeriodChange}
            />
          </div>
        }
        footer={downloadsSource}
      />
    </>
  );
};

/**
 * Suspends on the counts of every period at once, so the prerender runs
 * `loadDownloadCounts` and bakes one payload that covers any period switch.
 */
const NpmDownloadsResolved: FC<
  Omit<NpmDownloadsChartProps, 'downloadCountsByPeriod'>
> = (props) => {
  const { data: downloadCountsByPeriod } = useSuspenseQuery({
    queryKey: ['npm-download-counts', props.packageNames],
    // No count beats an error boundary: the chart then shows them unavailable
    queryFn: (): Promise<DownloadCountsByPeriod | null> =>
      loadDownloadCounts({ data: { packageNames: props.packageNames } }).catch(
        () => null
      ),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });

  return (
    <NpmDownloadsChart
      {...props}
      downloadCountsByPeriod={downloadCountsByPeriod}
    />
  );
};

/** Compares the npm downloads of several packages over a selectable period. */
export const NpmDownloadsComparison: FC<NpmDownloadsComparisonProps> = ({
  packageNames,
  initialPeriod = 'last-6-months',
}) => {
  const [period, setPeriod] = useState<NpmDownloadPeriod>(initialPeriod);
  const chartProps = { packageNames, period, onPeriodChange: setPeriod };

  return (
    <Suspense fallback={<NpmDownloadsChart {...chartProps} />}>
      <NpmDownloadsResolved {...chartProps} />
    </Suspense>
  );
};
