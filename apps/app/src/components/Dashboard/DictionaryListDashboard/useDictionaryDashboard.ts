import { mergeDictionaries } from '@intlayer/core/dictionaryManipulator';
import {
  useDeleteDictionary,
  useGetDictionaries,
  usePushDictionaries,
} from '@intlayer/design-system/api';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useDictionariesRecord } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { RowSelectionState, VisibilityState } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);

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
  const { mutateAsync: pushDicts, isPending: isMerging } =
    usePushDictionaries();

  useEffect(() => {
    if (isPending) return;

    const selectedKeys = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );
    if (selectedKeys.length === 0) return;

    const visibleDicts =
      params.page === 1
        ? [...filteredLocaleOnlyDicts, ...(data?.data ?? [])]
        : (data?.data ?? []);

    const newRowSelection = { ...rowSelection };
    let hasChanged = false;

    for (const key of selectedKeys) {
      const exists = visibleDicts.some((d) => d.id === key || d.key === key);
      if (!exists) {
        delete newRowSelection[key];
        hasChanged = true;
      }
    }

    if (hasChanged) {
      setRowSelection(newRowSelection);
    }
  }, [
    isPending,
    data?.data,
    filteredLocaleOnlyDicts,
    params.page,
    rowSelection,
    setRowSelection,
  ]);

  // Detect duplicate dictionary pairs (same key, at least one with undefined filePath)
  const duplicatePairs = useMemo<[Dictionary, Dictionary][]>(() => {
    const byKey = new Map<string, Dictionary[]>();
    const allDicts: Dictionary[] = [
      ...filteredLocaleOnlyDicts,
      ...(data?.data ?? []),
    ];
    for (const dict of allDicts) {
      const existing = byKey.get(dict.key) ?? [];
      byKey.set(dict.key, [...existing, dict]);
    }
    const pairs: [Dictionary, Dictionary][] = [];
    for (const [, group] of byKey) {
      if (group.length >= 2 && group.some((d) => !d.filePath)) {
        pairs.push([group[0], group[1]] as [Dictionary, Dictionary]);
      }
    }
    return pairs;
  }, [filteredLocaleOnlyDicts, data?.data]);

  const onConfirmDelete = useCallback(async () => {
    if (!dictionaryToDelete) return;
    const ids = Array.isArray(dictionaryToDelete)
      ? dictionaryToDelete
      : [dictionaryToDelete];
    const allDicts = [...filteredLocaleOnlyDicts, ...(data?.data ?? [])];
    await Promise.all(
      ids.map((idOrKey) => {
        const dict = allDicts.find(
          (d) => d.id === idOrKey || d.key === idOrKey
        );
        if (dict?.id) {
          return deleteDict({ dictionaryId: dict.id });
        }
        return Promise.resolve();
      })
    );
    setDictionaryToDelete(null);
    setRowSelection({});
    refetch();
  }, [
    dictionaryToDelete,
    deleteDict,
    refetch,
    setRowSelection,
    filteredLocaleOnlyDicts,
    data?.data,
  ]);

  // Each entry: target values win; source fills missing keys; source is deleted after
  const onConfirmMerge = useCallback(
    async (pairs: { target: Dictionary; source: Dictionary }[]) => {
      await Promise.all(
        pairs.map(async ({ target, source }) => {
          const merged = mergeDictionaries([target, source]);

          if (target.id) {
            await pushDicts({
              dictionaries: [{ ...target, content: merged.content }],
            });
          }

          if (source.id) {
            await deleteDict({ dictionaryId: source.id });
          }
        })
      );

      setIsMergeModalOpen(false);
      refetch();
    },
    [pushDicts, deleteDict, refetch]
  );

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
      isMergeModalOpen,
      setIsMergeModalOpen,
      rowSelection,
      setRowSelection,
      columnVisibility,
      setColumnVisibility,
      isDeleting,
      isMerging,
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
      duplicatePairs,
    },
    actions: { refetch, onConfirmDelete, onConfirmMerge },
  };
};
