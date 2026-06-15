import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useCallback, useMemo } from 'react';

const PINNED_STORAGE_KEY = 'intlayer:pinned-editor-pages';
const RECENT_STORAGE_KEY = 'intlayer:recent-editor-pages';
const MAX_RECENT = 5;

export type UseEditorPagesSidebarReturn = {
  pinnedPaths: string[];
  recentPaths: string[];
  /**
   * Deduplicated ordered list of paths to render in the sidebar:
   * pinned items first, then non-pinned recent items.
   */
  sidebarPaths: string[];
  /** Add an editor page path to the recent-visits list (rolling last 5). */
  trackVisit: (path: string) => void;
  /** Permanently pin a page path to the sidebar. */
  pin: (path: string) => void;
  /** Remove a previously pinned page path. */
  unpin: (path: string) => void;
  removeRecent: (path: string) => void;
  isPinned: (path: string) => boolean;
};

/**
 * Manages the list of editor page paths shown in the sidebar.
 *
 * Two independent lists are persisted in localStorage via usePersistedStore:
 * - Recent visits: the last MAX_RECENT page paths the user navigated to.
 * - Pinned: paths the user explicitly pinned; they persist indefinitely.
 *
 * The sidebar shows pinned paths first, then recent non-pinned paths.
 */
export const useEditorPagesSidebar = (): UseEditorPagesSidebarReturn => {
  const [pinnedPaths, setPinnedPaths] = usePersistedStore<string[]>(
    PINNED_STORAGE_KEY,
    []
  );
  const [recentPaths, setRecentPaths] = usePersistedStore<string[]>(
    RECENT_STORAGE_KEY,
    []
  );

  const normalizedPinned = useMemo(() => pinnedPaths ?? [], [pinnedPaths]);
  const normalizedRecent = useMemo(() => recentPaths ?? [], [recentPaths]);

  const trackVisit = useCallback(
    (path: string): void => {
      setRecentPaths((prev) => {
        const list = prev ?? [];
        const deduplicated = list.filter((k) => k !== path);
        return [path, ...deduplicated].slice(0, MAX_RECENT);
      });
    },
    [setRecentPaths]
  );

  const pin = useCallback(
    (path: string): void => {
      setPinnedPaths((prev) => {
        const list = prev ?? [];
        if (list.includes(path)) return list;
        return [...list, path];
      });
    },
    [setPinnedPaths]
  );

  const unpin = useCallback(
    (path: string): void => {
      setPinnedPaths((prev) => (prev ?? []).filter((k) => k !== path));
    },
    [setPinnedPaths]
  );

  const removeRecent = useCallback(
    (path: string): void => {
      setRecentPaths((prev) => (prev ?? []).filter((k) => k !== path));
    },
    [setRecentPaths]
  );

  const isPinned = useCallback(
    (path: string): boolean => normalizedPinned.includes(path),
    [normalizedPinned]
  );

  const sidebarPaths = useMemo(
    () => [
      ...normalizedPinned,
      ...normalizedRecent.filter((k) => !normalizedPinned.includes(k)),
    ],
    [normalizedPinned, normalizedRecent]
  );

  return {
    pinnedPaths: normalizedPinned,
    recentPaths: normalizedRecent,
    sidebarPaths,
    trackVisit,
    pin,
    unpin,
    removeRecent,
    isPinned,
  };
};
