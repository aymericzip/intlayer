import { create } from 'zustand';

type States<T> = {
  isLoading: boolean;
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
  setIsLoading: (key: string, value: boolean) => void;
  setError: (key: string, value: string | null) => void;
  setIsSuccess: (key: string, value: boolean) => void;
  setData: (key: string, value: T | null) => void;
  incrementRetryCount: (key: string) => void;
  resetRetryCount: (key: string) => void;
  setIsDisabled: (key: string, value: boolean) => void;
  resetKeyState: (key: string) => void;
  resetState: () => void;
};

type AsyncState<T> = {
  states: StateSlice<T>;
} & Actions<T>;

const createDefaultStates = <T>(): States<T> => ({
  isLoading: false,
  error: null,
  isSuccess: false,
  data: null,
  retryCount: 0,
  isDisabled: false,
});

export const useAsyncStateStore = create<AsyncState<unknown>>((set, get) => ({
  states: {} as StateSlice<unknown>,

  getStates: (key) =>
    (get().states[key] as States<unknown>) || createDefaultStates<unknown>(),

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

  resetKeyState: (key) =>
    set((state) => ({
      states: {
        ...state.states,
        [key]: createDefaultStates<unknown>(),
      },
    })),
  resetState: () =>
    set(() => ({
      states: {},
    })),
}));
