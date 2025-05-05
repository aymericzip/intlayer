'use client';

import { type MessageKey } from '@intlayer/editor';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useCommunicator } from './CommunicatorContext';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

const resolveState = <S,>(state?: SetStateAction<S>, prevState?: S): S =>
  typeof state === 'function'
    ? (state as (prevState?: S) => S)(prevState)
    : (state as S);

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
 * @param key - A unique identifier for the state to synchronize.
 * @param initialState - The initial state value or a function to compute it lazily.
 * @param options - Configuration options to control emitting and receiving messages.
 *   - `emit` (default: true): Whether to broadcast state changes to other instances.
 *   - `receive` (default: true): Whether to listen for state updates from other instances.
 *
 * @returns {[S, Dispatch<SetStateAction<S>>]} An array containing the current state and a setter function.
 */
export const useCrossFrameState = <S,>(
  key: `${MessageKey}`,
  initialState?: S | (() => S),
  options?: CrossFrameStateOptions
): [S, Dispatch<SetStateAction<S>>, typeof postState] => {
  const { postMessage, senderId } = useCommunicator();

  const { emit, receive } = options ?? { emit: true, receive: true };

  const handleStateChange = (state?: SetStateAction<S>, prevState?: S) => {
    // Initialize state from the provided initial value, if defined
    const resolvedState: S = resolveState(state, prevState);

    // Emit the initial state if `emit` is enabled and initial state is defined
    if (
      emit &&
      typeof postMessage === 'function' &&
      typeof resolvedState !== 'undefined'
    ) {
      postMessage({ type: `${key}/post`, data: resolvedState, senderId });
    }

    return resolvedState;
  };

  const postState = () => {
    if (typeof postMessage !== 'function') return;
    postMessage({ type: `${key}/post`, data: state, senderId });
  };

  const [state, setState] = useState<S>(() => handleStateChange(initialState));

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
  const setStateWrapper: Dispatch<SetStateAction<S>> = (valueOrUpdater) =>
    setState((prevState) => handleStateChange(valueOrUpdater, prevState));

  /**
   * Listen for messages with the specified key and update the state accordingly.
   */
  useCrossFrameMessageListener<S>(
    `${key}/post`,
    // Only activate the state listener if the `receive` option is true
    receive
      ? (data) => {
          setState(data);
        }
      : undefined
  );

  const onGetMessage = (_: unknown, originSenderId?: string) => {
    if (!emit) return;
    if (typeof postMessage !== 'function') return;
    if (originSenderId === senderId) return;
    if (typeof state === 'undefined') return;

    postMessage({ type: `${key}/post`, data: state, senderId });
  };

  /**
   * Listen for messages request to get the state content and send it back.
   */
  useCrossFrameMessageListener<S>(
    `${key}/get`,
    // Only activate the state listener if the `emit` option is true
    emit ? onGetMessage : undefined,
    state // Revalidate the listener if the state changes
  );

  useEffect(() => {
    // If the component is mounted and the hook in receive mode,
    // Request the state from the other instance
    if (
      receive &&
      typeof postMessage === 'function' &&
      typeof state === 'undefined'
    ) {
      postMessage({ type: `${key}/get`, senderId });
    }
  }, []);

  // Return the useState state and setter
  return [state, setStateWrapper, postState];
};
