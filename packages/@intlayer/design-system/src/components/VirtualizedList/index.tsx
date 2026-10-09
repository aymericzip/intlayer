'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@utils/cn';
import { type Key, type ReactNode, useRef } from 'react';

/** Rows rendered beyond each edge of the viewport, for a smooth scroll. */
const DEFAULT_OVERSCAN = 6;

export type VirtualizedListProps<Item> = {
  /** Items to list. */
  items: readonly Item[];
  /** Fixed height of one row, in pixels. Rows must not grow past it. */
  itemHeight: number;
  /** Stable key of an item. */
  getItemKey: (item: Item, index: number) => Key;
  /** Renders one row. Memoize the returned component to keep scroll cheap. */
  renderItem: (item: Item, index: number) => ReactNode;
  /** Rows rendered beyond each edge of the viewport. */
  overscan?: number;
  /** Classes of the scroll container, which must have a bounded height. */
  className?: string;
};

/**
 * Scrollable list mounting only the rows in view, so long lists (e.g.
 * hundreds of unsaved changes) stay cheap to render and to scroll.
 *
 * @example
 * ```tsx
 * <VirtualizedList
 *   items={entries}
 *   itemHeight={48}
 *   getItemKey={(entry) => entry.id}
 *   renderItem={(entry) => <EntryRow entry={entry} />}
 *   className="max-h-96"
 * />
 * ```
 */
export const VirtualizedList = <Item,>({
  items,
  itemHeight,
  getItemKey,
  renderItem,
  overscan = DEFAULT_OVERSCAN,
  className,
}: VirtualizedListProps<Item>) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => itemHeight,
    getItemKey: (index) => {
      const item = items[index];

      return item === undefined ? index : getItemKey(item, index);
    },
    overscan,
  });

  return (
    <div
      ref={scrollElementRef}
      className={cn('min-h-0 overflow-y-auto', className)}
    >
      <ul
        className="relative w-full"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];

          if (item === undefined) return null;

          return (
            <li
              key={virtualItem.key}
              className="absolute inset-x-0 top-0"
              style={{
                height: itemHeight,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
