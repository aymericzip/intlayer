import { useScopedSidebarEntries } from '#hooks/useScopedSidebarEntries';

const PINNED_STORAGE_KEY = 'intlayer:pinned-editor-pages';
const RECENT_STORAGE_KEY = 'intlayer:recent-editor-pages';

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
 * Two independent lists are persisted in localStorage, scoped to the active
 * user / organization / project:
 * - Recent visits: the last page paths the user navigated to in that scope.
 * - Pinned: paths the user explicitly pinned; they persist indefinitely.
 *
 * The sidebar shows pinned paths first, then recent non-pinned paths.
 */
export const useEditorPagesSidebar = (): UseEditorPagesSidebarReturn => {
  const {
    pinnedEntries,
    recentEntries,
    sidebarEntries,
    trackVisit,
    pin,
    unpin,
    removeRecent,
    isPinned,
  } = useScopedSidebarEntries({
    pinnedStorageKey: PINNED_STORAGE_KEY,
    recentStorageKey: RECENT_STORAGE_KEY,
  });

  return {
    pinnedPaths: pinnedEntries,
    recentPaths: recentEntries,
    sidebarPaths: sidebarEntries,
    trackVisit,
    pin,
    unpin,
    removeRecent,
    isPinned,
  };
};
