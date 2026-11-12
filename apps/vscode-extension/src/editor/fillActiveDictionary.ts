import { basename } from 'node:path';
import { fill } from '@intlayer/cli';
import { extractErrorMessage } from '@intlayer/config/utils';
import { window } from 'vscode';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import { showFillResult } from '../utils/showFillResult';
import { getActiveFileProject } from './getActiveFileProject';

export const fillActiveDictionary = async () => {
  const activeFileProject = await getActiveFileProject();

  if (!activeFileProject) return;

  const { filePath, projectDir } = activeFileProject;

  try {
    const fillResult = await fill({
      configOptions: await getConfigurationOptions(projectDir),
      file: filePath,
    });

    await showFillResult(fillResult, 'Fill', basename(filePath));
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Fill failed: ${extractErrorMessage(error)}`
    );
  }
};
