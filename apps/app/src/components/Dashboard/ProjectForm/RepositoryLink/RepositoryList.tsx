'use client';

import { SearchInput } from '@intlayer/design-system';
import { useSearch } from '@intlayer/design-system/hooks';
import Fuse from 'fuse.js';
import type { FC } from 'react';
import { RepositoryItem } from './RepositoryItem';
import type { RepoData } from './types';

type RepositoryListProps = {
  repos: RepoData[];
  onSelectRepo: (repo: RepoData) => void;
  processingRepoId: string | number | null;
};

export const RepositoryList: FC<RepositoryListProps> = ({
  repos,
  onSelectRepo,
  processingRepoId,
}) => {
  const { search, setSearch } = useSearch({
    defaultValue: '',
  });

  // Setup Fuse.js for fuzzy searching
  const fuse = new Fuse(repos, {
    keys: ['name', 'fullName', 'owner.login', 'workspace.slug'],
    threshold: 0.3,
  });

  const filteredRepos =
    search === '' ? repos : fuse.search(search).map((result) => result.item);

  // Helper to check if any repo is currently processing
  const isAnyProcessing = processingRepoId !== null;

  return (
    <div className="flex max-h-[500px] flex-col">
      <div className="border-card border-b p-4">
        <SearchInput
          placeholder="Search repositories..."
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {filteredRepos.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-neutral text-sm">No repositories found.</p>
          </div>
        ) : (
          filteredRepos.map((repo) => {
            const isCurrentRepoProcessing =
              processingRepoId !== null &&
              repo.id !== undefined &&
              processingRepoId === repo.id;

            const isDisabled = isAnyProcessing && !isCurrentRepoProcessing;

            return (
              <RepositoryItem
                key={String(repo.id)}
                repo={repo}
                isProcessing={isCurrentRepoProcessing}
                disabled={isDisabled}
                onImport={() => onSelectRepo(repo)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
