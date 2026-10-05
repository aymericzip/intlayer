import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPerLocaleDictionary } from '@intlayer/core/plugins';
import {
  loadContentDeclaration,
  processContentDeclaration,
} from '@intlayer/engine/build';
import {
  getGitMergeBase,
  type ListGitFilesOptions,
  readGitFile,
} from '@intlayer/engine/cli';
import type { Recursive } from '@intlayer/engine/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';

/** Previous version of each content declaration, by dictionary local id. */
export type PreviousDictionaries = Partial<
  Record<LocalDictionaryId, Dictionary>
>;

/**
 * Git ref the source values are compared against. The base branch with
 * `--git-diff`, the upstream with `--unpushed`, the last commit otherwise.
 */
export const getSourceChangesRef = async (
  gitOptions?: ListGitFilesOptions
): Promise<string | undefined> => {
  if (gitOptions?.mode.includes('gitDiff')) {
    return getGitMergeBase(gitOptions.baseRef, gitOptions.currentRef);
  }

  if (gitOptions?.mode.includes('unpushed')) return '@{push}';

  return 'HEAD';
};

/**
 * Loads each local content declaration as it is at `ref` in git.
 * Files that are unchanged, new, or not tracked by git are skipped.
 */
export const loadPreviousDictionaries = async (
  dictionaries: Dictionary[],
  configuration: IntlayerConfig,
  ref: string
): Promise<PreviousDictionaries> => {
  const previousDictionaries: PreviousDictionaries = {};

  for (const dictionary of dictionaries) {
    if (!dictionary.localId || !dictionary.filePath) continue;
    if (!['local', 'hybrid'].includes(dictionary.location ?? 'local')) continue;

    const filePath = join(configuration.system.baseDir, dictionary.filePath);
    const previousCode = await readGitFile(filePath, ref);

    if (previousCode === undefined) continue;

    const currentCode = await readFile(filePath, 'utf-8').catch(
      () => undefined
    );

    if (previousCode === currentCode) continue;

    const loaded = await loadContentDeclaration(
      filePath,
      configuration,
      undefined,
      { logError: false, code: previousCode }
    );

    // A file can declare several dictionaries
    const previousDeclaration = [loaded]
      .flat()
      .find((declaration) => declaration?.key === dictionary.key);

    if (!previousDeclaration) continue;

    const previousDictionary = await processContentDeclaration(
      previousDeclaration,
      configuration
    );

    if (previousDictionary) {
      previousDictionaries[dictionary.localId] = previousDictionary;
    }
  }

  return previousDictionaries;
};

/**
 * Content of a dictionary in one locale, in the same shape `fill` sends to
 * translation (plain values, no translation nodes).
 */
export const getLocaleContent = (
  dictionary: Dictionary,
  locale: Locale
): Recursive => getPerLocaleDictionary(dictionary, locale).content;

const isPlainObject = (
  value: Recursive
): value is { [key: string]: Recursive } =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isEmptyObject = (value: Recursive): boolean =>
  isPlainObject(value) && Object.keys(value).length === 0;

/**
 * Returns the parts of `currentContent` that differ from `previousContent`.
 * Arrays are compared as a whole.
 *
 * @example
 * getChangedContent({ a: 'Hi', b: 'Bye' }, { a: 'Hello', b: 'Bye' })
 * // => { a: 'Hello' }
 */
export const getChangedContent = (
  previousContent: Recursive,
  currentContent: Recursive
): Recursive | undefined => {
  if (isPlainObject(previousContent) && isPlainObject(currentContent)) {
    const changedContent: { [key: string]: Recursive } = {};

    for (const [key, value] of Object.entries(currentContent)) {
      const changedValue = getChangedContent(previousContent[key], value);

      if (changedValue !== undefined) {
        changedContent[key] = changedValue;
      }
    }

    return Object.keys(changedContent).length > 0 ? changedContent : undefined;
  }

  return JSON.stringify(previousContent) === JSON.stringify(currentContent)
    ? undefined
    : currentContent;
};

/**
 * Removes from `targetContent` every value present in `changedContent`.
 * Changed arrays are removed as a whole.
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
 * Source values edited since `previousDictionary` whose `targetLocale`
 * translation was left as is, so it is now stale. In multilingual
 * dictionaries, translations edited in the same change are kept.
 */
export const getStaleSourceContent = (
  previousDictionary: Dictionary | undefined,
  currentDictionary: Dictionary,
  sourceLocale: Locale,
  targetLocale: Locale
): Recursive | undefined => {
  if (!previousDictionary) return undefined;

  const changedSourceContent = getChangedContent(
    getLocaleContent(previousDictionary, sourceLocale),
    getLocaleContent(currentDictionary, sourceLocale)
  );

  if (changedSourceContent === undefined) return undefined;

  // Per-locale files hold no translation to compare with
  if (typeof currentDictionary.locale === 'string') return changedSourceContent;

  const editedTargetContent = getChangedContent(
    getLocaleContent(previousDictionary, targetLocale),
    getLocaleContent(currentDictionary, targetLocale)
  );

  const staleContent = omitChangedContent(
    changedSourceContent,
    editedTargetContent
  );

  return staleContent === undefined || isEmptyObject(staleContent)
    ? undefined
    : staleContent;
};
