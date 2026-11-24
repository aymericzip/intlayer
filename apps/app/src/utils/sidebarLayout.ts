import type { SidebarNavigationItem } from '#components/Dashboard/DashboardSidebar/DashboardSidebar';

/** Side of the target row the dragged item is dropped on. */
export type DropPlacement = 'before' | 'after';

/** Kinds of sidebar entries the user can pin. */
export type PinnedEntryKind = 'dictionary' | 'tag' | 'editor-page';

export type PinnedEntryReference = {
  kind: PinnedEntryKind;
  entry: string;
};

export type SidebarMove = {
  draggedKey: string;
  targetKey: string;
  placement: DropPlacement;
};

/** Outcome of a drop, to apply to the persisted sidebar state. */
export type SidebarMoveResult = {
  /** New persisted top-level order, when it changed. */
  rootOrder?: string[];
  /** Reordering of the pinned entries of one kind, when it changed. */
  pinnedMove?: PinnedEntryReference & {
    targetEntry: string;
    placement: DropPlacement;
  };
};

const PINNED_ENTRY_PREFIXES: [PinnedEntryKind, string][] = [
  ['editor-page', 'editor-page-'],
  ['dictionary', 'dictionary-'],
  ['tag', 'tag-'],
];

/** Builds the sidebar item key of a pinnable entry. */
export const getPinnedItemKey = (kind: PinnedEntryKind, entry: string) =>
  `${PINNED_ENTRY_PREFIXES.find(([prefixKind]) => prefixKind === kind)?.[1]}${entry}`;

/** Parses a sidebar item key into the pinnable entry it stands for, if any. */
export const parsePinnedItemKey = (
  itemKey: string
): PinnedEntryReference | null => {
  for (const [kind, prefix] of PINNED_ENTRY_PREFIXES) {
    if (itemKey.startsWith(prefix)) {
      return { kind, entry: itemKey.slice(prefix.length) };
    }
  }

  return null;
};

/**
 * Moves `draggedKey` next to `targetKey`. Returns the list unchanged when
 * either key is missing or both are the same.
 */
export const moveKey = (
  keys: string[],
  draggedKey: string,
  targetKey: string,
  placement: DropPlacement
): string[] => {
  if (draggedKey === targetKey || !keys.includes(targetKey)) return keys;

  const remainingKeys = keys.filter((key) => key !== draggedKey);
  const targetIndex = remainingKeys.indexOf(targetKey);

  return [
    ...remainingKeys.slice(0, targetIndex + (placement === 'after' ? 1 : 0)),
    draggedKey,
    ...remainingKeys.slice(targetIndex + (placement === 'after' ? 1 : 0)),
  ];
};

type DetachResult = {
  items: SidebarNavigationItem[];
  detached: SidebarNavigationItem[];
};

/** Removes the items whose key is in `keys` from a tree, at any depth. */
const detachItems = (
  items: SidebarNavigationItem[],
  keys: Set<string>
): DetachResult => {
  const detached: SidebarNavigationItem[] = [];

  const walk = (nodes: SidebarNavigationItem[]): SidebarNavigationItem[] =>
    nodes
      .filter((node) => {
        if (!keys.has(node.key)) return true;
        detached.push(node);
        return false;
      })
      .map((node) => {
        if (!node.items) return node;
        const childItems = walk(node.items);
        return {
          ...node,
          items: childItems.length > 0 ? childItems : undefined,
        };
      });

  return { items: walk(items), detached };
};

/**
 * Applies the persisted top-level order to the navigation tree.
 *
 * Pinned entries listed in `rootOrder` leave their section and become
 * top-level items. Top-level items missing from `rootOrder` stay right after
 * their default predecessor.
 */
