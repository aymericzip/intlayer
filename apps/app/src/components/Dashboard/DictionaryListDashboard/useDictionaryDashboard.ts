import {
  useDeleteDictionary,
  useGetDictionaries,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { useDictionariesRecord } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { RowSelectionState, VisibilityState } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { useDashboardRightPanel } from '#hooks/useDashboardRightPanel';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { useVisualEditorKeys } from '#hooks/useVisualEditorKeys';

const searchParams = {
  page: { type: 'number', fallbackValue: 1 },
  pageSize: { type: 'number', fallbackValue: 20 },
  search: { type: 'string', fallbackValue: '' },
  sortBy: { type: 'string', fallbackValue: 'updatedAt' },
  sortOrder: { type: 'string', fallbackValue: 'desc' },
  location: { type: 'string', fallbackValue: 'none' },
  tags: { type: 'string', fallbackValue: '' },
} as const;

export const useDictionaryDashboard = () => {
  // Search & Pagination Params
  const { params, setParam, setParams } = useSearchParamState(searchParams);

  const { isOpen } = useDashboardRightPanel();
  const visualEditorKeys = useVisualEditorKeys();
  const activeVisualEditorKeys =
    isOpen('visual-editor') && visualEditorKeys.length > 0
      ? visualEditorKeys
      : undefined;

  const { localeDictionaries } = useDictionariesRecord();
  const localeOnlyDicts = useMemo(
    () =>
      Object.values(localeDictionaries ?? {}).filter(
        (dictionary): dictionary is Dictionary => !dictionary.id
      ),
    [localeDictionaries]
  );
  const filteredLocaleOnlyDicts = useMemo(
    () =>
      activeVisualEditorKeys
        ? localeOnlyDicts.filter((d) => activeVisualEditorKeys.includes(d.key))
        : localeOnlyDicts,
    [localeOnlyDicts, activeVisualEditorKeys]
  );

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
    keys: activeVisualEditorKeys,
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
      // Locale-only dicts (no backend id) are prepended to the first page
      dictionaries:
        params.page === 1
          ? [...filteredLocaleOnlyDicts, ...(data?.data ?? [])]
          : (data?.data ?? []),
      totalItems: (data?.total_items ?? 0) + filteredLocaleOnlyDicts.length,
      totalPages: data?.total_pages ?? 1,
      isPending,
    },
    actions: { refetch, onConfirmDelete },
  };
};
