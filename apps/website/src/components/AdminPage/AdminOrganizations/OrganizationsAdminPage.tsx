'use client';

import { Link } from '@components/Link/Link';
import type {
  GetOrganizationsResult,
  OrganizationAPI,
} from '@intlayer/backend';
import { Input, Loader, Pagination, Table } from '@intlayer/design-system';
import { useGetOrganizations } from '@intlayer/design-system/hooks';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@utils/cn';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useMemo, useState } from 'react';
import { PagesRoutes } from '@/Routes';

export const OrganizationsAdminPageContent: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  type SortOrder = 'asc' | 'desc';

  const urlPage = parseInt(searchParams.get('page') ?? '1', 10);
  const urlPageSize = parseInt(searchParams.get('pageSize') ?? '10', 10);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [itemsPerPage, setItemsPerPage] = useState(urlPageSize);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') ?? ''
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') ?? '');
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (searchParams.get('sortOrder') as SortOrder) ?? 'asc'
  );

  const organizationsQuery = useGetOrganizations({
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
    fetchAll: 'true',
    ...(searchQuery && { search: searchQuery }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
  } as any);

  const { data, isLoading, error, refetch } = organizationsQuery;
  const { title, tableHeaders, noData, errorMessages, searchPlaceholder } =
    useIntlayer('organization-admin-page');

  const organizationsResponse = data as GetOrganizationsResult | undefined;
  const organizations = organizationsResponse?.data ?? [];
  const totalItems = organizationsResponse?.total_items ?? organizations.length;
  const totalPages = organizationsResponse?.total_pages ?? 1;

  const pushParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const sorting = useMemo<SortingState>(
    () => (sortBy ? [{ id: sortBy, desc: sortOrder === 'desc' }] : []),
    [sortBy, sortOrder]
  );

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
                <Link
                  href={PagesRoutes.Admin_Organizations_Id.replace(
                    ':id',
                    organization.id
                  )}
                  label={organization.name}
                  color="text"
                >
                  {organization.name}
                </Link>
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
        setSortBy(field);
        setSortOrder(order);
        pushParams({ sortBy: field, sortOrder: order, page: '1' });
      } else {
        setSortBy('');
        setSortOrder('asc');
        pushParams({ sortBy: null, sortOrder: null, page: '1' });
      }
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    pushParams({ search: value ?? null, page: '1' });
  };

  useEffect(() => {
    const urlPageFromParams = parseInt(searchParams.get('page') ?? '1', 10);
    const urlPageSizeFromParams = parseInt(
      searchParams.get('pageSize') ?? '10',
      10
    );

    if (urlPageFromParams !== currentPage) {
      setCurrentPage(urlPageFromParams);
    }
    if (urlPageSizeFromParams !== itemsPerPage) {
      setItemsPerPage(urlPageSizeFromParams);
    }
  }, [searchParams, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    pushParams({ page: page.toString() });
    setCurrentPage(page);
    refetch();
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">
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
          <div className="flex-1">
            <div className="relative">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder.value}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-md pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <Loader isLoading={isLoading}>
        {organizations.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              {noData.value}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Table isRollable={false} displayModal={false} className="w-full">
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
                          'px-4 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100',
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
                    className="border-neutral-100 border-b hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
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

            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  showFirstLast={true}
                  showPrevNext={true}
                  maxVisiblePages={5}
                  color="text"
                />
              </div>
              <div />
            </div>
          </div>
        )}
      </Loader>
    </div>
  );
};

export default OrganizationsAdminPageContent;
