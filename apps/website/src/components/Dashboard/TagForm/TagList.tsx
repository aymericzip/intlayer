'use client';

import {
  Button,
  Container,
  Loader,
  Modal,
  NumberItemsSelector,
  Pagination,
  SearchInput,
  ShowingResultsNumberItems,
} from '@intlayer/design-system';
import { useGetTags, useSearch } from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useEffect, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';
import { TagCreationForm } from './TagCreationForm';

export const TagList: FC = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { noTagView, createTagButton } = useIntlayer('tag-list');
  const { setSearch, search } = useSearch({});
  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: undefined },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const {
    data: tagResponse,
    isFetching,
    refetch,
  } = useGetTags({
    ...params,
    search: search || undefined,
  });
  const router = useRouter();

  const tags = (tagResponse as any)?.data ?? [];
  const totalPages: number = (tagResponse as any)?.total_pages ?? 1;
  const totalItems: number = (tagResponse as any)?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const handlePageChange = (page: number) => {
    setParam('page', page);
    refetch();
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    setParams({ pageSize: size, page: 1 });
    refetch();
  };

  // Refetch when search changes
  useEffect(() => {
    refetch();
  }, [search, refetch]);

  return (
    <div className="flex size-full flex-1 flex-col gap-10 px-10 pt-10">
      <SearchInput
        placeholder="Search tags..."
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <div className="flex-1">
        <Container
          roundedSize="xl"
          className="m-auto flex w-full max-w-[400px] flex-col justify-center gap-2 p-6"
        >
          <Loader isLoading={isFetching}>
            {tags.length === 0 && (
              <span className="m-auto text-neutral text-sm">
                {noTagView.title}
              </span>
            )}
            {tags.map((tag: any) => (
              <Button
                key={String(tag.key)}
                label="Select tag"
                IconRight={ChevronRight}
                variant="hoverable"
                color="text"
                onClick={() => {
                  router.push(`${PagesRoutes.Dashboard_Tags}/${tag.key}`);
                }}
              >
                <div className="flex flex-col gap-2 p-2">
                  {tag.name && (
                    <strong className="text-wrap text-sm">{tag.name}</strong>
                  )}
                  {tag.key && <span>{tag.key}</span>}
                  {tag.description && (
                    <span className="line-clamp-2 text-wrap text-neutral">
                      {tag.description}
                    </span>
                  )}
                </div>
              </Button>
            ))}
          </Loader>
          <Button
            label={createTagButton.ariaLabel.value}
            IconRight={Plus}
            variant="default"
            className="mt-12 ml-auto"
            color="text"
            onClick={() => setIsCreationModalOpen(true)}
          >
            {createTagButton.text}
          </Button>
          <Modal
            isOpen={isCreationModalOpen}
            onClose={() => setIsCreationModalOpen(false)}
          >
            <TagCreationForm
              onTagCreated={() => setIsCreationModalOpen(false)}
            />
          </Modal>
        </Container>
      </div>

      <div className="flex w-full flex-row items-end justify-between gap-4">
        <div className="flex flex-col gap-4">
          <ShowingResultsNumberItems
            currentPage={currentPage}
            pageSize={itemsPerPage}
            totalItems={totalItems}
          />
          <NumberItemsSelector
            value={itemsPerPage.toString()}
            onValueChange={handlePageSizeChange}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export const TagListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <TagList />
  </Suspense>
);
