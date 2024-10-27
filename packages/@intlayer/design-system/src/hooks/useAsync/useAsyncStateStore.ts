import { create } from 'zustand';

type States<T> = {
  isLoading: boolean;
  isFetched: boolean;
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
  isLoading: false,
  error: null,
  isSuccess: false,
  data: null,
  retryCount: 0,
  isDisabled: false,
});

const ensureArray = <T>(value?: T | T[]): T[] => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
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

      const newStates = { ...state.states };
      keys.forEach((k) => {
        newStates[k] = createDefaultStates<unknown>();
      });
      return {
        states: newStates,
      };
    }),

  resetState: (excludedKey?: string | string[]) =>
    set((state) => {
      const excludedKeys = ensureArray(excludedKey);

      const newStates = Object.keys(state.states).reduce((acc, key) => {
        if (excludedKeys.includes(key)) {
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
