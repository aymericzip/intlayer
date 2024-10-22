import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';
import { getConfiguration } from '@intlayer/config';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import _ from 'lodash';
import { fetchDistantDictionaries } from './fetchDistantDictionaries';

type LoadDistantDictionariesOptions = {
  dictionaries?: string[];
  newDictionariesPath?: string;
  logPrefix?: string;
};

/**
 * Fetch distant dictionaries and write them in the intlayer dictionary folder
 */
export const loadDistantDictionaries = async (
  options?: LoadDistantDictionariesOptions
): Promise<string[]> => {
  try {
    const {
      content: { dictionariesDir },
    } = getConfiguration();
    const logPrefix = options?.logPrefix ?? '';
    const resultDictionaryPath: string[] = [];

    const distantDictionaries = await fetchDistantDictionaries(options);

    // Write the new dictionaries to the intlayer-dictionaries directory
    for (const distantDictionary of distantDictionaries) {
      try {
        const isDictionaryExist =
          typeof dictionariesRecord[distantDictionary.key] !== 'undefined';
        const dictionaryPath = `${dictionariesDir}/${distantDictionary.key}.json`;

        if (isDictionaryExist) {
          const existingDictionary = dictionariesRecord[distantDictionary.key];

          // Merge the existing dictionary with the distant dictionary
          // The locale dictionary have the priority from the distant one
          const mergedDictionaryContent = _.merge(
            distantDictionary,
            existingDictionary
          );

          await writeFile(
            dictionaryPath,
            JSON.stringify(mergedDictionaryContent, null, 2)
          );

          resultDictionaryPath.push(dictionaryPath);
        } else {
          await writeFileWithDirectories(
            dictionaryPath,
            JSON.stringify(distantDictionary, null, 2)
          );
        }
        resultDictionaryPath.push(dictionaryPath);
      } catch (error) {
        console.error(
          `${logPrefix}Error writing dictionary ${distantDictionary.key}:`,
          error
        );
      }
    }

    return resultDictionaryPath;
  } catch (error) {
    console.error(error);
    return [];
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
