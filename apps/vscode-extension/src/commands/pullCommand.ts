import { getIntlayerAPIProxy } from '@intlayer/api';
import { pull } from '@intlayer/cli';
import { FILE_EXTENSIONS } from '@intlayer/config/defaultValues';
import { getConfiguration } from '@intlayer/config/node';
import type { Dictionary } from '@intlayer/types';
import { window } from 'vscode';
import { findAllProjectRoots, findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

export const pullCommand = async () => {
  let projectDir = findProjectRoot();

  if (!projectDir) {
    const roots = await findAllProjectRoots();
    if (roots.length === 1) {
      projectDir = roots[0];
    } else if (roots.length > 1) {
      const picked = await window.showQuickPick(roots, {
        placeHolder: 'Select the Intlayer project to pull',
      });
      if (!picked) return;
      projectDir = picked;
    } else {
      await window.showErrorMessage(
        `${prefix}Could not find intlayer project root.`
      );
      return;
    }
  }

  await window.showInformationMessage(`${prefix}Fetching dictionaries...`);

  try {
    const configOptions = await getConfigurationOptions(projectDir);
    const configuration = getConfiguration(configOptions);
    const apiProxy = getIntlayerAPIProxy(undefined, configuration);
    const dictionariesKeysResult =
      await apiProxy.dictionary.getDictionariesKeys();
    const dictionariesKeys = dictionariesKeysResult.data as Dictionary['key'][];

    if (!dictionariesKeys.length) {
      window.showWarningMessage(`${prefix}No dictionaries available.`);
      return;
    }

    // Try to preselect based on the active editor file name matching a dictionary key
    const activeEditor = window.activeTextEditor;
    const activeFileName = activeEditor
      ? activeEditor.document.uri.fsPath
      : undefined;

    const fileExtensions =
      configuration.content?.fileExtensions ?? FILE_EXTENSIONS;

    const quickPickItems = dictionariesKeys.map((dictionariesKey) => ({
      label: dictionariesKey,
      picked:
        !!activeFileName &&
        fileExtensions.some((ext) =>
          activeFileName.endsWith(`${dictionariesKey}${ext}`)
        ),
    }));

    // Place the preselected item(s) at the top of the list
    quickPickItems.sort((a, b) =>
      a.picked === b.picked ? 0 : a.picked ? -1 : 1
    );

    const selectedDictionaries = await window.showQuickPick(quickPickItems, {
      canPickMany: true,
      placeHolder: 'Select dictionaries to pull',
    });

    if (!selectedDictionaries || selectedDictionaries.length === 0) {
      window.showWarningMessage(`${prefix}No dictionary selected.`);
      return;
    }

    await window.showInformationMessage(`${prefix}Pulling...`);

    await pull({
      configOptions,
      dictionaries: selectedDictionaries.map((d) => d.label),
    });

    await window.showInformationMessage(
      `${prefix} pull completed successfully!`
    );
  } catch (error) {
    await window.showErrorMessage(
      `${prefix} pull failed: ${(error as Error).message}`
    );
  }
};
