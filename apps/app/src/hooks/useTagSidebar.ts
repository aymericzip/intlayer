import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useCallback, useMemo } from 'react';

const PINNED_STORAGE_KEY = 'intlayer:pinned-tags';
const RECENT_STORAGE_KEY = 'intlayer:recent-tags';
const MAX_RECENT = 5;

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
 * Two independent lists are persisted in localStorage via usePersistedStore:
 * - Recent visits: the last MAX_RECENT tags the user navigated to.
 * - Pinned: keys the user explicitly pinned; they persist indefinitely.
 *
 * The sidebar shows pinned keys first, then recent non-pinned keys.
 */
export const useTagSidebar = (): UseTagSidebarReturn => {
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
    (tagKey: string): void => {
      setRecentKeys((prev) => {
        const list = prev ?? [];
        const deduplicated = list.filter((k) => k !== tagKey);
        return [tagKey, ...deduplicated].slice(0, MAX_RECENT);
      });
    },
    [setRecentKeys]
  );

  const pin = useCallback(
    (tagKey: string): void => {
      setPinnedKeys((prev) => {
        const list = prev ?? [];
        if (list.includes(tagKey)) return list;
        return [...list, tagKey];
      });
    },
    [setPinnedKeys]
  );

  const unpin = useCallback(
    (tagKey: string): void => {
      setPinnedKeys((prev) => (prev ?? []).filter((k) => k !== tagKey));
    },
    [setPinnedKeys]
  );

  const removeRecent = useCallback(
    (tagKey: string): void => {
      setRecentKeys((prev) => (prev ?? []).filter((k) => k !== tagKey));
    },
    [setRecentKeys]
  );

  const isPinned = useCallback(
    (tagKey: string): boolean => normalizedPinned.includes(tagKey),
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
