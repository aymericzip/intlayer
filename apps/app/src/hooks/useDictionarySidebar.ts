import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useCallback, useMemo } from 'react';

const PINNED_STORAGE_KEY = 'intlayer:pinned-dictionaries';
const RECENT_STORAGE_KEY = 'intlayer:recent-dictionaries';
const MAX_RECENT = 5;

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
 * Two independent lists are persisted in localStorage via usePersistedStore:
 * - Recent visits: the last MAX_RECENT dictionaries the user navigated to.
 * - Pinned: keys the user explicitly pinned; they persist indefinitely.
 *
 * The sidebar shows pinned keys first, then recent non-pinned keys.
 */
export const useDictionarySidebar = (): UseDictionarySidebarReturn => {
  const [pinnedKeys, setPinnedKeys] = usePersistedStore<string[]>(
    PINNED_STORAGE_KEY,
    []
  );
  const [recentKeys, setRecentKeys] = usePersistedStore<string[]>(
    RECENT_STORAGE_KEY,
    []
  );

  const normalizedPinned = useMemo(() => pinnedKeys ?? [], [pinnedKeys]);
  const normalizedRecent = useMemo(() => recentKeys ?? [], [recentKeys]);

  const trackVisit = useCallback(
    (dictionaryKey: string): void => {
      setRecentKeys((prev) => {
        const list = prev ?? [];
        const deduplicated = list.filter((k) => k !== dictionaryKey);
        return [dictionaryKey, ...deduplicated].slice(0, MAX_RECENT);
      });
    },
    [setRecentKeys]
  );

  const pin = useCallback(
    (dictionaryKey: string): void => {
      setPinnedKeys((prev) => {
        const list = prev ?? [];
        if (list.includes(dictionaryKey)) return list;
        return [...list, dictionaryKey];
      });
    },
    [setPinnedKeys]
  );

  const unpin = useCallback(
    (dictionaryKey: string): void => {
      setPinnedKeys((prev) => (prev ?? []).filter((k) => k !== dictionaryKey));
    },
    [setPinnedKeys]
  );

  const removeRecent = useCallback(
    (dictionaryKey: string): void => {
      setRecentKeys((prev) => (prev ?? []).filter((k) => k !== dictionaryKey));
    },
    [setRecentKeys]
  );

  const isPinned = useCallback(
    (dictionaryKey: string): boolean =>
      normalizedPinned.includes(dictionaryKey),
    [normalizedPinned]
  );

  const sidebarKeys = useMemo(
    () => [
      ...normalizedPinned,
      ...normalizedRecent.filter((k) => !normalizedPinned.includes(k)),
    ],
    [normalizedPinned, normalizedRecent]
  );

  return {
    pinnedKeys: normalizedPinned,
    recentKeys: normalizedRecent,
    sidebarKeys,
    trackVisit,
    pin,
    unpin,
    removeRecent,
    isPinned,
  };
};
