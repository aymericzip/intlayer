import type { MessageKey } from '@intlayer/editor';
import { get, type Writable, writable } from 'svelte/store';
import { useCommunicator } from './communicator';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

const crossFrameStateCache = new Map<
  string,
  {
    state: Writable<any>;
    setState: (v: any) => void;
    postState: () => void;
  }
>();

const resolveState = <S>(
  state: S | ((prev?: S) => S) | undefined,
  prevState?: S
): S | undefined => {
  if (typeof state === 'function') {
    return (state as (prev?: S) => S)(prevState);
  }
  return state as S;
};

const toSerializable = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;
  return JSON.parse(JSON.stringify(obj));
};

export const useCrossFrameState = <S>(
  key: `${MessageKey}`,
  initialState?: S | (() => S),
  options: CrossFrameStateOptions = { emit: true, receive: true }
): [Writable<S | undefined>, (v: S | ((prev: S | undefined) => S)) => void] => {
  if (crossFrameStateCache.has(key)) {
    const { state, setState } = crossFrameStateCache.get(key)!;
    return [state, setState];
  }

  const { emit = true, receive = true } = options;

  // Initialize state
  const initialValue = resolveState<S>(initialState);
  const state = writable<S | undefined>(initialValue);
  const communicatorStore = useCommunicator();

  const broadcastState = (value: S | undefined) => {
    const { postMessage, senderId } = get(communicatorStore);

    if (
      !emit ||
      typeof postMessage !== 'function' ||
      typeof value === 'undefined'
    ) {
      return;
    }

    postMessage(
      {
        type: `${key}/post`,
        data: value,
        senderId,
      },
      '*'
    );
  };

  const setState = (valueOrUpdater: S | ((prev: S | undefined) => S)) => {
    state.update((prev) => {
      const next = resolveState<S>(valueOrUpdater as any, prev);
      const serialised = toSerializable(next);
      broadcastState(serialised);
      return serialised;
    });
  };

  const postState = () => {
    const { postMessage, senderId } = get(communicatorStore);
    if (typeof postMessage !== 'function') return;
    postMessage(
      {
        type: `${key}/post`,
        data: get(state),
        senderId,
      },
      '*'
    );
  };

  // Emit initial state
  broadcastState(initialValue);

  // If receiving, ask for state
  if (receive && typeof get(state) === 'undefined') {
    const { postMessage, senderId } = get(communicatorStore);
    if (typeof postMessage === 'function') {
      postMessage({ type: `${key}/get`, senderId }, '*');
    }
  }

  // Listen for updates
  const listenerKey = receive ? `${key}/post` : (`${key}/ignore` as any);
  const listener = useCrossFrameMessageListener<S>(listenerKey, (data) => {
    if (receive) {
      state.set(data);
    }
  });

  // Listen for requests
  const getListenerKey = emit ? `${key}/get` : (`${key}/ignore` as any);
  const getListener = useCrossFrameMessageListener(
    getListenerKey,
    (_: unknown) => {
      if (emit) {
        broadcastState(get(state));
      }
    }
  );

  crossFrameStateCache.set(key, { state, setState, postState });

  return [state, setState];
};
