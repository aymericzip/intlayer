import type {
  GetOrganizationsResult,
  GetUsersResult,
  UserAPI,
} from '@intlayer/backend';
import {
  useDeleteUser,
  useGetOrganizations,
  useGetUsers,
  useUpdateUser,
} from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { useSearch } from '@intlayer/design-system/hooks';
import { Checkbox, SearchInput } from '@intlayer/design-system/input';

import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import { getAppAdminUserRoute } from '@intlayer/design-system/routes';
import { Select } from '@intlayer/design-system/select';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { Table } from '@intlayer/design-system/table';
import { cn } from '@intlayer/design-system/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { UsersAdminSkeleton } from './UsersAdminSkeleton';

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

  const navigate = useLocalizedNavigate();
  const { setSearch, search } = useSearch({});
  const { mutateAsync: deleteUserById, isPending: isDeleting } =
    useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

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

  const { data: usersData, error, isFetching } = usersQuery;

  const {
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

  const totalPages: number = usersData?.total_pages ?? 1;
  const totalItems: number = usersData?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const sorting: SortingState = params.sortBy
    ? [{ id: params.sortBy, desc: params.sortOrder === 'desc' }]
    : [];

  const columns: ColumnDef<UserAPI>[] = [
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
              size="sm"
            />
            <div className="ml-3">
              {user.name ? (
                <CopyToClipboard text={user.name} size={10}>
                  {user.name}
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
              <CopyToClipboard text={user.id} size={10}>
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
            <CopyToClipboard text={user.email} size={10}>
              {user.email}
            </CopyToClipboard>
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
            variant="outline"
            className="opacity-70"
            color={user.emailVerified ? 'success' : 'error'}
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
      id: 'active',
      enableSorting: false,
      header: () => tableHeaders.active,
      cell: ({ row }) => {
        const user = row.original as UserAPI;
        return (
          <SwitchSelector
            color="text"
            size="sm"
            value={!!user.emailVerified}
            onChange={(checked: boolean) =>
              updateUser({ id: user.id, emailVerified: checked })
            }
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
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
              to={getAppAdminUserRoute(user.id)}
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
    state: { sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
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

  const selectedUserIds = Object.keys(rowSelection)
    .filter((k) => rowSelection[k])
    .map((idx) => users[parseInt(idx, 10)]?.id)
    .filter(Boolean) as string[];

  const handleBulkDelete = async () => {
    for (const userId of selectedUserIds) {
      await deleteUserById(userId);
    }
    setRowSelection({});
  };

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
        <div className="text-error">
          {errorMessages.loadingError}:{' '}
          {error instanceof Error ? error.message : String(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center p-4">
      <div className="flex size-full flex-1 flex-col gap-4 overflow-scroll">
        <div className="space-y-4">
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
                <Select.Trigger className="w-50">
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

        {isFetching && users.length === 0 ? (
          <UsersAdminSkeleton showToolBar={false} />
        ) : users.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              {noUsersMessage}
            </p>
          </div>
        ) : (
          <div className="h-full flex-1 space-y-4">
            {selectedUserIds.length > 0 && (
              <div className="flex items-center justify-end gap-2">
                <Button
                  color="error"
                  variant="outline"
                  Icon={Trash2}
                  label={actions.deleteSelected.value}
                  onClick={handleBulkDelete}
                  isLoading={isDeleting}
                >
                  {actions.deleteSelected} ({selectedUserIds.length})
                </Button>
              </div>
            )}
            <Table className="w-full border-separate border-spacing-0">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap px-4 py-3 font-medium text-neutral',
                          ['selection', 'actions', 'active'].includes(header.id)
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
                          to: getAppAdminUserRoute(row.original.id) as any,
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
                              ['selection', 'actions', 'active'].includes(
                                cell.column.id
                              )
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
