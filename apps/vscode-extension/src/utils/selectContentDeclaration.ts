import { join, relative } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { listDictionaries } from '@intlayer/engine/cli';
import { type QuickPickItem, window } from 'vscode';
import { getConfigurationOptions } from './getConfiguration';

export const selectLocalDictionaries = async (projectDir: string) => {
  const configOptions = await getConfigurationOptions(projectDir);
  const configuration = getConfiguration(configOptions);

  // Compute active file relative path to preselect if it is a content file
  const activeEditor = window.activeTextEditor;
  const activeRelativePath = activeEditor
    ? relative(projectDir, activeEditor.document.uri.fsPath)
    : undefined;

  const files: string[] = await listDictionaries(configuration);

  // Show a selection dialog with multiple choices
  const quickPickItems: QuickPickItem[] = files
    .map((filePath) => relative(projectDir, filePath))
    // map to quick pick item
    .map((filePath) => ({
      label: filePath,
      picked: filePath === activeRelativePath,
    }))
    // Place the preselected item(s) at the top of the list
    .sort((a, b) => (a.picked === b.picked ? 0 : a.picked ? -1 : 1));

  const selectedDictionaries = await window.showQuickPick(quickPickItems, {
    canPickMany: true,
    placeHolder: 'Select content declarations',
  });

  const selectedDictionariesPaths = selectedDictionaries?.map((dict) =>
    join(projectDir, dict.label)
  );

  return selectedDictionariesPaths;
};
