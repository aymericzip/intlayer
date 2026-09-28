import { basename } from 'node:path';
import { fill } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import { prepareIntlayer } from '@intlayer/engine/cli';
import { window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

export const fillActiveDictionary = async () => {
  const editor = window.activeTextEditor;
  if (!editor) {
    await window.showErrorMessage(
      `${prefix}No active editor. Open a content declaration file.`
    );
    return;
  }

  const filePath = editor.document.uri.fsPath;
  const projectDir = findProjectRoot(filePath);

  if (!projectDir) {
    await window.showErrorMessage(
      `${prefix}Could not find intlayer project root.`
    );
    return;
  }

  const configOptions = await getConfigurationOptions(projectDir);
  const configuration = getConfiguration(configOptions);

  await prepareIntlayer(configuration, { clean: false });

  await fill({
    configOptions,
    file: filePath,
    build: false,
  });

  const fileName = basename(filePath);
  await window.showInformationMessage(
    `${prefix}Fill completed successfully for ${fileName}`
  );
};
