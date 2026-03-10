import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { basename, dirname, extname, relative, resolve } from 'node:path';
import {
  buildDictionary,
  ensureIntlayerBundle,
  loadContentDeclaration,
  writeContentDeclaration,
} from '@intlayer/chokidar/build';
import {
  getContentExtension,
  getFormatFromExtension,
} from '@intlayer/chokidar/utils';
import { DefaultValues } from '@intlayer/config/client';
import {
  parseFilePathPattern,
  resolveDictionaryPaths,
} from '@intlayer/config/utils';
import {
  getMultilingualDictionary,
  insertContentInDictionary,
} from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

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
 * Resolves the paths for the content files associated with a component.
 * Checks for existing dictionaries first.
 */
export const resolveContentFilePaths = async (
  filePath: string,
  componentKey: string,
  configuration: IntlayerConfig,
  output?: FilePathPattern
): Promise<{ filePath: string; locales: Locale[]; isPerLocale: boolean }[]> => {
  const { baseDir } = configuration.content;
  const { locales, defaultLocale } = configuration.internationalization;

  const unmergedDictionaries = getUnmergedDictionaries(configuration) ?? {};
  const existingDicts = unmergedDictionaries[componentKey];

  if (existingDicts?.[0]?.filePath) {
    return [
      {
        filePath: resolve(baseDir, existingDicts[0].filePath),
        locales,
        isPerLocale: false,
      },
    ];
  }

  const pattern = output ?? DefaultValues.Compiler.COMPILER_OUTPUT;

  const samplePattern = await parseFilePathPattern(pattern, {
    key: componentKey,
    dirPath: relative(baseDir, dirname(filePath)),
    fileName: basename(filePath, extname(filePath)).toLowerCase(),
    componentFileName: basename(filePath, extname(filePath)),
    extension: extname(filePath) as any,
    format: getFormatFromExtension(extname(filePath) as any),
    locale: defaultLocale,
  });

  const format = getFormatFromExtension(extname(samplePattern) as any);

  const resolvedPaths = await resolveDictionaryPaths({
    pattern,
    dictionaryKey: componentKey,
    sourceFilePath: filePath,
    baseDir,
    locales,
    defaultLocale,
    contentExtension: getContentExtension(format, configuration),
    format,
  });

  return resolvedPaths;
};

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

  return finalContent;
};

/**
 * Creates a dictionary object from extracted content.
 * Handles both single-locale and multi-locale formats based on configuration.
 *
 * @deprecated Use merge logic instead
 */
export const createDictionary = (
  extractedContent: Record<string, string>,
  componentKey: string,
  relativeContentFilePath: string,
  configuration: IntlayerConfig,
  targetLocale?: Locale
): Dictionary => {
  const dictionary: Dictionary = {
    key: componentKey,
    content: extractedContent,
    filePath: relativeContentFilePath,
    locale: targetLocale ?? configuration.internationalization.defaultLocale,
  } as Dictionary;

  if (targetLocale) {
    return dictionary;
  }

  return getMultilingualDictionary(dictionary);
};

/**
 * Helper to write extracted content to dictionary file(s).
 */
export const writeContentHelper = async (
  extractedContent: Record<string, string>,
  componentKey: string,
  filePath: string,
  configuration: IntlayerConfig,
  output?: FilePathPattern
): Promise<string> => {
  const resolvedPaths = await resolveContentFilePaths(
    filePath,
    componentKey,
    configuration,
    output
  );

  const { defaultLocale } = configuration.internationalization;
  const { baseDir } = configuration.content;

  if (!cachedBundleFilePath) {
    cachedBundleFilePath = await ensureIntlayerBundle(configuration);
  }

  let lastWrittenFilePath = '';

  for (const resolved of resolvedPaths) {
    const {
      filePath: contentFilePath,
      locales: targetLocales,
      isPerLocale,
    } = resolved;

    // In compiler mode, we only extract content for the base locale.
    // If we are in per-locale mode, we should only generate the file for the default locale.
    if (isPerLocale && !targetLocales.includes(defaultLocale)) {
      continue;
    }

    const outputDir = dirname(contentFilePath);

    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });

    // Read existing dictionary to preserve translations and metadata
    let existingDictionary: Dictionary | null = null;

    if (existsSync(contentFilePath)) {
      try {
        const dictionary = await loadContentDeclaration(
          contentFilePath,
          configuration,
          cachedBundleFilePath
        );

        existingDictionary = dictionary ?? null;
      } catch (error) {
        console.error(error);
      }
    }

    const relativeContentFilePath = relative(baseDir, contentFilePath);

    let mergedDictionary: Dictionary;

    if (isPerLocale) {
      // Per-locale format: simple string content for a single locale
      const targetLocale = targetLocales[0];
      const mergedContent = mergeWithExistingPerLocaleDictionary(
        extractedContent,
        existingDictionary
      );

      mergedDictionary = {
        // Preserve existing metadata
        ...existingDictionary,
        key: componentKey,
        content: mergedContent,
        locale: targetLocale,
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
        key: componentKey,
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
        localeList: targetLocales,
      }
    );

    // Build the dictionary immediately
    const dictionaryToBuild: Dictionary = {
      ...mergedDictionary,
      filePath: relative(baseDir, writeResult?.path ?? contentFilePath),
    };

    await buildDictionary([dictionaryToBuild], configuration);

    lastWrittenFilePath = contentFilePath;
  }

  return lastWrittenFilePath;
};
