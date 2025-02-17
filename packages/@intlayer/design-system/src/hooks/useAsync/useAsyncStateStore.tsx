'use client';

import {
  type PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

/**
 * Represents the states for a given key in the asynchronous state management.
 * This includes flags for loading, fetched, invalidation, and success/error status.
 * It also keeps track of the fetched datetime, retry counts, the data itself, and whether queries are enabled.
 */
type States<T> = {
  isLoading: boolean;
  isFetched: boolean;
  isInvalidated: boolean;
  fetchedDateTime: null | Date;
  error: string | null;
  isSuccess: boolean;
  data: T | null;
  errorCount: number;
  isEnabled: boolean;
};

/**
 * Holds a mapping from a key (string) to its associated state.
 */
type StateSlice<T> = {
  [key: string]: States<T>;
};

/**
 * Describes all the possible actions that can be dispatched to the reducer.
 * These actions allow setting or updating states for specific keys or multiple keys at once,
 * handling errors, and resetting states.
 */
type Actions<T> =
  | { type: 'SET_QUERY_STATE'; key: string; value: Partial<States<T>> }
  | { type: 'MAKE_QUERY_IN_ERROR'; key: string; error: string }
  | { type: 'SET_QUERIES_STATE'; keys: string[]; value: Partial<States<T>> }
  | { type: 'RESET_KEY_STATE'; keys: string[] }
  | { type: 'RESET_STATE'; excludeKeys: string[] };

/**
 * The shape of the entire asynchronous state, holding all states in a single object.
 */
type AsyncState<T> = {
  states: StateSlice<T>;
};

/**
 * Creates a default state object with initial values. This is useful when a key
 * has not been initialized yet or when resetting a state back to defaults.
 */
const createDefaultStates = <T,>(): States<T> => ({
  isFetched: false,
  fetchedDateTime: null,
  isLoading: false,
  isInvalidated: false,
  error: null,
  isSuccess: false,
  data: null,
  errorCount: 0,
  isEnabled: true,
});

/**
 * Given a list of selector keys and a list of keys that may contain arguments,
 * this function returns all keys that match the selectors. Matching is determined
 * by comparing the initial part (split by "/") of the key.
 *
 * For example:
 * selectorsKeys = ["user", "posts"]
 * keysWithArgs = ["user/123", "posts/active", "comments/42"]
 * Result = ["user/123", "posts/active"]
 */
const getMatchKeys = (
  selectorsKeys: string[],
  keysWithArgs: string[]
): string[] =>
  keysWithArgs.filter((key) => selectorsKeys.includes(key.split('/')[0]));

/**
 * The reducer function handling all state transitions. It takes the current state and an action,
 * and returns a new state based on the type of the action.
 *
 * Actions include:
 * - SET_QUERY_STATE: Update a single key with partial new state.
 * - MAKE_QUERY_IN_ERROR: Mark a single key as errored and update related flags.
 * - SET_QUERIES_STATE: Update multiple keys at once with partial new state.
 * - RESET_KEY_STATE: Reset certain keys to their default states.
 * - RESET_STATE: Reset all keys to their default states except those excluded.
 */
const reducer = <T,>(
  state: AsyncState<T>,
  action: Actions<T>
): AsyncState<T> => {
  switch (action.type) {
    case 'SET_QUERY_STATE': {
      const { key, value } = action;
      return {
        ...state,
        states: {
          ...state.states,
          [key]: {
            // Merge existing state for the key or default state if not present
            ...(state.states[key] ?? createDefaultStates<T>()),
            ...value,
          },
        },
      };
    }
    case 'MAKE_QUERY_IN_ERROR': {
      const { key, error } = action;
      return {
        ...state,
        states: {
          ...state.states,
          [key]: {
            // Merge existing state or default if not found
            ...(state.states[key] ?? createDefaultStates<T>()),
            // Explicitly set error and related flags
            error,
            isFetched: true,
            isSuccess: false,
            errorCount: (state.states[key]?.errorCount ?? 0) + 1,
            isLoading: false,
            isInvalidated: false,
          },
        },
      };
    }
    case 'SET_QUERIES_STATE': {
      const { keys, value } = action;
      const keyArray = [keys].flat();

      // Find all keys that match the given selectors
      const allKeys = Object.keys(state.states);
      const matchedKeys = getMatchKeys(keyArray, allKeys);
      if (matchedKeys.length === 0) return state;

      // Update multiple keys in a single action
      const updatedStates = structuredClone(state.states);
      matchedKeys.forEach((key) => {
        updatedStates[key] = {
          ...(state.states[key] ?? createDefaultStates<T>()),
          ...value,
        };
      });

      return {
        ...state,
        states: updatedStates,
      };
    }
    case 'RESET_KEY_STATE': {
      const { keys } = action;
      const keyArray = [keys].flat();
      if (keyArray.length === 0) return state;

      // Find all keys that match the given selectors
      const allKeys = Object.keys(state.states);
      const matchedKeys = getMatchKeys(keyArray, allKeys);
      if (matchedKeys.length === 0) return state;

      // Reset the matched keys back to default states
      const resetStates = { ...state.states };
      matchedKeys.forEach((key) => {
        resetStates[key] = createDefaultStates<T>();
      });

      return {
        ...state,
        states: resetStates,
      };
    }
    case 'RESET_STATE': {
      const excludeArray = [action.excludeKeys].flat();
      const allKeys = Object.keys(state.states);

      const matchedKeys = getMatchKeys(excludeArray, allKeys);

      // Reset all states except those that match the exclude keys
      const newStates: StateSlice<T> = {};
      allKeys.forEach((key) => {
        newStates[key] = matchedKeys.includes(key)
          ? state.states[key]
          : createDefaultStates<T>();
      });

      return {
        ...state,
        states: newStates,
      };
    }
    default:
      return state;
  }
};

/**
 * The context type that will be provided to consumers.
 * It exposes a set of functions for interacting with the asynchronous state:
 * - getStates: Retrieve the current state for a given key.
 * - setQueryState: Partially update a single key's state.
 * - setQueriesState: Partially update multiple keys' states.
 * - makeQueryInError: Set a particular key into an error state.
 * - resetKeyState: Reset certain keys to their default states.
 * - resetState: Reset all keys to their default states except a set of excluded ones.
 */
type AsyncStateContextType<T> = {
  getStates: (key: string) => States<T>;
  setQueryState: (key: string, value: Partial<States<T>>) => void;
  setQueriesState: (keys: string[], value: Partial<States<T>>) => void;
  makeQueryInError: (key: string, error: string) => void;
  resetKeyState: (keys: string[]) => void;
  resetState: (excludedKeys: string[]) => void;
};

/**
 * Creates a React context for asynchronous state management.
 * This context will be provided by the AsyncStateProvider and consumed by hooks like useAsyncState.
 */
const AsyncStateContext = createContext<AsyncStateContextType<unknown> | null>(
  null
);

/**
 * A provider component that wraps its children and provides the asynchronous
 * state context. It uses the reducer to manage states and dispatch actions
 * based on consumer interactions.
 *
 * @param children The React children elements that should have access to this context.
 */
export const AsyncStateProvider = ({ children }: PropsWithChildren<{}>) => {
  // Initialize the reducer with an empty state object
  const [asyncState, dispatch] = useReducer(reducer, { states: {} });

  /**
   * Retrieve the state associated with a given key. If no state exists for that key,
   * return a default state.
   *
   * @param key The key for which to retrieve the state.
   */
  const getStates = (key: string) =>
    asyncState.states[key] ?? createDefaultStates<unknown>();

  /**
   * Partially update the state for a given key.
   *
   * @param key The key to update.
   * @param value A partial state object to merge with the existing state.
   */
  const setQueryState = (key: string, value: Partial<States<unknown>>) => {
    dispatch({ type: 'SET_QUERY_STATE', key, value });
  };

  /**
   * Partially update the state for multiple keys at once.
   *
   * @param keys An array of keys to update.
   * @param value A partial state object to merge with each key's existing state.
   */
  const setQueriesState = (keys: string[], value: Partial<States<unknown>>) => {
    dispatch({ type: 'SET_QUERIES_STATE', keys, value });
  };

  /**
   * Mark a given query as having encountered an error.
   *
   * @param key The key associated with the query.
   * @param error The error message to set.
   */
  const makeQueryInError = (key: string, error: string) => {
    dispatch({ type: 'MAKE_QUERY_IN_ERROR', key, error });
  };

  /**
   * Reset certain keys back to their default states.
   *
   * @param keys The keys to reset.
   */
  const resetKeyState = (keys: string[]) => {
    dispatch({ type: 'RESET_KEY_STATE', keys });
  };

  /**
   * Reset the entire state back to defaults, except for keys that match the excluded ones.
   *
   * @param excludedKeys Keys that should not be reset.
   */
  const resetState = (excludedKeys: string[]) => {
    dispatch({ type: 'RESET_STATE', excludeKeys: excludedKeys });
  };

  return (
    <AsyncStateContext.Provider
      value={{
        getStates,
        setQueryState,
        setQueriesState,
        makeQueryInError,
        resetKeyState,
        resetState,
      }}
    >
      {children}
    </AsyncStateContext.Provider>
  );
};

/**
 * A custom hook for accessing the asynchronous state context. It throws an error if used
 * outside of a provider.
 *
 * @returns The asynchronous state context value.
 */
export const useAsyncState = () => {
  const context = useContext(AsyncStateContext);
  if (!context) {
    throw new Error('useAsyncState must be used within an AsyncStateProvider');
  }
  return context;
};
