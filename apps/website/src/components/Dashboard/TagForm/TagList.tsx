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
import {
  useGetTags,
  useItemSelector,
  useSearch,
} from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import {
  type ComponentProps,
  type FC,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';
import { TagCreationForm } from './TagCreationForm';

const InputIndicator: FC<ComponentProps<'div'>> = (props) => (
  <div
    data-indicator
    className="absolute top-0 z-0 h-auto w-full rounded-xl bg-text/10 transition-[left,width,top,height,opacity] duration-300 ease-in-out [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl motion-reduce:transition-none"
    {...props}
  />
);

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
    isPending,
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

  const optionsRefs = useRef<HTMLElement[]>([]);
  const { choiceIndicatorPosition, calculatePosition } = useItemSelector(
    optionsRefs,
    {
      isHoverable: true,
      orientation: 'vertical',
    }
  );

  useEffect(() => {
    calculatePosition();
  }, [tags]);

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
    <div className="flex size-full flex-1 flex-col gap-10 px-10 py-6">
      <SearchInput
        placeholder="Search tags..."
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <div className="flex-1">
        <Container
          roundedSize="xl"
          className="m-auto flex min-h-60 w-full max-w-[400px] flex-col justify-center gap-2 p-6"
        >
          <Loader isLoading={isPending}>
            <div className="relative flex flex-1 flex-col gap-2">
              {tags.length === 0 && (
                <span className="m-auto text-neutral text-sm">
                  {noTagView.title}
                </span>
              )}
              {choiceIndicatorPosition && (
                <InputIndicator style={choiceIndicatorPosition} />
              )}
              {tags.map((tag: any, index: number) => (
                <Button
                  key={String(tag.key)}
                  label="Select tag"
                  IconRight={ChevronRight}
                  variant="invisible-link"
                  color="text"
                  onClick={() => {
                    router.push(`${PagesRoutes.Dashboard_Tags}/${tag.key}`);
                  }}
                  ref={(el) => {
                    if (el) {
                      optionsRefs.current[index] = el;
                    }
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
            </div>
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
