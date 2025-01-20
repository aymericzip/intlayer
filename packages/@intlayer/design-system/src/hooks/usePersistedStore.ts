'use client';

import {
  useState,
  useEffect,
  useCallback,
  type SetStateAction,
  type Dispatch,
  useMemo,
} from 'react';

export const usePersistedStore = <S>(
  key: string,
  initialState?: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
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

    if (persistedState && state === undefined) {
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

        localStorage?.setItem(key, JSON.stringify(newValue));

        return newValue;
      });
    },
    [key, setState]
  );

  return useMemo(() => [state, setStateWrapper], [state, setStateWrapper]);
};
