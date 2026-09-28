import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  loadDownloadCounts,
  NPM_DOWNLOAD_PERIODS,
  type NpmDownloadPeriod,
} from '~/serverFunctions/repositoryStats';
import { ComparisonBarChart } from './ComparisonBarChart';

export type NpmDownloadsComparisonProps = {
  /** npm package names, e.g. `next-intl`. */
  packageNames: string[];
  /** Period selected first, `last-6-months` by default. */
  initialPeriod?: NpmDownloadPeriod;
};

/** Compares the npm downloads of several packages over a selectable period. */
export const NpmDownloadsComparison: FC<NpmDownloadsComparisonProps> = ({
  packageNames,
  initialPeriod = 'last-6-months',
}) => {
  const { downloads, unavailable, downloadsSource, periods } = useIntlayer(
    'repository-comparison'
  );
  const [period, setPeriod] = useState<NpmDownloadPeriod>(initialPeriod);
  const { data: downloadCounts, isPending } = useQuery({
    queryKey: ['npm-download-counts', packageNames, period],
    queryFn: () => loadDownloadCounts({ data: { packageNames, period } }),
    staleTime: Number.POSITIVE_INFINITY,
    placeholderData: keepPreviousData,
    retry: false,
  });

  const items = packageNames.map((packageName) => ({
    label: packageName,
    libraryId: packageName,
    value:
      downloadCounts?.find(
        (downloadCount) => downloadCount.packageName === packageName
      )?.downloadCount ?? null,
  }));

  return (
    <ComparisonBarChart
      items={items}
      isPending={isPending}
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
            onChange={setPeriod}
          />
        </div>
      }
      footer={downloadsSource}
    />
  );
};
