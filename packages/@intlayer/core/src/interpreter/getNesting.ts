import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  GetSubPath,
} from '@intlayer/types';
import type { ValidDotPathsFor } from '../transpiler';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  NodeProps,
} from './getContent';
import { getIntlayer } from './getIntlayer';

export type GetNestingResult<
  K extends DictionaryKeys,
  P = undefined,
  S = IInterpreterPluginState,
> = GetSubPath<DeepTransformContent<DictionaryRegistryContent<K>, S>, P>;

/**
 * Extracts content from another dictionary by its key and an optional path.
 *
 * This allows for reusing content across different dictionaries.
 *
 * @param dictionaryKey - The key of the dictionary to nest.
 * @param path - Optional dot-separated path to a specific field within the nested dictionary.
 * @param props - Optional properties like locale and plugins.
 * @returns The nested content.
 *
 * @example
 * ```ts
 * const content = getNesting("common", "buttons.save");
 * // 'Save'
 * ```
 */
export const getNesting = <K extends DictionaryKeys, P>(
  dictionaryKey: K,
  path?: P extends ValidDotPathsFor<K> ? P : never,
  props?: NodeProps
): GetNestingResult<K, P> => {
  const dictionary = getIntlayer(dictionaryKey, props?.locale, props?.plugins);

  if (typeof path === 'string') {
    const pathArray = (path as string).split('.');
    let current: any = dictionary;

    for (const key of pathArray) {
      // Safely traverse down the object using the path
      current = current?.[key];
      // If we cannot find the path, return the whole dictionary as a fallback
      if (current === undefined) {
        return dictionary as any;
      }
    }

    return current;
  }

  // Default or error handling if path is not a string or otherwise undefined
  return dictionary as any;
};
