'use client';

import type { Dictionary } from '@intlayer/core';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  HierarchicalDropdown,
  type HierarchicalItem,
} from './HierarchicalDropdown';

/**
 * Props for the DictionarySelector component
 */
export interface DictionarySelectorProps {
  /** Callback when selection changes, receives selected dictionary keys and tags */
  onSelectionChange?: (selection: {
    dictionaryKeys: string[];
    tags: string[];
  }) => void;
  /** Initial selected dictionary keys */
  initialSelectedKeys?: string[];
  /** Additional CSS classes */
  className?: string;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Whether to show the search button */
  showSearchButton?: boolean;
  /** Callback when search button is clicked */
  onSearch?: () => void;
}

/**
 * Transforms unmerged dictionaries into hierarchical items grouped by tags
 */
const transformDictionariesToHierarchicalItems = (
  dictionaries: Record<string, Dictionary[]>
): HierarchicalItem[] => {
  // Group dictionaries by tags
  const tagGroups: Record<string, Dictionary[]> = {};

  Object.values(dictionaries).forEach((dictionaryArray) => {
    dictionaryArray.forEach((dictionary) => {
      if (dictionary.tags && dictionary.tags.length > 0) {
        dictionary.tags.forEach((tag) => {
          if (!tagGroups[tag]) {
            tagGroups[tag] = [];
          }
          tagGroups[tag].push(dictionary);
        });
      } else {
        // Dictionaries without tags go to "Untagged" group
        if (!tagGroups['untagged']) {
          tagGroups['untagged'] = [];
        }
        tagGroups['untagged'].push(dictionary);
      }
    });
  });

  // Transform to hierarchical items
  return Object.entries(tagGroups).map(([tag, dicts]) => ({
    id: `tag-${tag}`,
    label: `${tag.charAt(0).toUpperCase() + tag.slice(1)} tag`,
    children: dicts.map((dict) => ({
      id: `dict-${dict.key}`,
      label: dict.title || `${dict.key} (key ${dict.key})`,
      data: dict,
    })),
  }));
};

/**
 * DictionarySelector Component
 *
 * A specialized hierarchical dropdown that displays dictionaries grouped by tags.
 * Uses `getUnmergedDictionaries` to fetch and organize dictionaries.
 *
 * Features:
 * - Automatically groups dictionaries by their tags
 * - Supports selecting entire tag groups or individual dictionaries
 * - Search functionality across tags and dictionary names
 * - Returns both selected dictionary keys and tags
 *
 * @example
 * ```tsx
 * <DictionarySelector
 *   onSelectionChange={({ dictionaryKeys, tags }) => {
 *     console.log('Selected dictionaries:', dictionaryKeys);
 *     console.log('Selected tags:', tags);
 *   }}
 *   searchPlaceholder="Search a tag or a dictionary"
 *   showSearchButton={true}
 * />
 * ```
 */
export const DictionarySelector: FC<DictionarySelectorProps> = ({
  onSelectionChange,
  initialSelectedKeys = [],
  className,
  searchPlaceholder = 'Search a tag or a dictionary',
  showSearchButton = false,
  onSearch,
}) => {
  const [items, setItems] = useState<HierarchicalItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Load dictionaries on mount
  useEffect(() => {
    try {
      const dictionaries = getUnmergedDictionaries();
      const hierarchicalItems =
        transformDictionariesToHierarchicalItems(dictionaries);
      setItems(hierarchicalItems);

      // Set initial selection
      if (initialSelectedKeys.length > 0) {
        const initialIds = initialSelectedKeys.map((key) => `dict-${key}`);
        setSelectedIds(initialIds);
      }
    } catch (error) {
      console.error('Error loading dictionaries:', error);
      setItems([]);
    }
  }, [initialSelectedKeys]);

  // Extract selected dictionary keys and tags from selected IDs
  const selection = useMemo(() => {
    const dictionaryKeys: string[] = [];
    const tags: string[] = [];

    selectedIds.forEach((id) => {
      if (id.startsWith('tag-')) {
        // Extract tag name
        const tag = id.replace('tag-', '');
        tags.push(tag);
      } else if (id.startsWith('dict-')) {
        // Extract dictionary key
        const key = id.replace('dict-', '');
        dictionaryKeys.push(key);
      }
    });

    return { dictionaryKeys, tags };
  }, [selectedIds]);

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selection);
    }
  }, [selection, onSelectionChange]);

  return (
    <HierarchicalDropdown
      items={items}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      searchPlaceholder={searchPlaceholder}
      className={className}
      showSearchButton={showSearchButton}
      onSearch={onSearch}
    />
  );
};
