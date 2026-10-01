import { cn } from '@intlayer/design-system/utils';
import { type FC, useRef } from 'react';
import { useDocTitles } from '../DocTitlesContext';

export const TOCProgressBar: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    topLevelHeadings,
    headingMap,
    headingTexts,
    activeParent,
    activeChild,
  } = useDocTitles();

  // Flatten the headings tree for sequential display
  const flatHeadings: HTMLElement[] = [];
  topLevelHeadings.forEach((h2) => {
    flatHeadings.push(h2);
    const children = headingMap.get(h2) ?? [];
    flatHeadings.push(...children);
  });

  if (flatHeadings.length === 0) return null;

  // Determine active heading
  const activeHeading = activeChild ?? activeParent;

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
        const { id } = heading;
        const title = headingTexts.get(heading) ?? '';
        const isActive = heading === activeHeading;

        return (
          <button
            key={id}
            type="button"
            className="group flex h-3 w-6 shrink-0 cursor-pointer items-center justify-center transition-all duration-300"
            aria-label={title}
            data-toc-active={isActive ? '' : undefined}
            onClick={() => handleScrollTo(id)}
          >
            <span
              className={cn(
                'h-0.5 w-4.5 rounded-full transition-all duration-300',
                isActive ? 'h-0.75 bg-text' : 'bg-text/50 dark:bg-text/35'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
