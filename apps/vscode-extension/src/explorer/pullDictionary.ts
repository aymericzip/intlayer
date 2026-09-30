import { pull } from '@intlayer/cli';
import { window } from 'vscode';
import { pullCommand } from '../commands/pullCommand';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import type { IntlayerTreeNode } from './dictionaryExplorer';

/** Pull the remote version of a tree dictionary (or project) node. */
export const pullDictionary = async (node?: IntlayerTreeNode) => {
  // Project node: pick the dictionaries of that project
  if (node?.type === 'project') {
    await pullCommand(node);
    return;
  }

  if (node?.type !== 'dictionary') {
    window.showWarningMessage(
      `${prefix}Pull is only available for projects and dictionaries.`
    );
    return;
  }

  const { projectDir, key } = node;

  try {
    // Not awaited: it resolves only once the notification is closed
    window.showInformationMessage(`${prefix}Pulling ${key}…`);

    await pull({
      configOptions: await getConfigurationOptions(projectDir),
      dictionaries: [key],
    });

    await window.showInformationMessage(`${prefix}Pulled ${key}`);
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Pull failed: ${(error as Error).message}`
    );
  }
};
