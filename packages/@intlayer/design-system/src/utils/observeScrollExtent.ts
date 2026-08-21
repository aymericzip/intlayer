/**
 * Watches everything that changes how far an element can scroll: its own box,
 * and the boxes of the content it scrolls over.
 *
 * A `ResizeObserver` on the scroll container alone stays silent while its
 * content grows — a container with a capped height keeps that height whatever
 * it contains. Observing its children covers the content side, which is the
 * half that actually moves the scroll extent.
 *
 * @param container - The scrolling element.
 * @param onResize - Called when the container or its content is resized, and
 * when children are added to or removed from the container.
 * @returns A function disconnecting the observers.
 *
 * @example
 * const stopObserving = observeScrollExtent(contentElement, invalidateOffsets);
 */
export const observeScrollExtent = (
  container: HTMLElement,
  onResize: () => void
): (() => void) => {
  const resizeObserver = new ResizeObserver(onResize);

  const observeContent = () => {
    resizeObserver.observe(container);

    for (const child of Array.from(container.children)) {
      resizeObserver.observe(child);
    }
  };

  observeContent();

  // Children come and go as the page renders, so the observer follows them.
  const mutationObserver = new MutationObserver(() => {
    observeContent();
    onResize();
  });
  mutationObserver.observe(container, { childList: true });

  return () => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  };
};
