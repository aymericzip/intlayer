import { buildDatasetJsonLd } from '@intlayer/design-system/structured-data';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { JsonLd } from '~/components/JsonLd';
import { loadCommitCounts } from '~/serverFunctions/repositoryStats';
import { ComparisonBarChart } from './ComparisonBarChart';

export type GithubCommitsComparisonProps = {
  /** GitHub repositories as `owner/name`, e.g. `amannn/next-intl`. */
  repositories: string[];
};

/** Compares the commit count of several GitHub repositories. */
export const GithubCommitsComparison: FC<GithubCommitsComparisonProps> = ({
  repositories,
}) => {
  const {
    commits,
    unavailable,
    commitsSource,
    commitsDatasetName,
    commitsDatasetDescription,
  } = useIntlayer('repository-comparison');
  const { data: commitCounts, isPending } = useQuery({
    queryKey: ['github-commit-counts', repositories],
    queryFn: () => loadCommitCounts({ data: { repositories } }),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });

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
        isPending={isPending}
        unit={commits}
        unavailableLabel={unavailable}
        footer={commitsSource}
      />
    </>
  );
};
