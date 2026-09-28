import { dirname } from 'node:path';
import { fill } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import { prepareIntlayer } from '@intlayer/engine/cli';
import { window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

export const fillDictionary = async (element?: unknown) => {
  const node = element as {
    type?: string;
    filePath?: string;
    projectDir?: string;
  };

  // Fill can only be made for unmerged dictionaries (file nodes with filePath)
  if (node?.type !== 'file' || !node.projectDir || !node.filePath) {
    window.showWarningMessage(
      `${prefix}Fill is only available for unmerged dictionary files.`
    );
    return;
  }

  const projectDir = findProjectRoot();
  if (!projectDir) {
    await window.showErrorMessage(
      `${prefix}Could not find intlayer project root.`
    );
    return;
  }

  try {
    const configOptions = await getConfigurationOptions(projectDir);
    const configuration = getConfiguration(configOptions);

    await prepareIntlayer(configuration, { clean: false });

    await window.showInformationMessage(
      `${prefix}Filling ${dirname(node.filePath)}…`
    );
    await fill({
      configOptions,
      file: node.filePath,
      build: false,
    });
    await window.showInformationMessage(`${prefix}Filled ${node.filePath}`);
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Fill failed: ${(error as Error).message}`
    );
  }
};
