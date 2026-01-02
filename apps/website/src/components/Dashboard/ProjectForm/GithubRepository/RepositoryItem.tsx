'use client';

import { GithubLogo } from '@components/GithubLogo';
import { Button } from '@intlayer/design-system';
import { GitBranch, GitCommit } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

type RepoItemProps = {
  name: string;
  owner: string;
  url: string;
  lastUpdated: string;
  branch: string;
  isProcessing: boolean;
  disabled?: boolean; // Added disabled prop
  onImport: () => void;
};

export const RepositoryItem: FC<RepoItemProps> = ({
  name,
  owner,
  lastUpdated,
  branch,
  isProcessing,
  disabled = false,
  onImport,
}) => {
  const content = useIntlayer('github-repository-link');

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(lastUpdated));

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral/20 p-4 transition-colors hover:border-neutral/50">
      <div className="flex items-center gap-4">
        {/* Avatar/Logo */}
        <div className="flex size-12 items-center justify-center rounded-full text-text">
          <GithubLogo className="size-6" />
        </div>

        <div className="flex flex-col gap-1">
          <h5 className="font-semibold text-base leading-none">
            {owner}/{name}
          </h5>
          <div className="flex items-center gap-4 text-neutral text-xs">
            <span className="flex items-center gap-1">
              <GitBranch className="size-3" />
              {branch}
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
        disabled={isProcessing || disabled} // Disable if processing OR if explicitly disabled
        label={content.actions.import?.value}
      >
        Import
      </Button>
    </div>
  );
};
