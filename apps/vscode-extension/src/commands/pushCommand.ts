import { push } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import { loadContentDeclarations } from '@intlayer/engine/build';
import { window } from 'vscode';
import {
  type CommandSource,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import { pickContentDeclarationFiles } from '../utils/selectContentDeclaration';

export const pushCommand = async (source?: CommandSource) => {
  const projectDir = await resolveProjectDirOrPick(
    'Select the Intlayer project to push',
    source
  );

  if (!projectDir) return;

  try {
    const configurationOptions = await getConfigurationOptions(projectDir);
    const configuration = getConfiguration(configurationOptions);

    const contentDeclarationFiles = await pickContentDeclarationFiles(
      projectDir,
      configuration,
      'Select content declarations to push'
    );

    if (!contentDeclarationFiles?.length) {
      window.showWarningMessage(`${prefix}No dictionary selected.`);
      return;
    }

    const localDictionaries = await loadContentDeclarations(
      contentDeclarationFiles,
      configuration
    );

    // Not awaited: it resolves only once the notification is closed
    window.showInformationMessage(`${prefix}Pushing dictionaries...`);

    await push({
      configOptions: configurationOptions,
      dictionaries: localDictionaries.map((dictionary) => dictionary.key),
    });

    await window.showInformationMessage(
      `${prefix}Push completed successfully!`
    );
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Push failed: ${(error as Error).message}`
    );
  }
};
