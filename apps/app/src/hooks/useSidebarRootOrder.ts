import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useSessionScopeId } from '#hooks/useScopedSidebarEntries';
import {
  SIDEBAR_ROOT,
  type SidebarOrders,
  type SidebarMoveResult,
  updateSidebarOrders,
} from '#utils/sidebarLayout';

type SavedOrders = SidebarOrders | string[];
const EMPTY_SCOPES: Record<string, SavedOrders> = {};

/** Older scopes store only the top-level order as an array. */
const readOrders = (saved?: SavedOrders): SidebarOrders =>
  Array.isArray(saved) ? { [SIDEBAR_ROOT]: saved } : (saved ?? {});

/** Persists sidebar moves within the current user, organization and project. */
export const useSidebarRootOrder = () => {
  const scopeId = useSessionScopeId();
  const [scopes, setScopes] = usePersistedStore(
    'intlayer:sidebar-root-order',
    EMPTY_SCOPES
  );
  const saveMove = (move: SidebarMoveResult) => {
    if (!scopeId) return;
    setScopes((previous) => ({
      ...previous,
      [scopeId]: updateSidebarOrders(readOrders(previous[scopeId]), move),
    }));
  };
  return {
    orders: readOrders(scopeId ? scopes[scopeId] : undefined),
    saveMove,
  };
};
