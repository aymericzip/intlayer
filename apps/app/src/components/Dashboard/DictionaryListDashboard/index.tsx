'use client';

import {
  Button,
  Checkbox,
  Container,
  CopyToClipboard,
  Loader,
  NumberItemsSelector,
  Pagination,
  PopoverStatic,
  ShowingResultsNumberItems,
  Tag,
} from '@intlayer/design-system';
import { useFocusUnmergedDictionary } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowRight,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useDate } from 'next-intlayer/format';
import { type FC, Suspense, useMemo } from 'react';
import { PagesRoutes } from '@/Routes';
import { DictionaryModals } from './DictionaryModals';
import { DictionaryTable } from './DictionaryTable';
import { DictionaryToolbar } from './DictionaryToolbar';
import { useDictionaryDashboard } from './useDictionaryDashboard';

export const DictionaryListDashboardContent: FC = () => {
  const dashboard = useDictionaryDashboard();
  const { setFocusedContent } = useFocusUnmergedDictionary();
  const formatDate = useDate();
  const content = useIntlayer('dictionary-list');

  const handleSort = (columnId: string) => {
    const isAsc =
      dashboard.params.sortBy === columnId &&
      dashboard.params.sortOrder === 'asc';
    dashboard.setParams({
      sortBy: columnId,
      sortOrder: isAsc ? 'desc' : 'asc',
      page: 1,
    });
  };

  const getSortIcon = (columnId: string) => {
    if (dashboard.params.sortBy !== columnId) return ChevronsUpDown;
    return dashboard.params.sortOrder === 'asc' ? ChevronUp : ChevronDown;
  };

  const SortHeader: FC<{ columnId: string; label: string }> = ({
    columnId,
    label,
  }) => (
    <Button
      variant="hoverable"
      color="text"
      size="sm"
      className="flex items-center gap-1 font-medium"
      onClick={() => handleSort(columnId)}
      Icon={getSortIcon(columnId)}
      label={label}
    >
      {label}
    </Button>
  );

  const columns = useMemo<ColumnDef<Dictionary>[]>(
    () => [
      {
        id: 'selection',
        header: ({ table }) => (
          <Checkbox
            name="select-all"
            size="sm"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            aria-label={content.selectAll.value}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            name={`select-row-${row.id}`}
            size="sm"
            checked={row.getIsSelected()}
            onClick={(e) => e.stopPropagation()} // FIX: Prevent row click navigation
            onChange={(e) => row.toggleSelected(e.target.checked)}
            aria-label={content.selectRow.value}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'id',
        header: content.tableHeaders.id,
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
          <SortHeader columnId="key" label={content.tableHeaders.key.value} />
        ),
        cell: ({ row }) => (
          <CopyToClipboard
            text={row.original.key}
            size={9}
            className="font-mono"
          >
            {row.original.key}
          </CopyToClipboard>
        ),
      },
      {
        accessorKey: 'title',
        header: () => (
          <SortHeader
            columnId="title"
            label={content.tableHeaders.title.value}
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
        header: content.tableHeaders.description,
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
        header: content.tableHeaders.tags,
        cell: ({ row }) => {
          const tags = (row.original as any).tags;
          return (
            <div className="flex flex-wrap gap-1">
              {tags && tags.length > 0 ? (
                tags.map((tag: string) => (
                  <Tag key={tag} color="neutral" size="xs">
                    {tag}
                  </Tag>
                ))
              ) : (
                <span className="text-neutral">-</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'location',
        header: content.tableHeaders.location,
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
                  name={`is-local-${row.id}`}
                  checked={isLocal}
                  disabled
                  size="sm"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                />
                <span>{content.locationOptions.local.value}</span>
              </div>
              <div className="flex items-center gap-1">
                <Checkbox
                  name={`is-remote-${row.id}`}
                  checked={isRemote}
                  disabled
                  size="sm"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                />
                <span>{content.locationOptions.remote.value}</span>
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
            label={content.tableHeaders.createdAt.value}
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
            label={content.tableHeaders.updatedAt.value}
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
        header: content.tableHeaders.actions,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <PopoverStatic identifier={`view-${row.original.id}`}>
              <Button
                variant="hoverable"
                color="text"
                size="icon-sm"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();

                  setFocusedContent({
                    dictionaryKey: row.original.key,
                    dictionaryLocalId: row.original.localId,
                    keyPath: [],
                  });

                  dashboard.actions.router.push(
                    `${PagesRoutes.Dashboard_Dictionaries}/${row.original.key}`
                  );
                }}
                Icon={ArrowRight}
                label={content.viewButton?.label?.value ?? 'View'}
              />
              <PopoverStatic.Detail
                xAlign="end"
                identifier={`view-${row.original.id}`}
              >
                <Container className="p-3">
                  <p>{content.viewButton?.popover}</p>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>
            <PopoverStatic identifier={`edit-${row.original.id}`}>
              <Button
                variant="hoverable"
                color="text"
                size="icon-sm"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();

                  if (row.original.key) {
                    dashboard.state.setEditingDictionaryKey(row.original.key);
                  }
                }}
                Icon={Pencil}
                label={content.editButton.label.value}
              />
              <PopoverStatic.Detail
                xAlign="end"
                identifier={`edit-${row.original.id}`}
              >
                <Container className="p-3">
                  <p>{content.editButton.popover}</p>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>
            <PopoverStatic identifier={`delete-${row.original.id}`}>
              <Button
                variant="hoverable"
                color="error"
                className="ml-auto text-text hover:text-error"
                size="icon-sm"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();

                  if (row.original.id) {
                    dashboard.state.setDictionaryToDelete(row.original.id);
                  }
                }}
                Icon={Trash2}
                label={content.deleteButton.label.value}
              />
              <PopoverStatic.Detail
                xAlign="end"
                identifier={`delete-${row.original.id}`}
              >
                <Container className="p-3">
                  <p>{content.deleteButton.popover}</p>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>
          </div>
        ),
      },
    ],
    [
      dashboard.params.sortBy,
      dashboard.params.sortOrder,
      formatDate,
      dashboard.state,
    ]
  );

  const table = useReactTable({
    data: dashboard.data.dictionaries,
    columns,
    state: {
      rowSelection: dashboard.state.rowSelection,
      columnVisibility: dashboard.state.columnVisibility,
    },
    onRowSelectionChange: dashboard.state.setRowSelection,
    onColumnVisibilityChange: dashboard.state.setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id!,
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-6 py-6 text-sm">
      <DictionaryToolbar dashboard={dashboard} table={table} />

      <DictionaryTable
        table={table}
        isPending={dashboard.data.isPending}
        noDictionaryFound={content.noDictionaryFound.value}
        onRowClick={(row) => {
          // Selection toggle instead of navigation
          row.toggleSelected();
        }}
      />

      <DictionaryModals dashboard={dashboard} />

      <div className="flex w-full flex-row items-end justify-between px-10 pt-4">
        <div className="flex flex-col gap-4">
          <ShowingResultsNumberItems
            currentPage={dashboard.params.page}
            pageSize={dashboard.params.pageSize}
            totalItems={dashboard.data.totalItems}
          />
          <NumberItemsSelector
            value={dashboard.params.pageSize.toString()}
            onValueChange={(val) =>
              dashboard.setParams({ pageSize: Number(val), page: 1 })
            }
          />
        </div>
        <Pagination
          currentPage={dashboard.params.page}
          totalPages={dashboard.data.totalPages}
          onPageChange={(page) => dashboard.setParam('page', page)}
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
