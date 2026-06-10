import type { PromoCodeAPI } from '@intlayer/backend';
import {
  useDeletePromoCode,
  useGetPromoCodes,
  useUpdatePromoCode,
} from '@intlayer/design-system/api';
import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { SearchInput } from '@intlayer/design-system/input';
import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
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
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { CreatePromoCodeModal } from './CreatePromoCodeModal';
import { PromoCodesAdminSkeleton } from './PromoCodesAdminSkeleton';

export const PromoCodesAdminPage: FC = () => {
  const content = useIntlayer('admin-promo-codes');

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

  const { data: promoCodesData, isFetching } = useGetPromoCodes({});
  const { mutateAsync: deletePromoCode } = useDeletePromoCode();
  const { mutateAsync: updatePromoCode } = useUpdatePromoCode();

  const promoCodes = (promoCodesData?.data ?? []) as PromoCodeAPI[];
  const totalPages: number = promoCodesData?.total_pages ?? 1;
  const totalItems: number = promoCodesData?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const sorting: SortingState = params.sortBy
    ? [{ id: params.sortBy as string, desc: params.sortOrder === 'desc' }]
    : [];

  const handleDelete = async (id: string) => {
    if (confirm(content.deleteConfirm.value)) {
      await deletePromoCode({ id });
    }
  };

  const handleToggleActive = async (row: PromoCodeAPI) => {
    await updatePromoCode({ id: row.id, active: !row.active });
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      enableSorting: false,
      header: () => content.idCol.value,
      cell: ({ row }) => (
        <CopyToClipboard text={row.original.id} size={10}>
          <span className="font-mono text-sm">
            ...{row.original.id.slice(-5)}
          </span>
        </CopyToClipboard>
      ),
    },
    {
      accessorKey: 'code',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {content.codeCol}
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
        <CopyToClipboard text={row.original.code} size={10}>
          <span className="font-medium font-mono text-base text-text">
            {row.original.code}
          </span>
        </CopyToClipboard>
      ),
    },
    {
      accessorKey: 'discountValue',
      enableSorting: true,
      header: () => content.discountCol.value,
      cell: ({ row }) => (
        <span className="font-semibold text-sm">
          {row.original.discountType === 'percentage'
            ? `${row.original.discountValue}%`
            : `$${row.original.discountValue.toFixed(2)}`}
        </span>
      ),
    },
    {
      accessorKey: 'affiliateId',
      enableSorting: false,
      header: () => content.affiliateCol.value,
      cell: ({ row }) => (
        <span className="font-mono text-neutral-500 text-sm">
          {row.original.affiliate?.referralCode ? (
            <span className="rounded-md bg-text/10 px-2 py-1 font-semibold text-text text-xs">
              {row.original.affiliate.referralCode}
            </span>
          ) : (
            '—'
          )}
        </span>
      ),
    },
    {
      accessorKey: 'active',
      enableSorting: true,
      header: () => content.statusCol.value,
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="cursor-pointer capitalize opacity-80"
          color={row.original.active ? 'success' : 'neutral'}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleActive(row.original);
          }}
        >
          {row.original.active
            ? content.activeStatus.value
            : content.inactiveStatus.value}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {content.createdCol}
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
      header: () => content.actionsCol.value,
      cell: ({ row }) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.original.id);
          }}
          variant="outline"
          color="error"
          className="h-auto p-2"
          label={content.deleteAction.value}
        >
          <Trash2 className="size-5" />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: promoCodes,
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
            placeholder={content.searchPlaceholder.value}
            onChange={(e) => setParams({ search: e.target.value, page: 1 })}
            className="max-w-md pl-10"
          />
          <Button
            label={content.createButtonLabel.value}
            onClick={() => setIsModalOpen(true)}
          >
            {content.createButton.value}
          </Button>
        </div>

        {isFetching && promoCodes.length === 0 ? (
          <PromoCodesAdminSkeleton />
        ) : promoCodes.length === 0 ? (
          <div className="flex size-full items-center justify-center py-12 text-center">
            <p className="text-neutral">{content.noPromoCodesYet.value}</p>
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
                    onClick={() =>
                      navigate({
                        to: '/admin/promo-code/$id',
                        params: { id: row.original.id },
                      })
                    }
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

      <CreatePromoCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default PromoCodesAdminPage;
