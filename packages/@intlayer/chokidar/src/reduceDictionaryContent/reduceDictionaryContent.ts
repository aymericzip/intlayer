import { getMaskContent } from '@intlayer/core/plugins';
import type { Dictionary } from '@intlayer/types';
import { applyMask } from './applyMask';

export const reduceDictionaryContent = (
  fullDictionary: Dictionary,
  partialDictionary: Dictionary
) => {
  const mask = getMaskContent(partialDictionary);
  const result = applyMask(fullDictionary, mask);

  return result;
};
