import type { Dictionary } from '@intlayer/types/dictionary';

/**
 * Dictionaries sharing these properties are only ordered by their file order.
 */
export const getTieGroup = (dictionary: Dictionary): string =>
  JSON.stringify([
    dictionary.priority ?? 0,
    dictionary.filled ?? false,
    dictionary.location,
    dictionary.variant,
    dictionary.item,
  ]);
