/* eslint-disable sonarjs/cognitive-complexity */
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { basename, dirname, extname, relative } from 'path';
import { fetchDistantDictionaries } from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import _ from 'lodash';

type PullOptions = {
  dictionaries?: string[];
  newDictionariesPath?: string;
  logPrefix?: string;
};

const DEFAULT_NEW_DICTIONARY_PATH = 'intlayer-dictionaries';

/**
 * Fetch distant dictionaries and write them in the given filePath from the dictionary.
 * I no filePath provided, write the dictionary in the DEFAULT_NEW_DICTIONARY_PATH folder
 */
export const pull = async (options?: PullOptions): Promise<void> => {
  try {
    const {
      content: { baseDir },
    } = getConfiguration();
    const logPrefix = options?.logPrefix ?? '';

    const distantDictionaries = await fetchDistantDictionaries();

    const newDictionaryRelativeLocationPath =
      options?.newDictionariesPath ?? DEFAULT_NEW_DICTIONARY_PATH;
    const newDictionaryLocationPath = `${baseDir}/${newDictionaryRelativeLocationPath}`;

    const existingDictionariesKey: string[] = Object.keys(dictionariesRecord);

    // Write the new dictionaries to the intlayer-dictionaries directory
    for (const distantDictionary of distantDictionaries) {
      try {
        const isDictionaryExist = existingDictionariesKey.includes(
          distantDictionary.key
        );

        if (isDictionaryExist) {
          const existingDictionary = dictionariesRecord[distantDictionary.key];

          // Merge the existing dictionary with the distant dictionary
          const mergedDictionaryContent = _.merge(
            distantDictionary,
            existingDictionary
          );
          const { filePath } = existingDictionary;

          if (filePath) {
            const isDictionaryJSON = filePath.endsWith('.json');

            if (isDictionaryJSON) {
              if (
                JSON.stringify(existingDictionary) ===
                JSON.stringify(distantDictionary)
              ) {
                console.info(
                  `${logPrefix}Dictionary ${distantDictionary.key} is up to date`
                );
                continue; // Skip this dictionary and continue to the next one
              } else {
                // Write the dictionary to the same location of the existing dictionary file
                await writeFile(
                  `${baseDir}/${filePath}`,
                  JSON.stringify(mergedDictionaryContent, null, 2)
                );
                console.info(
                  `${logPrefix}Dictionary ${distantDictionary.key} has been updated`
                );
              }
            } else {
              // Write the dictionary to the same location of the existing dictionary file by merging the content
              const dictionariesDirPath = dirname(filePath);
              const dictionariesFileName = basename(
                filePath,
                extname(filePath)
              );

              const newFilePath = `${newDictionaryLocationPath}/${dictionariesDirPath}/${dictionariesFileName}.json`;

              await writeFile(
                newFilePath,
                JSON.stringify(mergedDictionaryContent, null, 2)
              );

              const relativePath = relative(baseDir, newFilePath);

              console.info(
                `${logPrefix}Dictionary ${distantDictionary.key} exist locally but cannot be merged. A new file has been created at ${relativePath}`
              );
            }
          } else {
            // Write the dictionary to the intlayer-dictionaries directory
            const dictionaryPath = `${newDictionaryLocationPath}/${distantDictionary.key}.content.json`;
            await writeFileWithDirectories(
              dictionaryPath,
              JSON.stringify(mergedDictionaryContent, null, 2)
            );
            console.info(
              `${logPrefix}Dictionary ${distantDictionary.key} has been written`
            );
          }
        } else {
          const dictionaryPath = `${newDictionaryLocationPath}/${distantDictionary.key}.content.json`;

          await writeFileWithDirectories(
            dictionaryPath,
            JSON.stringify(distantDictionary, null, 2)
          );

          console.info(
            `${logPrefix}Dictionary ${distantDictionary.key} has been written`
          );
        }
      } catch (error) {
        console.error(
          `${logPrefix}Error writing dictionary ${distantDictionary.key}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(error);
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

    // Write the file
    await writeFile(filePath, data);
  } catch (error) {
    console.error(`Error writing file to ${filePath}:`, error);
  }
};
