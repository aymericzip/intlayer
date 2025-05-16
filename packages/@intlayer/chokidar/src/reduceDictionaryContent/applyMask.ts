import type { Dictionary } from '@intlayer/core';

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
    for (const [k, m] of Object.entries(mask)) {
      out[k] = applyMask((full as any)[k], m);
    }
    return out;
  }

  // unexpected case: we return the original value
  return full;
};
