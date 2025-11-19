import { compareUrls, type MessageKey } from '@intlayer/editor';
import { onDestroy } from 'svelte';
import { get } from 'svelte/store';
import { useCommunicator } from './communicator';

type AnyFn = (data: unknown) => void;
const subscribers = new Map<string, Set<AnyFn>>();
let windowListenerAttached = false;

const addSubscriber = (key: string, cb: AnyFn) => {
  let set = subscribers.get(key);
  if (!set) {
    set = new Set();
    subscribers.set(key, set);
  }
  set.add(cb);
};

const removeSubscriber = (key: string, cb: AnyFn) => {
  const set = subscribers.get(key);
  if (!set) return;
  set.delete(cb);
  if (set.size === 0) subscribers.delete(key);
};

const ensureGlobalListener = (
  allowedOrigins: string[] | undefined,
  selfId: string
) => {
  if (windowListenerAttached) return;
  if (typeof window === 'undefined') return;

  window.addEventListener('message', (event) => {
    const { type, data, senderId } = event.data ?? {};
    if (!type) return;
    if (senderId === selfId) return;

    if (
      !allowedOrigins ||
      allowedOrigins.includes('*') ||
      allowedOrigins.some((o) => compareUrls(o, event.origin))
    ) {
      subscribers.get(type)?.forEach((cb) => {
        cb(data);
      });
    }
  });
  windowListenerAttached = true;
};

export const useCrossFrameMessageListener = <S>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void,
  autoCleanup = true
) => {
  const communicatorStore = useCommunicator();
  const { allowedOrigins, senderId } = get(communicatorStore);

  ensureGlobalListener(allowedOrigins, senderId);

  if (onEventTriggered) {
    const cb = onEventTriggered as AnyFn;
    addSubscriber(key, cb);
    if (autoCleanup) {
      try {
        onDestroy(() => removeSubscriber(key, cb));
      } catch {
        // Might be called outside component, manual cleanup needed if needed
      }
    }
  }

  const postMessageWrapper = (data?: S) => {
    const { postMessage, senderId: currentSenderId } = get(communicatorStore);
    postMessage({ type: key, data, senderId: currentSenderId }, '*');
  };

  return postMessageWrapper;
};
