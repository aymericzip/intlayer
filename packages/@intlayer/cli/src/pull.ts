/* eslint-disable sonarjs/cognitive-complexity */
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { basename, dirname, extname, relative } from 'path';
import { getConfiguration } from '@intlayer/config';
import { intlayerAPI } from '@intlayer/design-system/libs';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import _ from 'lodash';

type PullOptions = {
  dictionaries?: string[];
  newDictionariesPath?: string;
};

const DEFAULT_NEW_DICTIONARY_PATH = 'intlayer-dictionaries';

export const pull = async (options: PullOptions): Promise<void> => {
  try {
    const {
      editor: { clientId, clientSecret, enabled },
      content: { baseDir },
    } = getConfiguration();

    if (!enabled) {
      throw new Error(
        'Intlayer editor is not enabled. Please enable it. See https://intlayer.org/doc/concept/editor'
      );
    }

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    const existingDictionariesKey: string[] = Object.keys(dictionariesRecord);

    const filters = options.dictionaries ? { ids: options.dictionaries } : {};

    const getDictionariesResult = await intlayerAPI.dictionary.getDictionaries(
      filters,
      { headers: { Authorization: `Bearer ${oAuth2AccessToken}` } }
    );

    if (!getDictionariesResult.data) {
      throw new Error('No distant dictionaries found');
    }

    const distantDictionaries = getDictionariesResult.data;

    const newDictionaryLocationPath =
      options.newDictionariesPath ?? DEFAULT_NEW_DICTIONARY_PATH;

    // Create a intlayer-dictionaries directory if it does not exist
    await mkdir(newDictionaryLocationPath, {
      recursive: true,
    });

    // Write the new dictionaries to the intlayer-dictionaries directory
    for (const distantDictionary of distantDictionaries) {
      const { filePath, ...distantDictionaryContent } = {
        filePath: undefined, // If filePath is not present in distantDictionary.content, it will be declared as undefined to avoid crash
        ...distantDictionary.content,
      };

      try {
        const isDictionaryExist = existingDictionariesKey.includes(
          distantDictionary.key
        );

        if (isDictionaryExist) {
          const existingDictionary = dictionariesRecord[distantDictionary.key];
          const { filePath, ...existingDictionaryContent } = {
            filePath: undefined, // If filePath is not present in distantDictionary.content, it will be declared as undefined to avoid crash
            ...existingDictionary,
          };

          // Merge the existing dictionary with the distant dictionary
          const mergedDictionaryContent = _.merge(
            existingDictionaryContent,
            distantDictionaryContent
          );

          if (filePath) {
            const isDictionaryJSON = filePath.endsWith('.json');

            if (isDictionaryJSON) {
              if (
                JSON.stringify(distantDictionaryContent) ===
                JSON.stringify(existingDictionaryContent)
              ) {
                console.info(
                  `Dictionary ${distantDictionary.key} is up to date`
                );
                continue; // Skip this dictionary and continue to the next one
              } else {
                // Write the dictionary to the same location of the existing dictionary file
                await writeFile(
                  `${baseDir}/${filePath}`,
                  JSON.stringify(mergedDictionaryContent, null, 2)
                );
                console.info(
                  `Dictionary ${distantDictionary.key} has been updated`
                );
              }
            } else {
              // Write the dictionary to the same location of the existing dictionary file by merging the content
              const dictionariesDirPath = dirname(filePath);
              const dictionariesFileName = basename(
                filePath,
                extname(filePath)
              );

              const newFilePath = `${baseDir}/${dictionariesDirPath}/${dictionariesFileName}.json`;

              await writeFile(
                newFilePath,
                JSON.stringify(mergedDictionaryContent, null, 2)
              );

              const relativePath = relative(baseDir, newFilePath);

              console.info(
                `Dictionary ${distantDictionary.key} exist locally but cannot be merged. A new file has been created at ${relativePath}`
              );
            }
          } else {
            // Write the dictionary to the intlayer-dictionaries directory
            const dictionaryPath = `${baseDir}/${distantDictionary.key}.content.json`;
            await writeFileWithDirectories(
              dictionaryPath,
              JSON.stringify(mergedDictionaryContent, null, 2)
            );
            console.info(
              `Dictionary ${distantDictionary.key} has been written`
            );
          }
        } else {
          const dictionaryPath = `${baseDir}/${distantDictionary.key}.content.json`;

          await writeFileWithDirectories(
            dictionaryPath,
            JSON.stringify(distantDictionaryContent, null, 2)
          );

          console.info(`Dictionary ${distantDictionary.key} has been written`);
        }
      } catch (error) {
        console.error(
          `Error writing dictionary ${distantDictionary.key}:`,
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
