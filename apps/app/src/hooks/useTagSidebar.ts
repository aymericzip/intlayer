import { useScopedSidebarEntries } from '#hooks/useScopedSidebarEntries';

const PINNED_STORAGE_KEY = 'intlayer:pinned-tags';
const RECENT_STORAGE_KEY = 'intlayer:recent-tags';

export type UseTagSidebarReturn = {
  pinnedKeys: string[];
  recentKeys: string[];
  /**
   * Deduplicated ordered list of keys to render in the sidebar:
   * pinned items first, then non-pinned recent items.
   */
  sidebarKeys: string[];
  /** Add a tag key to the recent-visits list (rolling last 5). */
  trackVisit: (tagKey: string) => void;
  /** Permanently pin a tag key to the sidebar. */
  pin: (tagKey: string) => void;
  /** Remove a previously pinned tag key. */
  unpin: (tagKey: string) => void;
  removeRecent: (tagKey: string) => void;
  isPinned: (tagKey: string) => boolean;
};

/**
 * Manages the list of tag keys shown in the sidebar.
 *
 * Two independent lists are persisted in localStorage, scoped to the active
 * user / organization / project:
 * - Recent visits: the last tags the user navigated to in that scope.
 * - Pinned: keys the user explicitly pinned; they persist indefinitely.
 *
 * The sidebar shows pinned keys first, then recent non-pinned keys.
 */
export const useTagSidebar = (): UseTagSidebarReturn => {
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
    pinnedKeys: pinnedEntries,
    recentKeys: recentEntries,
    sidebarKeys: sidebarEntries,
    trackVisit,
    pin,
    unpin,
    removeRecent,
    isPinned,
  };
};
