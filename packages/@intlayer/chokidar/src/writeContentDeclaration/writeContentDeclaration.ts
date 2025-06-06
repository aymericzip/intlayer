import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import dictionariesRecord from '@intlayer/unmerged-dictionaries-entry';
import deepEqual from 'deep-equal';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, extname } from 'path';
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
  config: IntlayerConfig = configuration,
  newDictionariesPath?: string
): Promise<{ status: DictionaryStatus; path: string }> => {
  const { content } = config;
  const { baseDir } = content;

  const newDictionaryRelativeLocationPath =
    newDictionariesPath ?? DEFAULT_NEW_DICTIONARY_PATH;
  const newDictionaryLocationPath = `${baseDir}/${newDictionaryRelativeLocationPath}`;

  const existingDictionary = (
    dictionariesRecord[dictionary.key] as Dictionary[]
  ).filter((el) => el.filePath === dictionary.filePath);

  const filePath = dictionary.filePath;
  const formattedContentDeclaration =
    await formatContentDeclaration(dictionary);

  if (existingDictionary) {
    // Compare existing dictionary with distant dictionary
    if (deepEqual(existingDictionary, dictionary)) {
      // Up to date, nothing to do
      return {
        status: 'up-to-date',
        path: filePath!,
      };
    } else {
      if (filePath) {
        await writeFileWithDirectories(filePath, formattedContentDeclaration);

        return { status: 'updated', path: filePath };
      } else {
        // Write the dictionary to the intlayer-dictionaries directory
        const contentDeclarationPath = `${newDictionaryLocationPath}/${dictionary.key}.content.json`;

        await writeFileWithDirectories(
          contentDeclarationPath,
          formattedContentDeclaration
        );

        return {
          status: 'reimported in new location',
          path: contentDeclarationPath,
        };
      }
    }
  } else {
    // No existing dictionary, write to new location
    const contentDeclarationPath = `${newDictionaryLocationPath}/${dictionary.key}.content.json`;

    await writeFileWithDirectories(
      contentDeclarationPath,
      formattedContentDeclaration
    );

    return {
      status: 'imported',
      path: contentDeclarationPath,
    };
  }
};

const writeFileWithDirectories = async (
  filePath: string,
  data: string | Buffer
): Promise<void> => {
  try {
    // Extract the directory from the file path
    const dir = dirname(filePath);

    // Check if the directory exists
    const directoryExists = existsSync(dir);

    if (!directoryExists) {
      // Create the directory recursively
      await mkdir(dir, { recursive: true });
    }

    const extention = extname(filePath);
    const acceptedExtensions = configuration.content.fileExtensions.map(
      (extention) => extname(extention)
    );

    if (!acceptedExtensions.includes(extention)) {
      throw new Error(
        `Invalid file extension: ${extention}, file: ${filePath}`
      );
    }

    if (extention === '.json') {
      const jsonDictionary = JSON.stringify(data, null, 2);

      // Write the file
      await writeFile(filePath, jsonDictionary);
    } else {
      await writeJSFile(filePath, data as unknown as Dictionary);
    }
  } catch (error) {
    throw new Error(`Error writing file to ${filePath}: ${error}`);
  }
};
