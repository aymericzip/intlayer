import { useCallback, useRef } from 'react';

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
  const savedPointerEventsRef = useRef<
    Map<HTMLIFrameElement, string> | undefined
  >(undefined);

  /** Disable pointer events on all iframes so the drag keeps tracking over them. */
  const disableIframePointerEvents = useCallback(() => {
    const saved = new Map<HTMLIFrameElement, string>();
    for (const iframe of Array.from(document.querySelectorAll('iframe'))) {
      saved.set(iframe, iframe.style.pointerEvents);
      iframe.style.pointerEvents = 'none';
    }
    savedPointerEventsRef.current = saved;
  }, []);

  /** Restore the pointer events saved when the interaction started. */
  const restoreIframePointerEvents = useCallback(() => {
    const saved = savedPointerEventsRef.current;
    if (!saved) return;
    for (const [iframe, pointerEvents] of saved) {
      iframe.style.pointerEvents = pointerEvents;
    }
    savedPointerEventsRef.current = undefined;
  }, []);

  return { disableIframePointerEvents, restoreIframePointerEvents };
};
