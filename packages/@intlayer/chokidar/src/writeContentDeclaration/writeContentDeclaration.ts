import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { getFilteredLocalesContent, getLocalizedContent } from '@intlayer/core';
import type {
  ContentNode,
  Dictionary,
  IntlayerConfig,
  Locales,
  LocalesValues,
} from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import deepEqual from 'deep-equal';
import {
  type Extension,
  getFormatFromExtension,
} from '../utils/getFormatFromExtension';
import type { DictionaryStatus } from './dictionaryStatus';
import { processContentDeclarationContent } from './processContentDeclarationContent';
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
    content = getLocalizedContent(
      processedDictionary.content as unknown as ContentNode,
      dictionary.locale,
      {
        dictionaryKey: dictionary.key,
        keyPath: [],
      }
    );
  } else if (localeList) {
    content = getFilteredLocalesContent(
      processedDictionary.content as unknown as ContentNode,
      localeList,
      { dictionaryKey: dictionary.key, keyPath: [] }
    );
  }

  let pluginFormatResult: Dictionary = {
    ...dictionary,
    content,
  };

  /**
   * Format the dictionary with the plugins
   */

  for await (const plugin of configuration.plugins ?? []) {
    if (plugin.formatOutput) {
      const formattedResult = await plugin.formatOutput?.({
        dictionary: pluginFormatResult as Dictionary,
        configuration,
      });

      if (formattedResult) {
        pluginFormatResult = formattedResult as Dictionary;
      }
    }
  }

  const isDictionaryFormat =
    pluginFormatResult.content && pluginFormatResult.key;

  if (!isDictionaryFormat) return pluginFormatResult;

  const result: Dictionary = {
    key: dictionary.key,
    content,
    locale: dictionary.locale,
    autoFill: dictionary.autoFill,
    autoFilled: dictionary.autoFilled,
    tags: dictionary.tags,
    title: dictionary.title,
    description: dictionary.description,
    priority: dictionary.priority,
  };

  /**
   * Add $schema to the dictionary
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
    result['$schema'] = 'https://intlayer.org/schema.json';
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
  const { content } = configuration;
  const { baseDir } = content;
  const { newDictionariesPath, localeList, fallbackLocale } = {
    ...defaultOptions,
    ...options,
  };

  const newDictionaryLocationPath = join(baseDir, newDictionariesPath);

  const unmergedDictionariesRecord = getUnmergedDictionaries(configuration);
  const unmergedDictionaries = unmergedDictionariesRecord[
    dictionary.key
  ] as Dictionary[];

  const existingDictionary = unmergedDictionaries.filter(
    (el) => el.localId === dictionary.localId
  );

  const formattedContentDeclaration = await formatContentDeclaration(
    dictionary,
    configuration,
    localeList
  );

  if (existingDictionary && dictionary.filePath) {
    const filePath = join(configuration.content.baseDir, dictionary.filePath);

    // Compare existing dictionary with distant dictionary
    const isSameFile = deepEqual(existingDictionary, dictionary);

    // Up to date, nothing to do
    if (isSameFile) {
      return {
        status: 'up-to-date',
        path: filePath,
      };
    }

    await writeFileWithDirectories(
      filePath,
      formattedContentDeclaration,
      configuration,
      fallbackLocale
    );

    return { status: 'updated', path: filePath };
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
    fallbackLocale
  );

  return {
    status: 'imported',
    path: contentDeclarationPath,
  };
};

const writeFileWithDirectories = async (
  filePath: string,
  dictionary: Dictionary,
  configuration: IntlayerConfig,
  fallbackLocale?: Locales
): Promise<void> => {
  // Extract the directory from the file path
  const dir = dirname(filePath);

  // Create the directory recursively
  await mkdir(dir, { recursive: true });

  const extension = extname(filePath);
  const acceptedExtensions = configuration.content.fileExtensions.map(
    (extension) => extname(extension)
  );

  if (!acceptedExtensions.includes(extension)) {
    throw new Error(`Invalid file extension: ${extension}, file: ${filePath}`);
  }

  if (extension === '.json') {
    const jsonDictionary = JSON.stringify(dictionary, null, 2);

    // Write the file
    await writeFile(filePath, `${jsonDictionary}\n`); // Add a new line at the end of the file to avoid formatting issues with VSCode

    return;
  }

  await writeJSFile(filePath, dictionary, configuration, fallbackLocale);

  // remove the cache as content has changed
  // Will force a new preparation of the intlayer on next build
  try {
    await rm(configuration.content.cacheDir, { recursive: true });
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code: string }).code !== 'ENOENT'
    ) {
      throw error;
    }
  }
};
