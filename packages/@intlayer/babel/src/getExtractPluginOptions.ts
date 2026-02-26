import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import {
  buildDictionary,
  writeContentDeclaration,
} from '@intlayer/chokidar/build';
import { ANSIColors, colorize, getAppLogger } from '@intlayer/config/client';
import { getConfiguration } from '@intlayer/config/node';
import type { Dictionary } from '@intlayer/types';
import type {
  ExtractPluginOptions,
  ExtractResult,
} from './babel-plugin-intlayer-extract';

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
 * Get the options for the Intlayer Babel extraction plugin
 * This function loads the Intlayer configuration and sets up the onExtract callback
 * to write dictionaries to the filesystem.
 */
export const getExtractPluginOptions = (
  isDev = process.env.INTLAYER_IS_DEV_COMMAND
): ExtractPluginOptions => {
  const config = getConfiguration();
  const { baseDir } = config.content;

  const compilerDir = join(baseDir, config.compiler?.outputDir ?? 'compiler');

  /**
   * Read existing dictionary file if it exists
   */
  const readExistingDictionary = async (
    dictionaryPath: string
  ): Promise<Dictionary | null> => {
    try {
      if (!existsSync(dictionaryPath)) {
        return null;
      }
      const content = await readFile(dictionaryPath, 'utf-8');

      if (!content || content.trim() === '') {
        return null;
      }

      const parsed = JSON.parse(content);

      if (Array.isArray(parsed)) {
        return (parsed[0] ?? null) as Dictionary | null;
      }

      return parsed as Dictionary;
    } catch (error) {
      if (existsSync(dictionaryPath)) {
        const content = await readFile(dictionaryPath, 'utf-8');

        if (content.trim() !== '') {
          console.warn(
            `[intlayer] Warning: Failed to read existing dictionary at ${dictionaryPath}. It might be corrupt. Translations may be lost. Error:`,
            error
          );
        }
      }
      return null;
    }
  };

  /**
   * Merge extracted content with existing dictionary, preserving translations.
   * - Keys in extracted but not in existing: added with default locale only
   * - Keys in both: preserve existing translations, update default locale value
   * - Keys in existing but not in extracted: removed (no longer in source)
   */
  const mergeWithExistingDictionary = (
    extractedContent: Record<string, string>,
    existingDictionary: Dictionary | null,
    defaultLocale: string
  ): DictionaryContentMap => {
    const mergedContent: DictionaryContentMap = {};
    const existingContent = existingDictionary?.content as
      | DictionaryContentMap
      | undefined;

    const sortedKeys = Object.keys(extractedContent).sort();

    for (const key of sortedKeys) {
      const value = extractedContent[key];
      const existingEntry = existingContent?.[key];

      if (
        existingEntry &&
        existingEntry.nodeType === 'translation' &&
        existingEntry.translation
      ) {
        // Key exists in both - preserve existing translations AND existing metadata
        mergedContent[key] = {
          ...existingEntry,
          nodeType: 'translation',
          translation: {
            ...existingEntry.translation,
            [defaultLocale]: existingEntry.translation[defaultLocale] ?? value,
          },
        };
      } else {
        // New key - add with default locale only
        mergedContent[key] = {
          nodeType: 'translation',
          translation: {
            [defaultLocale]: value,
          },
        };
      }
    }

    return mergedContent;
  };

  const handleExtractedContent = async (result: ExtractResult) => {
    const { dictionaryKey, content, locale } = result;

    try {
      const dictionaryPath = join(compilerDir, `${dictionaryKey}.content.json`);

      // Read existing dictionary to preserve translations
      const existingDictionary = await readExistingDictionary(dictionaryPath);

      // Merge extracted content with existing translations
      const mergedContent = mergeWithExistingDictionary(
        content,
        existingDictionary,
        locale
      );

      const dictionary: Dictionary = {
        ...existingDictionary,
        key: dictionaryKey,
        content: mergedContent,
        filePath: join(
          relative(baseDir, compilerDir),
          `${dictionaryKey}.content.json`
        ),
      };

      const writeResult = await writeContentDeclaration(dictionary, config, {
        newDictionariesPath: relative(baseDir, compilerDir),
      });

      // Build the dictionary immediately
      const dictionaryToBuild: Dictionary = {
        ...dictionary,
        filePath: relative(baseDir, writeResult.path),
      };

      await buildDictionary([dictionaryToBuild], config);
    } catch (error: any) {
      console.error(
        `[intlayer] Failed to process extracted content for ${dictionaryKey}:`,
        error
      );
      if (
        error instanceof SyntaxError &&
        error.message.includes('Unexpected end of JSON input')
      ) {
        const match = error.message.match(
          /^(.*\.json):\s*Unexpected end of JSON input/
        );
        if (match) {
          const filePath = match[1];
          try {
            const fs = require('fs');
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.error(
              `[intlayer] Content of the corrupted file (${filePath}):\n"${fileContent}"`
            );
          } catch (e) {
            console.error(
              `[intlayer] Could not read corrupted file ${filePath}`,
              e
            );
          }
        }
      }
    }
  };

  const isDevBoolean = String(isDev) === 'true';
  const isEnabled =
    config.compiler?.enabled === 'build-only'
      ? !isDevBoolean
      : (config.compiler?.enabled ?? true);

  const logger = getAppLogger(config);

  if (config.compiler?.enabled === 'build-only' && isDevBoolean) {
    logger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} i18n function is not inserted in the code in dev mode to optimize build time. (to test i18n in dev mode set compiler.enabled to true)`
    );
  }

  return {
    enabled: isEnabled,
    defaultLocale: config.internationalization.defaultLocale,
    prefix: config.compiler?.dictionaryKeyPrefix,
    saveComponents: config.compiler?.saveComponents,
    // filesList can be passed if needed, but usually handled by include/exclude in build tool
    onExtract: handleExtractedContent,
  };
};
