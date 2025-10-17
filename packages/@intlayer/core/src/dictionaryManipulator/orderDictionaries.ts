import intlayerConfig from '@intlayer/config/built';
import type { Dictionary } from '../types/dictionary';

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
  const withIndex = dictionaries.map((dict, index) => ({ dict, index }));

  const getPriority = (d: Dictionary): number => {
    const p = d.priority ?? 0;

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
    const aAuto = a.dict.autoFilled ? 1 : 0;
    const bAuto = b.dict.autoFilled ? 1 : 0;
    if (aAuto !== bAuto) return aAuto - bAuto; // 0 before 1

    // 2) Higher priority first (larger number wins)
    const aP = getPriority(a.dict);
    const bP = getPriority(b.dict);
    if (aP !== bP) return bP - aP; // descending

    // 3) Location according to strategy
    const aLoc = getLocationWeight(a.dict);
    const bLoc = getLocationWeight(b.dict);
    if (aLoc !== bLoc) return aLoc - bLoc;

    // 4) Stable fallback by original index
    return a.index - b.index;
  });

  return withIndex.map(({ dict }) => dict);
};
