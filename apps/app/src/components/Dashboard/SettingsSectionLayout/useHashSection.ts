import { useCallback, useSyncExternalStore } from 'react';

/** Fired after `history.replaceState`, which never emits `hashchange`. */
const HASH_REPLACED_EVENT = 'intlayer:hash-replaced';

const subscribeToHash = (onStoreChange: () => void): (() => void) => {
  window.addEventListener('hashchange', onStoreChange);
  window.addEventListener(HASH_REPLACED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('hashchange', onStoreChange);
    window.removeEventListener(HASH_REPLACED_EVENT, onStoreChange);
  };
};

const getHashSnapshot = (): string =>
  decodeURIComponent(window.location.hash.replace(/^#/, ''));

/** The server never sees the hash; hydration starts on the default section. */
const getServerHashSnapshot = (): string => '';

/**
 * Reads and writes the URL hash as the active section id. Writing replaces the
 * history entry (keeping the router's state) instead of pushing one, so tab
 * switches do not pile up in the back stack nor trigger a router reload.
 *
 * @param sectionIds - Valid section ids; anything else falls back to the first.
 */
export const useHashSection = <SectionId extends string>(
  sectionIds: readonly SectionId[]
): [SectionId | undefined, (sectionId: SectionId) => void] => {
  const hash = useSyncExternalStore(
    subscribeToHash,
    getHashSnapshot,
    getServerHashSnapshot
  );

  const activeSectionId = sectionIds.includes(hash as SectionId)
    ? (hash as SectionId)
    : sectionIds[0];

  const setActiveSectionId = useCallback((sectionId: SectionId) => {
    const url = new URL(window.location.href);
    url.hash = sectionId;
    window.history.replaceState(window.history.state, '', url);
    window.dispatchEvent(new Event(HASH_REPLACED_EVENT));
  }, []);

  return [activeSectionId, setActiveSectionId];
};
