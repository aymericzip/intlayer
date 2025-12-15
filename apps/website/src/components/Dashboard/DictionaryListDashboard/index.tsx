'use client';

import {
  Button,
  Container,
  DictionaryCreationForm,
  Loader,
  Modal,
  NumberItemsSelector,
  Pagination,
  SearchInput,
  ShowingResultsNumberItems,
} from '@intlayer/design-system';
import { useGetDictionaries, useSearch } from '@intlayer/design-system/hooks';
import { useFocusUnmergedDictionary } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';

const getStableId = (dictionary: Dictionary) => {
  const id =
    dictionary.localIds?.map((localId) => localId)?.join('-') ??
    dictionary.localId ??
    dictionary.id ??
    dictionary.key;

  return String(id);
};

export const DictionaryListDashboardContent: FC = () => {
  const { setFocusedContent } = useFocusUnmergedDictionary();
  const { selectDictionaryButton, searchPlaceholder } =
    useIntlayer('dictionary-list');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  const { setSearch, search } = useSearch({});
  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: undefined },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const { noDictionaryView, createDictionaryButton } = useIntlayer(
    'dictionary-form'
  ) as any;
  const { data, isPending, refetch } = useGetDictionaries({
    ...params,
    search,
  });
  const router = useRouter();

  const totalPages: number = data?.total_pages ?? 1;
  const totalItems: number = data?.total_items ?? 0;
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

  return (
    <div className="flex size-full flex-1 flex-col gap-10 px-10 py-6">
      <SearchInput
        placeholder={searchPlaceholder.value}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <div className="flex-1">
        <Container
          roundedSize="xl"
          className="m-auto flex min-h-60 w-full max-w-[400px] flex-col justify-center gap-2 p-6"
        >
          <Loader isLoading={isPending}>
            <div className="flex flex-1 flex-col gap-2">
              {data?.data?.length === 0 && (
                <span className="m-auto text-neutral text-sm">
                  {noDictionaryView.title}
                </span>
              )}
              {data?.data?.map((dictionary) => (
                <Button
                  key={getStableId(dictionary)}
                  label={selectDictionaryButton.label.value}
                  variant="hoverable"
                  color="text"
                  IconRight={ChevronRight}
                  onClick={() => {
                    setFocusedContent({
                      dictionaryKey: dictionary.key,
                      dictionaryLocalId: dictionary.localId,
                      keyPath: [],
                    });
                    router.push(
                      `${PagesRoutes.Dashboard_Content}/${dictionary.key}`
                    );
                  }}
                >
                  <div className="flex flex-col gap-2 p-2">
                    {dictionary.title && (
                      <strong className="text-wrap text-sm">
                        {dictionary.title}
                      </strong>
                    )}
                    {dictionary.key && <span>{dictionary.key}</span>}
                    {dictionary.description && (
                      <span className="line-clamp-2 text-wrap text-neutral">
                        {dictionary.description}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </Loader>
          <Button
            label={createDictionaryButton.ariaLabel.value}
            IconRight={Plus}
            variant="default"
            className="mt-12 ml-auto"
            color="text"
            onClick={() => setIsCreationModalOpen(true)}
          >
            {createDictionaryButton.text}
          </Button>
          <Modal
            isOpen={isCreationModalOpen}
            onClose={() => setIsCreationModalOpen(false)}
          >
            <div className="w-full py-3">
              <DictionaryCreationForm
                onDictionaryCreated={() => setIsCreationModalOpen(false)}
              />
            </div>
          </Modal>
        </Container>
      </div>

      <div className="flex w-full flex-row items-end justify-between gap-4 pt-8">
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

export const DictionaryListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <DictionaryListDashboardContent />
  </Suspense>
);
