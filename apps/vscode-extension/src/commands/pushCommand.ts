import { push } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import { loadContentDeclarations } from '@intlayer/engine/build';
import type { Dictionary } from '@intlayer/types';
import { window } from 'vscode';
import { findAllProjectRoots, findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import { selectLocalDictionaries } from '../utils/selectContentDeclaration';

export const pushCommand = async () => {
  let projectDir = findProjectRoot();

  if (!projectDir) {
    const roots = await findAllProjectRoots();
    if (roots.length === 1) {
      projectDir = roots[0];
    } else if (roots.length > 1) {
      const picked = await window.showQuickPick(roots, {
        placeHolder: 'Select the Intlayer project to push',
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
    const selectedDictionaries = await selectLocalDictionaries(projectDir);

    if (!selectedDictionaries || selectedDictionaries.length === 0) {
      window.showWarningMessage(`${prefix}No dictionary selected.`);
      return;
    }

    const configOptions = await getConfigurationOptions(projectDir);
    const configuration = getConfiguration(configOptions);

    const localDictionaries: Dictionary[] = await loadContentDeclarations(
      selectedDictionaries,
      configuration
    );

    await window.showInformationMessage(JSON.stringify(localDictionaries));
    const dictionariesKeys = localDictionaries.map(
      (dictionary) => dictionary.key
    );

    await window.showInformationMessage(`${prefix}Pushing dictionaries...`);

    await push({
      configOptions,
      dictionaries: dictionariesKeys,
    });

    await window.showInformationMessage(
      `${prefix} push completed successfully!`
    );
  } catch (error) {
    await window.showErrorMessage(
      `${prefix} push failed: ${(error as Error).message}`
    );
  }
};
