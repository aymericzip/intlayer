/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Locales } from '@intlayer/config';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import type { Dictionary, NodeType } from '@intlayer/core';
import dictionaries from '@intlayer/dictionaries-entry';
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { renderIntlayerEditor } from 'intlayer-editor/client';
import type { ReactNode } from 'react';
import { processDictionary } from './processDictionary/index';

/**
 * Provides a fallback to string type if the generic type T is never,
 * otherwise returns T. This is useful for handling cases where no keys are found.
 * Example: StringFallback<never> -> string; StringFallback<'key'> -> 'key'
 */
export type StringFallback<T> = T extends never ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key

/**
 * Represents the keys of the IntlayerDictionaryTypesConnector,
 * ensuring they are valid dictionary keys or fallback to string if none exist.
 *
 * Example:
 * ```ts
 * DictionaryKeys -> 'key1' | 'key2'
 * // or if IntlayerDictionaryTypesConnector is not defined,
 * DictionaryKeys -> string
 * ```
 */
export type DictionaryKeys = StringFallback<
  keyof IntlayerDictionaryTypesConnector
>;

export type IntlayerNode<T = string> = ReactNode & {
  value: T;
};

type TransformNodeType<T, L extends Locales> = T extends {
  [NodeType.Enumeration]: { '1': any };
}
  ? (quantity: number) => DeepTransformContent<T[NodeType.Enumeration]['1'], L>
  : T extends {
        [NodeType.Translation]: object;
      }
    ? L extends keyof T[NodeType.Translation]
      ? DeepTransformContent<T[NodeType.Translation][L], L> // DeepTransformContent<T[L], L>
      : never
    : T;

type DeepTransformContent<T, L extends Locales> = T extends object // Check if the property is an object
  ? T extends (infer U)[] // If it's an array, infer the type of array elements
    ? DeepTransformContent<U, L>[] // Apply DeepTransformContent recursively to each element of the array
    : T extends {
          nodeType: NodeType | string;
        }
      ? TransformNodeType<T, L>
      : {
          [K in keyof T]: DeepTransformContent<T[K], L>;
        }
  : T extends undefined
    ? never
    : IntlayerNode<T>;

/**
 * Excludes the 'id' and 'filePath' keys from the dictionary content,
 * as they are not part of the IntlayerDictionaryTypesConnector type.
 */
type ExcludeIntlayerUtilsKeys<T> = Omit<T, 'id' | 'filePath'>;

/**
 * Represents the data type returned by the useIntlayer hook,
 * excluding the 'id' and 'filePath' keys from the dictionary content.
 */
type Data<
  T extends DictionaryKeys,
  K extends Locales,
> = ExcludeIntlayerUtilsKeys<
  DeepTransformContent<IntlayerDictionaryTypesConnector[T], K>
>;

/**
 * Parcourt the object. If a object has a keyPath, render the intlayer editor if editor enabled.
 */
export const recursiveTransformContent = (value: any): object => {
  if (typeof value === 'function') {
    return (props: any) => recursiveTransformContent(value(props));
  } else if (
    typeof value === 'object' &&
    typeof value.keyPath !== 'undefined' &&
    typeof value.dictionaryId !== 'undefined' &&
    typeof value.dictionaryPath !== 'undefined'
  ) {
    return renderIntlayerEditor(value);
  } else if (typeof value === 'object' && Array.isArray(value)) {
    return value.map(recursiveTransformContent);
  } else if (typeof value === 'object') {
    return Object.entries(value).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: recursiveTransformContent(value),
      }),
      {} as object
    );
  }

  return value.value;
};

/**
 * Type definition for the useIntlayer hook, which takes a dictionary ID and an optional locale,
 * and returns the deeply transformed dictionary content.
 *
 */
export type UseIntlayer = <T extends DictionaryKeys, L extends Locales>(
  id: T,
  locale?: L
) => Data<T, L>;

/**
 * Hook that picks one dictionary by its ID and returns the content,
 * deeply transformed according to the dictionary structure and metadata.
 */
export const useIntlayerBase: UseIntlayer = <
  T extends DictionaryKeys,
  L extends Locales,
>(
  id: T,
  locale?: L
) => {
  const dictionary: Dictionary = dictionaries[id as keyof typeof dictionaries];

  const result = processDictionary(
    dictionary,
    id,
    dictionary.filePath,
    [],
    locale
  ) as object;

  return recursiveTransformContent(result) as Data<T, L>;
};
