import type { ValidDotPathsFor } from '../transpiler';
import { getIntlayer } from './getIntlayer';
import type { DictionaryKeys } from '../types';

/**
 * Allow to extract the content of another dictionary.
 *
 * Usage:
 * ```ts
 * const content = getNesting("dictionaryKey", "path.to.content");
 * // 'Example content'
 * ```
 */
export const getNesting = <K extends DictionaryKeys>(
  dictionaryKey: K,
  path?: ValidDotPathsFor<K>
) => {
  const dictionary = getIntlayer(dictionaryKey);

  if (typeof path === 'string') {
    const pathArray = path.split('.');
    let current: any = dictionary;

    for (const key of pathArray) {
      // Safely traverse down the object using the path
      current = current?.[key];
      // If we cannot find the path, return the whole dictionary as a fallback
      if (current === undefined) {
        return dictionary;
      }
    }

    return current;
  }

  // Default or error handling if path is not a string or otherwise undefined
  return dictionary;
};
