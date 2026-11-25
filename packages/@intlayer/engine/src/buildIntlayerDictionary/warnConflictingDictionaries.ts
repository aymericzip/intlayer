import { log } from '@intlayer/config/built';
import {
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import type { Dictionary } from '@intlayer/types/dictionary';
import { collectLeafValues } from './collectLeafValues';
import { getTieGroup } from './getTieGroup';

type DeclaredValue = {
  value: unknown;
  source: string;
};

/**
 * Warns when dictionaries of the same key declare the same field with
 * different values and nothing but the file order decides which one is kept.
 *
 * @param dictionaries - Normalized dictionaries of a single key
 */
export const warnConflictingDictionaries = (
  dictionaries: Dictionary[]
): void => {
  const appLogger = getAppLogger({ log });
  const declaredValuesByGroup = new Map<string, Map<string, DeclaredValue>>();

  for (const dictionary of dictionaries) {
    const source = dictionary.filePath ?? dictionary.localId ?? dictionary.key;
    const group = getTieGroup(dictionary);
    const declaredValues = declaredValuesByGroup.get(group) ?? new Map();

    declaredValuesByGroup.set(group, declaredValues);

    const conflictingFieldsBySource = new Map<string, string[]>();

    for (const [field, value] of collectLeafValues(dictionary.content)) {
      const declaredValue = declaredValues.get(field);

      if (!declaredValue) {
        declaredValues.set(field, { value, source });
        continue;
      }

      if (declaredValue.value === value) continue;

      const conflictingFields =
        conflictingFieldsBySource.get(declaredValue.source) ?? [];

      conflictingFields.push(field);
      conflictingFieldsBySource.set(declaredValue.source, conflictingFields);
    }

    for (const [otherSource, conflictingFields] of conflictingFieldsBySource) {
      appLogger(
        `Dictionary ${colorizeKey(dictionary.key)} declares ${colorizeKey(conflictingFields)} with different values in ${colorizePath(otherSource)} and ${colorizePath(source)}. Only one value is kept, picked by file order. Set a higher "priority" on the file that should win.`,
        { level: 'warn' }
      );
    }
  }
};
