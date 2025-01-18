'use client';

import {
  CrossFrameCommunicator,
  type CrossFrameCommunicatorOptions,
} from '@intlayer/editor';
import { type SetStateAction, useEffect, useRef, useState } from 'react';
import { useCommunicator } from './CommunicatorContext';

export const useCrossFrameState = <T,>(key: string, initialValue?: T) => {
  const props = useCommunicator();
  const communicatorRef = useRef<CrossFrameCommunicator>();

  useEffect(() => {
    if (!props.targetWindow) return;

    communicatorRef.current = new CrossFrameCommunicator(
      props as CrossFrameCommunicatorOptions
    );

    communicatorRef.current.on(key, (data) => {
      // When a message is received, update local state
      setState(data as T);
    });

    return () => {
      communicatorRef.current?.destroy();
    };
  }, [props, key]);

  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue as T;
    }

    // If you have an initial value on the client, send a message out immediately
    if (initialValue !== undefined) {
      communicatorRef.current?.sendMessage(key, initialValue);
      return initialValue;
    }

    return undefined as T;
  });

  /**
   * Allows setting state either directly or via a functional update.
   * If passed a function, we merge/update based on the previous state.
   */
  const setStateResult = (valueOrUpdater: SetStateAction<T>) => {
    setState((prev) => {
      const newValue: T =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prevVal: T) => T)(prev)
          : valueOrUpdater;

      communicatorRef.current?.sendMessage(key, newValue);
      return newValue;
    });
  };

  // If `state` is null/undefined but you have an `initialValue`,
  // you could optionally do `(state ?? initialValue) as T`
  return [state ?? (initialValue as T), setStateResult] as const;
};
