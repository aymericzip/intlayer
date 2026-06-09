import type {
  GetOrganizationsResult,
  OrganizationAPI,
} from '@intlayer/backend';
import {
  useDeleteOrganizationById,
  useGetOrganizations,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { useSearch } from '@intlayer/design-system/hooks';
import { Checkbox, SearchInput } from '@intlayer/design-system/input';

import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import { getAppAdminOrganizationRoute } from '@intlayer/design-system/routes';
import { Table } from '@intlayer/design-system/table';
import { cn } from '@intlayer/design-system/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { OrganizationsAdminSkeleton } from './OrganizationsAdminSkeleton';

export const OrganizationsAdminPageContent: FC = () => {
  type SortOrder = 'asc' | 'desc';

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { mutateAsync: deleteOrgById, isPending: isDeleting } =
    useDeleteOrganizationById();

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: undefined },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const navigate = useLocalizedNavigate();
  const { setSearch, search } = useSearch({});

  const organizationsQuery = useGetOrganizations({
    fetchAll: 'true',
    ...(search && { search }),
    ...params,
  });

  const { data, error, isFetching } = organizationsQuery;
  const { tableHeaders, noData, errorMessages, searchPlaceholder } =
    useIntlayer('organization-admin-page');

  const organizationsResponse = data as GetOrganizationsResult | undefined;
  const organizations = organizationsResponse?.data ?? [];

  const totalPages: number = organizationsResponse?.total_pages ?? 1;
  const totalItems: number = organizationsResponse?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const sorting: SortingState = params.sortBy
    ? [{ id: params.sortBy, desc: params.sortOrder === 'desc' }]
    : [];

  const selectedOrgIds = Object.keys(rowSelection)
    .filter((k) => rowSelection[k])
    .map((idx) => organizations[parseInt(idx)]?.id)
    .filter(Boolean) as string[];

  const columns: ColumnDef<OrganizationAPI>[] = [
    {
      id: 'selection',
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          name="select-all"
          size="sm"
          color="text"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          name={`select-row-${row.id}`}
          size="sm"
          color="text"
          checked={row.getIsSelected()}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
        />
      ),
    },
    {
      accessorKey: 'name',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.name.value}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const organization = row.original as OrganizationAPI;
        return (
          <div className="flex items-center">
            <div className="ml-3">
              {organization.name ? (
                <CopyToClipboard text={organization.name} size={10}>
                  {organization.name}
                </CopyToClipboard>
              ) : (
                '-'
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'id',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.id}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const organization = row.original as OrganizationAPI;
        return (
          <div className="ml-3 font-mono text-sm">
            ...
            {organization.id.slice(-5)}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.createdAt.value}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const organization = row.original as OrganizationAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {organization.createdAt
              ? new Date(organization.createdAt).toLocaleDateString()
              : noData.value}
          </div>
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.updatedAt}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const organization = row.original as OrganizationAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {organization.updatedAt
              ? new Date(organization.updatedAt).toLocaleDateString()
              : noData}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: organizations,
    columns,
    state: { sorting, rowSelection },
    manualSorting: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      if (next.length > 0) {
        const s = next[0];
        const field = s.id;
        const order: SortOrder = s.desc ? 'desc' : 'asc';
        setParams({ sortBy: field, sortOrder: order, page: 1 });
      } else {
        setParams({ sortBy: '', sortOrder: 'asc', page: 1 });
      }
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setParams({ search: value, page: 1 });
  };

  // Keep the input's search value in sync with URL param
  useEffect(() => {
    setSearch((params.search as string) ?? '');
  }, [params.search, setSearch]);

  const handlePageChange = (page: number) => {
    setParam('page', page);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    setParams({ pageSize: size, page: 1 });
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-error">
          {errorMessages.loadingError}:{' '}
          {error instanceof Error ? error.message : String(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center p-4">
      <div className="flex size-full flex-1 flex-col gap-4">
        <div className="space-y-4">
          <SearchInput
            placeholder={searchPlaceholder.value}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {selectedOrgIds.length > 0 && (
          <div className="mb-4 flex items-center justify-end gap-2">
            <Button
              color="error"
              variant="outline"
              Icon={Trash2}
              label={`Delete selected (${selectedOrgIds.length})`}
              isLoading={isDeleting}
              onClick={async () => {
                for (const id of selectedOrgIds) {
                  await deleteOrgById(id);
                }
                setRowSelection({});
              }}
            >
              Delete selected ({selectedOrgIds.length})
            </Button>
          </div>
        )}

        {isFetching && organizations.length === 0 ? (
          <OrganizationsAdminSkeleton showToolBar={false} />
        ) : organizations.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              {noData.value}
            </p>
          </div>
        ) : (
          <div className="flex flex-1 items-start justify-start space-y-4">
            <Table className="w-full border-separate border-spacing-0">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap px-4 py-3 font-medium text-neutral',
                          ['selection', 'actions'].includes(header.id)
                            ? 'text-center'
                            : 'text-left',
                          header.column.getCanSort() &&
                            'cursor-pointer select-none hover:text-neutral-600'
                        )}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                      className="cursor-pointer whitespace-nowrap rounded-xl border-card border-b transition-colors hover:bg-card/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-card"
                      onClick={() => {
                        navigate({
                          to: getAppAdminOrganizationRoute(
                            row.original.id
                          ) as any,
                        });
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
          </div>
        )}
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
    </div>
  );
};

export default OrganizationsAdminPageContent;
