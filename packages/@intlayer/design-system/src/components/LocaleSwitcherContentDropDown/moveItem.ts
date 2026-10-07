/**
 * Returns a copy of `items` where `item` takes the index of `targetItem`.
 * Unknown items leave the list unchanged.
 */
export const moveItem = <Item>(
  items: readonly Item[],
  item: Item,
  targetItem: Item
): Item[] => {
  const fromIndex = items.indexOf(item);
  const toIndex = items.indexOf(targetItem);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return [...items];
  }

  const reorderedItems = [...items];
  reorderedItems.splice(fromIndex, 1);
  reorderedItems.splice(toIndex, 0, item);

  return reorderedItems;
};
