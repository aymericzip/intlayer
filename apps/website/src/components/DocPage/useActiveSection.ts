import { useGetElementOrWindow } from '@intlayer/design-system/hooks';
import { type RefObject, useEffect, useState } from 'react';

type UseActiveSectionOptions = {
  contentElement: HTMLElement | null;
  /** All headings to track */
  headings: HTMLElement[];
  /** Map of parent headings to their children */
  headingMap: Map<HTMLElement, HTMLElement[]>;
  /** Optional ref to navigation element for click tracking */
  navRef?: RefObject<HTMLElement | null>;
  /** Offset from top of viewport to consider a heading active (default: 1/3 of viewport height) */
  scrollOffset?: number;
};

type UseActiveSectionReturn = {
  /** Currently active parent heading */
  activeParent: HTMLElement | null;
  /** Currently active child heading */
  activeChild: HTMLElement | null;
};

/**
 * Custom hook to detect and track the currently active section based on scroll position
 * @param options Configuration options for the hook
 * @returns Object containing active parent and child headings
 */
export const useActiveSection = ({
  contentElement,
  headings,
  headingMap,
  navRef,
  scrollOffset,
}: UseActiveSectionOptions): UseActiveSectionReturn => {
  const containerElement = useGetElementOrWindow(contentElement ?? undefined);
  const [activeParent, setActiveParent] = useState<HTMLElement | null>(null);
  const [activeChild, setActiveChild] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const getActiveSection = () => {
      const offset =
        scrollOffset ??
        (containerElement as unknown as Window)?.innerHeight / 3;
      const scrollY = (containerElement as unknown as Window)?.scrollY + offset;

      // Find the last heading that is above the scroll position
      const newActiveParent = headings.findLast(
        (heading) => heading.offsetTop < scrollY
      );

      if (newActiveParent) {
        if (newActiveParent.id !== activeParent?.id) {
          setActiveParent(newActiveParent);
        }

        // Find active child within the active parent's children
        const children = headingMap.get(newActiveParent) ?? [];
        const activeChildHeading = children.findLast(
          (child) => child.offsetTop < scrollY
        );

        setActiveChild(activeChildHeading ?? null);
      } else {
        setActiveParent(null);
        setActiveChild(null);
      }
    };

    // Initial detection
    getActiveSection();

    const navigationElement = navRef?.current;

    // Event listeners for various triggers
    navigationElement?.addEventListener('click', getActiveSection);
    containerElement?.addEventListener('scroll', getActiveSection, {
      passive: true,
    });
    containerElement?.addEventListener('resize', getActiveSection, {
      passive: true,
    });
    containerElement?.addEventListener('orientationchange', getActiveSection);

    return () => {
      navigationElement?.removeEventListener('click', getActiveSection);
      containerElement?.removeEventListener('scroll', getActiveSection);
      containerElement?.removeEventListener('resize', getActiveSection);
      containerElement?.removeEventListener(
        'orientationchange',
        getActiveSection
      );
    };
  }, [headings, headingMap, activeParent, navRef, scrollOffset]);

  return {
    activeParent,
    activeChild,
  };
};
