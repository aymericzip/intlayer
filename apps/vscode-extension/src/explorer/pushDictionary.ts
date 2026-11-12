import { push } from '@intlayer/cli';
import { extractErrorMessage } from '@intlayer/config/utils';
import { window } from 'vscode';
import { pushCommand } from '../commands/pushCommand';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import type { IntlayerTreeNode } from './dictionaryExplorer';

/** Push a tree dictionary (or project) node to the CMS. */
export const pushDictionary = async (node?: IntlayerTreeNode) => {
  // Project node: pick the dictionaries of that project
  if (node?.type === 'project') {
    await pushCommand(node);
    return;
  }

  if (node?.type !== 'dictionary') {
    window.showWarningMessage(
      `${prefix}Push is only available for projects and dictionaries.`
    );
    return;
  }

  const { projectDir, key } = node;

  try {
    // Not awaited: it resolves only once the notification is closed
    window.showInformationMessage(`${prefix}Pushing ${key}…`);

    await push({
      configOptions: await getConfigurationOptions(projectDir),
      dictionaries: [key],
    });

    await window.showInformationMessage(`${prefix}Pushed ${key}`);
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Push failed: ${extractErrorMessage(error)}`
    );
  }
};
