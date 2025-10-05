import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { getConfiguration } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import deepEqual from 'deep-equal';
import { prepareContentDeclaration } from '../prepareContentDeclaration';
import type { DictionaryStatus } from './dictionaryStatus';
import { writeJSFile } from './writeJSFile';

const DEFAULT_NEW_DICTIONARY_PATH = 'intlayer-dictionaries';

const formatContentDeclaration = async (dictionary: Dictionary) => {
  // Clean Markdown, Insertion, File, etc. node metadata
  const preparedContentDeclaration =
    await prepareContentDeclaration(dictionary);

  // Remove the filePath from the dictionary and set $schema
  const { filePath, $schema, ...dictionaryWithoutPath } =
    preparedContentDeclaration;

  const formattedContentDeclaration = {
    $schema: 'https://intlayer.org/schema.json',
    ...dictionaryWithoutPath,
  };

  return formattedContentDeclaration;
};

export const writeContentDeclaration = async (
  dictionary: Dictionary,
  config: IntlayerConfig = getConfiguration(),
  newDictionariesPath?: string
): Promise<{ status: DictionaryStatus; path: string }> => {
  const { content } = config;
  const { baseDir } = content;

  const newDictionaryRelativeLocationPath =
    newDictionariesPath ?? DEFAULT_NEW_DICTIONARY_PATH;
  const newDictionaryLocationPath = join(
    baseDir,
    newDictionaryRelativeLocationPath
  );

  const unmergedDictionariesRecord = getUnmergedDictionaries(config);
  const unmergedDictionaries = unmergedDictionariesRecord[
    dictionary.key
  ] as Dictionary[];

  const existingDictionary = unmergedDictionaries.filter(
    (el) => el.localId === dictionary.localId
  );

  const formattedContentDeclaration =
    await formatContentDeclaration(dictionary);

  if (existingDictionary && dictionary.filePath) {
    const filePath = join(config.content.baseDir, dictionary.filePath);

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
      config
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
    config
  );

  return {
    status: 'imported',
    path: contentDeclarationPath,
  };
};

const writeFileWithDirectories = async (
  filePath: string,
  data: string | Buffer,
  configuration: IntlayerConfig
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
    const jsonDictionary = JSON.stringify(data, null, 2);

    // Write the file
    await writeFile(filePath, jsonDictionary);

    return;
  }

  await writeJSFile(filePath, data as unknown as Dictionary, configuration);
};
