'use client';

import { DestroyRef, inject } from '@angular/core';
import { compareUrls, type MessageKey } from '@intlayer/editor';
import { useCommunicator } from './communicator';

// ---------- module-level singletons ----------
type AnyFn = (data: unknown) => void;

/** Map<key, Set<callback>> */
const subscribers = new Map<string, Set<AnyFn>>();

/** True once we've attached the single window listener */
let windowListenerAttached = false;

/** Helper to add/remove a callback for a key */
function addSubscriber(key: string, cb: AnyFn) {
  let set = subscribers.get(key);
  if (!set) {
    set = new Set();
    subscribers.set(key, set);
  }
  set.add(cb);
}

function removeSubscriber(key: string, cb: AnyFn) {
  const set = subscribers.get(key);
  if (!set) return;
  set.delete(cb);
  if (set.size === 0) subscribers.delete(key);
}

/** The one global window listener */
function ensureGlobalListener(
  allowedOrigins: string[] | undefined,
  selfId: string
) {
  if (windowListenerAttached) return;
  window.addEventListener('message', (event) => {
    const { type, data, senderId } = event.data ?? {};
    if (!type) return; // guard malformed messages
    if (senderId === selfId) return; // ignore my own

    // origin check
    if (
      !allowedOrigins ||
      allowedOrigins.includes('*') ||
      allowedOrigins.some((o) => compareUrls(o, event.origin))
    ) {
      // broadcast to everyone interested in this key
      subscribers.get(type)?.forEach((cb) => cb(data));
    }
  });
  windowListenerAttached = true;
}
// ---------- end module-level code ----------

/**
 * useCrossFrameMessageListener
 *
 * @template S - type of the message payload
 * @param key               message type we care about
 * @param onEventTriggered  optional callback when a matching message arrives
 * @returns postMessage(data?) helper scoped to this key
 */
export const useCrossFrameMessageListener = <S>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void
) => {
  // Communicator is the same for everyone, so it's fine to call every time.
  const { allowedOrigins, postMessage, senderId } = useCommunicator();

  // --- 1. make sure the global listener exists ----
  ensureGlobalListener(allowedOrigins, senderId);

  // --- 2. register this caller's callback (if any) ---
  if (onEventTriggered) {
    addSubscriber(key, onEventTriggered as AnyFn);

    // Use Angular's DestroyRef for cleanup instead of Vue's onScopeDispose
    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      if (destroyRef) {
        destroyRef.onDestroy(() =>
          removeSubscriber(key, onEventTriggered as AnyFn)
        );
      }
    } catch {
      // If called outside injection context, no cleanup available
      console.warn(
        'useCrossFrameMessageListener called outside injection context; ' +
          'cleanup may not be available.'
      );
    }
  }

  // --- 3. return a wrapper that tags outgoing messages with our key ---
  const postMessageWrapper = (data?: S) => {
    postMessage({ type: key, data, senderId });
  };

  return postMessageWrapper;
};
