/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/import/no-cycle */
import type { ValidDotPathsFor } from '../transpiler';
import type { DictionaryKeys } from '../types';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  NodeProps,
} from './getContent';
import { getIntlayer } from './getIntlayer';
// @ts-ignore intlayer declared for module augmentation
import { IntlayerDictionaryTypesConnector } from 'intlayer';

type GetSubPath<T, P> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetSubPath<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : T;

export type GetNestingResult<
  K extends DictionaryKeys,
  P = undefined,
  S = IInterpreterPluginState,
> = GetSubPath<
  DeepTransformContent<IntlayerDictionaryTypesConnector[K]['content'], S>,
  P
>;

/**
 * Allow to extract the content of another dictionary.
 *
 * Usage:
 * ```ts
 * const content = getNesting("dictionaryKey", "path.to.content");
 * // 'Example content'
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
