// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import {
  ESMxCJSRequire,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { fetchDistantDictionaryKeys } from '../fetchDistantDictionaryKeys';
import { logger } from '../log';
import { sortAlphabetically } from '../utils';
import { loadContentDeclarations } from './loadContentDeclaration';
import { loadDistantDictionaries } from './loadDistantDictionaries';

export const loadDictionaries = async (
  contentDeclarationsPaths: string[] | string,
  configuration = getConfiguration(),
  projectRequire = ESMxCJSRequire
): Promise<Dictionary[]> => {
  try {
    const appLogger = getAppLogger(configuration);
    const { editor } = configuration;

    appLogger('Dictionaries:', { isVerbose: true });

    const files = Array.isArray(contentDeclarationsPaths)
      ? contentDeclarationsPaths
      : [contentDeclarationsPaths];

    const localDictionaries: Dictionary[] = await loadContentDeclarations(
      files,
      projectRequire
    );

    const filteredLocalDictionaries = localDictionaries.filter((dict) => {
      const hasKey = Boolean(dict.key);
      const hasContent = Boolean(dict.content);

      if (!hasContent) {
        console.error(
          'Content declaration has no exported content',
          dict.filePath
        );
      } else if (!hasKey) {
        console.error('Content declaration has no key', dict.filePath);
      }

      return hasKey && hasContent;
    });

    const localDictionaryKeys = filteredLocalDictionaries
      .map((dict) => dict.key)
      .filter(Boolean); // Remove empty or undefined keys

    // Initialize the logger with both local and distant dictionaries
    logger.init(localDictionaryKeys, []);

    // Update logger statuses for local dictionaries
    logger.updateStatus(
      filteredLocalDictionaries.map((dict) => ({
        dictionaryKey: dict.key,
        type: 'local',
        status: { status: 'built' },
      }))
    );

    let distantDictionaries: DictionaryAPI[] = [];
    let distantDictionaryKeys: string[] = [];

    if (editor.clientId && editor.clientSecret) {
      try {
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
      } catch (_error) {
        appLogger('Error during fetching distant dictionaries', {
          level: 'error',
        });
      }
    }

    // Ensure the logger is stopped
    logger.stop();

    return [...filteredLocalDictionaries, ...distantDictionaries];
  } catch (error) {
    // Ensure the logger is stopped
    logger.stop();

    throw error; // Re-throw the error after logging
  }
};
