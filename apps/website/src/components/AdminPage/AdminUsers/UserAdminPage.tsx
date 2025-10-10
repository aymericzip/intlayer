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
  Input,
  Loader,
  Pagination,
  Select,
  Table,
} from '@intlayer/design-system';
import {
  useGetOrganizations,
  useGetUsers,
} from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { PagesRoutes } from '@/Routes';

export const UsersAdminPageContent: FC = () => {
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
  const [organizationFilter, setOrganizationFilter] = useState(
    searchParams.get('organizationId') ?? 'all'
  );

  const { data: organizationsData } = useGetOrganizations();
  const organizations =
    (organizationsData as GetOrganizationsResult | undefined)?.data ?? [];

  const usersQuery = useGetUsers({
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
    fetchAll: 'true', // For admin users, will fetch all users without filtering by organization
    ...(searchQuery && { search: searchQuery }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
    ...(organizationFilter &&
      organizationFilter !== 'all' && { organizationId: organizationFilter }),
  });

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    error,
    refetch,
  } = usersQuery;

  const {
    title,
    tableHeaders,
    statusLabels,
    actions,
    noUsersMessage,
    errorMessages,
    successMessages,
    searchPlaceholder,
    filterPlaceholder,
    allStatuses,
    noData,
  } = useIntlayer('user-admin-page');

  const { helpers } = useIntlayer('admin-pages');

  const usersResponse = usersData as GetUsersResult | undefined;
  const users = usersResponse?.data ?? [];
  const totalItems = usersResponse?.total_items ?? users.length;
  const totalPages = usersResponse?.total_pages ?? 1;

  const pushParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSort = (field: string) => {
    const newSortOrder: SortOrder =
      sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newSortOrder);

    pushParams({ sortBy: field, sortOrder: newSortOrder, page: '1' });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    pushParams({ search: value || null, page: '1' });
  };

  const handleOrganizationFilter = (value: string) => {
    setOrganizationFilter(value);
    pushParams({
      organizationId: value && value !== 'all' ? value : null,
      page: '1',
    });
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

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    pushParams({ pageSize: size.toString(), page: '1' });

    setItemsPerPage(size);
    setCurrentPage(1);
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
    <div>
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
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select
              value={organizationFilter ?? 'all'}
              onValueChange={handleOrganizationFilter}
            >
              <Select.Trigger className="w-[200px]">
                <Select.Value placeholder={filterPlaceholder.value} />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="all">{allStatuses.value}</Select.Item>
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
            <Table isRollable={false} displayModal={false} className="w-full">
              <thead>
                <tr className="border-neutral-200 border-b dark:border-neutral-700">
                  <th
                    className="cursor-pointer select-none px-4 py-3 text-left font-medium text-neutral-900 hover:text-neutral-600 dark:text-neutral-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="group flex items-center gap-2">
                      {tableHeaders.name.value}
                      <div
                        className={cn(
                          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                          sortBy === 'name' && 'opacity-100'
                        )}
                      >
                        {sortOrder === 'asc' ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th
                    className="cursor-pointer select-none px-4 py-3 text-left font-medium text-neutral-900 hover:text-neutral-600 dark:text-neutral-100"
                    onClick={() => handleSort('id')}
                  >
                    <div className="group flex items-center gap-2">
                      {tableHeaders.id.value}
                      <div
                        className={cn(
                          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                          sortBy === 'id' && 'opacity-100'
                        )}
                      >
                        {sortOrder === 'asc' ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th
                    className="cursor-pointer select-none px-4 py-3 text-left font-medium text-neutral-900 hover:text-neutral-600 dark:text-neutral-100"
                    onClick={() => handleSort('email')}
                  >
                    <div className="group flex items-center gap-2">
                      {tableHeaders.email.value}
                      <div
                        className={cn(
                          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                          sortBy === 'email' && 'opacity-100'
                        )}
                      >
                        {sortOrder === 'asc' ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th
                    className="cursor-pointer select-none px-4 py-3 text-left font-medium text-neutral-900 hover:text-neutral-600 dark:text-neutral-100"
                    onClick={() => handleSort('emailVerified')}
                  >
                    <div className="group flex items-center gap-2">
                      {tableHeaders.status.value}
                      <div
                        className={cn(
                          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                          sortBy === 'emailVerified' && 'opacity-100'
                        )}
                      >
                        {sortOrder === 'asc' ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th
                    className="cursor-pointer select-none px-4 py-3 text-left font-medium text-neutral-900 hover:text-neutral-600 dark:text-neutral-100"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="group flex items-center gap-2">
                      {tableHeaders.createdAt.value}
                      <div
                        className={cn(
                          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                          sortBy === 'createdAt' && 'opacity-100'
                        )}
                      >
                        {sortOrder === 'asc' ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th
                    className="cursor-pointer select-none px-4 py-3 text-left font-medium text-neutral-900 hover:text-neutral-600 dark:text-neutral-100"
                    onClick={() => handleSort('updatedAt')}
                  >
                    <div className="group flex items-center gap-2">
                      {tableHeaders.updatedAt.value}
                      <div
                        className={cn(
                          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                          sortBy === 'updatedAt' && 'opacity-100'
                        )}
                      >
                        {sortOrder === 'asc' ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100">
                    {tableHeaders.actions.value}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: UserAPI) => (
                  <tr
                    key={user.id}
                    className="border-neutral-100 border-b hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                  >
                    <td className="px-4 py-3">
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
                              href={PagesRoutes.Admin_Users_Id.replace(
                                ':id',
                                user.id
                              )}
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
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <CopyToClipboard text={user.id}>
                            <span className="font-mono text-sm">
                              ...{user.id.slice(-5)}
                            </span>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-neutral-900 text-sm dark:text-neutral-100">
                        <CopyToClipboard text={user.email}>
                          {user.email}
                        </CopyToClipboard>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={BadgeVariant.OUTLINE}
                        color={
                          user.emailVerified
                            ? BadgeColor.TEXT
                            : BadgeColor.DESTRUCTIVE
                        }
                      >
                        {user.emailVerified
                          ? statusLabels.verified.value
                          : statusLabels.pending.value}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-neutral-500 text-sm dark:text-neutral-400">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : noData.value}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-neutral-500 text-sm dark:text-neutral-400">
                        {user.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString()
                          : noData.value}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Link
                          href={PagesRoutes.Admin_Users_Id.replace(
                            ':id',
                            user.id
                          )}
                          label={actions.edit.value}
                          color="text"
                        >
                          {actions.edit.value}
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <div className="flex flex-col items-start gap-2">
                <div className="text-neutral-600 text-sm dark:text-neutral-400">
                  {helpers.showingResults.value
                    .replace(
                      '{start}',
                      ((currentPage - 1) * itemsPerPage + 1).toString()
                    )
                    .replace(
                      '{end}',
                      Math.min(
                        currentPage * itemsPerPage,
                        totalItems
                      ).toString()
                    )
                    .replace('{total}', totalItems.toString())}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600 text-sm dark:text-neutral-400">
                    {helpers.perPage.value}
                  </span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={handlePageSizeChange}
                  >
                    <Select.Trigger className="w-20">
                      <Select.Value
                        placeholder={helpers.selectPageSize.value}
                      />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="5">5</Select.Item>
                      <Select.Item value="10">10</Select.Item>
                      <Select.Item value="20">20</Select.Item>
                      <Select.Item value="50">50</Select.Item>
                    </Select.Content>
                  </Select>
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
