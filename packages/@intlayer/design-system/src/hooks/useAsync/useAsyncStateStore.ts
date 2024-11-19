import { create } from 'zustand';

type States<T> = {
  isLoading: boolean;
  isFetched: boolean;
  isInvalidated: boolean;
  fetchedDateTime: null | Date;
  error: string | null;
  isSuccess: boolean;
  data: T | null;
  retryCount: number;
  isEnabled: boolean;
};

type StateSlice<T> = {
  [key: string]: States<T>;
};

type Actions<T> = {
  getStates: (key: string) => States<T>;
  setQueryState: (key: string, value: Partial<States<T>>) => void;
  setQueriesState: (key: string[], value: Partial<States<T>>) => void;
  makeQueryInError: (key: string, error: string) => void;
  resetKeyState: (key: string[]) => void;
  resetState: (excludedKey: string[]) => void;
};

type AsyncState<T> = {
  states: StateSlice<T>;
} & Actions<T>;

const createDefaultStates = <T>(): States<T> => ({
  isFetched: false,
  fetchedDateTime: null,
  isLoading: false,
  isInvalidated: false,
  error: null,
  isSuccess: false,
  data: null,
  retryCount: 0,
  isEnabled: true,
});

/**
 * If the value is not an array. Transform it en array
 *
 * @param value value to transform en array if not array
 * @returns array
 */
const ensureArray = <T>(value?: T | T[]): T[] => {
  if (!value) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  }

  return [value];
};

/**
 * Return all keys that match
 *
 * @param {string[]} selectorsKeys - List of key to check - example: ['getProducts']
 * @param {string[]} keysWithArgs - List of keys that can includes args - example: ["getProducts", "getProducts/{'ids':['id1','id2']}", "getUsers", "getUsers/{'ids':['id1','id2']}" ]
 * @returns {string[]} - key that match the selectors - example: ["getProducts", "getProducts/{'ids':['id1','id2']}" ]
 */
const getMatchKeys = (
  selectorsKeys: string[],
  keysWithArgs: string[]
): string[] => {
  const matchedKeys: string[] = keysWithArgs.filter((key) =>
    selectorsKeys.includes(key.split('/')[0])
  );

  return matchedKeys;
};

export const useAsyncStateStore = create<AsyncState<unknown>>((set, get) => ({
  states: {},

  getStates: (key) => get().states[key] ?? createDefaultStates<unknown>(),

  setQueryState: (key, value) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...(state.states[key] ?? createDefaultStates<unknown>()),
          ...value,
        },
      },
    })),

  makeQueryInError: (key, error) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...(state.states[key] ?? createDefaultStates<unknown>()),
          error: error,
          isFetched: true,
          isSuccess: false,
          retryCount: (state.states[key]?.retryCount ?? 0) + 1,
          isLoading: false,
          isInvalidated: false,
        },
      },
    })),

  setQueriesState: (keys, value) => {
    const keyArray = ensureArray(keys);
    if (keyArray.length === 0) return;

    set((state) => ({
      states: {
        ...state.states,
        ...keyArray.reduce((acc, key) => {
          acc[key] = {
            ...(state.states[key] ?? createDefaultStates<unknown>()),
            ...value,
          };
          return acc;
        }, {} as StateSlice<unknown>),
      },
    }));
  },

  resetKeyState: (keys) => {
    const keyArray = ensureArray(keys);
    if (keyArray.length === 0) return;

    set((state) => {
      const allKeys = Object.keys(state.states);
      const matchedKeys = getMatchKeys(keyArray, allKeys);

      if (matchedKeys.length === 0) return {};

      const resetStates = matchedKeys.reduce((acc, key) => {
        acc[key] = createDefaultStates<unknown>();
        return acc;
      }, {} as StateSlice<unknown>);

      return {
        states: {
          ...state.states,
          ...resetStates,
        },
      };
    });
  },

  resetState: (excludedKeys) => {
    const excludeArray = ensureArray(excludedKeys);
    const allKeys = Object.keys(get().states);
    const matchedKeys = getMatchKeys(excludeArray, allKeys);

    set((state) => {
      const newStates = allKeys.reduce((acc, key) => {
        acc[key] = matchedKeys.includes(key)
          ? state.states[key]
          : createDefaultStates<unknown>();
        return acc;
      }, {} as StateSlice<unknown>);

      return {
        states: newStates,
      };
    });
  },
}));
