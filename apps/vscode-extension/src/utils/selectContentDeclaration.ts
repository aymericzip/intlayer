import { join, relative } from 'node:path';
import { listDictionaries } from '@intlayer/engine/cli';
import type { IntlayerConfig } from '@intlayer/types';
import { type QuickPickItem, window } from 'vscode';

/** Picked items first, keeping the original order otherwise. */
export const sortPickedFirst = <Item extends QuickPickItem>(
  items: Item[]
): Item[] =>
  [...items].sort(
    (first, second) => Number(second.picked) - Number(first.picked)
  );

/**
 * Let the user pick content declaration files of the project, the active
 * editor's file preselected.
 *
 * @returns Absolute paths of the picked files, or `undefined` when cancelled.
 */
export const pickContentDeclarationFiles = async (
  projectDir: string,
  configuration: IntlayerConfig,
  placeHolder: string
): Promise<string[] | undefined> => {
  const activeFilePath = window.activeTextEditor?.document.uri.fsPath;
  const activeRelativePath = activeFilePath
    ? relative(projectDir, activeFilePath)
    : undefined;

  const contentDeclarationFiles = await listDictionaries(configuration);

  const pickedItems = await window.showQuickPick(
    sortPickedFirst(
      contentDeclarationFiles.map((filePath) => {
        const relativePath = relative(projectDir, filePath);

        return {
          label: relativePath,
          picked: relativePath === activeRelativePath,
        };
      })
    ),
    { canPickMany: true, placeHolder }
  );

  return pickedItems?.map(({ label }) => join(projectDir, label));
};
