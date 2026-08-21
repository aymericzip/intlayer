import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type HeadingChildren = Map<HTMLElement, HTMLElement[]>;
type HeadingTexts = Map<HTMLElement, string>;

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
  /**
   * Rendered text of each heading, read once when the tree is built.
   *
   * `innerText` is layout-dependent, so reading it forces the browser to lay
   * the page out again. The navigations built from this tree re-render on
   * every scroll, and reading it from their render made every heading cost a
   * reflow.
   */
  headingTexts: HeadingTexts;
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
  const [headingTexts, setHeadingTexts] = useState<HeadingTexts>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Headings of the last published tree, in document order.
   *
   * The MutationObserver below watches the whole content subtree, so it also
   * fires for changes that leave the headings untouched — a tab indicator
   * moving, a code block expanding. Publishing a new array and a new Map for
   * those would restart every effect keyed on the tree, and each restart
   * re-measures the page.
   */
  const publishedHeadingsRef = useRef<HTMLElement[]>([]);
  const publishedTextsRef = useRef<HeadingTexts>(new Map());

  const publishTree = useCallback(
    (
      roots: HTMLElement[],
      childrenMap: HeadingChildren,
      texts: HeadingTexts,
      orderedHeadings: HTMLElement[]
    ) => {
      const previousHeadings = publishedHeadingsRef.current;
      const previousTexts = publishedTextsRef.current;
      const isUnchanged =
        previousHeadings.length === orderedHeadings.length &&
        previousHeadings.every(
          (heading, index) =>
            heading === orderedHeadings[index] &&
            previousTexts.get(heading) === texts.get(heading)
        );

      setIsLoading(false);

      if (isUnchanged) return;

      publishedHeadingsRef.current = orderedHeadings;
      publishedTextsRef.current = texts;
      setTopLevelHeadings(roots);
      setHeadingMap(childrenMap);
      setHeadingTexts(texts);
    },
    []
  );

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
      publishTree([], new Map(), new Map(), []);
      return;
    }

    const selector = selectorLevels.map((level) => `h${level}`).join(',');

    const flatHeadings = content.querySelectorAll<HTMLElement>(selector);

    if (!flatHeadings || flatHeadings.length === 0) {
      publishTree([], new Map(), new Map(), []);
      return;
    }

    const orderedHeadings = Array.from(flatHeadings).filter((el) => el.id);

    const childrenMap: HeadingChildren = new Map();
    const texts: HeadingTexts = new Map();
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

      // `textContent` rather than `innerText`: same string for these headings,
      // whose `#` anchor is a CSS pseudo-element, but without the reflow.
      texts.set(el, el.textContent?.trim() ?? '');

      stack.push({ el, levelIdx });
    });

    publishTree(roots, childrenMap, texts, orderedHeadings);
  }, [contentId, selectorLevels, publishTree]);

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
    headingTexts,
    isLoading,
  };
};
