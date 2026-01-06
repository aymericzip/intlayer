'use client';

import { BitbucketLogo } from '@components/logos/BitbucketLogo';
import { GithubLogo } from '@components/logos/GithubLogo';
import { GitLabLogo } from '@components/logos/GitLabLogo';
import { Button } from '@intlayer/design-system';
import { GitBranch, GitCommit } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import type { RepoData, RepositoryProvider } from './types';

type RepositoryItemProps = {
  repo: RepoData;
  isProcessing: boolean;
  disabled?: boolean;
  onImport: () => void;
};

const ProviderLogo: FC<{
  provider: RepositoryProvider;
  className?: string;
}> = ({ provider, className }) => {
  switch (provider) {
    case 'github':
      return <GithubLogo className={className} />;
    case 'gitlab':
      return <GitLabLogo className={className} />;
    case 'bitbucket':
      return <BitbucketLogo className={className} />;
    default:
      return <GitBranch className={className} />;
  }
};

export const RepositoryItem: FC<RepositoryItemProps> = ({
  repo,
  isProcessing,
  disabled = false,
  onImport,
}) => {
  const content = useIntlayer('repository-link');

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(repo.updatedAt));

  const displayName =
    repo.provider === 'github'
      ? `${repo.owner?.login}/${repo.name}`
      : repo.provider === 'gitlab'
        ? repo.fullName
        : repo.provider === 'bitbucket'
          ? `${repo.workspace?.slug}/${repo.name}`
          : repo.name;

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral/20 p-4 transition-colors hover:border-neutral/50">
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full text-text">
          <ProviderLogo
            provider={repo.provider}
            className="size-6 [&_path]:fill-text/60!"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h5 className="font-semibold text-base leading-none">
            {displayName}
          </h5>
          <div className="flex items-center gap-4 text-neutral text-xs">
            <span className="flex items-center gap-1">
              <GitBranch className="size-3" />
              {repo.defaultBranch}
            </span>
            <span className="flex items-center gap-1">
              <GitCommit className="size-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline"
        color="text"
        className="ml-auto"
        onClick={onImport}
        isLoading={isProcessing}
        disabled={isProcessing || disabled}
        label={content.actions?.import?.value}
      >
        {content.actions?.import}
      </Button>
    </div>
  );
};
