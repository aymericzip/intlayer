import { basename } from 'node:path';
import { window, workspace } from 'vscode';
import { runIntlayerCliInTerminal } from '../utils/runIntlayerCli';

/** Asks which project to initialize when several candidates are available. */
const pickProjectDir = async (
  projectDirs: string[]
): Promise<string | undefined> => {
  if (projectDirs.length <= 1) {
    return projectDirs[0];
  }

  const selectedProject = await window.showQuickPick(
    projectDirs.map((projectDir) => ({
      label: basename(projectDir),
      detail: workspace.asRelativePath(projectDir),
      projectDir,
    })),
    { placeHolder: 'Which project do you want to set up Intlayer in?' }
  );

  return selectedProject?.projectDir;
};

/**
 * Runs the interactive `intlayer init` CLI flow in an integrated terminal.
 *
 * @param projectDirs - Candidate project directories. Defaults to the
 * workspace folders.
 */
export const initProject = async (projectDirs?: string[]): Promise<void> => {
  const candidateDirs =
    projectDirs ??
    (workspace.workspaceFolders ?? []).map((folder) => folder.uri.fsPath);

  if (candidateDirs.length === 0) {
    await window.showErrorMessage('Open a project folder to set up Intlayer.');
    return;
  }

  const projectDir = await pickProjectDir(candidateDirs);

  if (!projectDir) {
    return;
  }

  runIntlayerCliInTerminal(projectDir, {
    terminalName: 'Intlayer init',
    args: ['init', '--interactive'],
    remote: true,
  });
};
