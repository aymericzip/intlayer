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
  // The persisted value is deliberately not read here. A lazy initializer runs
  // during render, so the previous `typeof window === 'undefined'` branch gave
  // the server the initial state and the first client render whatever was in
  // `localStorage` — a guaranteed hydration mismatch for anyone who had used
  // the app before. It is loaded in the effect below instead, one render later.
  const [state, setState] = useState<S>(() =>
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : (initialState as S)
  );

  useEffect(() => {
    const persistedState = localStorage?.getItem(key);

    if (!persistedState || persistedState === 'undefined') return;

    try {
      setState(JSON.parse(persistedState));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

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

        if (typeof newValue !== 'undefined') {
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
