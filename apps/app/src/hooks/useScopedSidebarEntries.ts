import { useSession } from '@intlayer/design-system/api';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useCallback, useEffect, useMemo } from 'react';

/** Number of recently visited entries kept per session scope. */
const MAX_RECENT = 5;

/** Placeholder used in the scope id when the session has no active organization. */
const NO_ORGANIZATION = 'no-organization';

/** Placeholder used in the scope id when the session has no active project. */
const NO_PROJECT = 'no-project';

/** Stable empty default, so `usePersistedStore` keeps a constant initial state. */
const EMPTY_SCOPED_ENTRIES: ScopedEntries = {};

/** Sidebar entries persisted per session scope: `{ [scopeId]: entries }`. */
export type ScopedEntries = Record<string, string[]>;

/**
 * Shape read back from localStorage: the scoped map, or the flat list written
 * by the versions that persisted sidebar entries globally.
 */
export type PersistedEntries = ScopedEntries | string[];

/** Identifiers of the session the sidebar entries belong to. */
export type SessionScope = {
  userId?: string;
  organizationId?: string;
  projectId?: string;
};

export type UseScopedSidebarEntriesOptions = {
  /** localStorage key holding the pinned entries of every scope. */
  pinnedStorageKey: string;
  /** localStorage key holding the recently visited entries of every scope. */
  recentStorageKey: string;
};

export type UseScopedSidebarEntriesReturn = {
  pinnedEntries: string[];
  recentEntries: string[];
  /**
   * Deduplicated ordered list of entries to render in the sidebar:
   * pinned entries first, then non-pinned recent ones.
   */
  sidebarEntries: string[];
  /** Add an entry to the recent-visits list of the current scope (rolling last 5). */
  trackVisit: (entry: string) => void;
  /** Pin an entry to the sidebar of the current scope. */
  pin: (entry: string) => void;
  /** Remove a previously pinned entry from the current scope. */
  unpin: (entry: string) => void;
  removeRecent: (entry: string) => void;
  isPinned: (entry: string) => boolean;
};

/**
 * Builds the identifier isolating the sidebar entries of one user /
 * organization / project triplet. Returns `null` while no user is
 * authenticated, which leaves the sidebar empty instead of leaking the entries
 * of the previous session.
 */
export const getSessionScopeId = ({
  userId,
  organizationId,
  projectId,
}: SessionScope): string | null =>
  userId
    ? [userId, organizationId ?? NO_ORGANIZATION, projectId ?? NO_PROJECT].join(
        '/'
      )
    : null;

/**
 * Normalizes a persisted record into its scoped map form, adopting a legacy
 * flat list — written before entries were scoped — into the given scope.
 */
export const normalizeScopedEntries = (
  persisted: PersistedEntries | undefined,
  scopeId: string
): ScopedEntries => {
  if (!persisted) return {};
  if (!Array.isArray(persisted)) return persisted;
  return persisted.length > 0 ? { [scopeId]: persisted } : {};
};

/** Reads the entries of a single scope; empty while the scope is unresolved. */
export const getScopedEntries = (
  persisted: PersistedEntries | undefined,
  scopeId: string | null
): string[] =>
  scopeId ? (normalizeScopedEntries(persisted, scopeId)[scopeId] ?? []) : [];

/** Returns the persisted map with only the given scope updated. */
export const setScopedEntries = (
  persisted: PersistedEntries | undefined,
  scopeId: string,
  updateEntries: (entries: string[]) => string[]
): ScopedEntries => {
  const scopedEntries = normalizeScopedEntries(persisted, scopeId);

  return {
    ...scopedEntries,
    [scopeId]: updateEntries(scopedEntries[scopeId] ?? []),
  };
};

/**
 * Resolves the scope the sidebar entries belong to from the active session.
 *
 * The identifier changes whenever the user, the active organization or the
 * active project changes, so each of them gets its own pinned and recent
 * entries, restored as-is when switching back.
 */
