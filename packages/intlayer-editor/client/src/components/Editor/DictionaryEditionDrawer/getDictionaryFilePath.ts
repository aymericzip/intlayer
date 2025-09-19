import { getContentNodeByKeyPath, type KeyPath } from '@intlayer/core';
import maskDictionary from '@intlayer/mask-dictionaries-entry';
import unmergedDictionary from '@intlayer/unmerged-dictionaries-entry';

export const getUnmergedDictionary = (
  dictionaryKey: string,
  keyPath: KeyPath[]
) => {
  const maskEntry = maskDictionary?.[dictionaryKey];
  const unmergedEntries = unmergedDictionary?.[dictionaryKey];

  if (!maskEntry || !unmergedEntries) {
    return null;
  }

  const dictionaryLocalId = getContentNodeByKeyPath(maskEntry.content, keyPath);

  if (dictionaryLocalId == null) {
    return null;
  }

  const localIds = unmergedEntries.map((dict) => dict.localId);

  // Fast path: direct string match
  if (typeof dictionaryLocalId === 'string') {
    return (
      unmergedEntries.find((dict) => dict.localId === dictionaryLocalId) || null
    );
  }

  // Fallback for non-string identifiers: stringify and search for the first occurrence
  let objectString: string;
  try {
    objectString = JSON.stringify(dictionaryLocalId);
  } catch {
    return null;
  }

  let bestIndex = Infinity;
  let bestLocalId: unknown | undefined;

  for (const id of localIds) {
    let idString: string | undefined;
    if (typeof id === 'string') {
      idString = id;
    } else {
      try {
        idString = JSON.stringify(id);
      } catch {
        idString = undefined;
      }
    }

    if (!idString) continue;

    const idx = objectString.indexOf(idString);
    if (idx !== -1 && idx < bestIndex) {
      bestIndex = idx;
      bestLocalId = id; // keep the original reference from unmergedEntries
      if (bestIndex === 0) break; // earliest possible, no need to continue
    }
  }

  if (bestLocalId !== undefined && bestIndex !== Infinity) {
    return unmergedEntries.find((dict) => dict.localId === bestLocalId) || null;
  }

  // Final fallback: strict JSON equality if nothing was found by substring
  const equalityMatch = unmergedEntries.find((dict) => {
    try {
      return JSON.stringify(dict.localId) === objectString;
    } catch {
      return false;
    }
  });

  return equalityMatch || null;
};
