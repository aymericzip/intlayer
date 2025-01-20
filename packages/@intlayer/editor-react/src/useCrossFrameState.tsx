'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useCommunicator } from './CommunicatorContext';
import { type MessageKey } from './messageKey';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

/**
 * Configuration options for `useCrossFrameState`.
 * @typedef {Object} CrossFrameStateOptions
 * @property {boolean} [emit=true] - Whether to broadcast state changes to other instances.
 * @property {boolean} [receive=true] - Whether to listen for state updates from other instances.
 */

/**
 * useCrossFrameState
 *
 * This React hook synchronizes state across multiple instances (e.g., different iframes or windows).
 * It uses the `postMessage` API to communicate state changes and updates between instances.
 *
 * @template S - The type of the state.
 * @param {`${MessageKey}`} key - A unique identifier for the state to synchronize.
 * @param {S | (() => S)} [initialState] - The initial state value or a function to compute it lazily.
 * @param {CrossFrameStateOptions} [options] - Configuration options to control emitting and receiving messages.
 *   - `emit` (default: true): Whether to broadcast state changes to other instances.
 *   - `receive` (default: true): Whether to listen for state updates from other instances.
 *
 * @returns {[S, Dispatch<SetStateAction<S>>]} An array containing the current state and a setter function.
 */
export const useCrossFrameState = <S,>(
  key: `${MessageKey}`,
  initialState?: S | (() => S),
  options?: CrossFrameStateOptions
): [S, Dispatch<SetStateAction<S>>] => {
  const { allowedOrigins, postMessage } = useCommunicator();

  const [state, setState] = useState<S>(() => {
    // Initialize state from the provided initial value, if defined
    if (initialState !== undefined) {
      const resolvedState: S =
        typeof initialState === 'function'
          ? (initialState as () => S)()
          : initialState;

      // Emit the initial state if `emit` is enabled
      if (typeof postMessage === 'function' && (options?.emit ?? true)) {
        postMessage({ type: key, data: resolvedState });
      }

      return resolvedState;
    }

    // Default state is undefined if no initial state is provided
    return undefined as S;
  });

  useEffect(() => {
    if (options?.receive ?? true) {
      const handleMessage = (
        event: MessageEvent<{ type: string; data: S }>
      ) => {
        // Ignore messages that do not match the current key
        if (event.data.type !== key) return;

        // Check if the message origin is allowed
        if (
          typeof allowedOrigins !== 'undefined' &&
          !allowedOrigins.includes(event.origin) &&
          !allowedOrigins.includes('*')
        )
          return;

        // Update the local state with the received data
        setState(event.data.data);
      };

      window.addEventListener('message', handleMessage);

      // Clean up the event listener on unmount
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [key, options, allowedOrigins]);

  /**
   * A wrapper function around the `setState` function to handle messaging efficiently.
   *
   * This approach has several advantages over using an additional `useEffect`:
   * - **Avoid Redundant Re-renders:** By emitting the message directly within the `setState` logic,
   *   it prevents the extra render cycle that would be triggered when using `useEffect`.
   * - **Consistency:** Ensures the message is emitted immediately when the state is updated,
   *   avoiding potential delays caused by the asynchronous nature of `useEffect`.
   *
   * This function keeps the same API as `setState` and is memoized using `useCallback`
   * to prevent unnecessary re-renders of dependent components.
   *
   * @template S - The type of the state.
   * @param {SetStateAction<S>} valueOrUpdater - The new state or a function to produce it.
   * @returns {void}
   */
  const setStateWrapper: Dispatch<SetStateAction<S>> = useCallback(
    (valueOrUpdater) => {
      setState((prevState) => {
        const newState: S =
          typeof valueOrUpdater === 'function'
            ? (valueOrUpdater as (prevVal: S) => S)(prevState)
            : valueOrUpdater;

        // Emit the new state if `emit` is enabled
        if (options?.emit ?? true) {
          postMessage({ type: key, data: newState });
        }

        return newState;
      });
    },
    [key, options, postMessage]
  );

  // Return the useState state and setter
  return useMemo(() => [state, setStateWrapper], [state, setStateWrapper]);
};
