'use client';

import {
  Button,
  Checkbox,
  DictionaryCreationForm,
  Loader,
  Modal,
  NumberItemsSelector,
  Pagination,
  SearchInput,
  ShowingResultsNumberItems,
  Table,
} from '@intlayer/design-system';
import {
  useDeleteDictionary,
  useGetDictionaries,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { useFocusUnmergedDictionary } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@utils/cn';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';
import { DeleteDictionaryModal } from './DeleteDictionaryModal';
import { DictionaryDetailModal } from './DictionaryDetailModal';

export const DictionaryListDashboardContent: FC = () => {
  const { setFocusedContent } = useFocusUnmergedDictionary();
  const {
    searchPlaceholder,
    tableHeaders,
    deleteButton,
    editButton,
    deleteSelectedButton,
    noDictionaryFound,
    selectAll,
    selectRow,
  } = useIntlayer('dictionary-list');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [editingDictionaryKey, setEditingDictionaryKey] = useState<
    string | null
  >(null);
  const [rowSelection, setRowSelection] = usePersistedStore(
    'dictionary-list-row-selection',
    {}
  );

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: undefined },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const { register, watch, setValue } = useForm({
    defaultValues: {
      search: params.search ?? '',
    },
  });

  const watchSearch = watch('search');

  useEffect(() => {
    setValue('search', params.search ?? '');
  }, [params.search, setValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParam('search', watchSearch || null);
    }, 300);
    return () => clearTimeout(timer);
  }, [watchSearch, setParam]);

  const { createDictionaryButton } = useIntlayer('dictionary-form') as any;
  const { data, isPending, refetch } = useGetDictionaries(params);
  const { mutateAsync: deleteDictionary, isPending: isDeleting } =
    useDeleteDictionary();

  const [dictionaryToDelete, setDictionaryToDelete] = useState<
    string | string[] | null
  >(null);
  const isDeleteModalOpen = dictionaryToDelete !== null;

  const router = useRouter();

  const dictionaries = useMemo(() => data?.data ?? [], [data?.data]);

  const columns: ColumnDef<Dictionary>[] = [
    {
      id: 'selection',
      header: ({ table }) => (
        <Checkbox
          name="select-all"
          size="sm"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          aria-label={selectAll.value}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          name={`select-row-${row.id}`}
          size="sm"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
          aria-label={selectRow.value}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: tableHeaders.title.value,
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title || '-'}</div>
      ),
    },
    {
      accessorKey: 'key',
      header: tableHeaders.key.value,
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.original.key}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: tableHeaders.description.value,
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate text-neutral text-sm">
          {row.original.description || '-'}
        </div>
      ),
    },
    {
      id: 'actions',
      header: tableHeaders.actions.value,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="hoverable"
            color="text"
            size="icon-sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              if (row.original.key) {
                setEditingDictionaryKey(row.original.key);
              }
            }}
            Icon={Pencil}
            label={editButton.label.value}
          />
          <Button
            variant="hoverable"
            color="error"
            className="ml-auto text-text hover:text-error"
            size="icon-sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              if (row.original.id) {
                setDictionaryToDelete(row.original.id);
              }
            }}
            Icon={Trash2}
            label={deleteButton.label.value}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: dictionaries,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id!,
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handleBulkDelete = () => {
    const selectedIds = selectedRows
      .map((row) => row.original.id)
      .filter(Boolean) as string[];

    if (selectedIds.length === 0) return;

    setDictionaryToDelete(selectedIds);
  };

  const onConfirmDelete = async () => {
    if (!dictionaryToDelete) return;

    if (Array.isArray(dictionaryToDelete)) {
      await Promise.all(
        dictionaryToDelete.map((id) => deleteDictionary({ dictionaryId: id }))
      );
      setRowSelection({});
    } else {
      await deleteDictionary({ dictionaryId: dictionaryToDelete });
    }

    setDictionaryToDelete(null);
    refetch();
  };

  const totalPages: number = data?.total_pages ?? 1;
  const totalItems: number = data?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const handlePageChange = (page: number) => {
    setParam('page', page);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    setParams({ pageSize: size, page: 1 });
  };

  return (
    <div className="flex size-full flex-1 flex-col gap-6 px-10 py-6">
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          placeholder={searchPlaceholder.value}
          {...register('search')}
          className="max-w-md"
        />
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <Button
              color="error"
              variant="outline"
              onClick={handleBulkDelete}
              Icon={Trash2}
              label={deleteSelectedButton.label.value}
            >
              {deleteSelectedButton.text} ({selectedRows.length})
            </Button>
          )}
          <Button
            label={createDictionaryButton.ariaLabel.value}
            Icon={Plus}
            variant="default"
            color="text"
            onClick={() => setIsCreationModalOpen(true)}
          >
            {createDictionaryButton.text}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Loader isLoading={isPending}>
          {dictionaries.length === 0 ? (
            <div className="flex min-h-60 items-center justify-center">
              <span className="text-neutral text-sm">
                {noDictionaryFound.value}
              </span>
            </div>
          ) : (
            <Table className="w-full border-separate border-spacing-0">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-neutral-200 border-b dark:border-neutral-700"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100"
                      >
                        <div
                          className={cn(
                            'flex items-center',
                            ['selection', 'actions'].includes(header.column.id)
                              ? 'justify-center'
                              : 'justify-start'
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  const visibleCells = row.getVisibleCells();
                  return (
                    <tr
                      key={row.id}
                      className="cursor-pointer whitespace-nowrap border-card border-b transition-colors hover:bg-card/30"
                      onClick={() => {
                        setFocusedContent({
                          dictionaryKey: row.original.key,
                          dictionaryLocalId: row.original.localId,
                          keyPath: [],
                        });
                        router.push(
                          `${PagesRoutes.Dashboard_Dictionaries}/${row.original.key}`
                        );
                      }}
                    >
                      {visibleCells.map((cell, cellIndex) => (
                        <td
                          key={cell.id}
                          className={cn(
                            'whitespace-nowrap px-4 py-3',
                            cellIndex === 0 && 'first:rounded-l-2xl',
                            cellIndex === visibleCells.length - 1 &&
                              'last:rounded-r-2xl'
                          )}
                        >
                          <div
                            className={cn(
                              'flex items-center',
                              ['selection', 'actions'].includes(cell.column.id)
                                ? 'justify-center'
                                : 'justify-start'
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Loader>
      </div>

      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <div className="w-full py-3">
          <DictionaryCreationForm
            onDictionaryCreated={() => {
              setIsCreationModalOpen(false);
              refetch();
            }}
          />
        </div>
      </Modal>

      <DeleteDictionaryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDictionaryToDelete(null)}
        onConfirm={onConfirmDelete}
        isDeleting={isDeleting}
        count={
          Array.isArray(dictionaryToDelete) ? dictionaryToDelete.length : 1
        }
      />

      <DictionaryDetailModal
        isOpen={!!editingDictionaryKey}
        onClose={() => setEditingDictionaryKey(null)}
        dictionaryKey={editingDictionaryKey}
      />

      <div className="flex w-full flex-row items-end justify-between gap-4 pt-4">
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
