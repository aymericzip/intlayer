/**
 * Collects items and flushes them together, deduplicated, once no new item
 * arrived for `delayMs`. A burst of events (e.g. a package rebuilding its
 * `dist`) is then handled as a single batch.
 */
export const createBatchDebounce = <Item>(
  handler: (items: Item[]) => void,
  delayMs: number
): ((item: Item) => void) => {
  const pendingItems = new Set<Item>();
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (item) => {
    pendingItems.add(item);

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = undefined;
      const items = [...pendingItems];
      pendingItems.clear();
      handler(items);
    }, delayMs);
  };
};
