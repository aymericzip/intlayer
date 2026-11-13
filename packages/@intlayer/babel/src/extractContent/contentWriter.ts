import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { dirname, extname, relative } from 'node:path';
import { insertContentInDictionary } from '@intlayer/core/plugins';
import {
  buildDictionary,
  ensureIntlayerBundle,
  loadContentDeclaration,
  writeContentDeclaration,
} from '@intlayer/engine/build';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, DictionaryKey } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { resolveContentFilePaths } from './utils/extractDictionaryInfo';
import {
  getReadFieldsByDictionary,
  type ReadFields,
} from './utils/getReadFields';
import { getComponentFilePath } from './utils/resolveDictionaryKey';

const hasInsertionVars = (str: string): boolean => /\{\{[^}]+\}\}/.test(str);

const getInsertionFields = (template: string): string[] => {
  const fields = new Set<string>();
  const regex = /\{\{([^}]+)\}\}/g;
  for (
    let match = regex.exec(template);
    match !== null;
    match = regex.exec(template)
  ) {
    const field = match[1]?.trim();
    if (field) fields.add(field);
  }
  return [...fields];
};

/**
 * Translation node structure used in dictionaries
 */
type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, string>;
};

/**
 * Dictionary content structure - map of keys to translation nodes
 */
type DictionaryContentMap = Record<string, TranslationNode>;

/** The fields of `content` named in `fieldNames`, in their original order. */
const pickFields = <Content extends Record<string, unknown>>(
  content: Content,
  fieldNames: ReadonlySet<string>
): Content =>
  Object.fromEntries(
    Object.entries(content).filter(([fieldName]) => fieldNames.has(fieldName))
  ) as Content;

/** Component files whose dictionary reads the Babel parser can trace. */
const TRACEABLE_EXTENSIONS = new Set([
  '.tsx',
  '.jsx',
  '.ts',
  '.js',
  '.cjs',
  '.mjs',
]);

/**
 * Fields of `dictionaryKey` the component still reads through its hook
 * (`content.title`): the extractor only lists the strings left hardcoded, so
 * pruning must spare them. Empty when the component cannot be analyzed.
 */
const getComponentReadFields = async (
  filePath: string,
  dictionaryKey: string
): Promise<ReadFields> => {
  if (!TRACEABLE_EXTENSIONS.has(extname(filePath))) return new Set();

  try {
    const fileCode = await readFile(filePath, 'utf-8');

    return getReadFieldsByDictionary(fileCode).get(dictionaryKey) ?? new Set();
  } catch {
    return new Set();
  }
};

/**
 * Cached bundle file path to optimize performance
 */
let cachedBundleFilePath: string | undefined;

/**
 * Merge extracted content with existing dictionary for multilingual format.
 * - Keys in extracted but not in existing: added with default locale only
 * - Keys in both: preserve existing translations, update default locale value
 * - Keys in existing but not in extracted: removed (no longer in source)
 */
export const mergeWithExistingMultilingualDictionary = (
  extractedContent: Record<string, string>,
  existingDictionary: Dictionary | null,
  defaultLocale: string,
  prune = true,
  keptFields: ReadonlySet<string> = new Set()
): DictionaryContentMap => {
  const dictionary: Dictionary =
    existingDictionary ??
    ({
      key: '',
      content: {},
      filePath: '',
    } as Dictionary);

  const mergedDictionary = insertContentInDictionary(
    dictionary,
    extractedContent,
    defaultLocale as Locale
  );

  const mergedContent = mergedDictionary.content as DictionaryContentMap;

  // Pruning: remove keys neither extracted nor kept
  const finalContent: DictionaryContentMap = prune
    ? pickFields(mergedContent, keptFields)
    : { ...mergedContent };
  for (const key in extractedContent) {
    const contentNode = mergedContent[key];
    if (contentNode) {
      finalContent[key] = contentNode;
    }
  }

  // Promote any key whose source text contains {{vars}} to an insertion node
  for (const key in extractedContent) {
    const rawValue = extractedContent[key];
    if (typeof rawValue === 'string' && hasInsertionVars(rawValue)) {
      const node = finalContent[key] as any;
      if (node && node.nodeType === NodeTypes.TRANSLATION) {
        (finalContent as any)[key] = {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: node,
          fields: getInsertionFields(rawValue),
        };
      }
    }
  }

  return finalContent;
};

/**
 * Merge extracted content with existing dictionary for per-locale format.
 * - Keys in extracted but not in existing: added
 * - Keys in both: update value
 * - Keys in existing but not in extracted: removed (no longer in source)
 */
