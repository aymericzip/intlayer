import { basename } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { window } from 'vscode';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import { rebuildContentDeclaration } from '../utils/rebuildContentDeclaration';
import { getActiveFileProject } from './getActiveFileProject';

export const buildActiveDictionary = async () => {
  const activeFileProject = await getActiveFileProject();

  if (!activeFileProject) return;

  const { filePath, projectDir } = activeFileProject;

  try {
    const configuration = getConfiguration(
      await getConfigurationOptions(projectDir)
    );

    await rebuildContentDeclaration(filePath, configuration);

    await window.showInformationMessage(
      `${prefix}Build completed successfully for ${basename(filePath)}`
    );
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Single-dictionary build failed: ${(error as Error).message}`
    );
  }
};