export const useSessionScopeId = (): string | null => {
  const { session } = useSession();
  const userId = session?.user?.id;
  const organizationId = session?.organization?.id;
  const projectId = session?.project?.id;

  return useMemo(
    () => getSessionScopeId({ userId, organizationId, projectId }),
    [userId, organizationId, projectId]
  );
};

/**
 * Manages the pinned and recently visited entries of one sidebar section,
 * scoped to the active user / organization / project.
 *
 * Both lists are persisted in localStorage as a `{ [scopeId]: entries }` map,
 * so switching organization, project or user swaps the sidebar content and
 * switching back restores it. While no session is resolved, the lists are
 * empty and the mutations are no-ops.
 */
export const useScopedSidebarEntries = ({
  pinnedStorageKey,
  recentStorageKey,
}: UseScopedSidebarEntriesOptions): UseScopedSidebarEntriesReturn => {
  const scopeId = useSessionScopeId();

  const [persistedPinned, setPersistedPinned] =
    usePersistedStore<PersistedEntries>(pinnedStorageKey, EMPTY_SCOPED_ENTRIES);
  const [persistedRecent, setPersistedRecent] =
    usePersistedStore<PersistedEntries>(recentStorageKey, EMPTY_SCOPED_ENTRIES);

  // Rewrite the pre-scope flat lists into the current scope, once resolved.
  useEffect(() => {
    if (!scopeId) return;

    if (Array.isArray(persistedPinned)) {
      setPersistedPinned(normalizeScopedEntries(persistedPinned, scopeId));
    }

    if (Array.isArray(persistedRecent)) {
      setPersistedRecent(normalizeScopedEntries(persistedRecent, scopeId));
    }
  }, [
    scopeId,
    persistedPinned,
    persistedRecent,
    setPersistedPinned,
    setPersistedRecent,
  ]);

  const pinnedEntries = useMemo(
    () => getScopedEntries(persistedPinned, scopeId),
    [persistedPinned, scopeId]
  );
  const recentEntries = useMemo(
    () => getScopedEntries(persistedRecent, scopeId),
    [persistedRecent, scopeId]
  );

  const trackVisit = useCallback(
    (entry: string): void => {
      if (!scopeId) return;

      setPersistedRecent((previous) =>
        setScopedEntries(previous, scopeId, (entries) =>
          [entry, ...entries.filter((item) => item !== entry)].slice(
            0,
            MAX_RECENT
          )
        )
      );
    },
    [scopeId, setPersistedRecent]
  );

  const pin = useCallback(
    (entry: string): void => {
      if (!scopeId) return;

      setPersistedPinned((previous) =>
        setScopedEntries(previous, scopeId, (entries) =>
          entries.includes(entry) ? entries : [...entries, entry]
        )
      );
    },
    [scopeId, setPersistedPinned]
  );

  const unpin = useCallback(
    (entry: string): void => {
      if (!scopeId) return;

      setPersistedPinned((previous) =>
        setScopedEntries(previous, scopeId, (entries) =>
          entries.filter((item) => item !== entry)
        )
      );
    },
    [scopeId, setPersistedPinned]
  );

  const removeRecent = useCallback(
    (entry: string): void => {
      if (!scopeId) return;

      setPersistedRecent((previous) =>
        setScopedEntries(previous, scopeId, (entries) =>
          entries.filter((item) => item !== entry)
        )
      );
    },
    [scopeId, setPersistedRecent]
  );

  const isPinned = useCallback(
    (entry: string): boolean => pinnedEntries.includes(entry),
    [pinnedEntries]
  );

  const sidebarEntries = useMemo(
    () => [
      ...pinnedEntries,
      ...recentEntries.filter((entry) => !pinnedEntries.includes(entry)),
    ],
    [pinnedEntries, recentEntries]
  );

  return {
    pinnedEntries,
    recentEntries,
    sidebarEntries,
    trackVisit,
    pin,
    unpin,
    removeRecent,
    isPinned,
  };
};