export const mergeWithExistingPerLocaleDictionary = (
  extractedContent: Record<string, string>,
  existingDictionary: Dictionary | null,
  prune = true,
  keptFields: ReadonlySet<string> = new Set()
): Record<string, string> => {
  const dictionary: Dictionary =
    existingDictionary ??
    ({
      key: '',
      content: {},
      filePath: '',
    } as Dictionary);

  const mergedDictionary = insertContentInDictionary(
    dictionary,
    extractedContent
  );

  const mergedContent = mergedDictionary.content as Record<string, string>;

  // Pruning: remove keys neither extracted nor kept
  const finalContent: Record<string, string> = prune
    ? pickFields(mergedContent, keptFields)
    : { ...mergedContent };
  for (const key in extractedContent) {
    const contentStr = mergedContent[key];
    if (contentStr) {
      finalContent[key] = contentStr;
    }
  }

  // Promote any key whose source text contains {{vars}} to an insertion node
  for (const key in extractedContent) {
    const rawValue = extractedContent[key];
    if (typeof rawValue === 'string' && hasInsertionVars(rawValue)) {
      const currentVal = finalContent[key];
      if (typeof currentVal === 'string') {
        (finalContent as any)[key] = {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: currentVal,
          fields: getInsertionFields(rawValue),
        };
      }
    }
  }

  return finalContent;
};

/**
 * Helper to write extracted content to dictionary file(s).
 *
 * @param prune - Drop the existing fields that are neither in
 * `extractedContent` nor read by the component through its hook (full-file
 * extraction). Off for a partial extraction, which only adds.
 */
export const writeContentHelper = async (
  extractedContent: Record<string, string>,
  dictionaryKey: DictionaryKey,
  filePath: string,
  configuration: IntlayerConfig,
  prune = true
): Promise<string> => {
  const { absolutePath, isPerLocale } = await resolveContentFilePaths(
    filePath,
    dictionaryKey,
    configuration
  );

  const { defaultLocale } = configuration.internationalization;
  const { baseDir } = configuration.system;

  if (!cachedBundleFilePath) {
    cachedBundleFilePath = await ensureIntlayerBundle(configuration);
  }

  const outputDir = dirname(absolutePath);

  // Ensure output directory exists
  await mkdir(outputDir, { recursive: true });

  // Read existing dictionary to preserve translations and metadata
  let existingDictionary: Dictionary | null = null;

  if (existsSync(absolutePath)) {
    try {
      const dictionary = await loadContentDeclaration(
        absolutePath,
        configuration,
        cachedBundleFilePath
      );

      existingDictionary = dictionary ?? null;
    } catch (error) {
      console.error(error);
    }
  }

  // A full extraction prunes the fields absent from the component, except the
  // ones it reads through its hook; untraceable reads disable pruning.
  const readFields = prune
    ? await getComponentReadFields(filePath, dictionaryKey)
    : new Set<string>();
  const isPruned = prune && readFields !== 'all';
  const keptFields = readFields === 'all' ? new Set<string>() : readFields;

  const relativeContentFilePath = relative(baseDir, absolutePath);
  // A partial extraction into a hand-written dictionary keeps it unowned:
  // only compiler-generated dictionaries carry `componentFilePath`.
  const ownership =
    prune || !existingDictionary || existingDictionary.componentFilePath
      ? { componentFilePath: getComponentFilePath(filePath, configuration) }
      : {};

  let mergedDictionary: Dictionary;

  if (isPerLocale) {
    // Per-locale format: simple string content for a single locale
    const mergedContent = mergeWithExistingPerLocaleDictionary(
      extractedContent,
      existingDictionary,
      isPruned,
      keptFields
    );

    mergedDictionary = {
      // Preserve existing metadata
      ...existingDictionary,
      key: dictionaryKey,
      content: mergedContent,
      locale: defaultLocale,
      filePath: relativeContentFilePath,
      ...ownership,
    };
  } else {
    // Multilingual format: content wrapped in translation nodes for multiple locales
    const mergedContent = mergeWithExistingMultilingualDictionary(
      extractedContent,
      existingDictionary,
      defaultLocale,
      isPruned,
      keptFields
    );

    mergedDictionary = {
      // Preserve existing metadata
      ...existingDictionary,
      key: dictionaryKey,
      content: mergedContent,
      filePath: relativeContentFilePath,
      ...ownership,
    };
  }

  const relativeDir = relative(baseDir, outputDir);

  const writeResult = await writeContentDeclaration(
    mergedDictionary,
    configuration,
    {
      newDictionariesPath: relativeDir,
      localeList: [defaultLocale],
    }
  );

  // Build the dictionary immediately
  const dictionaryToBuild: Dictionary = {
    ...mergedDictionary,
    filePath: relative(baseDir, writeResult?.path ?? absolutePath),
  };

  await buildDictionary([dictionaryToBuild], configuration);

  return absolutePath;
};
