import intlayerConfig from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types';

/**
 * Orders dictionaries based on the dictionary priority strategy.
 *
 * @param dictionaries - Array of dictionaries to order
 * @param priorityStrategy - The priority strategy ('local_first' or 'distant_first')
 * @returns Ordered array of dictionaries
 */
export const orderDictionaries = (
  dictionaries: Dictionary[],
  configuration = intlayerConfig
): Dictionary[] => {
  const { editor } = configuration;
  const { dictionaryPriorityStrategy } = editor;

  if (dictionaries.length <= 1) {
    return dictionaries;
  }

  // Stabilize original indices to preserve relative order for complete ties
  const withIndex = dictionaries.map((dictionary, index) => ({
    dictionary,
    index,
  }));

  const getPriority = (dictionary: Dictionary): number => {
    const p = dictionary.priority ?? 0;

    return Number.isFinite(p) ? p : 0;
  };

  const getLocationWeight = (d: Dictionary): number => {
    const location = d.location;

    // undefined location should always be last
    if (location === undefined) {
      return 2;
    }

    if (dictionaryPriorityStrategy === 'distant_first') {
      // distant should come first
      return location === 'remote' ? 0 : 1;
    }
    // default: local_first
    return location === 'local' ? 0 : 1;
  };

  withIndex.sort((a, b) => {
    // 1) Non-autoFilled before autoFilled (autoFilled have lower precedence)
    const aAuto = a.dictionary.filled ? 1 : 0;
    const bAuto = b.dictionary.filled ? 1 : 0;
    if (aAuto !== bAuto) return aAuto - bAuto; // 0 before 1

    // 2) Higher priority first (larger number wins)
    const aP = getPriority(a.dictionary);
    const bP = getPriority(b.dictionary);
    if (aP !== bP) return bP - aP; // descending

    // 3) Location according to strategy
    const aLocation = getLocationWeight(a.dictionary);
    const bLocation = getLocationWeight(b.dictionary);
    if (aLocation !== bLocation) return aLocation - bLocation;

    // 4) Stable fallback by original index
    return a.index - b.index;
  });

  return withIndex.map(({ dictionary }) => dictionary);
};
