import { basename } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import {
  buildDictionary,
  createTypes,
  loadLocalDictionaries,
} from '@intlayer/engine/build';
import { window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

export const buildDictionaryList = async (filePaths?: string[]) => {
  if (!filePaths) {
    filePaths = [];
  }

  for (const filePath of filePaths) {
    const projectDir = findProjectRoot(filePath[0]);

    if (!projectDir) {
      await window.showErrorMessage(
        `${prefix}Could not find intlayer project root.`
      );
      return;
    }

    const configOptions = await getConfigurationOptions(projectDir);
    const config = getConfiguration(configOptions);

    try {
      const localeDictionaries = await loadLocalDictionaries(filePath, config);
      const dictionariesOutput = await buildDictionary(
        localeDictionaries,
        config
      );

      const updatedDictionaries = Object.values(
        dictionariesOutput?.mergedDictionaries ?? {}
      ).map((dictionaryElement) => dictionaryElement.dictionary);

      await createTypes(updatedDictionaries, config);

      const fileName = basename(filePath);
      await window.showInformationMessage(
        `${prefix}Build completed successfully for ${fileName}`
      );
    } catch (error) {
      await window.showErrorMessage(
        `${prefix} single-dictionary build failed: ${(error as Error).message}`
      );
    }
  }
};
