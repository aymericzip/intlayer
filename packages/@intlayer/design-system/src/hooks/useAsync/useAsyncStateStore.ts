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
  isDisabled: boolean;
};

type StateSlice<T> = {
  [key: string]: States<T>;
};

type Actions<T> = {
  getStates: (key: string) => States<T>;
  setIsFetched: (key: string, value: boolean) => void;
  setIsLoading: (key: string, value: boolean) => void;
  setIsInvalidated: (key: string, value: boolean) => void;
  setError: (key: string, value: string | null) => void;
  setIsSuccess: (key: string, value: boolean) => void;
  setData: (key: string, value: T | null) => void;
  incrementRetryCount: (key: string) => void;
  resetRetryCount: (key: string) => void;
  setIsDisabled: (key: string, value: boolean) => void;
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
  isDisabled: false,
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
  states: {} as StateSlice<unknown>,

  getStates: (key) =>
    (get().states[key] as States<unknown>) || createDefaultStates<unknown>(),

  setIsFetched: (key, value) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...((state.states[key] as States<unknown>) ||
            createDefaultStates<unknown>()),
          isFetched: value,
          fetchedDateTime: new Date(),
        },
      },
    })),

  setIsLoading: (key, value) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...((state.states[key] as States<unknown>) ||
            createDefaultStates<unknown>()),
          isLoading: value,
        },
      },
    })),

  setError: (key, value) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...((state.states[key] as States<unknown>) ||
            createDefaultStates<unknown>()),
          error: value,
        },
      },
    })),

  setIsSuccess: (key, value) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...((state.states[key] as States<unknown>) ||
            createDefaultStates<unknown>()),
          isSuccess: value,
        },
      },
    })),

  setIsInvalidated: (key, value) =>
    set((state) => {
      if (value === true) {
        const allKeys = Object.keys(state.states);
        const matchedKeys = getMatchKeys([key], allKeys);

        matchedKeys.forEach((key) => {
          sessionStorage.removeItem(key);
        });

        return {
          states: {
            ...state.states,
            [key]: {
              ...createDefaultStates<unknown>(),
              isInvalidated: true,
            },
          },
        };
      }

      return {
        states: {
          ...state.states,
          [key]: {
            ...((state.states[key] as States<unknown>) ||
              createDefaultStates<unknown>()),
            isInvalidated: false,
          },
        },
      };
    }),

  setData: (key, value) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...((state.states[key] as States<unknown>) ||
            createDefaultStates<unknown>()),
          data: value,
        },
      },
    })),

  incrementRetryCount: (key) =>
    set((state) => {
      const prevState =
        (state.states[key] as States<unknown>) ||
        createDefaultStates<unknown>();
      return {
        states: {
          ...state.states,
          [key]: {
            ...prevState,
            retryCount: prevState.retryCount + 1,
          },
        },
      };
    }),

  resetRetryCount: (key) =>
    set((state) => {
      const prevState =
        (state.states[key] as States<unknown>) ||
        createDefaultStates<unknown>();
      return {
        states: {
          ...state.states,
          [key]: {
            ...prevState,
            retryCount: 0,
          },
        },
      };
    }),

  setIsDisabled: (key, value) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: {
          ...((state.states[key] as States<unknown>) ||
            createDefaultStates<unknown>()),
          isDisabled: value,
        },
      },
    })),

  resetKeyState: (key: string | string[]) =>
    set((state) => {
      const keys = ensureArray(key);

      const allKeys = Object.keys(state.states);
      const matchedKeys = getMatchKeys(keys, allKeys);

      const newStates = { ...state.states };
      matchedKeys.forEach((k) => {
        newStates[k] = createDefaultStates<unknown>();
      });
      return {
        states: newStates,
      };
    }),

  resetState: (excludedKey?: string | string[]) =>
    set((state) => {
      const excludedKeys = ensureArray(excludedKey);

      const allKeys = Object.keys(state.states);
      const matchedKeys = getMatchKeys(excludedKeys, allKeys);

      const newStates = Object.keys(state.states).reduce((acc, key) => {
        if (matchedKeys.includes(key)) {
          acc[key] = state.states[key];
        } else {
          acc[key] = createDefaultStates<unknown>();
        }
        return acc;
      }, {} as StateSlice<unknown>);

      return {
        states: newStates,
      };
    }),
}));
