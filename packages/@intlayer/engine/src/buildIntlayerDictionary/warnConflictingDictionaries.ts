import {
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';

/**
 * Identifies dictionaries that `orderDictionaries` can only order by their
 * file order.
 */
const getTieGroup = (dictionary: Dictionary): string =>
  JSON.stringify([
    dictionary.priority ?? 0,
    dictionary.filled ?? false,
    dictionary.location,
    dictionary.variant,
    dictionary.item,
  ]);

const isNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

const isPrimitiveArray = (array: unknown[]): boolean =>
  array.every((item) => item === null || typeof item !== 'object');

const isSameArray = (firstArray: unknown[], secondArray: unknown[]): boolean =>
  firstArray.length === secondArray.length &&
  firstArray.every((item, index) => item === secondArray[index]);

/**
 * Walks the fields both contents declare, following the `mergeDictionaries`
 * rules, and reports each path where the merge keeps one of two different
 * values. Fields declared on one side only are skipped, as the merge completes
 * them.
 *
 * @param firstValue - Value of the dictionary merged first
 * @param secondValue - Value of the dictionary merged after it
 * @param path - Current key path, mutated during the walk
 * @param onConflict - Called with the path of each conflicting field
 */
const findConflictingPaths = (
  firstValue: unknown,
  secondValue: unknown,
  path: string[],
  onConflict: (path: string[]) => void
): void => {
  if (isNullish(firstValue) || isNullish(secondValue)) return;

  if (typeof firstValue !== 'object' || typeof secondValue !== 'object') {
    if (firstValue !== secondValue) onConflict(path);
    return;
  }

  if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
    // Arrays of plain values are not merged: the second one replaces the first
    if (isPrimitiveArray(firstValue) && isPrimitiveArray(secondValue)) {
      if (!isSameArray(firstValue, secondValue)) onConflict(path);
      return;
    }

    const sharedLength = Math.min(firstValue.length, secondValue.length);

    for (let index = 0; index < sharedLength; index++) {
      path.push(String(index));
      findConflictingPaths(
        firstValue[index],
        secondValue[index],
        path,
        onConflict
      );
      path.pop();
    }
    return;
  }

  const firstRecord = firstValue as Record<string, unknown>;
  const secondRecord = secondValue as Record<string, unknown>;

  for (const key of Object.keys(secondRecord)) {
    path.push(key);
    findConflictingPaths(firstRecord[key], secondRecord[key], path, onConflict);
    path.pop();
  }
};

/**
 * Lists the fields two normalized contents declare with different values, as
 * `field (locale, …)`.
 */
const getConflictingFields = (
  firstContent: unknown,
  secondContent: unknown
): string[] => {
  const localesByField = new Map<string, string[]>();

  findConflictingPaths(firstContent, secondContent, [], (path) => {
    // Normalized contents are a translation node: `translation.<locale>.<field>`
    const isTranslatedPath =
      path[0] === NodeTypes.TRANSLATION && path.length > 1;
    const field = isTranslatedPath
      ? path.slice(2).join('.') || 'content'
      : path.join('.') || 'content';
    const locales = localesByField.get(field) ?? [];

    if (isTranslatedPath) locales.push(path[1]!);

    localesByField.set(field, locales);
  });

  return Array.from(localesByField, ([field, locales]) =>
    locales.length > 0 ? `${field} (${locales.join(', ')})` : field
  );
};

/**
 * Warns when dictionaries of the same key declare the same field with
 * different values and nothing but the file order decides which one is kept.
 *
 * Only dictionaries that tie on priority, location, fill state and qualifiers
 * are compared, and only on the fields they share, so a key declared by a
 * single file costs nothing.
 *
 * @param dictionaries - Normalized dictionaries of a single key, in merge order
 * @param configuration - Intlayer configuration, for the logger
 */
export const warnConflictingDictionaries = (
  dictionaries: Dictionary[],
  configuration: IntlayerConfig
): void => {
  if (dictionaries.length < 2) return;

  const dictionariesByTieGroup = new Map<string, Dictionary[]>();

  for (const dictionary of dictionaries) {
    const tieGroup = getTieGroup(dictionary);
    const tiedDictionaries = dictionariesByTieGroup.get(tieGroup) ?? [];

    tiedDictionaries.push(dictionary);
    dictionariesByTieGroup.set(tieGroup, tiedDictionaries);
  }

  const appLogger = getAppLogger(configuration);

  for (const tiedDictionaries of dictionariesByTieGroup.values()) {
    for (
      let secondIndex = 1;
      secondIndex < tiedDictionaries.length;
      secondIndex++
    ) {
      const secondDictionary = tiedDictionaries[secondIndex]!;

      for (let firstIndex = 0; firstIndex < secondIndex; firstIndex++) {
        const firstDictionary = tiedDictionaries[firstIndex]!;

        const conflictingFields = getConflictingFields(
          firstDictionary.content,
          secondDictionary.content
        );

        if (conflictingFields.length === 0) continue;

        const firstSource =
          firstDictionary.filePath ?? firstDictionary.localId ?? 'unknown';
        const secondSource =
          secondDictionary.filePath ?? secondDictionary.localId ?? 'unknown';

        appLogger(
          `Dictionary ${colorizeKey(secondDictionary.key)} declares ${colorizeKey(conflictingFields)} with different values in ${colorizePath(firstSource)} and ${colorizePath(secondSource)}. Only one value is kept, picked by file order. Set a higher "priority" on the file that should win.`,
          { level: 'warn' }
        );
      }
    }
  }
};
