import type { AffiliateAPI, AffiliateInvitationAPI } from '@intlayer/backend';
import {
  useGetAffiliateInvitations,
  useGetAffiliates,
} from '@intlayer/design-system/api';
import { Badge, BadgeColor, BadgeVariant } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { SearchInput } from '@intlayer/design-system/input';
import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import { getAppAdminAffiliateRoute } from '@intlayer/design-system/routes';
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
import { type FC, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { SendInvitationModal } from '#components/AffiliatePage/SendInvitationModal';
import { Link } from '#components/Link/Link';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { AffiliatesAdminSkeleton } from './AffiliatesAdminSkeleton';

const STATUS_COLOR: Record<AffiliateAPI['status'], BadgeColor> = {
  pending: BadgeColor.NEUTRAL,
  suspended: BadgeColor.ERROR,
  onboarding: BadgeColor.SECONDARY,
  active: BadgeColor.SUCCESS,
};

const INVITATIONS_PARAMS = { page: 1, pageSize: 100 };

const PendingInvitationsSection: FC = () => {
  const content = useIntlayer('affiliates-admin-page');
  const { data: invitationsData } =
    useGetAffiliateInvitations(INVITATIONS_PARAMS);
  const invitations = useMemo(
    () =>
      ((invitationsData?.data ?? []) as AffiliateInvitationAPI[]).filter(
        (inv) => inv.status === 'pending'
      ),
    [invitationsData?.data]
  );

  if (invitations.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium text-neutral text-sm">
        {content.pendingInvitations}
      </h2>
      <Table className="w-full border-separate border-spacing-0 overflow-scroll">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral">
              {content.id.value}
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral">
              {content.email.value}
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral">
              {content.commission.value}
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral">
              {content.status.value}
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral">
              {content.created.value}
            </th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => (
            <tr
              key={inv.id}
              className="whitespace-nowrap rounded-xl border-card border-b transition-colors"
            >
              <td className="whitespace-nowrap px-4 py-3">
                <CopyToClipboard text={inv.id} size={10}>
                  <span className="font-mono text-sm">
                    ...{inv.id.slice(-5)}
                  </span>
                </CopyToClipboard>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className="text-neutral/80 text-sm">{inv.email}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className="text-sm">
                  {inv.commissionRate}%{' '}
                  <span className="text-neutral/50 text-xs">
                    ({inv.commissionType})
                  </span>
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge
                  variant={BadgeVariant.OUTLINE}
                  className="opacity-80"
                  color={BadgeColor.SECONDARY}
                >
                  {content.invitationSent}
                </Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className="text-neutral-500 text-sm dark:text-neutral-400">
                  {inv.createdAt
                    ? new Date(inv.createdAt).toLocaleDateString()
                    : '—'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export const AffiliatesAdminPage: FC = () => {
  const content = useIntlayer('affiliates-admin-page');

  type SortOrder = 'asc' | 'desc';

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string', fallbackValue: undefined },
    sortBy: { type: 'string', fallbackValue: undefined },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useLocalizedNavigate();

  const { data: affiliatesData, isFetching } = useGetAffiliates({
    page: params.page,
    pageSize: params.pageSize,
    ...(params.search ? { search: params.search as string } : {}),
  });

  const affiliates = (affiliatesData?.data ?? []) as AffiliateAPI[];
  const totalPages: number = affiliatesData?.total_pages ?? 1;
  const totalItems: number = affiliatesData?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const sorting: SortingState = params.sortBy
    ? [{ id: params.sortBy as string, desc: params.sortOrder === 'desc' }]
    : [];

  const columns: ColumnDef<AffiliateAPI>[] = [
    {
      accessorKey: 'id',
      enableSorting: false,
      header: () => content.id.value,
      cell: ({ row }) => (
        <CopyToClipboard text={row.original.id} size={10}>
          <span className="font-mono text-sm">
            ...{row.original.id.slice(-5)}
          </span>
        </CopyToClipboard>
      ),
    },
    {
      accessorKey: 'referralCode',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {content.code}
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
      cell: ({ row }) => (
        <CopyToClipboard text={row.original.referralCode} size={10}>
          <span className="font-medium font-mono">
            {row.original.referralCode}
          </span>
        </CopyToClipboard>
      ),
    },
    {
      accessorKey: 'status',
      enableSorting: true,
      header: () => content.status.value,
      cell: ({ row }) => (
        <Badge
          variant={BadgeVariant.OUTLINE}
          className="capitalize opacity-80"
          color={STATUS_COLOR[row.original.status]}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'commissionRate',
      enableSorting: true,
      header: () => content.commission.value,
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.commissionRate}%{' '}
          <span className="text-neutral/50 text-xs">
            ({row.original.commissionType})
          </span>
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {content.created}
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
      cell: ({ row }) => (
        <span className="text-neutral-500 text-sm dark:text-neutral-400">
          {row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleDateString()
            : '—'}
        </span>
      ),
    },
    {
      id: 'actions',
      enableSorting: false,
      header: () => content.actions.value,
      cell: ({ row }) => (
        <Link
          to={getAppAdminAffiliateRoute(row.original.id)}
          label={content.view.value}
          color="text"
        >
          {content.view}
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: affiliates,
    columns,
    state: { sorting },
    manualSorting: true,
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      if (next.length > 0) {
        const s = next[0];
        setParams({
          sortBy: s.id,
          sortOrder: (s.desc ? 'desc' : 'asc') as SortOrder,
          page: 1,
        });
      } else {
        setParams({ sortBy: '', sortOrder: 'asc', page: 1 });
      }
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex size-full flex-1 flex-col items-center p-4">
      <div className="flex size-full flex-1 flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder={content.searchByReferralCode.value}
            onChange={(e) => setParams({ search: e.target.value, page: 1 })}
            className="max-w-md pl-10"
          />
          <Button
            label={content.clickToSendAnInvitation.value}
            onClick={() => setIsModalOpen(true)}
          >
            {content.sendInvitation}
          </Button>
        </div>

        <PendingInvitationsSection />

        {isFetching && affiliates.length === 0 ? (
          <AffiliatesAdminSkeleton />
        ) : affiliates.length === 0 ? (
          <div className="flex size-full items-center justify-center py-12 text-center">
            <p className="text-neutral">{content.noAffiliatesYet}</p>
          </div>
        ) : (
          <Table className="w-full border-separate border-spacing-0 overflow-scroll">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'whitespace-nowrap px-4 py-3 text-left font-medium text-neutral',
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
                        to: getAppAdminAffiliateRoute(row.original.id) as any,
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
                        <div className="flex items-center justify-start">
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

        <div className="flex w-full flex-row items-end justify-between gap-4 pt-8">
          <div className="flex flex-col gap-4">
            <ShowingResultsNumberItems
              currentPage={currentPage}
              pageSize={itemsPerPage}
              totalItems={totalItems}
            />
            <NumberItemsSelector
              value={itemsPerPage.toString()}
              onValueChange={(value) =>
                setParams({ pageSize: parseInt(value, 10), page: 1 })
              }
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setParam('page', page)}
          />
        </div>
      </div>

      <SendInvitationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
