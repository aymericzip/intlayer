'use client';

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const usePersistedStore = <S>(
  key: string,
  initialState?: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, () => void, () => void] => {
  const [state, setState] = useState<S>(() => {
    // If you have an initial value on the client, send a message out immediately
    if (initialState !== undefined) {
      const result: S =
        typeof initialState === 'function'
          ? (initialState as () => S)()
          : initialState;

      if (typeof window === 'undefined') return result;

      const persistedState = localStorage?.getItem(key);

      if (persistedState) {
        try {
          return JSON.parse(persistedState);
        } catch (e) {
          console.error(e);
        }
      }

      return result;
    }

    return undefined as S;
  });

  useEffect(() => {
    const persistedState = localStorage?.getItem(key);

    if (
      persistedState &&
      persistedState !== 'undefined' &&
      state === undefined
    ) {
      try {
        setState(JSON.parse(persistedState));
      } catch (e) {
        console.error(e);
      }
    } else if (initialState !== undefined && state === undefined) {
      setState(initialState);
    }
  }, [key, state]);

  /**
   * Allows setting state either directly or via a functional update.
   * If passed a function, we merge/update based on the previous state.
   */
  const setStateWrapper: typeof setState = useCallback(
    (valueOrUpdater: SetStateAction<S>) => {
      setState((prev) => {
        const newValue: S =
          typeof valueOrUpdater === 'function'
            ? (valueOrUpdater as (prevVal: S) => S)(prev)
            : valueOrUpdater;

        if (newValue !== 'undefined') {
          localStorage?.setItem(key, JSON.stringify(newValue));
          return newValue;
        }

        return prev;
      });
    },
    [key, setState]
  );

  const loadState = useCallback(() => {
    const savedState = localStorage?.getItem(key);
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, [key, setState]);

  const clearState = useCallback(() => {
    localStorage?.removeItem(key);
    setState(undefined as S);
  }, [key]);

  return useMemo(
    () => [state, setStateWrapper, loadState, clearState],
    [state, setStateWrapper, loadState, clearState]
  );
};
