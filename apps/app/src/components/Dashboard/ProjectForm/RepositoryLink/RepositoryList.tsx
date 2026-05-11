import { useSearch } from '@intlayer/design-system/hooks';
import { SearchInput } from '@intlayer/design-system/input';
import { useVirtualizer } from '@tanstack/react-virtual';
import Fuse from 'fuse.js';
import { type FC, useMemo, useRef } from 'react';
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

  // Memoize the Fuse instance so it only rebuilds when 'repos' changes
  const fuse = useMemo(
    () =>
      new Fuse(repos, {
        keys: ['name', 'fullName', 'owner.login', 'workspace.slug'],
        threshold: 0.3,
      }),
    [repos]
  );

  // Memoize the filtered results so it only runs when 'search' or 'repos' changes
  const filteredRepos = useMemo(() => {
    if (search === '') return repos;
    return fuse.search(search).map((result) => result.item);
  }, [search, repos, fuse]);

  const isAnyProcessing = processingRepoId !== null;

  // Ref for the scrollable container
  const parentRef = useRef<HTMLDivElement>(null);

  // Initialize the virtualizer
  const rowVirtualizer = useVirtualizer({
    count: filteredRepos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // Estimate height of RepositoryItem in px
    overscan: 5, // Render a few items outside the viewport for smooth scrolling
  });

  return (
    <div className="flex max-h-[500px] flex-col">
      <div className="border-card border-b p-4">
        <SearchInput
          placeholder="Search repositories..."
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* The Scrollable Container */}
      <div ref={parentRef} className="flex flex-1 flex-col overflow-y-auto">
        {filteredRepos.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-neutral text-sm">No repositories found.</p>
          </div>
        ) : (
          /* The Virtualized List Wrapper */
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const repo = filteredRepos[virtualRow.index];
              const isCurrentRepoProcessing =
                processingRepoId !== null &&
                repo.id !== undefined &&
                processingRepoId === repo.id;

              const isDisabled = isAnyProcessing && !isCurrentRepoProcessing;

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <RepositoryItem
                    repo={repo}
                    isProcessing={isCurrentRepoProcessing}
                    disabled={isDisabled}
                    onImport={() => onSelectRepo(repo)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
