import { window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { prefix } from '../utils/logFunctions';

/**
 * The active editor's file and its Intlayer project. Shows an error and
 * returns `undefined` when there is no editor or the file is outside a project.
 */
export const getActiveFileProject = async (): Promise<
  { filePath: string; projectDir: string } | undefined
> => {
  const filePath = window.activeTextEditor?.document.uri.fsPath;

  if (!filePath) {
    await window.showErrorMessage(
      `${prefix}No active editor. Open a content declaration file.`
    );
    return undefined;
  }

  const projectDir = findProjectRoot(filePath);

  if (!projectDir) {
    await window.showErrorMessage(
      `${prefix}Could not find intlayer project root.`
    );
    return undefined;
  }

  return { filePath, projectDir };
};
