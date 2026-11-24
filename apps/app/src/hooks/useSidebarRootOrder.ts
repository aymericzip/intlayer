import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useCallback, useMemo } from 'react';
import { useSessionScopeId } from '#hooks/useScopedSidebarEntries';

const ROOT_ORDER_STORAGE_KEY = 'intlayer:sidebar-root-order';

/** Stable empty default, so `usePersistedStore` keeps a constant initial state. */
const EMPTY_ROOT_ORDERS: Record<string, string[]> = {};

/** Stable empty order for scopes the user never rearranged. */
const EMPTY_ROOT_ORDER: string[] = [];

export type UseSidebarRootOrderReturn = {
  /** Persisted top-level order of the current scope; empty means default. */
  rootOrder: string[];
  setRootOrder: (rootOrder: string[]) => void;
};

/**
 * Persists the top-level sidebar order (including pinned entries moved to the
 * top level), scoped to the active user / organization / project.
 */
export const useSidebarRootOrder = (): UseSidebarRootOrderReturn => {
  const scopeId = useSessionScopeId();
  const [rootOrders, setRootOrders] = usePersistedStore<
    Record<string, string[]>
  >(ROOT_ORDER_STORAGE_KEY, EMPTY_ROOT_ORDERS);

  const rootOrder = useMemo(
    () =>
      scopeId ? (rootOrders[scopeId] ?? EMPTY_ROOT_ORDER) : EMPTY_ROOT_ORDER,
    [rootOrders, scopeId]
  );

  const setRootOrder = useCallback(
    (nextRootOrder: string[]): void => {
      if (!scopeId) return;

      setRootOrders((previous) => ({ ...previous, [scopeId]: nextRootOrder }));
    },
    [scopeId, setRootOrders]
  );

  return { rootOrder, setRootOrder };
};
