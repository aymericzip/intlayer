'use client';

import {
  Button,
  Container,
  DictionaryCreationForm,
  H2,
  Loader,
  Modal,
  NumberItemsSelector,
  Pagination,
  SearchInput,
  ShowingResultsNumberItems,
} from '@intlayer/design-system';
import { useGetDictionaries, useSearch } from '@intlayer/design-system/hooks';
import { useFocusDictionaryActions } from '@intlayer/editor-react';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { PagesRoutes } from '@/Routes';

export const DictionaryListDashboardContent: FC = () => {
  const { setFocusedContent } = useFocusDictionaryActions();
  const { selectDictionaryButton, searchPlaceholder } =
    useIntlayer('dictionary-list');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { setSearch, search } = useSearch({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { noDictionaryView, createDictionaryButton, dictionaryList } =
    useIntlayer('dictionary-form') as any;
  const { data, isPending, refetch } = useGetDictionaries({
    search,
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
  });
  const router = useRouter();
  const totalPages = data?.total_pages ?? 1;
  const totalItems = data?.total_items ?? 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    setItemsPerPage(size);
    setCurrentPage(1);
    refetch();
  };

  if (isPending) return <Loader />;

  return (
    <Container
      roundedSize="xl"
      className="flex w-full max-w-[400px] flex-col justify-center gap-2 p-6"
    >
      <H2 className="mt-2 mb-6">{dictionaryList.title}</H2>

      <SearchInput
        placeholder={searchPlaceholder.value}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Loader isLoading={isPending}>
        {data?.data?.length === 0 && (
          <span className="m-auto text-neutral text-sm">
            {noDictionaryView.title}
          </span>
        )}
        {data?.data?.map((dictionary) => (
          <Button
            key={String(dictionary.localId)}
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
              router.push(`${PagesRoutes.Dashboard_Content}/${dictionary.key}`);
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

      <ShowingResultsNumberItems
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalItems={totalItems}
      />
      <NumberItemsSelector
        value={itemsPerPage.toString()}
        onValueChange={handlePageSizeChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export const DictionaryListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <DictionaryListDashboardContent />
  </Suspense>
);
