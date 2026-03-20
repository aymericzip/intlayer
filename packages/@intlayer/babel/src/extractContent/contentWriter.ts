import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, relative } from 'node:path';
import {
  buildDictionary,
  ensureIntlayerBundle,
  loadContentDeclaration,
  writeContentDeclaration,
} from '@intlayer/chokidar/build';
import { insertContentInDictionary } from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, DictionaryKey } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { resolveContentFilePaths } from './utils/extractDictionaryInfo';

const hasInsertionVars = (str: string): boolean => /\{\{[^}]+\}\}/.test(str);

const getInsertionFields = (template: string): string[] => {
  const fields: string[] = [];
  const regex = /\{\{([^}]+)\}\}/g;
  let match: RegExpExecArray | null;
  for (
    let result = regex.exec(template);
    result !== null;
    result = regex.exec(template)
  ) {
    match = result;
    const field = match[1].trim();
    if (!fields.includes(field)) fields.push(field);
  }
  return fields;
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
  defaultLocale: string
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

  // Pruning: remove keys not in extractedContent
  const finalContent: DictionaryContentMap = {};
  for (const key in extractedContent) {
    finalContent[key] = mergedContent[key];
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
  existingDictionary: Dictionary | null
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

  // Pruning: remove keys not in extractedContent
  const finalContent: Record<string, string> = {};
  for (const key in extractedContent) {
    finalContent[key] = mergedContent[key];
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
 */
export const writeContentHelper = async (
  extractedContent: Record<string, string>,
  dictionaryKey: DictionaryKey,
  filePath: string,
  configuration: IntlayerConfig
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

  const relativeContentFilePath = relative(baseDir, absolutePath);

  let mergedDictionary: Dictionary;

  if (isPerLocale) {
    // Per-locale format: simple string content for a single locale
    const mergedContent = mergeWithExistingPerLocaleDictionary(
      extractedContent,
      existingDictionary
    );

    mergedDictionary = {
      // Preserve existing metadata
      ...existingDictionary,
      key: dictionaryKey,
      content: mergedContent,
      locale: defaultLocale,
      filePath: relativeContentFilePath,
    };
  } else {
    // Multilingual format: content wrapped in translation nodes for multiple locales
    const mergedContent = mergeWithExistingMultilingualDictionary(
      extractedContent,
      existingDictionary,
      defaultLocale
    );

    mergedDictionary = {
      // Preserve existing metadata
      ...existingDictionary,
      key: dictionaryKey,
      content: mergedContent,
      filePath: relativeContentFilePath,
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
