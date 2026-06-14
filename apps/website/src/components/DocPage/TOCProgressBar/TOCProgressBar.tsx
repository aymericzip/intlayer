'use client';

import { useGetElementById } from '@intlayer/design-system/hooks';
import { type FC, useRef } from 'react';
import { useActiveSection } from '../useActiveSection';
import { useTitlesTree } from '../useTitlesTree';

export const TOCProgressBar: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract headings (h2 and h3) from the document
  const { topLevelHeadings, headingMap } = useTitlesTree({
    levels: [2, 3],
    contentId: 'content',
  });

  const contentElement = useGetElementById('content');

  // Track the active h2 and h3 headings
  const { activeParent, activeChild } = useActiveSection({
    contentElement,
    headings: topLevelHeadings,
    headingMap,
    navRef: containerRef,
  });

  // Flatten the headings tree for sequential display
  const flatHeadings: HTMLElement[] = [];
  topLevelHeadings.forEach((h2) => {
    flatHeadings.push(h2);
    const children = headingMap.get(h2) ?? [];
    flatHeadings.push(...children);
  });

  if (flatHeadings.length === 0) return null;

  // Determine active heading ID
  const activeId = activeChild?.id ?? activeParent?.id ?? null;

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="no-scrollbar sticky top-16 mt-24 flex max-h-[50lvh] w-9 flex-col items-center gap-0.5 self-start overflow-y-auto py-1"
      style={{ maxHeight: '308px' }}
    >
      {flatHeadings.map((heading) => {
        const { id, innerText } = heading;
        const isActive = id === activeId;

        return (
          <button
            key={id}
            type="button"
            className="group flex h-3 w-6 shrink-0 cursor-pointer items-center justify-center transition-all duration-300"
            aria-label={innerText}
            data-toc-active={isActive ? '' : undefined}
            onClick={() => handleScrollTo(id)}
          >
            <span
              className={`h-0.5 w-4.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-text'
                  : 'bg-neutral/40 group-hover:bg-neutral/80 dark:bg-neutral-600 dark:group-hover:bg-neutral-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
