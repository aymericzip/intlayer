import type { TagAPI } from '@intlayer/backend';
import {
  useDeleteTag,
  useGetTags,
  useSession,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Checkbox, SearchInput } from '@intlayer/design-system/input';
import { Modal } from '@intlayer/design-system/modal';
import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import {
  type ColumnDef,
  getCoreRowModel,
  type RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowRight,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  type FC,
  type MouseEvent,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import { useDate } from 'react-intlayer/format';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { DictionaryTable } from '../DictionaryListDashboard/DictionaryTable';
import { DeleteTagsModal } from './DeleteTagsModal';
import { TagCreationForm } from './TagCreationForm';
import { TagListSkeleton } from './TagListSkeleton';

export const TagList: FC = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [tagsToDelete, setTagsToDelete] = useState<string[] | null>(null);

  const { session } = useSession();
  const hasProjectWritePermission =
    session?.permissions?.includes('project:write') ?? false;

  const {
    noTagView,
    createTagButton,
    searchPlaceholder,
    tableHeaders,
    selectAll,
    selectRow,
    deleteSelectedButton,
  } = useIntlayer('tag-list');
  const formatDate = useDate();
  const navigate = useLocalizedNavigate();

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 20 },
    search: { type: 'string', fallbackValue: '' },
    sortBy: { type: 'string', fallbackValue: 'key' },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  } as const);

  const {
    data: tagResponse,
    isPending,
    refetch,
  } = useGetTags({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search || undefined,
  });

  const { mutateAsync: deleteTag, isPending: isDeleting } = useDeleteTag();

  const tags = tagResponse?.data ?? [];
  const totalPages: number = tagResponse?.total_pages ?? 1;
  const totalItems: number = tagResponse?.total_items ?? 0;

  const { register } = useForm({ defaultValues: { search: params.search } });

  const selectedCount = Object.keys(rowSelection).length;

  const handleSort = (columnId: string) => {
    const isAsc = params.sortBy === columnId && params.sortOrder === 'asc';
    setParams({ sortBy: columnId, sortOrder: isAsc ? 'desc' : 'asc', page: 1 });
  };

  const getSortIcon = (columnId: string) => {
    if (params.sortBy !== columnId) return ChevronsUpDown;
    return params.sortOrder === 'asc' ? ChevronUp : ChevronDown;
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

  const onConfirmDelete = useCallback(async () => {
    if (!tagsToDelete) return;
    await Promise.all(
      tagsToDelete.map((id) => deleteTag({ tagId: id } as any))
    );
    setTagsToDelete(null);
    setRowSelection({});
    refetch();
  }, [tagsToDelete, deleteTag, refetch]);

  const columns = useMemo<ColumnDef<TagAPI>[]>(
    () => [
      {
        id: 'selection',
        header: ({ table }) => (
          <Checkbox
            name="select-all-tags"
            size="sm"
            color="text"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            aria-label={selectAll.value}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            name={`select-tag-${row.id}`}
            size="sm"
            color="text"
            checked={row.getIsSelected()}
            onClick={(e: MouseEvent) => e.stopPropagation()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            aria-label={selectRow.value}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'key',
        header: () => (
          <SortHeader columnId="key" label={tableHeaders.key.value} />
        ),
        cell: ({ row }) => (
          <span className="font-mono">{row.original.key}</span>
        ),
      },
      {
        accessorKey: 'name',
        header: () => (
          <SortHeader columnId="name" label={tableHeaders.name.value} />
        ),
        cell: ({ row }) =>
          row.original.name ? (
            <div className="font-medium">{row.original.name}</div>
          ) : (
            <span className="text-neutral">-</span>
          ),
      },
      {
        accessorKey: 'description',
        header: tableHeaders.description.value,
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
        accessorKey: 'createdAt',
        header: () => (
          <SortHeader
            columnId="createdAt"
            label={tableHeaders.createdAt.value}
          />
        ),
        cell: ({ row }) => (
          <div className="text-neutral">
            {formatDate((row.original as any).createdAt)}
          </div>
        ),
      },
      {
        id: 'actions',
        header: tableHeaders.actions.value,
        cell: ({ row }) => (
          <Button
            variant="hoverable"
            color="text"
            size="icon-sm"
            Icon={ArrowRight}
            label={tableHeaders.actions.value}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              navigate({
                to: '/tags/$tagKey',
                params: { tagKey: row.original.key },
              });
            }}
          />
        ),
      },
    ],
    [params.sortBy, params.sortOrder, formatDate]
  );

  const table = useReactTable({
    data: tags,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.key,
  });

  return (
    <div className="flex size-full flex-1 flex-col gap-6 py-4 text-sm text-text/80">
      <div className="flex items-center justify-between gap-4 px-10">
        <SearchInput
          placeholder={searchPlaceholder.value}
          className="max-w-md"
          {...register('search', {
            onChange: (e) => setParam('search', e.target.value),
          })}
        />
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <Button
              color="error"
              variant="outline"
              Icon={Trash2}
              label={deleteSelectedButton.label.value}
              disabled={!hasProjectWritePermission}
              onClick={() => {
                const ids = table
                  .getSelectedRowModel()
                  .rows.map((r) => r.original.id!);
                setTagsToDelete(ids);
              }}
            >
              {deleteSelectedButton.text} ({selectedCount})
            </Button>
          )}
          <Button
            Icon={Plus}
            color="text"
            label={createTagButton.ariaLabel.value}
            disabled={!hasProjectWritePermission}
            onClick={() => setIsCreationModalOpen(true)}
          >
            {createTagButton.text}
          </Button>
        </div>
      </div>

      <div className="flex size-full flex-1 overflow-auto">
        <DictionaryTable
          table={table}
          isPending={isPending}
          noDataFound={noTagView.title.value}
          onRowClick={(row) =>
            navigate({
              to: '/tags/$tagKey',
              params: { tagKey: row.original.key },
            })
          }
          skeleton={<TagListSkeleton showToolBar={false} />}
        />
      </div>

      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        padding="md"
        title={createTagButton.text.value}
        hasCloseButton
      >
        <TagCreationForm onTagCreated={() => setIsCreationModalOpen(false)} />
      </Modal>

      <DeleteTagsModal
        isOpen={!!tagsToDelete}
        onClose={() => setTagsToDelete(null)}
        onConfirm={onConfirmDelete}
        isDeleting={isDeleting}
        count={tagsToDelete?.length ?? 1}
      />

      <div className="flex w-full flex-row items-end justify-between px-10">
        <div className="flex flex-col gap-4">
          <ShowingResultsNumberItems
            currentPage={params.page}
            pageSize={params.pageSize}
            totalItems={totalItems}
          />
          <NumberItemsSelector
            value={params.pageSize.toString()}
            onValueChange={(val) =>
              setParams({ pageSize: Number(val), page: 1 })
            }
          />
        </div>
        <Pagination
          currentPage={params.page}
          totalPages={totalPages}
          onPageChange={(page) => setParam('page', page)}
        />
      </div>
    </div>
  );
};

export const TagListDashboard: FC = () => (
  <Suspense fallback={<TagListSkeleton />}>
    <TagList />
  </Suspense>
);
