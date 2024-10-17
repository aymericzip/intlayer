/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Locales } from '@intlayer/config';
import type {
  DeclarationContent,
  Dictionary,
  DictionaryValue,
  NodeType,
} from '@intlayer/core';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { renderIntlayerEditor } from 'intlayer-editor';
import { isValidElement, type ReactNode } from 'react';
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
      ? DeepTransformContent<T[NodeType.Translation][L], L>
      : never
    : T;

type DeepTransformContent<T, L extends Locales> = T extends object // Check if the property is an object
  ? T extends (infer U)[] // If it's an array, infer the type of array elements
    ? DeepTransformContent<U, L>[] // Apply DeepTransformContent recursively to each element of the array
    : T extends {
          nodeType: NodeType | string;
        }
      ? TransformNodeType<T, L>
      : T extends { _owner: any; key: any; props: any; ref: any }
        ? ReactNode
        : {
            [K in keyof T]: DeepTransformContent<T[K], L>;
          }
  : T extends undefined
    ? never
    : IntlayerNode<T>;

/**
 * Go through the object. If a object has a keyPath, render the intlayer editor if editor enabled.
 */
export const recursiveTransformContent = (
  value: any,
  isContentSelectable = false
): object => {
  if (typeof value === 'function') {
    return (props: any) =>
      recursiveTransformContent(value(props), isContentSelectable);
  } else if (typeof value === 'object') {
    if (typeof value.dictionaryId !== 'undefined') {
      return renderIntlayerEditor(value, isContentSelectable);
    } else if (Array.isArray(value)) {
      return value.map((el) =>
        recursiveTransformContent(el, isContentSelectable)
      );
    } else if (isValidElement(value)) {
      return value;
    }

    return Object.entries(value).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: recursiveTransformContent(value, isContentSelectable),
      }),
      {} as object
    );
  }

  return value;
};

type DataFromDictionary<
  T extends DeclarationContent['content'],
  K extends Locales,
> = DeepTransformContent<T, K>;

export type UseDictionary = <
  T extends DeclarationContent['content'],
  L extends Locales,
>(
  dictionary: T,
  locale?: L
) => DataFromDictionary<T, L>;

// Add description is JSDoc
/**
 * Hook that picks one dictionary by its id and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionary = <T extends DeclarationContent, L extends Locales>(
  dictionary: T,
  locale?: L,
  isContentSelectable = false
) => {
  const result = processDictionary(
    dictionary.content as DictionaryValue,
    dictionary.key,
    dictionary.filePath,
    [],
    locale
  );

  return recursiveTransformContent(
    result,
    isContentSelectable
  ) as DataFromDictionary<T['content'], L>;
};

/**
 * Represents the data type returned by the useIntlayer hook,
 * excluding the 'id' and 'filePath' keys from the dictionary content.
 */
type DataFromDictionaryId<
  T extends DictionaryKeys,
  K extends Locales,
> = DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content'], K>;

/**
 * Type definition for the useIntlayer hook, which takes a dictionary ID and an optional locale,
 * and returns the deeply transformed dictionary content.
 *
 */
export type UseIntlayer = <T extends DictionaryKeys, L extends Locales>(
  id: T,
  locale?: L
) => DataFromDictionaryId<T, L>;

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
    dictionary.content,
    dictionary.key,
    dictionary.filePath,
    [],
    locale
  );

  const isContentSelectable = true;

  return recursiveTransformContent(
    result,
    isContentSelectable
  ) as DataFromDictionaryId<T, L>;
};
