import { basename } from 'node:path';
import {
  detectPackageManager,
  findLockFileDir,
  type PackageManager,
} from '@intlayer/engine/cli';
import { window, workspace } from 'vscode';

/** Command prefix that runs a package binary without installing it. */
const PACKAGE_RUNNER_COMMANDS: Record<PackageManager, string> = {
  npm: 'npx',
  bun: 'bunx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn dlx',
};

/**
 * Builds the interactive `intlayer init` command for the package manager of
 * the project (resolved from the nearest lock file, so monorepo packages use
 * the workspace package manager).
 */
export const getInitCommand = (projectDir: string): string => {
  const packageManager = detectPackageManager(
    findLockFileDir(projectDir) ?? projectDir
  );

  return `${PACKAGE_RUNNER_COMMANDS[packageManager]} intlayer init --interactive`;
};

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

  const terminal = window.createTerminal({
    name: 'Intlayer init',
    cwd: projectDir,
  });

  terminal.show();
  terminal.sendText(getInitCommand(projectDir));
};
