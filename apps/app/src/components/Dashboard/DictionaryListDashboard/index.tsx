'use client';

import {
  Button,
  Checkbox,
  Container,
  DictionaryCreationForm,
  Loader,
  Modal,
  NumberItemsSelector,
  Pagination,
  Popover,
  SearchInput,
  ShowingResultsNumberItems,
  Table,
  Tag,
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
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Filter,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { useDate } from 'next-intlayer/format';
import { type FC, Suspense, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';
import { DeleteDictionaryModal } from './DeleteDictionaryModal';
import { DictionaryDetailModal } from './DictionaryDetailModal';
import { FiltersModal } from './FiltersModal';

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
    locationOptions,
    filterLabels,
  } = useIntlayer('dictionary-list') as any;
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [editingDictionaryKey, setEditingDictionaryKey] = useState<
    string | null
  >(null);
  const [rowSelection, setRowSelection] = usePersistedStore(
    'dictionary-list-row-selection',
    {}
  );
  const formatDate = useDate();

  const searchParamsConfig = useMemo(
    () =>
      ({
        page: { type: 'number', fallbackValue: 1 },
        pageSize: { type: 'number', fallbackValue: 10 },
        search: { type: 'string', fallbackValue: '' },
        sortBy: { type: 'string', fallbackValue: 'updatedAt' },
        sortOrder: { type: 'string', fallbackValue: 'desc' },
        location: { type: 'string', fallbackValue: 'none' },
        tags: { type: 'string', fallbackValue: '' },
      }) as const,
    []
  );

  const { params, setParam, setParams } =
    useSearchParamState(searchParamsConfig);

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
    const search = params.search ?? '';
    if (watchSearch !== search) {
      const timer = setTimeout(() => {
        setParam('search', watchSearch || null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [watchSearch, params.search, setParam]);

  const { createDictionaryButton } = useIntlayer('dictionary-form') as any;
  const { data, isPending, refetch } = useGetDictionaries({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search || undefined,
    sortBy: params.sortBy || undefined,
    sortOrder: params.sortOrder || undefined,
    tags: params.tags || undefined,
    location: params.location !== 'none' ? params.location : undefined,
    includeContent: 'false',
  } as any);
  const { mutateAsync: deleteDictionary, isPending: isDeleting } =
    useDeleteDictionary();

  const [dictionaryToDelete, setDictionaryToDelete] = useState<
    string | string[] | null
  >(null);
  const isDeleteModalOpen = dictionaryToDelete !== null;

  const router = useRouter();

  const dictionaries = useMemo(() => data?.data ?? [], [data?.data]);

  const handleSort = (columnId: string) => {
    const isAsc = params.sortBy === columnId && params.sortOrder === 'asc';
    setParams({
      sortBy: columnId,
      sortOrder: isAsc ? 'desc' : 'asc',
      page: 1,
    });
  };

  const getSortIcon = (columnId: string) => {
    if (params.sortBy !== columnId) return ChevronsUpDown;
    return params.sortOrder === 'asc' ? ChevronUp : ChevronDown;
  };

  const SortHeader: FC<{ columnId: string; label: string }> = ({
    columnId,
    label,
  }) => (
    <Button
      variant="hoverable"
      color="text"
      size="sm"
      className="-ml-4 flex items-center gap-1 font-medium"
      onClick={() => handleSort(columnId)}
      Icon={getSortIcon(columnId)}
      label={label}
    >
      {label}
    </Button>
  );

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
      header: () => (
        <SortHeader columnId="title" label={tableHeaders.title.value} />
      ),
      cell: ({ row }) =>
        row.original.title ? (
          <div className="font-medium">{row.original.title}</div>
        ) : (
          <span className="text-neutral text-sm">-</span>
        ),
    },
    {
      accessorKey: 'key',
      header: () => (
        <SortHeader columnId="key" label={tableHeaders.key.value} />
      ),
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.original.key}</div>
      ),
    },
    {
      accessorKey: 'tags',
      header: () => (
        <SortHeader columnId="tags" label={tableHeaders.tags.value} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {(row.original as any).tags &&
          (row.original as any).tags.length > 0 ? (
            (row.original as any).tags.map((tag: string) => (
              <Tag key={tag} color="neutral" size="xs">
                {tag}
              </Tag>
            ))
          ) : (
            <span className="text-neutral text-sm">-</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: () => (
        <SortHeader columnId="location" label={tableHeaders.location.value} />
      ),
      cell: ({ row }) => {
        const location = row.original.location ?? 'remote';
        const isLocal = location === 'local' || location === 'local&remote';
        const isRemote =
          location === 'remote' ||
          location === 'local&remote' ||
          location === 'plugin';

        return (
          <div className="flex items-center gap-4 text-neutral text-sm">
            <div className="flex items-center gap-1">
              <Checkbox
                name="is-local"
                checked={isLocal}
                disabled
                size="sm"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
              <span>{locationOptions.local.value}</span>
            </div>
            <div className="flex items-center gap-1">
              <Checkbox
                name="is-remote"
                checked={isRemote}
                disabled
                size="sm"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
              <span>{locationOptions.remote.value}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => (
        <SortHeader columnId="createdAt" label={tableHeaders.createdAt.value} />
      ),
      cell: ({ row }) => (
        <div className="text-neutral text-sm">
          {formatDate((row.original as any).createdAt)}
        </div>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: () => (
        <SortHeader columnId="updatedAt" label={tableHeaders.updatedAt.value} />
      ),
      cell: ({ row }) => (
        <div className="text-neutral text-sm">
          {formatDate((row.original as any).updatedAt)}
        </div>
      ),
    },
    {
      id: 'actions',
      header: tableHeaders.actions.value,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Popover identifier={`edit-${row.original.id}`}>
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
            <Popover.Detail identifier={`edit-${row.original.id}`}>
              <Container className="p-3">
                <p className="text-sm">{editButton.popover.value}</p>
              </Container>
            </Popover.Detail>
          </Popover>
          <Popover identifier={`delete-${row.original.id}`}>
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
            <Popover.Detail identifier={`delete-${row.original.id}`}>
              <Container className="p-3">
                <p className="text-sm">{deleteButton.popover.value}</p>
              </Container>
            </Popover.Detail>
          </Popover>
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

  const appliedFiltersCount = useMemo(() => {
    let count = 0;
    if (params.location !== 'none') count++;
    if (params.tags) count++;
    return count;
  }, [params.location, params.tags]);

  const hasAppliedFilters = appliedFiltersCount > 0;

  return (
    <div className="flex size-full flex-1 flex-col gap-6 px-10 py-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex max-w-2xl flex-1 items-center gap-4">
          <SearchInput
            placeholder={searchPlaceholder.value}
            {...register('search')}
            className="flex-1"
          />
          <div className="relative">
            <Popover identifier="dictionary-filters">
              <Button
                variant="hoverable"
                color="text"
                size="icon-md"
                onClick={() => setIsFiltersModalOpen(true)}
                Icon={Filter}
                label={filterLabels.button.value}
              />
              <Popover.Detail identifier="dictionary-filters">
                <Container className="p-3">
                  <p className="text-sm">{filterLabels.popover.value}</p>
                </Container>
              </Popover.Detail>
            </Popover>
            {hasAppliedFilters && (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-text text-[10px] text-card">
                {appliedFiltersCount}
              </span>
            )}
          </div>
        </div>
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

      {hasAppliedFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {params.location !== 'none' && (
            <div className="flex items-center gap-1 rounded-full border border-card bg-card px-3 py-1 text-sm">
              <span className="text-neutral-500">{tableHeaders.location}:</span>
              <span className="font-medium">
                {locationOptions[params.location]?.value || params.location}
              </span>
              <Button
                variant="hoverable"
                size="icon-sm"
                onClick={() => setParam('location', 'none')}
                Icon={X}
                label={filterLabels.removeLocation.value}
              />
            </div>
          )}
          {params.tags && (
            <div className="flex items-center gap-1 rounded-full border border-card bg-card px-3 py-1 text-sm">
              <span className="text-neutral-500">{tableHeaders.tags}:</span>
              <span className="font-medium">{params.tags}</span>
              <Button
                variant="hoverable"
                size="icon-sm"
                onClick={() => setParam('tags', null)}
                Icon={X}
                label={filterLabels.removeTags.value}
              />
            </div>
          )}
          <Button
            variant="hoverable"
            color="text"
            size="sm"
            onClick={() => setParams({ location: 'none', tags: null })}
            label={filterLabels.clearAll.value}
            className="text-xs"
          >
            {filterLabels.clearAll}
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Loader isLoading={isPending}>
          {dictionaries.length === 0 ? (
            <div className="flex min-h-60 items-center justify-center">
              <span className="text-neutral text-sm">{noDictionaryFound}</span>
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
        padding="md"
      >
        <DictionaryCreationForm
          onDictionaryCreated={() => {
            setIsCreationModalOpen(false);
            refetch();
          }}
        />
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

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        params={params}
        setParam={setParam}
        setParams={setParams}
        locationOptions={locationOptions}
        tableHeaders={tableHeaders}
        filterLabels={filterLabels}
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
