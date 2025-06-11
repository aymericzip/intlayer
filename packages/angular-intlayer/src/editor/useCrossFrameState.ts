import { signal, Signal } from '@angular/core';
import { type MessageKey } from '@intlayer/editor';
import { useCommunicator } from './communicator';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export type CrossFrameStateOptions = {
  /** Whether to broadcast state changes to other instances (default: true) */
  emit?: boolean;
  /** Whether to listen for state updates from other instances (default: true) */
  receive?: boolean;
};

const crossFrameStateCache = new Map<
  string,
  {
    state: Signal<any>;
    setState: (v: any | ((prev: any) => any)) => void;
    postState: () => void;
  }
>();

/**
 * Utility to resolve either a value or an updater function (mirrors React's `setState`).
 */
const resolveState = <S>(
  state: S | ((prev?: S) => S) | undefined,
  prevState?: S
): S | undefined => {
  if (typeof state === 'function') {
    return (state as (prev?: S) => S)(prevState);
  }
  return state as S;
};

/**
 * Creates a plain object copy that can be safely serialized
 * for postMessage communication
 */
const toSerializable = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;
  // Using parse/stringify for a quick deep clone to remove reactivity
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Angular replacement for Vue's cross-frame state composable.
 * It synchronises a reactive value across frames/windows via the `postMessage` API.
 *
 * @template S The type of the state being synchronised.
 * @param key          Unique key identifying this state channel.
 * @param initialState Initial value (or lazy factory) for the state.
 * @param options      Control flags for emitting/receiving updates.
 *
 * @returns `[stateSignal, setState, postState]`
 *          - `stateSignal` – Angular `Signal<S | undefined>` holding the current state.
 *          - `setState`    – Setter with the same API as React's `setState`.
 *          - `postState`   – Manually broadcast the current state (useful after mutations outside `setState`).
 */
export const useCrossFrameState = <S>(
  key: `${MessageKey}`,
  initialState?: S | (() => S),
  options: CrossFrameStateOptions = { emit: true, receive: true }
): [
  Signal<S | undefined>,
  (v: S | ((prev: S | undefined) => S)) => void,
  () => void,
] => {
  if (crossFrameStateCache.has(key)) {
    // Return the existing instance
    const { state, setState, postState } = crossFrameStateCache.get(key)!;
    return [state, setState, postState];
  }

  const { emit = true, receive = true } = options;

  /**
   * Internal reactive state using Angular signals.
   * We resolve the initial value here to avoid one extra render (same idea as in the React version).
   */
  const stateSignal = signal<S | undefined>(resolveState<S>(initialState));

  // Get communicator within injection context
  const { postMessage, senderId } = useCommunicator();

  /**
   * Broadcast the given value if emitting is allowed and the communicator is ready.
   */
  const broadcastState = (value: S | undefined) => {
    if (
      !emit ||
      typeof postMessage !== 'function' ||
      typeof value === 'undefined'
    )
      return;
    postMessage({
      type: `${key}/post`,
      data: value,
      senderId,
    });
  };

  /**
   * Setter that mirrors React's `setState` signature (supports value or updater fn).
   */
  const setState = (valueOrUpdater: S | ((prev: S | undefined) => S)) => {
    const next = resolveState<S>(valueOrUpdater as any, stateSignal());
    const serialised = toSerializable(next);
    stateSignal.set(serialised);
    broadcastState(serialised);
  };

  /**
   * Manually broadcast the current state to peers.
   */
  const postState = () => {
    if (typeof postMessage !== 'function') return;
    postMessage({
      type: `${key}/post`,
      data: stateSignal(),
      senderId,
    });
  };

  // Emit the initial state (if any) right away so that peers can pick it up.
  broadcastState(stateSignal());

  // If we are in receive mode but have no state yet, ask peers for theirs.
  if (
    receive &&
    typeof postMessage === 'function' &&
    typeof stateSignal() === 'undefined'
  ) {
    postMessage({ type: `${key}/get`, senderId });
  }

  /* ───────────────────── Incoming messages ───────────────────── */

  // 1. Updates posted by other frames
  useCrossFrameMessageListener<S>(
    `${key}/post`,
    receive
      ? (data) => {
          stateSignal.set(data);
        }
      : undefined
  );

  // 2. Requests from peers asking for our current value
  const handleGetMessage = (_: unknown, originSenderId?: string) => {
    if (!emit) return;
    if (originSenderId === senderId) return; // Don't respond to our own request
    broadcastState(stateSignal());
  };

  useCrossFrameMessageListener(
    `${key}/get`,
    emit ? handleGetMessage : undefined
  );

  // Cache this instance
  crossFrameStateCache.set(key, { state: stateSignal, setState, postState });

  return [stateSignal as Signal<S | undefined>, setState, postState];
};
