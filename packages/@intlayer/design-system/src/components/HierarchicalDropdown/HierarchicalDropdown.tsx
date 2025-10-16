'use client';

import { Check, Search as SearchIcon } from 'lucide-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Input } from '../Input';

/**
 * Represents a hierarchical item with optional children
 */
export interface HierarchicalItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label for the item */
  label: string;
  /** Optional nested children */
  children?: HierarchicalItem[];
  /** Any additional data associated with the item */
  data?: any;
}

/**
 * Props for the HierarchicalDropdown component
 */
export interface HierarchicalDropdownProps {
  /** Array of hierarchical items to display */
  items: HierarchicalItem[];
  /** Array of selected item IDs */
  selectedIds: string[];
  /** Callback when selection changes */
  onSelectionChange: (selectedIds: string[]) => void;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether to show the search button */
  showSearchButton?: boolean;
  /** Callback when search button is clicked */
  onSearch?: () => void;
}

/**
 * Recursively gets all child IDs from an item
 */
const getAllChildIds = (item: HierarchicalItem): string[] => {
  const ids: string[] = [];

  if (item.children) {
    item.children.forEach((child) => {
      ids.push(child.id);
      ids.push(...getAllChildIds(child));
    });
  }

  return ids;
};

/**
 * Checks if an item matches the search query
 */
const itemMatchesSearch = (item: HierarchicalItem, query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  const labelMatches = item.label.toLowerCase().includes(lowerQuery);

  if (labelMatches) return true;

  // Check if any children match
  if (item.children) {
    return item.children.some((child) => itemMatchesSearch(child, query));
  }

  return false;
};

/**
 * Filters items based on search query
 */
const filterItems = (
  items: HierarchicalItem[],
  query: string
): HierarchicalItem[] => {
  if (!query.trim()) return items;

  return items
    .map((item) => {
      // If parent matches, include all children
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }

      // If parent doesn't match, check children
      if (item.children) {
        const filteredChildren = filterItems(item.children, query);
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
      }

      return null;
    })
    .filter((item): item is HierarchicalItem => item !== null);
};

/**
 * Component to render a single hierarchical item
 */
interface HierarchicalItemComponentProps {
  item: HierarchicalItem;
  selectedIds: string[];
  onToggle: (itemId: string, isParent: boolean) => void;
  level?: number;
}

const HierarchicalItemComponent: FC<HierarchicalItemComponentProps> = ({
  item,
  selectedIds,
  onToggle,
  level = 0,
}) => {
  const isSelected = selectedIds.includes(item.id);
  const hasChildren = !!(item.children && item.children.length > 0);

  return (
    <div className="flex flex-col">
      {/* Parent Item */}
      <button
        onClick={() => onToggle(item.id, hasChildren)}
        className={cn(
          'flex items-center gap-3 px-4 py-3 text-left transition-colors',
          'rounded-lg hover:bg-neutral-dark/50',
          level === 0 && 'font-medium',
          level > 0 && 'ml-6'
        )}
        type="button"
      >
        {/* Checkmark */}
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border transition-colors',
            isSelected
              ? 'border-primary bg-primary'
              : 'border-neutral-dark bg-neutral-dark/20'
          )}
        >
          {isSelected && <Check className="h-3 w-3 text-white" />}
        </div>

        {/* Label */}
        <span className="flex-1 text-sm">{item.label}</span>
      </button>

      {/* Children Items */}
      {hasChildren && (
        <div className="flex flex-col">
          {item.children!.map((child) => (
            <HierarchicalItemComponent
              key={child.id}
              item={child}
              selectedIds={selectedIds}
              onToggle={onToggle}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * HierarchicalDropdown Component
 *
 * A dropdown component that supports hierarchical/nested items with:
 * - Parent and child item selection
 * - Automatic child selection when parent is selected
 * - Search functionality across all levels
 * - Visual checkmarks for selected items
 * - Dark theme styling
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: 'parent1',
 *     label: 'Landing tag',
 *     children: [
 *       { id: 'child1', label: 'Title dico (key dico)' },
 *       { id: 'child2', label: 'Title dico (key dico)' },
 *     ]
 *   }
 * ];
 *
 * <HierarchicalDropdown
 *   items={items}
 *   selectedIds={selectedIds}
 *   onSelectionChange={setSelectedIds}
 *   searchPlaceholder="Search a tag or a dictionary"
 * />
 * ```
 */
export const HierarchicalDropdown: FC<HierarchicalDropdownProps> = ({
  items,
  selectedIds,
  onSelectionChange,
  searchPlaceholder = 'Search...',
  className,
  showSearchButton = false,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query
  const filteredItems = useMemo(
    () => filterItems(items, searchQuery),
    [items, searchQuery]
  );

  /**
   * Handles toggling an item's selection
   */
  const handleToggle = (itemId: string, isParent: boolean) => {
    const isCurrentlySelected = selectedIds.includes(itemId);

    if (isParent) {
      // Find the parent item
      const findItem = (items: HierarchicalItem[]): HierarchicalItem | null => {
        for (const item of items) {
          if (item.id === itemId) return item;
          if (item.children) {
            const found = findItem(item.children);
            if (found) return found;
          }
        }
        return null;
      };

      const parentItem = findItem(items);

      if (parentItem) {
        const childIds = getAllChildIds(parentItem);

        if (isCurrentlySelected) {
          // Deselect parent and all children
          const newSelectedIds = selectedIds.filter(
            (id) => id !== itemId && !childIds.includes(id)
          );
          onSelectionChange(newSelectedIds);
        } else {
          // Select parent and all children
          const newSelectedIds = [
            ...selectedIds.filter(
              (id) => id !== itemId && !childIds.includes(id)
            ),
            itemId,
            ...childIds,
          ];
          onSelectionChange(newSelectedIds);
        }
      }
    } else {
      // Toggle individual child item
      if (isCurrentlySelected) {
        onSelectionChange(selectedIds.filter((id) => id !== itemId));
      } else {
        onSelectionChange([...selectedIds, itemId]);
      }
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-neutral-dark bg-neutral-dark/10 p-4',
        'w-full max-w-md',
        className
      )}
    >
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-neutral" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-4 pl-10"
          />
        </div>

        {showSearchButton && (
          <Button
            onClick={onSearch}
            variant="default"
            color="primary"
            label="Search"
          >
            Search
          </Button>
        )}
      </div>

      {/* Items List */}
      <div className="flex max-h-[400px] flex-col gap-1 overflow-y-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <HierarchicalItemComponent
              key={item.id}
              item={item}
              selectedIds={selectedIds}
              onToggle={handleToggle}
            />
          ))
        ) : (
          <div className="py-8 text-center text-neutral text-sm">
            No items found
          </div>
        )}
      </div>
    </div>
  );
};
