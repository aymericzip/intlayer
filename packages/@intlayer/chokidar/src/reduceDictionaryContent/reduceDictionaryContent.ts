import type { Dictionary } from '@intlayer/core';
import { applyMask } from './applyMask';
import { buildMask } from './buildMask';

export const reduceDictionaryContent = (
  fullDictionary: Dictionary,
  partialDictionary: Dictionary
) => {
  const mask = buildMask(partialDictionary);
  const result = applyMask(fullDictionary, mask);

  return result;
};
