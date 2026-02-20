'use client';

import {
  Button,
  Checkbox,
  CopyToClipboard,
  Loader,
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
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
  getCoreRowModel,
  type RowSelectionState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Pencil,
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
import { DictionaryModals } from './DictionaryModals';
import { DictionaryTable } from './DictionaryTable';
import { DictionaryToolbar } from './DictionaryToolbar';

type SortHeaderProps = {
  columnId: string;
  label: string;
  currentSortBy: string;
  currentSortOrder: string;
  onSort: (columnId: string) => void;
};

const SortHeader: FC<SortHeaderProps> = ({
  columnId,
  label,
  currentSortBy,
  currentSortOrder,
  onSort,
}) => {
  const getSortIcon = () => {
    if (currentSortBy !== columnId) return ChevronsUpDown;
    return currentSortOrder === 'asc' ? ChevronUp : ChevronDown;
  };

  return (
    <Button
      variant="hoverable"
      color="text"
      size="sm"
      className="flex items-center gap-1 font-medium"
      onClick={() => onSort(columnId)}
      Icon={getSortIcon()}
      label={label}
    >
      {label}
    </Button>
  );
};

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
    visibleColumns,
    selectColumns,
  } = useIntlayer('dictionary-list');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [editingDictionaryKey, setEditingDictionaryKey] = useState<
    string | null
  >(null);
  const [rowSelection, setRowSelection] = usePersistedStore<RowSelectionState>(
    'dictionary-list-row-selection',
    {}
  );
  const [columnVisibility, setColumnVisibility] =
    usePersistedStore<VisibilityState>('dictionary-list-column-visibility', {
      id: false,
      description: false,
      location: false,
      createdAt: false,
    });

  const formatDate = useDate();

  const searchParamsConfig = {
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 20 },
    search: { type: 'string', fallbackValue: '' },
    sortBy: { type: 'string', fallbackValue: 'updatedAt' },
    sortOrder: { type: 'string', fallbackValue: 'desc' },
    location: { type: 'string', fallbackValue: 'none' },
    tags: { type: 'string', fallbackValue: '' },
  } as const;

  const { params, setParam, setParams } =
    useSearchParamState(searchParamsConfig);

  const { register, watch } = useForm({
    defaultValues: {
      search: params.search ?? '',
    },
  });

  const watchSearch = watch('search');

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

  const dictionaries = data?.data ?? [];

  const handleSort = (columnId: string) => {
    const isAsc = params.sortBy === columnId && params.sortOrder === 'asc';
    setParams({
      sortBy: columnId,
      sortOrder: isAsc ? 'desc' : 'asc',
      page: 1,
    });
  };

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
      accessorKey: 'id',
      header: tableHeaders.id,
      cell: ({ row }) => (
        <CopyToClipboard
          text={row.original.id!}
          size={9}
          className="text-nowrap text-neutral"
        >
          {row.original.id}
        </CopyToClipboard>
      ),
    },
    {
      accessorKey: 'key',
      header: () => (
        <SortHeader
          columnId="key"
          label={tableHeaders.key.value}
          currentSortBy={params.sortBy}
          currentSortOrder={params.sortOrder}
          onSort={handleSort}
        />
      ),
      cell: ({ row }) => (
        <CopyToClipboard text={row.original.key} size={9} className="font-mono">
          {row.original.key}
        </CopyToClipboard>
      ),
    },
    {
      accessorKey: 'title',
      header: () => (
        <SortHeader
          columnId="title"
          label={tableHeaders.title.value}
          currentSortBy={params.sortBy}
          currentSortOrder={params.sortOrder}
          onSort={handleSort}
        />
      ),
      cell: ({ row }) =>
        row.original.title ? (
          <div className="font-medium">{row.original.title}</div>
        ) : (
          <span className="text-neutral">-</span>
        ),
    },
    {
      accessorKey: 'description',
      header: tableHeaders.description,
      cell: ({ row }) =>
        row.original.description ? (
          <div className="line-clamp-2 max-w-xs text-neutral">
            {row.original.description}
          </div>
        ) : (
          <span className="text-neutral">-</span>
        ),
    },
    {
      accessorKey: 'tags',
      header: tableHeaders.tags,
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
            <span className="text-neutral">-</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: tableHeaders.location,
      cell: ({ row }) => {
        const location = row.original.location ?? 'remote';
        const isLocal = location === 'local' || location === 'hybrid';
        const isRemote =
          location === 'remote' ||
          location === 'hybrid' ||
          location === 'plugin';

        return (
          <div className="flex items-center gap-4 text-neutral">
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
        <SortHeader
          columnId="createdAt"
          label={tableHeaders.createdAt.value}
          currentSortBy={params.sortBy}
          currentSortOrder={params.sortOrder}
          onSort={handleSort}
        />
      ),
      cell: ({ row }) => (
        <div className="text-neutral">
          {formatDate((row.original as any).createdAt)}
        </div>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: () => (
        <SortHeader
          columnId="updatedAt"
          label={tableHeaders.updatedAt.value}
          currentSortBy={params.sortBy}
          currentSortOrder={params.sortOrder}
          onSort={handleSort}
        />
      ),
      cell: ({ row }) => (
        <div className="text-neutral">
          {formatDate((row.original as any).updatedAt)}
        </div>
      ),
    },
    {
      id: 'actions',
      header: tableHeaders.actions,
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
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
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
    <div className="flex w-full flex-1 flex-col gap-6 py-6 text-sm">
      <DictionaryToolbar
        register={register}
        searchPlaceholder={searchPlaceholder}
        setIsFiltersModalOpen={setIsFiltersModalOpen}
        filterLabels={filterLabels}
        hasAppliedFilters={hasAppliedFilters}
        appliedFiltersCount={appliedFiltersCount}
        selectColumns={selectColumns}
        visibleColumns={visibleColumns}
        table={table}
        selectedRows={selectedRows}
        handleBulkDelete={handleBulkDelete}
        deleteSelectedButton={deleteSelectedButton}
        createDictionaryButton={createDictionaryButton}
        setIsCreationModalOpen={setIsCreationModalOpen}
      />

      {hasAppliedFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {params.location !== 'none' && (
            <div className="flex items-center gap-1 rounded-full border border-card bg-card px-3 py-1">
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
            <div className="flex items-center gap-1 rounded-full border border-card bg-card px-3 py-1">
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

      <DictionaryTable
        table={table}
        isPending={isPending}
        dictionaries={dictionaries}
        noDictionaryFound={noDictionaryFound}
        setFocusedContent={setFocusedContent}
        router={router}
        PagesRoutes={PagesRoutes}
      />

      <DictionaryModals
        isCreationModalOpen={isCreationModalOpen}
        setIsCreationModalOpen={setIsCreationModalOpen}
        refetch={refetch}
        isDeleteModalOpen={isDeleteModalOpen}
        setDictionaryToDelete={setDictionaryToDelete}
        onConfirmDelete={onConfirmDelete}
        isDeleting={isDeleting}
        dictionaryToDelete={dictionaryToDelete}
        editingDictionaryKey={editingDictionaryKey}
        setEditingDictionaryKey={setEditingDictionaryKey}
        isFiltersModalOpen={isFiltersModalOpen}
        setIsFiltersModalOpen={setIsFiltersModalOpen}
        params={params}
        setParam={setParam}
        setParams={setParams}
        locationOptions={locationOptions}
        tableHeaders={tableHeaders}
        filterLabels={filterLabels}
      />

      <div className="flex w-full flex-row items-end justify-between gap-4 px-10 pt-4">
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
