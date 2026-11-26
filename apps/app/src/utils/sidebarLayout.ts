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
  placement: DropPlacement | 'inside';
};

/** Each list contains the preferred order of one parent's children. */
export type SidebarOrders = Record<string, string[]>;
export const SIDEBAR_ROOT = '';

export type SidebarMoveResult = {
  draggedKey: string;
  parentKey: string;
  order: string[];
  pin: PinnedEntryReference | null;
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

/** Inserts missing keys next to their default predecessors. */
const mergeSidebarOrder = (
  preferred: string[],
  available: string[]
): string[] => {
  const order = preferred.filter((key) => available.includes(key));
  available.forEach((key, index) => {
    if (!order.includes(key))
      order.splice(order.indexOf(available[index - 1]) + 1, 0, key);
  });
  return order;
};

/** Applies saved sibling orders to the currently available navigation tree. */
export const arrangeSidebarItems = (
  items: SidebarNavigationItem[],
  orders: SidebarOrders,
  pinnedItemKeys: ReadonlySet<string>
): SidebarNavigationItem[] => {
  if (!Object.keys(orders).length) return items;

  const itemsByKey = new Map<string, SidebarNavigationItem>();
  const parents = new Map<string, string>();
  const collect = (nodes: SidebarNavigationItem[], parentKey: string) => {
    for (const node of nodes) {
      itemsByKey.set(node.key, node);
      parents.set(node.key, parentKey);
      if (node.items) collect(node.items, node.key);
    }
  };
  collect(items, SIDEBAR_ROOT);

  for (const [parentKey, keys] of Object.entries(orders)) {
    if (parentKey !== SIDEBAR_ROOT && !itemsByKey.has(parentKey)) continue;
    for (const key of keys) {
      if (
        parents.has(key) &&
        (!parsePinnedItemKey(key) || pinnedItemKeys.has(key))
      ) {
        parents.set(key, parentKey);
      }
    }
  }

  const childrenByParent = new Map<string, string[]>();
  for (const [key, parent] of parents) {
    // A disappearing or unpinned ancestor can invalidate a previously valid move.
    const ancestors = new Set([key]);
    let ancestor = parent;
    while (ancestor && !ancestors.has(ancestor)) {
      ancestors.add(ancestor);
      ancestor = parents.get(ancestor) ?? SIDEBAR_ROOT;
    }
    if (ancestor) parents.set(key, SIDEBAR_ROOT);
    const parentKey = parents.get(key)!;
    const siblings = childrenByParent.get(parentKey) ?? [];
    siblings.push(key);
    childrenByParent.set(parentKey, siblings);
  }

  const build = (parentKey: string): SidebarNavigationItem[] =>
    mergeSidebarOrder(
      orders[parentKey] ?? [],
      childrenByParent.get(parentKey) ?? []
    ).map((key) => {
      const item = itemsByKey.get(key)!;
      const children = build(key);
      return {
        ...item,
        items: children.length || item.items ? children : undefined,
      };
    });

  return build(SIDEBAR_ROOT);
};

/** Finds an item's siblings, including when the item belongs to a nested section. */
const findSidebarRow = (
  items: SidebarNavigationItem[],
  key: string,
  parentKey = SIDEBAR_ROOT
):
  | {
      item: SidebarNavigationItem;
      siblings: SidebarNavigationItem[];
      parentKey: string;
    }
  | undefined => {
  for (const item of items) {
    if (item.key === key) return { item, siblings: items, parentKey };
    if (item.items) {
      const found = findSidebarRow(item.items, key, item.key);
      if (found) return found;
    }
  }
};

/** Moves the whole subtree beside the target, rejecting drops into its descendants. */
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
  const source = findSidebarRow(arrangedItems, draggedKey);
  const target = findSidebarRow(arrangedItems, targetKey);
  if (
    !source ||
    !target ||
    draggedKey === targetKey ||
    findSidebarRow(source.item.items ?? [], targetKey)
  )
    return null;

  const inside = placement === 'inside';
  if (inside && !target.item.items) return null;
  const order = inside
    ? [
        draggedKey,
        ...(target.item.items ?? [])
          .map((item) => item.key)
          .filter((key) => key !== draggedKey),
      ]
    : moveKey(
        target.siblings.map((item) => item.key),
        draggedKey,
        targetKey,
        placement
      );
  return {
    draggedKey,
    parentKey: inside ? targetKey : target.parentKey,
    order,
    pin: pinnedItemKeys.has(draggedKey) ? null : parsePinnedItemKey(draggedKey),
  };
};

/** Records a move while keeping unrelated sections and temporarily hidden entries. */
export const updateSidebarOrders = (
  orders: SidebarOrders,
  move: SidebarMoveResult
): SidebarOrders => {
  const next = Object.fromEntries(
    Object.entries(orders).map(([parent, keys]) => [
      parent,
      keys.filter((key) => key !== move.draggedKey),
    ])
  );
  const previous = next[move.parentKey] ?? [];
  next[move.parentKey] = mergeSidebarOrder(move.order, [
    ...new Set([...previous, ...move.order]),
  ]);
  return next;
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
