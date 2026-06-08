import { useSearch } from '@intlayer/design-system/hooks';
import { SearchInput } from '@intlayer/design-system/input';
import { useVirtualizer } from '@tanstack/react-virtual';
import Fuse from 'fuse.js';
import { type FC, useMemo, useRef } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useRepositoryList } from './hooks/useRepositoryList';
import { RepositoryItem } from './RepositoryItem';
import type { RepoData, RepositoryProvider } from './types';

type RepositoryListProps = {
  selectedProvider: RepositoryProvider | null;
  isProviderLinked: boolean | null;
  gitlabInstanceUrl?: string;
  onConfigDetected: (repo: RepoData, configPaths: string[]) => void;
};

export const RepositoryList: FC<RepositoryListProps> = ({
  selectedProvider,
  isProviderLinked,
  gitlabInstanceUrl,
  onConfigDetected,
}) => {
  const { repositoryList } = useIntlayer('repository-link');
  const { repos, isLoadingRepos, processingRepoId, handleSelectRepo } =
    useRepositoryList({
      selectedProvider,
      isProviderLinked,
      gitlabInstanceUrl,
      onConfigDetected,
    });
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
    estimateSize: () => 72,
    overscan: 5, // Render a few items outside the viewport for smooth scrolling
  });

  return (
    <div className="flex max-h-[500px] flex-col">
      <div className="border-card border-b p-4">
        <SearchInput
          placeholder={repositoryList.searchPlaceholder}
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* The Scrollable Container */}
      <div ref={parentRef} className="flex flex-1 flex-col overflow-y-auto">
        {isLoadingRepos ? (
          <div className="py-8 text-center">
            <p className="text-neutral text-sm">{repositoryList.loading}</p>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-neutral text-sm">{repositoryList.empty}</p>
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
                  className="pb-2"
                  style={{
                    paddingBottom: '8px',
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
                    onImport={() => handleSelectRepo(repo)}
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
