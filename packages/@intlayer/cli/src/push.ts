/* eslint-disable sonarjs/cognitive-complexity */
import * as fsPromises from 'fs/promises';
import { relative } from 'path';
import * as readline from 'readline';
import { getConfiguration } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { intlayerAPI } from '@intlayer/design-system/libs';
import dictionariesRecord from '@intlayer/dictionaries-entry';

type PushOptions = {
  deleteLocaleDir?: boolean;
  keepLocaleDir?: boolean;
  dictionaries?: string[];
};

/**
 * Get all locale dictionaries (default: .content.{json|ts|tsx|js|jsx|mjs|cjs}). And push them as distant dictionary.
 */
export const push = async (options?: PushOptions): Promise<void> => {
  try {
    const { clientId, clientSecret } = getConfiguration().editor;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    let dictionaries: Dictionary[] = Object.values(dictionariesRecord);
    const existingDictionariesKeys: string[] = Object.keys(dictionariesRecord);

    if (options?.dictionaries) {
      // Check if the provided dictionaries exist
      const noneExistingDictionariesOption = options.dictionaries.filter(
        (dictionaryId) => !existingDictionariesKeys.includes(dictionaryId)
      );

      if (noneExistingDictionariesOption.length > 0) {
        console.error(
          `The following dictionaries do not exist: ${noneExistingDictionariesOption.join(
            ', '
          )} and have been ignored.`
        );
      }

      // Filter the dictionaries from the provided list of IDs
      dictionaries = dictionaries.filter((dictionary) =>
        options.dictionaries!.includes(dictionary.key)
      );
    }

    // Check if the dictionaries list is empty
    if (dictionaries.length === 0) {
      console.error('No local dictionaries found');
      return;
    }

    const dictionariesIds: string[] = dictionaries.map(
      (dictionary) => dictionary.key
    );

    console.info('Pushing dictionaries', dictionariesIds);

    // Push dictionaries and get the result
    const pushResult = await intlayerAPI.dictionary.pushDictionaries(
      dictionaries,
      {
        headers: {
          Authorization: `Bearer ${oAuth2AccessToken}`,
        },
      }
    );

    console.info('Dictionaries pushed');
    console.info(pushResult.data);

    if (!pushResult.data) {
      throw new Error('No data returned from the server');
    }

    const { updatedDictionaries, newDictionaries } = pushResult.data;

    // Extract successfully pushed dictionaries
    const successfullyPushedDictionariesIds = [
      ...updatedDictionaries,
      ...newDictionaries,
    ];

    const successfullyPushedDictionaries = dictionaries.filter((dictionary) =>
      successfullyPushedDictionariesIds.includes(dictionary.key)
    );

    // Handle delete or keep options
    const deleteOption = options?.deleteLocaleDir;
    const keepOption = options?.keepLocaleDir;

    if (deleteOption && keepOption) {
      throw new Error(
        'Cannot specify both --deleteLocaleDir and --keepLocaleDir options.'
      );
    }

    if (deleteOption) {
      // Delete only the successfully pushed dictionaries
      await deleteLocalDictionaries(successfullyPushedDictionaries);
    } else if (keepOption) {
      // Do nothing, keep the local dictionaries
    } else {
      // Ask the user
      const answer = await askUser(
        'Do you want to delete the local dictionaries that were successfully pushed? (yes/no): '
      );
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        await deleteLocalDictionaries(successfullyPushedDictionaries);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const askUser = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
};

const deleteLocalDictionaries = async (
  dictionariesToDelete: Dictionary[]
): Promise<void> => {
  const { baseDir } = getConfiguration().content;

  // Use a Set to collect all unique file paths
  const filePathsSet: Set<string> = new Set();

  for (const dictionary of dictionariesToDelete) {
    const { filePath } = dictionary;

    if (!filePath) {
      console.error(`Dictionary ${dictionary.key} does not have a file path`);
      continue;
    }

    filePathsSet.add(filePath);
  }

  for (const filePath of filePathsSet) {
    const relativePath = relative(baseDir, filePath);

    try {
      const stats = await fsPromises.lstat(filePath);

      if (stats.isFile()) {
        await fsPromises.unlink(filePath);
        console.info(`Deleted file ${relativePath}`);
      } else if (stats.isDirectory()) {
        console.warn(`Path is a directory ${relativePath}, skipping.`);
      } else {
        console.warn(`Unknown file type for ${relativePath}, skipping.`);
      }
    } catch (err) {
      console.error(`Error deleting ${relativePath}:`, err);
    }
  }
};
