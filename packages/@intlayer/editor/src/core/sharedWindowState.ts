type SharedWindowStateStore<T> = {
  isSet: boolean;
  value: T | undefined;
  eventTarget: EventTarget;
};

type SharedWindowStateChange<T> = { value: T; sourceId?: string };

type SharedWindowStateListener<T> = (value: T, sourceId?: string) => void;

export type SharedWindowState<T> = {
  /** Last published value, `undefined` until one is published */
  get: () => T | undefined;
  /** Publishes a value, tagged with the id of the manager publishing it */
  set: (value: T, sourceId?: string) => void;
  /** Returns an unsubscribe function */
  subscribe: (listener: SharedWindowStateListener<T>) => () => void;
};

/**
 * A value shared by every EditorStateManager of the same window — the
 * dashboard mounts several editor providers that must agree on edits and focus.
 * Stored on `window` so duplicated copies of this package share it too.
 */
export const createSharedWindowState = <T>(
  name: string
): SharedWindowState<T> => {
  const storeKey = `__intlayer_shared_${name}__`;

  const getStore = (): SharedWindowStateStore<T> => {
    const emptyStore: SharedWindowStateStore<T> = {
      isSet: false,
      value: undefined,
      eventTarget: new EventTarget(),
    };

    // Server side: nothing to share
    if (typeof window === 'undefined') return emptyStore;

    const windowStores = window as unknown as Record<
      string,
      SharedWindowStateStore<T> | undefined
    >;
    windowStores[storeKey] ??= emptyStore;

    return windowStores[storeKey];
  };

  return {
    get: () => {
      const store = getStore();

      return store.isSet ? store.value : undefined;
    },
    set: (value, sourceId) => {
      const store = getStore();
      store.isSet = true;
      store.value = value;
      store.eventTarget.dispatchEvent(
        new CustomEvent<SharedWindowStateChange<T>>('change', {
          detail: { value, sourceId },
        })
      );
    },
    subscribe: (listener) => {
      const { eventTarget } = getStore();
      const handleChange = (event: Event) => {
        const { value, sourceId } = (
          event as CustomEvent<SharedWindowStateChange<T>>
        ).detail;
        listener(value, sourceId);
      };

      eventTarget.addEventListener('change', handleChange);

      return () => eventTarget.removeEventListener('change', handleChange);
    },
  };
};
