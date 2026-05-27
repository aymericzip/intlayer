import { useCallback, useEffect, useMemo, useState } from 'react';

type HeadingChildren = Map<HTMLElement, HTMLElement[]>;

type UseTitlesTreeOptions = {
  /** Array of heading levels to display (e.g., [2, 3, 4] for h2, h3, h4) */
  levels: number[];
  /** Content element ID to observe for headings */
  contentId?: string;
};

type UseTitlesTreeReturn = {
  /** Top-level headings (root headings) */
  topLevelHeadings: HTMLElement[];
  /** Map of headings to their children */
  headingMap: HeadingChildren;
  /** Whether headings are currently being processed */
  isLoading: boolean;
};

/**
 * Custom hook to extract and organize headings from a content element into a tree structure
 * @param options Configuration options for the hook
 * @returns Object containing organized headings and loading state
 */
export const useTitlesTree = ({
  levels,
  contentId = 'content',
}: UseTitlesTreeOptions): UseTitlesTreeReturn => {
  const [topLevelHeadings, setTopLevelHeadings] = useState<HTMLElement[]>([]);
  const [headingMap, setHeadingMap] = useState<HeadingChildren>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  // Stabilize levels across renders even if caller passes a new array instance each time
  const levelsKey = useMemo(
    () =>
      Array.isArray(levels) && levels.length > 0
        ? levels.join(',')
        : '2,3,4,5,6',
    [levels]
  );

  const selectorLevels = useMemo(
    () =>
      (Array.isArray(levels) && levels.length > 0
        ? levels
        : [2, 3, 4, 5, 6]) as number[],
    [levelsKey]
  );

  const updateHeadings = useCallback(() => {
    const content = document.getElementById(contentId);

    if (!content) {
      setTopLevelHeadings([]);
      setHeadingMap(new Map());
      setIsLoading(false);
      return;
    }

    const selector = selectorLevels.map((level) => `h${level}`).join(',');

    const flatHeadings = content.querySelectorAll<HTMLElement>(selector);

    if (!flatHeadings || flatHeadings.length === 0) {
      setTopLevelHeadings([]);
      setHeadingMap(new Map());
      setIsLoading(false);
      return;
    }

    const orderedHeadings = Array.from(flatHeadings);

    const childrenMap = new Map<HTMLElement, HTMLElement[]>();
    const roots: HTMLElement[] = [];
    const stack: { el: HTMLElement; levelIdx: number }[] = [];

    orderedHeadings?.forEach?.((el) => {
      const level = Number(el.tagName.slice(1).toLowerCase());

      const levelIdx = selectorLevels.indexOf(level);
      if (levelIdx === -1) return;

      while (stack.length > 0 && stack[stack.length - 1].levelIdx >= levelIdx) {
        stack.pop();
      }

      if (stack.length === 0) {
        roots.push(el);
      } else {
        const parent = stack[stack.length - 1].el;
        const arr = childrenMap.get(parent) ?? [];
        arr.push(el);
        childrenMap.set(parent, arr);
      }

      if (!childrenMap.has(el)) childrenMap.set(el, []);

      stack.push({ el, levelIdx });
    });

    setTopLevelHeadings(roots);
    setHeadingMap(childrenMap);
    setIsLoading(false);
  }, [contentId, selectorLevels]);

  useEffect(() => {
    setIsLoading(true);

    // Observe content element for async population/changes; fallback to observing body until content exists
    let bodyObserver: MutationObserver | null = null;
    let contentObserver: MutationObserver | null = null;

    const tryObserveContent = () => {
      const contentEl = document.getElementById(contentId);
      if (!contentEl) return false;

      if (contentObserver) contentObserver.disconnect();
      contentObserver = new MutationObserver(() => updateHeadings());
      contentObserver.observe(contentEl, { childList: true, subtree: true });
      // Initial update once content is available
      updateHeadings();
      return true;
    };

    if (!tryObserveContent()) {
      bodyObserver = new MutationObserver(() => {
        if (tryObserveContent()) {
          if (bodyObserver) {
            bodyObserver.disconnect();
            bodyObserver = null;
          }
        }
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      if (contentObserver) contentObserver.disconnect();
      if (bodyObserver) bodyObserver.disconnect();
    };
  }, [updateHeadings, contentId]);

  return {
    topLevelHeadings,
    headingMap,
    isLoading,
  };
};
