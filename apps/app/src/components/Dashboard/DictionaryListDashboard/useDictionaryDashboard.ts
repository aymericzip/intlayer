import {
  useDeleteDictionary,
  useGetDictionaries,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import type { Dictionary } from '@intlayer/types';
import {
  type ColumnDef,
  getCoreRowModel,
  type RowSelectionState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';

export const useDictionaryDashboard = () => {
  const router = useRouter();
  const content = useIntlayer('dictionary-list');

  // Search & Pagination Params
  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 20 },
    search: { type: 'string', fallbackValue: '' },
    sortBy: { type: 'string', fallbackValue: 'updatedAt' },
    sortOrder: { type: 'string', fallbackValue: 'desc' },
    location: { type: 'string', fallbackValue: 'none' },
    tags: { type: 'string', fallbackValue: '' },
  } as const);

  // Modals & Selection State
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [editingDictionaryKey, setEditingDictionaryKey] = useState<
    string | null
  >(null);
  const [dictionaryToDelete, setDictionaryToDelete] = useState<
    string | string[] | null
  >(null);

  const [rowSelection, setRowSelection] = usePersistedStore<RowSelectionState>(
    'dict-selection',
    {}
  );
  const [columnVisibility, setColumnVisibility] =
    usePersistedStore<VisibilityState>('dict-visibility', {
      id: false,
      createdAt: false,
    });

  // Queries & Mutations
  const { data, isPending, refetch } = useGetDictionaries({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    tags: params.tags,
    location:
      params.location !== 'none'
        ? (params.location as 'none' | 'remote' | 'local' | 'both')
        : undefined,
  });

  const { mutateAsync: deleteDict, isPending: isDeleting } =
    useDeleteDictionary();

  const onConfirmDelete = useCallback(async () => {
    if (!dictionaryToDelete) return;
    const ids = Array.isArray(dictionaryToDelete)
      ? dictionaryToDelete
      : [dictionaryToDelete];
    await Promise.all(ids.map((id) => deleteDict({ dictionaryId: id })));
    setDictionaryToDelete(null);
    setRowSelection({});
    refetch();
  }, [dictionaryToDelete, deleteDict, refetch, setRowSelection]);

  return {
    params,
    setParam,
    setParams,
    state: {
      isCreationModalOpen,
      setIsCreationModalOpen,
      isFiltersModalOpen,
      setIsFiltersModalOpen,
      editingDictionaryKey,
      setEditingDictionaryKey,
      dictionaryToDelete,
      setDictionaryToDelete,
      rowSelection,
      setRowSelection,
      columnVisibility,
      setColumnVisibility,
      isDeleting,
    },
    data: {
      dictionaries: data?.data ?? [],
      totalItems: data?.total_items ?? 0,
      totalPages: data?.total_pages ?? 1,
      isPending,
    },
    actions: { refetch, onConfirmDelete, router },
    content,
  };
};
