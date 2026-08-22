import { useScopedSidebarEntries } from '#hooks/useScopedSidebarEntries';

const PINNED_STORAGE_KEY = 'intlayer:pinned-dictionaries';
const RECENT_STORAGE_KEY = 'intlayer:recent-dictionaries';

export type UseDictionarySidebarReturn = {
  pinnedKeys: string[];
  recentKeys: string[];
  /**
   * Deduplicated ordered list of keys to render in the sidebar:
   * pinned items first, then non-pinned recent items.
   */
  sidebarKeys: string[];
  /** Add a dictionary key to the recent-visits list (rolling last 5). */
  trackVisit: (dictionaryKey: string) => void;
  /** Permanently pin a dictionary key to the sidebar. */
  pin: (dictionaryKey: string) => void;
  /** Remove a previously pinned dictionary key. */
  unpin: (dictionaryKey: string) => void;
  removeRecent: (dictionaryKey: string) => void;
  isPinned: (dictionaryKey: string) => boolean;
};

/**
 * Manages the list of dictionary keys shown in the sidebar.
 *
 * Two independent lists are persisted in localStorage, scoped to the active
 * user / organization / project:
 * - Recent visits: the last dictionaries the user navigated to in that scope.
 * - Pinned: keys the user explicitly pinned; they persist indefinitely.
 *
 * The sidebar shows pinned keys first, then recent non-pinned keys.
 */
export const useDictionarySidebar = (): UseDictionarySidebarReturn => {
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
