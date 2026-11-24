import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useCallback, useMemo } from 'react';
import { useSessionScopeId } from '#hooks/useScopedSidebarEntries';
import type { SidebarItemLabels } from '#utils/sidebarLayout';

const LABELS_STORAGE_KEY = 'intlayer:sidebar-item-labels';

/** Stable empty default, so `usePersistedStore` keeps a constant initial state. */
const EMPTY_SCOPED_LABELS: Record<string, SidebarItemLabels> = {};

/** Stable empty labels for scopes where nothing was renamed. */
const EMPTY_LABELS: SidebarItemLabels = {};

export type UseSidebarItemLabelsReturn = {
  labels: SidebarItemLabels;
  /** Renames a sidebar item; a blank label restores the original title. */
  renameItem: (itemKey: string, label: string) => void;
};

/**
 * Persists the custom titles of pinned sidebar entries, scoped to the active
 * user / organization / project.
 */
export const useSidebarItemLabels = (): UseSidebarItemLabelsReturn => {
  const scopeId = useSessionScopeId();
  const [scopedLabels, setScopedLabels] = usePersistedStore<
    Record<string, SidebarItemLabels>
  >(LABELS_STORAGE_KEY, EMPTY_SCOPED_LABELS);

  const labels = useMemo(
    () => (scopeId ? (scopedLabels[scopeId] ?? EMPTY_LABELS) : EMPTY_LABELS),
    [scopedLabels, scopeId]
  );

  const renameItem = useCallback(
    (itemKey: string, label: string): void => {
      if (!scopeId) return;

      const trimmedLabel = label.trim();

      setScopedLabels((previous) => {
        const { [itemKey]: _previousLabel, ...otherLabels } =
          previous[scopeId] ?? {};

        return {
          ...previous,
          [scopeId]: trimmedLabel
            ? { ...otherLabels, [itemKey]: trimmedLabel }
            : otherLabels,
        };
      });
    },
    [scopeId, setScopedLabels]
  );

  return { labels, renameItem };
};
