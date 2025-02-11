import merge, { type Options } from 'deepmerge';

// Custom array merge function that merges objects by 'key'
export const mergeByKey = <T extends { key: string }>(key: keyof T) => {
  return (target: T[], source: T[], options?: Options): T[] => {
    const destination: T[] = [];

    // Create a map for quick lookup
    const sourceMap = new Map<string, T>();
    source.forEach((item) => {
      sourceMap.set(item[key] as string, item);
    });

    target.forEach((targetItem) => {
      const sourceItem = sourceMap.get(targetItem[key] as string);
      if (sourceItem) {
        // Merge the two items and assert the type
        const mergedItem = merge(targetItem, sourceItem, options) as T;
        destination.push(mergedItem);
        // Remove the item from the source map to avoid duplicates
        sourceMap.delete(targetItem[key] as string);
      } else {
        destination.push(targetItem);
      }
    });

    // Add remaining items from source
    sourceMap.forEach((item) => {
      destination.push(item);
    });

    return destination;
  };
};
