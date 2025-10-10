'use client';

import { Link } from '@components/Link/Link';
import type {
  GetOrganizationsResult,
  GetUsersResult,
  UserAPI,
} from '@intlayer/backend';
import {
  Avatar,
  Badge,
  BadgeColor,
  BadgeVariant,
  CopyToClipboard,
  Loader,
  NumberItemsSelector,
  Pagination,
  SearchInput,
  Select,
  ShowingResultsNumberItems,
  Table,
} from '@intlayer/design-system';
import {
  useGetOrganizations,
  useGetUsers,
  useSearch,
} from '@intlayer/design-system/hooks';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@utils/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';

export const UsersAdminPageContent: FC = () => {
  type SortOrder = 'asc' | 'desc';

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: undefined },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
    organizationId: { type: 'string', fallbackValue: 'all' },
  });

  const currentPage = params.page as number;
  const itemsPerPage = params.pageSize as number;

  const { setSearch, search } = useSearch({});

  const { data: organizationsData } = useGetOrganizations({
    fetchAll: 'true',
  });
  const organizations =
    (organizationsData as GetOrganizationsResult | undefined)?.data ?? [];

  const usersQuery = useGetUsers({
    fetchAll: 'true',
    ...(search && { search }),
    ...params,
    ...(params.organizationId === 'all' && { organizationId: undefined }),
  });

  const { data: usersData, isLoading: isLoadingUsers, error } = usersQuery;

  const {
    title,
    tableHeaders,
    statusLabels,
    actions,
    noUsersMessage,
    errorMessages,
    searchPlaceholder,
    filterPlaceholder,
    allStatuses,
    noData,
  } = useIntlayer('user-admin-page');

  const usersResponse = usersData as GetUsersResult | undefined;
  const users = usersResponse?.data ?? [];
  const totalItems = usersResponse?.total_items ?? 0;
  const totalPages = usersResponse?.total_pages ?? 1;

  const sorting: SortingState = params.sortBy
    ? [{ id: params.sortBy, desc: params.sortOrder === 'desc' }]
    : [];

  const columns: ColumnDef<UserAPI>[] = [
    {
      accessorKey: 'name',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.name}
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
        const user = row.original as UserAPI;
        return (
          <div className="flex items-center">
            <Avatar
              isLoggedIn={true}
              isLoading={false}
              className="shrink-0"
              src={user.image ?? undefined}
              fullname={user.name}
            />
            <div className="ml-3">
              {user.name ? (
                <Link
                  href={PagesRoutes.Admin_Users_Id.replace(':id', user.id)}
                  label={user.name ?? '-'}
                  color="text"
                >
                  <CopyToClipboard text={user.name}>
                    {user.name}
                  </CopyToClipboard>
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
          {tableHeaders.id.value}
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
        const user = row.original as UserAPI;
        return (
          <div className="flex items-center">
            <div className="ml-3">
              <CopyToClipboard text={user.id}>
                <span className="font-mono text-sm">
                  ...{user.id.slice(-5)}
                </span>
              </CopyToClipboard>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.email}
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
        const user = row.original as UserAPI;
        return (
          <div className="text-neutral-900 text-sm dark:text-neutral-100">
            <CopyToClipboard text={user.email}>{user.email}</CopyToClipboard>
          </div>
        );
      },
    },
    {
      accessorKey: 'emailVerified',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.status}
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
        const user = row.original as UserAPI;
        return (
          <Badge
            variant={BadgeVariant.OUTLINE}
            color={
              user.emailVerified ? BadgeColor.SUCCESS : BadgeColor.DESTRUCTIVE
            }
          >
            {user.emailVerified ? statusLabels.verified : statusLabels.pending}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.createdAt}
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
        const user = row.original as UserAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : noData}
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
        const user = row.original as UserAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {user.updatedAt
              ? new Date(user.updatedAt).toLocaleDateString()
              : noData}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableSorting: false,
      header: () => tableHeaders.actions,
      cell: ({ row }) => {
        const user = row.original as UserAPI;
        return (
          <div className="flex space-x-2">
            <Link
              href={PagesRoutes.Admin_Users_Id.replace(':id', user.id)}
              label={actions.edit.value}
              color="text"
            >
              {actions.edit}
            </Link>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
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

  const handleOrganizationFilter = (value: string) => {
    setParams({ organizationId: value, page: 1 });
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
          <SearchInput
            placeholder={searchPlaceholder.value}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-md pl-10"
          />

          <div className="flex gap-2">
            <Select
              value={(params.organizationId as string) ?? 'all'}
              onValueChange={handleOrganizationFilter}
            >
              <Select.Trigger className="w-[200px]">
                <Select.Value placeholder={filterPlaceholder} />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="all">{allStatuses}</Select.Item>
                {organizations.map((org: any) => (
                  <Select.Item key={org.id} value={org.id}>
                    {org.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        </div>
      </div>

      <Loader isLoading={isLoadingUsers}>
        {users.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              {noUsersMessage}
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
              <div className="flex flex-col items-start gap-2">
                <ShowingResultsNumberItems
                  currentPage={currentPage}
                  pageSize={itemsPerPage}
                  totalItems={totalItems}
                />
                <div className="flex items-center gap-2">
                  <NumberItemsSelector
                    value={itemsPerPage.toString()}
                    onValueChange={handlePageSizeChange}
                  />
                </div>
              </div>
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
            </div>
          </div>
        )}
      </Loader>
    </div>
  );
};
