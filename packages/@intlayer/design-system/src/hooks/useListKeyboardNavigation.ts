'use client';

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/** No row is highlighted until the user presses an arrow key. */
export const NO_HIGHLIGHTED_INDEX = -1;

export type UseListKeyboardNavigationProps<TElement extends HTMLElement> = {
  /** Number of navigable rows. The highlight wraps around it. */
  itemCount: number;
  /**
   * Activation of the highlighted row on `Enter`. Defaults to clicking the
   * first link or button the row contains, which reuses whatever navigation
   * that element already implements.
   */
  onActivate?: (index: number, element: TElement) => void;
};

/**
 * Clicks the row itself when it is actionable, otherwise the first link or
 * button inside it.
 */
const clickRowAction = (element: HTMLElement) => {
  const actionElement = element.matches('a, button')
    ? element
    : element.querySelector<HTMLElement>('a, button');

  actionElement?.click();
};

/**
 * Arrow-key navigation over a list whose focus stays elsewhere — typically a
 * search input filtering the list below it, where moving the DOM focus onto
 * each row would stop the user from typing.
 *
 * The caller renders the highlight itself from `highlightedIndex`, registers
 * each row through `setItemElement`, and forwards key events of the focused
 * element to `handleKeyDown`.
 */
export const useListKeyboardNavigation = <TElement extends HTMLElement>({
  itemCount,
  onActivate,
}: UseListKeyboardNavigationProps<TElement>) => {
  const [highlightedIndex, setHighlightedIndex] =
    useState<number>(NO_HIGHLIGHTED_INDEX);

  /** Row elements, indexed as the rendered list is. */
  const itemElementsRef = useRef<(TElement | null)[]>([]);

  const resetHighlight = useCallback(
    () => setHighlightedIndex(NO_HIGHLIGHTED_INDEX),
    []
  );

  /** Stores a row element so the key handler can reach it later. */
  const setItemElement = useCallback(
    (index: number, element: TElement | null) => {
      itemElementsRef.current[index] = element;
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (itemCount === 0) return;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();

        const step = event.key === 'ArrowDown' ? 1 : -1;

        setHighlightedIndex((currentIndex) => {
          if (currentIndex === NO_HIGHLIGHTED_INDEX) {
            return step === 1 ? 0 : itemCount - 1;
          }

          return (currentIndex + step + itemCount) % itemCount;
        });

        return;
      }

      if (event.key === 'Enter') {
        const highlightedElement = itemElementsRef.current[highlightedIndex];

        if (!highlightedElement) return;

        event.preventDefault();

        if (onActivate) {
          onActivate(highlightedIndex, highlightedElement);
          return;
        }

        clickRowAction(highlightedElement);
      }
    },
    [itemCount, highlightedIndex, onActivate]
  );

  // Keeps the highlighted row inside the scrollable list.
  useEffect(() => {
    if (highlightedIndex === NO_HIGHLIGHTED_INDEX) return;

    itemElementsRef.current[highlightedIndex]?.scrollIntoView({
      block: 'nearest',
    });
  }, [highlightedIndex]);

  return {
    highlightedIndex,
    resetHighlight,
    setItemElement,
    handleKeyDown,
  };
};
