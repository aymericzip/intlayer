import { fill } from '@intlayer/cli';
import { window } from 'vscode';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import { showFillResult } from '../utils/showFillResult';
import type { IntlayerTreeNode } from './dictionaryExplorer';

/** Fill the content declaration file of a tree file node. */
export const fillDictionary = async (node?: IntlayerTreeNode) => {
  if (node?.type !== 'file') {
    window.showWarningMessage(
      `${prefix}Fill is only available for unmerged dictionary files.`
    );
    return;
  }

  const { projectDir, filePath } = node;

  try {
    window.showInformationMessage(`${prefix}Filling ${filePath}…`);

    const fillResult = await fill({
      configOptions: await getConfigurationOptions(projectDir),
      file: filePath,
    });

    await showFillResult(fillResult, 'Fill', filePath);
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Fill failed: ${(error as Error).message}`
    );
  }
};
