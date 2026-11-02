import { useCallback, useRef } from 'react';

type IframeShieldState = {
  originalPointerEvents: string;
  count: number;
};

/**
 * Module-level registry tracking iframes shielded by active drag interactions.
 *
 * WeakMap ensures that if an iframe element is garbage collected, its entry
 * automatically evaporates without leaking memory.
 */
const iframeShieldStateMap = new WeakMap<
  HTMLIFrameElement,
  IframeShieldState
>();

/**
 * Shield against iframes swallowing pointer events during drag interactions.
 *
 * While dragging (e.g. resizing a panel), once the cursor crosses an iframe,
 * `mousemove` / `mouseup` are dispatched to the iframe's document instead of
 * the parent window — so listeners attached to `window` stop firing, the drag
 * freezes, and releasing the mouse over the iframe is never seen.
 *
 * Call `disableIframePointerEvents` when the interaction starts to set
 * `pointer-events: none` on every iframe in the document (previous inline
 * values are saved), and `restoreIframePointerEvents` when it ends — including
 * on unmount mid-interaction — to put them back.
 *
 * Each hook instance holds at most one shield claim at a time:
 * - Calling `disableIframePointerEvents` multiple times on the same instance
 *   is a no-op after the first call.
 * - Calling `restoreIframePointerEvents` releases that instance's claim;
 *   repeated or unstarted restores are safe no-ops.
 * - Multiple concurrent instances increment a reference count on each iframe;
 *   the original inline style is restored only when all holding instances release it.
 *
 * @returns The `disableIframePointerEvents` / `restoreIframePointerEvents` callbacks.
 *
 * @example
 * ```tsx
 * const { disableIframePointerEvents, restoreIframePointerEvents } =
 *   useIframePointerEventsShield();
 *
 * const startDragging = () => {
 *   disableIframePointerEvents();
 *   // attach window listeners…
 * };
 * const stopDragging = () => {
 *   restoreIframePointerEvents();
 *   // detach window listeners…
 * };
 * ```
 */
export const useIframePointerEventsShield = () => {
  const capturedIframesRef = useRef<Set<HTMLIFrameElement> | null>(null);

  /** Disable pointer events on all iframes so the drag keeps tracking over them. */
  const disableIframePointerEvents = useCallback(() => {
    // 1. If this instance already holds a shield claim, do nothing.
    if (capturedIframesRef.current !== null) {
      return;
    }

    // 2. Query all iframes in the current document (safe for SSR / non-DOM environments).
    const iframes =
      typeof document !== 'undefined'
        ? Array.from(document.querySelectorAll('iframe'))
        : [];
    const captured = new Set<HTMLIFrameElement>();

    // 3 & 4. Track each iframe in the shared WeakMap and set pointer-events: none.
    for (const iframe of iframes) {
      const existing = iframeShieldStateMap.get(iframe);
      if (!existing) {
        iframeShieldStateMap.set(iframe, {
          originalPointerEvents: iframe.style.pointerEvents,
          count: 1,
        });
        iframe.style.pointerEvents = 'none';
      } else {
        existing.count += 1;
      }
      captured.add(iframe);
    }

    // 5. Store the set of iframes captured by this instance.
    capturedIframesRef.current = captured;
  }, []);

  /** Restore the pointer events saved when the interaction started. */
  const restoreIframePointerEvents = useCallback(() => {
    // 1. If this instance hasn't acquired a shield claim, do nothing.
    if (capturedIframesRef.current === null) {
      return;
    }

    // 2. Clear this instance's record upfront so repeated restores are no-ops.
    const captured = capturedIframesRef.current;
    capturedIframesRef.current = null;

    // 3 & 4. Decrement reference count on each captured iframe and restore original style when count hits 0.
    for (const iframe of captured) {
      const state = iframeShieldStateMap.get(iframe);
      if (!state) continue;

      state.count -= 1;
      if (state.count <= 0) {
        iframe.style.pointerEvents = state.originalPointerEvents;
        iframeShieldStateMap.delete(iframe);
      }
    }
  }, []);

  return { disableIframePointerEvents, restoreIframePointerEvents };
};
