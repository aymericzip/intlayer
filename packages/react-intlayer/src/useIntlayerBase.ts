import type { Locales } from '@intlayer/config';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import type { Dictionary } from '@intlayer/core';
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

export type IntlayerNode = ReactNode & {
  value: string;
};

type DeepTransformContent<T> = T extends object
  ? {
      [K in keyof T]: DeepTransformContent<T[K]>;
    }
  : IntlayerNode;

/**
 * Excludes the 'id' and 'filePath' keys from the dictionary content,
 * as they are not part of the IntlayerDictionaryTypesConnector type.
 */
type ExcludeIntlayerUtilsKeys<T> = Omit<T, 'id' | 'filePath'>;

/**
 * Represents the data type returned by the useIntlayer hook,
 * excluding the 'id' and 'filePath' keys from the dictionary content.
 */
type Data<T extends DictionaryKeys> = ExcludeIntlayerUtilsKeys<
  DeepTransformContent<IntlayerDictionaryTypesConnector[T]>
>;

/**
 * Parcourt the object. If a object has a keyPath, render the intlayer editor if editor enabled.
 */
export const recursiveTransformContent = (obj: object): object =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      typeof value === 'object' &&
      typeof value.keyPath !== 'undefined' &&
      typeof value.dictionaryId !== 'undefined' &&
      typeof value.dictionaryPath !== 'undefined'
    ) {
      return {
        ...acc,
        [key]: renderIntlayerEditor(value),
      };
    } else if (typeof value === 'object' && Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map(recursiveTransformContent),
      };
    } else if (typeof value === 'object') {
      return {
        ...acc,
        [key]: recursiveTransformContent(value),
      };
    }

    return acc;
  }, {});

type DeepStrinfifyContent<T> =
  T extends React.ComponentType<unknown>
    ? string
    : T extends object
      ? {
          [K in keyof T]: DeepStrinfifyContent<T[K]>;
        }
      : T;

export const recursiveStringifyContent = <T extends object>(
  obj: T
): DeepStrinfifyContent<T> =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && typeof value.value !== 'undefined') {
      return {
        ...acc,
        [key]: value.value,
      };
    } else if (typeof value === 'object' && Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map(recursiveStringifyContent),
      };
    } else if (typeof value === 'object') {
      return {
        ...acc,
        [key]: recursiveStringifyContent(value),
      };
    }

    return acc;
  }, {}) as DeepStrinfifyContent<T>;

/**
 * Type definition for the useIntlayer hook, which takes a dictionary ID and an optional locale,
 * and returns the deeply transformed dictionary content.
 *
 */
export type UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => Data<T>;

/**
 * Hook that picks one dictionary by its ID and returns the content,
 * deeply transformed according to the dictionary structure and metadata.
 */
export const useIntlayerBase: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const dictionary: Dictionary = dictionaries[id];

  const result = processDictionary(
    dictionary,
    id,
    dictionary.filePath,
    [],
    locale
  ) as object;

  return recursiveTransformContent(result) as Data<T>;
};
