import { buildDatasetJsonLd } from '@intlayer/design-system/structured-data';
import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { JsonLd } from '~/components/JsonLd';
import {
  loadCommitCounts,
  type RepositoryCommitCount,
} from '~/serverFunctions/repositoryStats';
import { ComparisonBarChart } from './ComparisonBarChart';

export type GithubCommitsComparisonProps = {
  /** GitHub repositories as `owner/name`, e.g. `amannn/next-intl`. */
  repositories: string[];
};

type GithubCommitsChartProps = GithubCommitsComparisonProps & {
  /** Counts per repository, undefined while they load. */
  commitCounts?: RepositoryCommitCount[];
};

/** The chart and its dataset, pending until `commitCounts` is given. */
const GithubCommitsChart: FC<GithubCommitsChartProps> = ({
  repositories,
  commitCounts,
}) => {
  const {
    commits,
    unavailable,
    commitsSource,
    commitsDatasetName,
    commitsDatasetDescription,
  } = useIntlayer('repository-comparison');

  const items = repositories.map((repository) => ({
    label: repository,
    libraryId: repository.split('/').pop() ?? repository,
    value:
      commitCounts?.find((commitCount) => commitCount.repository === repository)
        ?.commitCount ?? null,
  }));

  return (
    <>
      <JsonLd
        jsonLd={buildDatasetJsonLd({
          name: commitsDatasetName.value,
          description: `${commitsDatasetDescription.value} ${repositories.join(', ')}.`,
          keywords: ['i18n', 'GitHub', 'commits', ...repositories],
          isBasedOn: repositories.map(
            (repository) => `https://github.com/${repository}`
          ),
          measurementTechnique: 'GitHub REST API',
          variableMeasured: items.map((item) => ({
            name: item.label,
            value: item.value,
            unitText: commits.value,
          })),
        })}
      />
      <ComparisonBarChart
        items={items}
        isPending={commitCounts === undefined}
        unit={commits}
        unavailableLabel={unavailable}
        footer={commitsSource}
      />
    </>
  );
};

/**
 * Suspends on the counts, so the prerender runs `loadCommitCounts` and bakes
 * its payload for the browser to read back.
 */
const GithubCommitsResolved: FC<GithubCommitsComparisonProps> = ({
  repositories,
}) => {
  const { data: commitCounts } = useSuspenseQuery({
    queryKey: ['github-commit-counts', repositories],
    // No count beats an error boundary: the chart then shows them unavailable
    queryFn: (): Promise<RepositoryCommitCount[]> =>
      loadCommitCounts({ data: { repositories } }).catch(() => []),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });

  return (
    <GithubCommitsChart
      repositories={repositories}
      commitCounts={commitCounts}
    />
  );
};

/** Compares the commit count of several GitHub repositories. */
export const GithubCommitsComparison: FC<GithubCommitsComparisonProps> = (
  props
) => (
  <Suspense fallback={<GithubCommitsChart {...props} />}>
    <GithubCommitsResolved {...props} />
  </Suspense>
);
