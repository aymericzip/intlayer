'use client';

import { Link } from '@components/Link/Link';
import type {
  GetOrganizationsResult,
  OrganizationAPI,
} from '@intlayer/backend';
import {
  CopyToClipboard,
  Loader,
  NumberItemsSelector,
  Pagination,
  SearchInput,
  ShowingResultsNumberItems,
  Table,
} from '@intlayer/design-system';
import { useGetOrganizations, useSearch } from '@intlayer/design-system/hooks';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@utils/cn';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';

export const OrganizationsAdminPageContent: FC = () => {
  type SortOrder = 'asc' | 'desc';

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: undefined },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const router = useRouter();
  const { setSearch, search } = useSearch({});

  const organizationsQuery = useGetOrganizations({
    fetchAll: 'true',
    ...(search && { search }),
    ...params,
  });

  const { data, error, isFetching } = organizationsQuery;
  const { title, tableHeaders, noData, errorMessages, searchPlaceholder } =
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

  const columns: ColumnDef<OrganizationAPI>[] = [
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
                <CopyToClipboard text={organization.name}>
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
    state: { sorting },
    manualSorting: true,
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
    <div className="flex flex-1 flex-col">
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-neutral-900 dark:text-neutral-100">
          {title}
        </h1>
      </div>

      <div className="mb-4 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
            <SearchInput
              placeholder={searchPlaceholder.value}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-md pl-10"
            />
          </div>
        </div>
      </div>

      <Loader isLoading={isFetching}>
        {organizations.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              {noData.value}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-neutral-200 border-b dark:border-neutral-700"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100',
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
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer whitespace-nowrap border-neutral-100 border-b hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                    onClick={() => {
                      router.push(
                        PagesRoutes.Admin_Organizations_Id.replace(
                          ':id',
                          row.original.id
                        )
                      );
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Loader>
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

export default OrganizationsAdminPageContent;
