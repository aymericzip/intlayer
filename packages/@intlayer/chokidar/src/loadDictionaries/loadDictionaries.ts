// @ts-ignore @intlayer/backend not build yet
import { type DictionaryAPI } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import merge from 'deepmerge';
import { fetchDistantDictionaryKeys } from '../fetchDistantDictionaryKeys';
import { logger } from '../log';
import { mergeByKey } from '../mergeDictionaries';
import { sortAlphabetically } from '../utils';
import { loadContentDeclarations } from './loadContentDeclaration';
import { loadDistantDictionaries } from './loadDistantDictionaries';

const LOG_PREFIX = '[intlayer] ';

export const loadDictionaries = async (
  contentDeclarationsPaths: string[] | string
): Promise<Dictionary[]> => {
  try {
    const { editor } = getConfiguration();

    console.info(`${LOG_PREFIX}Dictionaries:`);

    const files = Array.isArray(contentDeclarationsPaths)
      ? contentDeclarationsPaths
      : [contentDeclarationsPaths];

    const localDictionaries: Dictionary[] =
      await loadContentDeclarations(files);
    const localDictionaryKeys = localDictionaries.map((dict) => dict.key);

    // Initialize the logger with both local and distant dictionaries
    logger.init(localDictionaryKeys, []);

    // Update logger statuses for local dictionaries
    for (const dict of localDictionaries) {
      logger.updateStatus(dict.key, 'local', { status: 'built' });
    }

    let distantDictionaries: DictionaryAPI[] = [];
    let distantDictionaryKeys: string[] = [];
    let mergedDictionaries = localDictionaries;

    if (editor.clientId && editor.clientSecret) {
      // Fetch distant dictionary keys
      distantDictionaryKeys = await fetchDistantDictionaryKeys();

      const orderedDistantDictionaryKeys =
        distantDictionaryKeys.sort(sortAlphabetically);
      // Add distant dictionaries to the logger
      logger.addDictionaryKeys('distant', orderedDistantDictionaryKeys);

      // Fetch distant dictionaries
      distantDictionaries = await loadDistantDictionaries({
        dictionaryKeys: orderedDistantDictionaryKeys,
      });
      if (editor.dictionaryPriorityStrategy === 'distant_first') {
        // Merge the dictionaries
        mergedDictionaries = merge(localDictionaries, distantDictionaries, {
          arrayMerge: mergeByKey('key'),
        });
      } else {
        // Merge the dictionaries
        mergedDictionaries = merge(distantDictionaries, localDictionaries, {
          arrayMerge: mergeByKey('key'),
        });
      }
    }

    // Ensure the logger is stopped
    logger.stop();

    return mergedDictionaries;
  } catch (error) {
    // Ensure the logger is stopped
    logger.stop();

    throw error; // Re-throw the error after logging
  }
};