export const arrangeSidebarItems = (
  items: SidebarNavigationItem[],
  rootOrder: string[],
  pinnedItemKeys: ReadonlySet<string>
): SidebarNavigationItem[] => {
  if (rootOrder.length === 0) return items;

  const rootKeys = new Set(items.map((item) => item.key));
  const promotedKeys = new Set(
    rootOrder.filter((key) => pinnedItemKeys.has(key) && !rootKeys.has(key))
  );
  const { items: remainingItems, detached } = detachItems(items, promotedKeys);
  const itemsByKey = new Map(
    [...remainingItems, ...detached].map((item) => [item.key, item])
  );

  const arranged = rootOrder
    .map((key) => itemsByKey.get(key))
    .filter((item): item is SidebarNavigationItem => item !== undefined);
  const arrangedKeys = new Set(arranged.map((item) => item.key));

  remainingItems.forEach((item, index) => {
    if (arrangedKeys.has(item.key)) return;

    const previousKey = remainingItems[index - 1]?.key;
    const previousIndex = arranged.findIndex(
      (arrangedItem) => arrangedItem.key === previousKey
    );
    arranged.splice(previousIndex + 1, 0, item);
    arrangedKeys.add(item.key);
  });

  return arranged;
};

/** Whether `draggedKey` can be picked up: a top-level item or a pinned entry. */
export const isDraggableItem = (
  item: Pick<SidebarNavigationItem, 'key'> & { level: number },
  pinnedItemKeys: ReadonlySet<string>
): boolean => item.level === 0 || pinnedItemKeys.has(item.key);

/**
 * Resolves a drop into the persisted changes it implies.
 *
 * - Onto a top-level row: the dragged item takes that position at the top
 *   level (a pinned entry leaves its section).
 * - Onto a row of a section: only a pinned entry of the same kind can land
 *   there; it is reordered and returns to its section.
 *
 * @returns `null` when the drop is not allowed.
 */
export const resolveSidebarMove = ({
  arrangedItems,
  pinnedItemKeys,
  draggedKey,
  targetKey,
  placement,
}: SidebarMove & {
  arrangedItems: SidebarNavigationItem[];
  pinnedItemKeys: ReadonlySet<string>;
}): SidebarMoveResult | null => {
  if (draggedKey === targetKey) return null;

  const rootKeys = arrangedItems.map((item) => item.key);
  const isDraggedRoot = rootKeys.includes(draggedKey);
  const isTargetRoot = rootKeys.includes(targetKey);

  if (!isDraggedRoot && !pinnedItemKeys.has(draggedKey)) return null;

  if (isTargetRoot) {
    return {
      rootOrder: moveKey(
        isDraggedRoot ? rootKeys : [...rootKeys, draggedKey],
        draggedKey,
        targetKey,
        placement
      ),
    };
  }

  const draggedEntry = parsePinnedItemKey(draggedKey);
  const targetEntry = parsePinnedItemKey(targetKey);

  if (!draggedEntry || !targetEntry || draggedEntry.kind !== targetEntry.kind) {
    return null;
  }

  return {
    ...(isDraggedRoot && {
      rootOrder: rootKeys.filter((key) => key !== draggedKey),
    }),
    pinnedMove: {
      ...draggedEntry,
      targetEntry: targetEntry.entry,
      placement,
    },
  };
};

/** Custom sidebar titles of pinned entries, by item key. */
export type SidebarItemLabels = Record<string, string>;

/**
 * Replaces the title of the pinned entries the user renamed. Entries that are
 * no longer pinned keep their original title.
 */
export const applyItemLabels = (
  items: SidebarNavigationItem[],
  labels: SidebarItemLabels,
  pinnedItemKeys: ReadonlySet<string>
): SidebarNavigationItem[] =>
  items.map((item) => {
    const customLabel = pinnedItemKeys.has(item.key)
      ? labels[item.key]
      : undefined;

    return {
      ...item,
      ...(customLabel && { label: customLabel, title: customLabel }),
      items: item.items
        ? applyItemLabels(item.items, labels, pinnedItemKeys)
        : undefined,
    };
  });
