import { existsSync } from 'fs';
import * as fsPromises from 'fs/promises';
import { basename, dirname, extname } from 'path';
import type { IntlayerConfig } from '@intlayer/config/client';
import { prepareContentDeclaration } from '@intlayer/chokidar';
import configuration from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/core';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import deepEqual from 'deep-equal';
import type { DictionaryStatus } from './dictionaryStatus';

const DEFAULT_NEW_DICTIONARY_PATH = 'intlayer-dictionaries';

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

  const existingDictionary = dictionariesRecord[dictionary.key];

  const preparedContentDeclaration =
    await prepareContentDeclaration(dictionary);

  const { filePath, $schema, ...dictionaryWithoutPath } =
    preparedContentDeclaration;
  const formattedContentDeclaration = {
    $schema: 'https://intlayer.org/schema.json',
    ...dictionaryWithoutPath,
  };

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
        const isDictionaryJSON = filePath.endsWith('.json');

        if (isDictionaryJSON) {
          const contentDeclarationPath = `${baseDir}/${filePath}`;

          await writeFileWithDirectories(
            contentDeclarationPath,
            formattedContentDeclaration
          );
          return { status: 'updated', path: contentDeclarationPath };
        } else {
          // Remove the existing dictionary file
          await fsPromises.rm(filePath);

          // Write the dictionary to the intlayer-dictionaries directory
          const dictionariesDirPath = dirname(filePath);
          const dictionariesFileName = basename(filePath, extname(filePath));

          const newFilePath = `${dictionariesDirPath}/${dictionariesFileName}.json`;

          await writeFileWithDirectories(
            newFilePath,
            formattedContentDeclaration
          );

          return {
            status: 'replaced',
            path: newFilePath,
          };
        }
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
      await fsPromises.mkdir(dir, { recursive: true });
    }

    const jsonDictionary = JSON.stringify(data, null, 2);

    // Write the file
    await fsPromises.writeFile(filePath, jsonDictionary);
  } catch (error) {
    throw new Error(`Error writing file to ${filePath}: ${error}`);
  }
};
