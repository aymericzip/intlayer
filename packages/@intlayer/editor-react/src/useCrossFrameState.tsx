'use client';

import type { MessageKey } from '@intlayer/editor';
import { CrossFrameStateManager } from '@intlayer/editor';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

/**
 * Synchronizes a React state value across frames using CrossFrameStateManager.
 */
export const useCrossFrameState = <S,>(
  key: `${MessageKey}`,
  initialState?: S | (() => S),
  options?: CrossFrameStateOptions
): [S, Dispatch<SetStateAction<S>>, () => void] => {
  const manager = useEditorStateManager();

  const resolvedInitial =
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState;

  const [value, setValueState] = useState<S>(resolvedInitial as S);
  const valueRef = useRef<S>(resolvedInitial as S);

  const stateManagerRef = useRef<CrossFrameStateManager<S> | null>(null);

  useEffect(() => {
    const { emit = true, receive = true } = options ?? {};
    const stateManager = new CrossFrameStateManager<S>(
      key,
      manager?.messenger,
      {
        emit,
        receive,
        initialValue: resolvedInitial,
      }
    );
    stateManagerRef.current = stateManager;

    const handler = (e: Event) => {
      const newValue = (e as CustomEvent<S>).detail;
      valueRef.current = newValue;
      setValueState(newValue);
    };
    stateManager.addEventListener('change', handler);
    stateManager.start();

    return () => {
      stateManager.removeEventListener('change', handler);
      stateManager.stop();
      stateManagerRef.current = null;
    };
  }, [key, manager?.messenger, options?.emit, options?.receive]);

  const setValue: Dispatch<SetStateAction<S>> = (valueOrUpdater) => {
    setValueState((prev) => {
      const newValue =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prev: S) => S)(prev)
          : valueOrUpdater;
      valueRef.current = newValue;
      stateManagerRef.current?.set(newValue);
      return newValue;
    });
  };

  const postState = () => {
    stateManagerRef.current?.postCurrentValue();
  };

  return [value, setValue, postState];
};
