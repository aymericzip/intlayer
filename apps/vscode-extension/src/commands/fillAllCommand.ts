import { relative } from 'node:path';
import { fill } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import { listDictionaries, prepareIntlayer } from '@intlayer/engine/cli';
import { window } from 'vscode';
import { findAllProjectRoots, findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

export const fillCommand = async (dictionariesPath?: string[]) => {
  let projectDir = findProjectRoot();

  if (!projectDir) {
    const roots = await findAllProjectRoots();
    if (roots.length === 1) {
      projectDir = roots[0];
    } else if (roots.length > 1) {
      const picked = await window.showQuickPick(roots, {
        placeHolder: 'Select the Intlayer project to fill',
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

  try {
    const configOptions = await getConfigurationOptions(projectDir);
    const configuration = getConfiguration(configOptions);

    const dictionaries = await listDictionaries(configuration);

    if (!dictionaries.length) {
      window.showWarningMessage(`${prefix}No dictionaries available.`);
      return;
    }

    // Compute active file relative path to preselect if it is a content file
    const activeEditor = window.activeTextEditor;
    const activeRelativePath = activeEditor
      ? relative(projectDir, activeEditor.document.uri.fsPath)
      : undefined;

    let selectedDictionariesPath = dictionariesPath;

    if (!selectedDictionariesPath) {
      // Show a selection dialog with multiple choices
      const quickPickItems = dictionaries
        .map((path) => relative(projectDir, path))
        .map((dictionaryPath) => ({
          label: dictionaryPath,
          picked: dictionaryPath === activeRelativePath,
        }));

      // Place the preselected item(s) at the top of the list
      quickPickItems.sort((a, b) =>
        a.picked === b.picked ? 0 : a.picked ? -1 : 1
      );

      const selectedDictionaries = await window.showQuickPick(quickPickItems, {
        canPickMany: true,
        placeHolder: 'Select dictionaries to fill',
      });

      if (!selectedDictionaries || selectedDictionaries.length === 0) {
        window.showWarningMessage(`${prefix}No dictionary selected.`);
        return;
      }

      selectedDictionariesPath = selectedDictionaries.map(({ label }) => label);
    }

    await prepareIntlayer(configuration, { clean: false });

    for (const dictionary of selectedDictionariesPath) {
      await window.showInformationMessage(`${prefix}Filling ${dictionary}…`);

      await fill({
        configOptions,
        keys: dictionary,
        build: false,
      });
    }

    await window.showInformationMessage(
      `${prefix} fill completed successfully!`
    );
  } catch (error) {
    await window.showErrorMessage(
      `${prefix} fill failed: ${(error as Error).message}`
    );
  }
};
