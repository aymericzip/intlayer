import type { Dictionary } from '@intlayer/types';

export const applyMask = (full: Dictionary, mask: any): Dictionary => {
  // the mask "true" → we don't filter
  if (mask === true) {
    return full;
  }

  // arrays
  if (Array.isArray(mask) && Array.isArray(full)) {
    return mask.map((m, i) => applyMask(full[i], m)) as any;
  }

  // handle node with nodeType property
  if (full && typeof full === 'object' && 'nodeType' in full) {
    if (mask && typeof mask === 'object') {
      return full; // Keep the full object with nodeType intact
    }
    return full;
  }

  // generic object
  if (mask && typeof mask === 'object' && full && typeof full === 'object') {
    const out: any = {};
    const maskEntries = Object.entries(mask);
    const allChildrenAreArrays = maskEntries.every(([, value]) =>
      Array.isArray(value)
    );

    for (const [k, m] of maskEntries) {
      const fullValue = (full as any)[k];

      // If this child is an array, decide preservation rules.
      // - Preserve when all children at this level are arrays in the mask
      // - Also preserve when the array is an array of translation nodes
      if (Array.isArray(m) && Array.isArray(fullValue)) {
        const isTranslationNode = (val: unknown): boolean =>
          !!val && typeof val === 'object' && 'nodeType' in (val as any);
        const isArrayOfTranslationNodes = fullValue.every((item: any) =>
          isTranslationNode(item)
        );

        if (!allChildrenAreArrays && !isArrayOfTranslationNodes) {
          continue; // skip incidental arrays when mixed with non-arrays
        }
      }

      out[k] = applyMask(fullValue, m);
    }
    return out;
  }

  // unexpected case: we return the original value
  return full;
};
