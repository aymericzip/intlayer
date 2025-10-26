'use client';

import { Link } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useTitlesTree } from '../DocPage/useTitlesTree';

type TableOfContentsProps = {
  /** Array of heading levels to display (e.g., [2, 3, 4] for h2, h3, h4) */
  levels: number[];
  /** Maximum depth of nested headings to show */
  maxDepth?: number;
  /** Custom class name for styling */
  className?: string;
  /** Content element ID to observe for headings */
  contentId?: string;
};

type HeadingChildren = Map<HTMLElement, HTMLElement[]>;

type NavTitlesChildrenProps = {
  headings: HTMLElement[];
  childrenMap: HeadingChildren;
  depth: number;
  maxDepth: number;
};

const NavTitlesChildren: FC<NavTitlesChildrenProps> = ({
  headings,
  childrenMap,
  depth,
  maxDepth,
}) => {
  const { linkLabel } = useIntlayer('nav-titles');

  if (depth >= maxDepth) return null;

  return (
    <ul
      className={cn(
        'my-2 flex flex-1 flex-col gap-2',
        depth === 1 && 'ml-6',
        depth === 2 && 'ml-8',
        depth === 3 && 'ml-12',
        depth === 4 && 'ml-16',
        depth === 5 && 'ml-20',
        depth === 6 && 'ml-24'
      )}
    >
      {headings.map((heading) => {
        const { id } = heading;
        const subChildren = childrenMap.get(heading);
        const hasChildren = subChildren && subChildren.length > 0;

        return (
          <li key={id} className={cn('list-none')}>
            <Link
              href={`#${id}`}
              label={`${linkLabel.value}: ${heading.innerText}`}
              color="text"
              variant="hoverable"
              className={cn(
                'flex flex-1 items-center justify-between text-wrap p-2 pr-4 text-base transition-colors',
                depth === 1 && 'text-neutral/75 text-sm',
                depth === 2 && 'text-neutral/60 text-sm',
                depth === 3 && 'text-neutral/50 text-sm',
                depth === 4 && 'text-neutral/40 text-xs',
                depth === 5 && 'text-neutral/30 text-xs',
                depth === 6 && 'text-neutral/20 text-xs'
              )}
            >
              {heading.innerText}
            </Link>
            {hasChildren && (
              <NavTitlesChildren
                headings={subChildren}
                childrenMap={childrenMap}
                depth={depth + 1}
                maxDepth={maxDepth}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export const TableOfContents: FC<TableOfContentsProps> = ({
  levels,
  maxDepth = 2,
  className,
  contentId = 'content',
}) => {
  const { linkLabel } = useIntlayer('nav-titles');
  const { topLevelHeadings, headingMap, isLoading } = useTitlesTree({
    levels,
    contentId,
  });

  if (isLoading || topLevelHeadings.length === 0) {
    return null;
  }

  return (
    <nav className={className}>
      <ul className="flex flex-1 flex-col gap-3 pt-8 text-sm">
        {topLevelHeadings.map((heading) => {
          const { id } = heading;
          const children = headingMap.get(heading);
          const hasChildren = children && children.length > 0;

          return (
            <li key={id} className="list-none">
              <Link
                href={`#${id}`}
                label={`${linkLabel.value}: ${heading.innerText}`}
                color="text"
                isPageSection
                variant="hoverable"
                className="flex w-full items-center justify-between text-wrap p-2 pr-4 text-base text-neutral transition-colors"
              >
                {heading.innerText}
              </Link>
              {hasChildren && (
                <div className="border-neutral/20 border-l">
                  <NavTitlesChildren
                    headings={children}
                    childrenMap={headingMap}
                    depth={1}
                    maxDepth={maxDepth}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
