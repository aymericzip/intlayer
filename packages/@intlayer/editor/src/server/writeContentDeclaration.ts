import { existsSync } from 'fs';
import * as fsPromises from 'fs/promises';
import { basename, dirname, extname } from 'path';
import { getConfiguration, IntlayerConfig } from '@intlayer/config/client';
import { DeclarationContent, Dictionary } from '@intlayer/core';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import deepEqual from 'deep-equal';
import { DictionaryStatus } from '../dictionaryStatus';

const DEFAULT_NEW_DICTIONARY_PATH = 'intlayer-dictionaries';

export const writeContentDeclaration = async (
  dictionary: Dictionary | DeclarationContent,
  config?: IntlayerConfig,
  newDictionariesPath?: string
): Promise<{ status: DictionaryStatus; path: string }> => {
  const {
    content: { baseDir },
  } = config ?? getConfiguration();

  const newDictionaryRelativeLocationPath =
    newDictionariesPath ?? DEFAULT_NEW_DICTIONARY_PATH;
  const newDictionaryLocationPath = `${baseDir}/${newDictionaryRelativeLocationPath}`;

  const existingDictionary = dictionariesRecord[dictionary.key];

  if (existingDictionary) {
    const { filePath, ...dictionaryWithoutPath } = dictionary;

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
          // Write the dictionary to the same location of the existing dictionary file
          await fsPromises.writeFile(
            contentDeclarationPath,
            JSON.stringify(
              {
                $schema: 'https://intlayer.org/schema.json',
                ...dictionaryWithoutPath,
              },
              null,
              2
            )
          );
          return { status: 'updated', path: contentDeclarationPath };
        } else {
          // Write the dictionary to the intlayer-dictionaries directory
          const dictionariesDirPath = dirname(filePath);
          const dictionariesFileName = basename(filePath, extname(filePath));

          const newFilePath = `${dictionariesDirPath}/${dictionariesFileName}.json`;

          await writeFileWithDirectories(
            newFilePath,
            JSON.stringify(dictionaryWithoutPath, null, 2)
          );

          return {
            status: 'updated',
            path: newFilePath,
          };
        }
      } else {
        // Write the dictionary to the intlayer-dictionaries directory
        const contentDeclarationPath = `${newDictionaryLocationPath}/${dictionary.key}.content.json`;
        await writeFileWithDirectories(
          contentDeclarationPath,
          JSON.stringify(dictionaryWithoutPath, null, 2)
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
      JSON.stringify(dictionary, null, 2)
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

    // Write the file
    await fsPromises.writeFile(filePath, data);
  } catch (error) {
    throw new Error(`Error writing file to ${filePath}: ${error}`);
  }
};
