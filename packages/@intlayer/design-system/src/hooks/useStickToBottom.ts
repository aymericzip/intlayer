'use client';

import { type RefObject, useCallback, useEffect, useRef } from 'react';

/**
 * Distance from the bottom, in pixels, under which the list still counts as
 * pinned. Sub-pixel scroll positions and zoom levels never land exactly on the
 * bottom, so an exact comparison would unpin a list the user never moved.
 */
const PIN_THRESHOLD = 32;

export type StickToBottomRefs<
  ScrollElement extends HTMLElement,
  ContentElement extends HTMLElement,
> = {
  /** Attach to the scrolling container. */
  scrollRef: RefObject<ScrollElement | null>;
  /** Attach to the element wrapping the items, whose growth triggers the follow. */
  contentRef: RefObject<ContentElement | null>;
  /**
   * Releases the pin until the user scrolls back down to the bottom.
   *
   * Call it before growing the content upwards — prepending older items to a
   * pinned list would otherwise scroll straight past what was just revealed.
   */
  unpin: () => void;
};

/**
 * Keeps a scrolling container pinned to its bottom edge as its content grows,
 * and releases the pin as soon as the user scrolls away from the bottom.
 *
 * Growth is detected with a `ResizeObserver` rather than from a render effect,
 * so a message streaming in token by token follows without the component
 * having to describe what changed. Both the read and the write happen inside
 * the observer callback, which the browser runs once layout is already
 * computed — neither forces a reflow, unlike measuring the same container from
 * an effect that has just committed new nodes.
 *
 * @returns The refs to attach to the container and to its content wrapper.
 *
 * @example
 * const { scrollRef, contentRef } = useStickToBottom<HTMLDivElement, HTMLUListElement>();
 *
 * return (
 *   <div ref={scrollRef} className="overflow-auto">
 *     <ul ref={contentRef}>{items}</ul>
 *   </div>
 * );
 */
export const useStickToBottom = <
  ScrollElement extends HTMLElement,
  ContentElement extends HTMLElement,
>(): StickToBottomRefs<ScrollElement, ContentElement> => {
  const scrollRef = useRef<ScrollElement>(null);
  const contentRef = useRef<ContentElement>(null);
  const isPinnedRef = useRef(true);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    const contentElement = contentRef.current;

    if (!scrollElement || !contentElement) return;

    const getDistanceFromBottom = () =>
      scrollElement.scrollHeight -
      scrollElement.scrollTop -
      scrollElement.clientHeight;

    /*
     * Scroll events are dispatched after the browser has laid the page out, so
     * reading the geometry here is free — deferring it to an animation frame
     * would move the read *before* the next layout and force one instead.
     */
    const handleScroll = () => {
      isPinnedRef.current = getDistanceFromBottom() <= PIN_THRESHOLD;
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!isPinnedRef.current) return;
      if (getDistanceFromBottom() <= 0) return;

      // Jumping rather than animating: a streamed answer resizes on nearly
      // every frame, and a smooth scroll restarted that often never reaches
      // the bottom.
      scrollElement.scrollTop =
        scrollElement.scrollHeight - scrollElement.clientHeight;
    });

    resizeObserver.observe(contentElement);
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const unpin = useCallback(() => {
    isPinnedRef.current = false;
  }, []);

  return { scrollRef, contentRef, unpin };
};
