import { checkCMSAuth, getAuthenticatedAPI, pull } from '@intlayer/cli';
import { FILE_EXTENSIONS } from '@intlayer/config/defaultValues';
import { getConfiguration } from '@intlayer/config/node';
import { extractErrorMessage } from '@intlayer/config/utils';
import type { Dictionary } from '@intlayer/types';
import { window } from 'vscode';
import {
  type CommandSource,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import { sortPickedFirst } from '../utils/selectContentDeclaration';

export const pullCommand = async (source?: CommandSource) => {
  const projectDir = await resolveProjectDirOrPick(
    'Select the Intlayer project to pull',
    source
  );

  if (!projectDir) return;

  // Not awaited: it resolves only once the notification is closed
  window.showInformationMessage(`${prefix}Fetching dictionaries...`);

  try {
    const configurationOptions = await getConfigurationOptions(projectDir);
    const configuration = getConfiguration(configurationOptions);
    // Uses the CLI session or access key, else opens the browser to log in
    if (!(await checkCMSAuth(configuration))) {
      window.showErrorMessage(
        `${prefix}Not authenticated to the CMS. Run "Intlayer: Login".`
      );
      return;
    }

    const { data } = await (
      await getAuthenticatedAPI(configuration)
    ).dictionary.getDictionariesKeys();
    const dictionaryKeys = (data ?? []) as Dictionary['key'][];

    if (!dictionaryKeys.length) {
      window.showWarningMessage(`${prefix}No dictionaries available.`);
      return;
    }

    // Preselect the dictionary named after the active content file
    const activeFilePath = window.activeTextEditor?.document.uri.fsPath ?? '';
    const fileExtensions =
      configuration.content?.fileExtensions ?? FILE_EXTENSIONS;
    const isActiveContentFile = (dictionaryKey: string) =>
      fileExtensions.some((extension) =>
        activeFilePath.endsWith(`${dictionaryKey}${extension}`)
      );

    const pickedItems = await window.showQuickPick(
      sortPickedFirst(
        dictionaryKeys.map((dictionaryKey) => ({
          label: dictionaryKey,
          picked: isActiveContentFile(dictionaryKey),
        }))
      ),
      { canPickMany: true, placeHolder: 'Select dictionaries to pull' }
    );

    if (!pickedItems?.length) {
      window.showWarningMessage(`${prefix}No dictionary selected.`);
      return;
    }

    window.showInformationMessage(`${prefix}Pulling...`);

    await pull({
      configOptions: configurationOptions,
      dictionaries: pickedItems.map(({ label }) => label),
    });

    await window.showInformationMessage(
      `${prefix}Pull completed successfully!`
    );
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Pull failed: ${extractErrorMessage(error)}`
    );
  }
};
