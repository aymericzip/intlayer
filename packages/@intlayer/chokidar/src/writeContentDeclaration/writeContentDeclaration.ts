import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { COMPILER_NO_METADATA } from '@intlayer/config/defaultValues';
import {
  getFilteredLocalesDictionary,
  getPerLocaleDictionary,
} from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { detectFormatCommand } from '../detectFormatCommand';
import {
  type Extension,
  getFormatFromExtension,
} from '../utils/getFormatFromExtension';
import type { DictionaryStatus } from './dictionaryStatus';
import { processContentDeclarationContent } from './processContentDeclarationContent';
import { transformJSONFile } from './transformJSONFile';
import { writeJSFile } from './writeJSFile';

const formatContentDeclaration = async (
  dictionary: Dictionary,
  configuration: IntlayerConfig,
  localeList?: LocalesValues[]
) => {
  /**
   * Clean Markdown, Insertion, File, etc. node metadata
   */
  const processedDictionary =
    await processContentDeclarationContent(dictionary);

  let content = processedDictionary.content;

  /**
   * Filter locales content
   */

  if (dictionary.locale) {
    content = getPerLocaleDictionary(
      processedDictionary,
      dictionary.locale
    ).content;
  } else if (localeList) {
    content = getFilteredLocalesDictionary(
      processedDictionary,
      localeList
    ).content;
  }

  let pluginFormatResult: any = {
    ...dictionary,
    content,
  } satisfies Dictionary;

  /**
   * Format the dictionary with the plugins
   */

  for await (const plugin of configuration.plugins ?? []) {
    if (plugin.formatOutput) {
      const formattedResult = await plugin.formatOutput?.({
        dictionary: pluginFormatResult,
        configuration,
      });

      if (formattedResult) {
        pluginFormatResult = formattedResult;
      }
    }
  }

  const isDictionaryFormat =
    pluginFormatResult.content && pluginFormatResult.key;

  if (!isDictionaryFormat) return pluginFormatResult;

  let result: Dictionary = {
    key: dictionary.key,
    id: dictionary.id,
    title: dictionary.title,
    description: dictionary.description,
    tags: dictionary.tags,
    locale: dictionary.locale,
    fill: dictionary.fill,
    filled: dictionary.filled,
    priority: dictionary.priority,
    importMode: dictionary.importMode,
    version: dictionary.version,
    content,
  };

  /**
   * Add $schema to JSON dictionaries
   */
  const extension = (
    dictionary.filePath ? extname(dictionary.filePath) : '.json'
  ) as Extension;
  const format = getFormatFromExtension(extension);

  if (
    format === 'json' &&
    pluginFormatResult.content &&
    pluginFormatResult.key
  ) {
    result = {
      $schema: 'https://intlayer.org/schema.json',
      ...result,
    };
  }

  return result;
};

type WriteContentDeclarationOptions = {
  newDictionariesPath?: string;
  localeList?: LocalesValues[];
  fallbackLocale?: Locale;
};

const defaultOptions = {
  newDictionariesPath: 'intlayer-dictionaries',
} satisfies WriteContentDeclarationOptions;

export const writeContentDeclaration = async (
  dictionary: Dictionary,
  configuration: IntlayerConfig,
  options?: WriteContentDeclarationOptions
): Promise<{ status: DictionaryStatus; path: string }> => {
  const { system, compiler } = configuration;
  const { baseDir } = system;

  const noMetadata = compiler?.noMetadata ?? COMPILER_NO_METADATA;
  const { newDictionariesPath, localeList } = {
    ...defaultOptions,
    ...options,
  };

  const newDictionaryLocationPath = join(baseDir, newDictionariesPath);

  const unmergedDictionariesRecord = getUnmergedDictionaries(configuration);
  const unmergedDictionaries = unmergedDictionariesRecord[
    dictionary.key
  ] as Dictionary[];

  const existingDictionary = unmergedDictionaries?.find(
    (el) => el.localId === dictionary.localId
  );

  const formattedContentDeclaration = await formatContentDeclaration(
    dictionary,
    configuration,
    localeList
  );

  if (existingDictionary?.filePath) {
    // Compare existing dictionary content with new dictionary content
    const isSameContent = isDeepStrictEqual(existingDictionary, dictionary);

    const filePath = resolve(
      configuration.system.baseDir,
      existingDictionary.filePath
    );

    // Up to date, nothing to do
    if (isSameContent) {
      return {
        status: 'up-to-date',
        path: filePath,
      };
    }

    await writeFileWithDirectories(
      filePath,
      formattedContentDeclaration,
      configuration,
      noMetadata
    );

    return { status: 'updated', path: filePath };
  }

  if (dictionary.filePath) {
    const filePath = resolve(configuration.system.baseDir, dictionary.filePath);

    await writeFileWithDirectories(
      filePath,
      formattedContentDeclaration,
      configuration,
      noMetadata
    );

    return { status: 'created', path: filePath };
  }

  // No existing dictionary, write to new location
  const contentDeclarationPath = join(
    newDictionaryLocationPath,
    `${dictionary.key}.content.json`
  );

  await writeFileWithDirectories(
    contentDeclarationPath,
    formattedContentDeclaration,
    configuration,
    noMetadata
  );

  return {
    status: 'imported',
    path: contentDeclarationPath,
  };
};

const writeFileWithDirectories = async (
  absoluteFilePath: string,
  dictionary: Dictionary,
  configuration: IntlayerConfig,
  noMetadata?: boolean
): Promise<void> => {
  // Extract the directory from the file path
  const dir = dirname(absoluteFilePath);

  // Create the directory recursively
  await mkdir(dir, { recursive: true });

  const extension = extname(absoluteFilePath);

  // Handle JSON, JSONC, and JSON5 via the AST transformer
  if (['.json', '.jsonc', '.json5'].includes(extension)) {
    let fileContent = '{}';

    if (existsSync(absoluteFilePath)) {
      try {
        fileContent = await readFile(absoluteFilePath, 'utf-8');
      } catch {
        // ignore read errors, start with empty object
      }
    }

    const transformedContent = transformJSONFile(
      fileContent,
      dictionary,
      noMetadata
    );

    // We use standard writeFile because transformedContent is already a string
    const tempDir = configuration.system?.tempDir;
    if (tempDir) {
      await mkdir(tempDir, { recursive: true });
    }

    const tempFileName = `${basename(absoluteFilePath)}.${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;
    const tempPath = tempDir
      ? join(tempDir, tempFileName)
      : `${absoluteFilePath}.${tempFileName}`;
    try {
      await writeFile(tempPath, transformedContent, 'utf-8');
      await rename(tempPath, absoluteFilePath);
    } catch (error) {
      try {
        await rm(tempPath, { force: true });
      } catch {
        // Ignore
      }
      throw error;
    }

    const formatCommand = detectFormatCommand(configuration);

    if (formatCommand) {
      try {
        execSync(formatCommand.replace('{{file}}', absoluteFilePath), {
          stdio: 'inherit',
          cwd: configuration.system.baseDir,
        });
      } catch (error) {
        console.error(error);
      }
    }

    return;
  }

  await writeJSFile(absoluteFilePath, dictionary, configuration, noMetadata);

  // remove the cache as content has changed
  // Will force a new preparation of the intlayer on next build
  try {
    const sentinelPath = join(
      configuration.system.cacheDir,
      'intlayer-prepared.lock'
    );
    await rm(sentinelPath, { recursive: true });
  } catch {}
};
