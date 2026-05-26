import type {
  DiscussionAPI,
  GetDiscussionsResult,
  GetUsersResult,
  UserAPI,
} from '@intlayer/backend';
import { useGetDiscussions, useGetUsers } from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { useSearch } from '@intlayer/design-system/hooks';
import { SearchInput } from '@intlayer/design-system/input';

import { Modal } from '@intlayer/design-system/modal';
import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import { getAppAdminUserRoute } from '@intlayer/design-system/routes';
import { Table } from '@intlayer/design-system/table';
import { cn } from '@intlayer/design-system/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { DiscussionAdminDetail } from './DiscussionAdminDetail';
import { DiscussionsAdminSkeleton } from './DiscussionsAdminSkeleton';

export const DiscussionsAdminPageContent: FC = () => {
  type SortOrder = 'asc' | 'desc';

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: 'updatedAt' },
    sortOrder: { type: 'string', fallbackValue: 'desc' },
  });

  const { setSearch, search } = useSearch({});
  const [discussionId, setDiscussionId] = useState<string | undefined>(
    undefined
  );

  const discussionsQuery = useGetDiscussions({
    fetchAll: 'true',
    includeMessages: 'false',
    ...(search && { search }),
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
    ...(params.sortBy && { sortBy: params.sortBy }),
    ...(params.sortOrder && { sortOrder: params.sortOrder }),
    ...(params.search && { search: params.search }),
  });

  // users fetched after discussions are loaded

  const { data, error, isFetching } = discussionsQuery;
  const { tableHeaders, noData, errorMessages, searchPlaceholder, modalTitle } =
    useIntlayer('discussion-admin-detail');

  const discussionsResponse = data as GetDiscussionsResult | undefined;
  const discussions = discussionsResponse?.data ?? [];

  const userIds: string[] = Array.from(
    new Set(
      discussions
        .map((d) => d.userId)
        .filter(Boolean)
        .map(String)
    )
  );

  const usersQuery = useGetUsers(
    { ids: userIds, fetchAll: 'true' },
    { enabled: userIds.length > 0 }
  );

  const usersResponse = usersQuery.data as GetUsersResult | undefined;
  const users = usersResponse?.data ?? [];

  const userIdToUser = new Map<string, UserAPI>();
  for (const user of users) userIdToUser.set(String(user.id), user);

  const totalPages: number = discussionsResponse?.total_pages ?? 1;
  const totalItems: number = discussionsResponse?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const sorting: SortingState = params.sortBy
    ? [{ id: params.sortBy, desc: params.sortOrder === 'desc' }]
    : [];

  const columns: ColumnDef<DiscussionAPI>[] = [
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
        const discussion = row.original as DiscussionAPI;
        return (
          <div className="ml-3 font-mono text-sm">
            ...
            {String(discussion.id).slice(-5)}
          </div>
        );
      },
    },
    {
      accessorKey: 'numberOfMessages',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.numberOfMessages.value}
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
        const discussion = row.original as any;
        return (
          <div className="font-medium">{discussion.numberOfMessages ?? 0}</div>
        );
      },
    },
    {
      accessorKey: 'userName',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.userName.value}
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
        const discussion = row.original as DiscussionAPI;
        const user = userIdToUser.get(String(discussion.userId));
        return (
          <div className="flex items-center">
            <Avatar
              isLoggedIn={true}
              isLoading={usersQuery.isFetching}
              className="shrink-0"
              src={user?.image ?? undefined}
              fullname={user?.name ?? ''}
            />
            {user?.id && (
              <div className="ml-3">
                {user?.name ? (
                  <Link
                    to={getAppAdminUserRoute(user.id)}
                    label={user.name ?? '-'}
                    color="text"
                  >
                    <CopyToClipboard text={user.name} size={10}>
                      {user.name}
                    </CopyToClipboard>
                  </Link>
                ) : (
                  '-'
                )}
              </div>
            )}
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
        const discussion = row.original as DiscussionAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {discussion.createdAt
              ? new Date(discussion.createdAt).toLocaleDateString()
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
        const discussion = row.original as DiscussionAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {discussion.updatedAt
              ? new Date(discussion.updatedAt).toLocaleDateString()
              : noData.value}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: discussions,
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
    <div className="flex flex-1 flex-col items-center p-4">
      <div className="flex size-full flex-col gap-4">
        <div className="mb-4 space-y-4">
          <SearchInput
            placeholder={searchPlaceholder.value}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {isFetching && discussions.length === 0 ? (
          <DiscussionsAdminSkeleton showToolBar={false} />
        ) : discussions.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              {noData.value}
            </p>
          </div>
        ) : (
          <div className="h-full flex-1 space-y-4">
            <Table className="w-full border-separate border-spacing-0 overflow-scroll">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap px-4 py-3 font-medium text-neutral',
                          header.id === 'numberOfMessages'
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
                      onClick={() => setDiscussionId(String(row.original.id))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setDiscussionId(String(row.original.id));
                        }
                      }}
                      tabIndex={0}
                      role="button"
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
                              cell.column.id === 'numberOfMessages'
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
      <Modal
        isOpen={!!discussionId}
        onClose={() => setDiscussionId(undefined)}
        title={modalTitle({ discussionId: discussionId ?? '' }).value}
        size="xl"
        hasCloseButton
        isScrollable
      >
        <DiscussionAdminDetail discussionId={discussionId} />
      </Modal>
    </div>
  );
};

export default DiscussionsAdminPageContent;
