import type { ReactNode } from 'react';
import { useScrollPositionPersistence } from '~/hooks/useScrollPositionPersistence';
import {
  type FrameworkFilterableNode,
  filterSectionByFramework,
} from './FrameworkFilter/filterSectionByFramework';
import { type NavItemData, NavSectionItem } from './NavSectionItem';

export type NavListContentProps<
  T extends FrameworkFilterableNode<T> = NavItemData,
> = {
  data: Record<string, T>;
  activeSlugs: string[];
  selectedFramework: string[] | null;
  scrollPersistenceKey: string;
  ariaLabel?: string;
  parentPath?: string;
  overviewText?: string;
  footer?: ReactNode;
};

export const NavListContent = <
  T extends FrameworkFilterableNode<T> = NavItemData,
>({
  data,
  activeSlugs,
  selectedFramework,
  scrollPersistenceKey,
  ariaLabel,
  parentPath,
  overviewText,
  footer,
}: NavListContentProps<T>) => {
  const navRef =
    useScrollPositionPersistence<HTMLElement>(scrollPersistenceKey);

  const filteredData = filterSectionByFramework(data, selectedFramework);

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className="m-auto flex max-h-[calc(100vh-8.2rem)] min-w-40 max-w-xl flex-col gap-y-4 overflow-auto px-2 pt-6 pb-20"
    >
      {Object.entries(filteredData).map(([key, sectionData]) => (
        <div key={key} className="w-full">
          <NavSectionItem
            sectionKey={key}
            sectionData={sectionData as unknown as NavItemData}
            activeSlugs={activeSlugs}
            level={1}
            parentPath={parentPath}
            overviewText={overviewText}
          />
        </div>
      ))}

      {footer && (
        <div className="mt-3 flex flex-col gap-y-2 border-border/60 border-t pt-2">
          {footer}
        </div>
      )}
    </nav>
  );
};
