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

export const buildActiveDictionary = async () => {
  const editor = window.activeTextEditor;

  if (!editor) {
    await window.showErrorMessage(
      `${prefix}No active editor. Open a content declaration file.`
    );
    return;
  }

  const filePath = editor.document.uri.fsPath;
  const projectDir = findProjectRoot(filePath);

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
    ).map((dictionary) => dictionary.dictionary);

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
};
