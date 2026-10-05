import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPerLocaleDictionary } from '@intlayer/core/plugins';
import {
  getPathHash,
  type Recursive,
  sortAlphabetically,
} from '@intlayer/engine/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';

/**
 * Hash of each source value a target locale was last filled from, per
 * dictionary. Lets `fill` detect source values edited after translation.
 */
export type FillSourceSnapshot = Partial<
  Record<LocalDictionaryId, Partial<Record<Locale, Recursive>>>
>;

/**
 * Stored at the project root, not in `.intlayer`, so it can be committed and
 * shared with CI and other clones.
 */
const FILL_SOURCE_SNAPSHOT_FILE_NAME = 'intlayer.journal.json';

const getFillSourceSnapshotPath = (configuration: IntlayerConfig): string =>
  join(configuration.system.baseDir, FILL_SOURCE_SNAPSHOT_FILE_NAME);

/**
 * Reads the snapshot written by the previous `fill` run.
 * Returns an empty snapshot if none exists or it cannot be parsed.
 */
export const readFillSourceSnapshot = async (
  configuration: IntlayerConfig
): Promise<FillSourceSnapshot> => {
  try {
    const fileContent = await readFile(
      getFillSourceSnapshotPath(configuration),
      'utf-8'
    );

    return JSON.parse(fileContent) as FillSourceSnapshot;
  } catch {
    return {};
  }
};

/**
 * Persists the snapshot for the next `fill` run.
 * Dictionaries and locales are sorted to keep the file diff stable.
 */
export const writeFillSourceSnapshot = async (
  configuration: IntlayerConfig,
  snapshot: FillSourceSnapshot
): Promise<void> => {
  const sortedSnapshot = Object.fromEntries(
    Object.entries(snapshot)
      .sort(([keyA], [keyB]) => sortAlphabetically(keyA, keyB))
      .map(([dictionaryLocalId, localeSnapshot]) => [
        dictionaryLocalId,
        Object.fromEntries(
          Object.entries(localeSnapshot ?? {}).sort(([localeA], [localeB]) =>
            sortAlphabetically(localeA, localeB)
          )
        ),
      ])
  );

  await writeFile(
    getFillSourceSnapshotPath(configuration),
    `${JSON.stringify(sortedSnapshot, null, 2)}\n`
  );
};

/**
 * Content of a dictionary in its source locale, in the same shape `fill`
 * sends to translation (plain values, no translation nodes).
 */
export const getSourceLocaleContent = (
  dictionary: Dictionary,
  sourceLocale: Locale
): Recursive => getPerLocaleDictionary(dictionary, sourceLocale).content;

const isPlainObject = (
  value: Recursive
): value is { [key: string]: Recursive } =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Replaces each value of `content` by a short hash, keeping the object shape.
 * Arrays are hashed as a whole.
 */
export const hashSourceContent = (content: Recursive): Recursive => {
  if (isPlainObject(content)) {
    return Object.fromEntries(
      Object.entries(content).map(([key, value]) => [
        key,
        hashSourceContent(value),
      ])
    );
  }

  return getPathHash(JSON.stringify(content) ?? '');
};

/**
 * Returns the parts of `currentContent` whose hash differs from
 * `previousHashes` (built with `hashSourceContent`).
 *
 * Keys absent from `previousHashes` are ignored, as they are already handled
 * as missing translations. Arrays are compared as a whole.
 *
 * @example
 * getChangedSourceContent(
 *   hashSourceContent({ a: 'Hi', b: 'Bye' }),
 *   { a: 'Hello', b: 'Bye' }
 * )
 * // => { a: 'Hello' }
 */
export const getChangedSourceContent = (
  previousHashes: Recursive,
  currentContent: Recursive
): Recursive | undefined => {
  if (previousHashes === undefined) return undefined;

  if (isPlainObject(previousHashes) && isPlainObject(currentContent)) {
    const changedContent: { [key: string]: Recursive } = {};

    for (const [key, value] of Object.entries(currentContent)) {
      const changedValue = getChangedSourceContent(previousHashes[key], value);

      if (changedValue !== undefined) {
        changedContent[key] = changedValue;
      }
    }

    return Object.keys(changedContent).length > 0 ? changedContent : undefined;
  }

  const isSameContent =
    JSON.stringify(previousHashes) ===
    JSON.stringify(hashSourceContent(currentContent));

  return isSameContent ? undefined : currentContent;
};

/**
 * Removes from `targetContent` every value whose source changed, so it is
 * treated as untranslated. Changed arrays are removed as a whole.
 *
 * @example
 * omitChangedContent({ a: 'Salut', b: 'Au revoir' }, { a: 'Hello' })
 * // => { b: 'Au revoir' }
 */
export const omitChangedContent = (
  targetContent: Recursive,
  changedContent: Recursive | undefined
): Recursive | undefined => {
  if (changedContent === undefined) return targetContent;

  if (!isPlainObject(targetContent) || !isPlainObject(changedContent)) {
    return undefined;
  }

  const remainingContent: { [key: string]: Recursive } = {};

  for (const [key, value] of Object.entries(targetContent)) {
    const remainingValue = omitChangedContent(value, changedContent[key]);

    if (remainingValue !== undefined) {
      remainingContent[key] = remainingValue;
    }
  }

  return remainingContent;
};

/**
 * Records the hashes of `sourceContent` as the source of `locales` for a
 * dictionary.
 *
 * @param overwrite - When false, only locales with no recorded source are set
 * (used to take a baseline of translations made before the snapshot existed).
 * @returns A new snapshot; the input is not mutated.
 */
export const setFillSourceSnapshot = (
  snapshot: FillSourceSnapshot,
  dictionaryLocalId: LocalDictionaryId,
  locales: Locale[],
  sourceContent: Recursive,
  overwrite: boolean
): FillSourceSnapshot => {
  const localeSnapshot = { ...snapshot[dictionaryLocalId] };
  const sourceHashes = hashSourceContent(sourceContent);

  for (const locale of locales) {
    if (overwrite || !Object.hasOwn(localeSnapshot, locale)) {
      localeSnapshot[locale] = sourceHashes;
    }
  }

  return { ...snapshot, [dictionaryLocalId]: localeSnapshot };
};
