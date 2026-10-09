import { dirname, extname } from 'node:path';
import {
  configurationFilesCandidates,
  searchConfigurationFile,
} from '@intlayer/config/node';
import { window, workspace } from 'vscode';
import { prefix } from './logFunctions';

/**
 * Project root per start directory. Every hover, definition and decoration
 * pass resolves the project root, and each resolution walks the file system.
 * Cleared when an Intlayer configuration file is created or deleted.
 */
const projectRootByDirectory = new Map<string, string | undefined>();

export const clearProjectRootCache = (): void => {
  projectRootByDirectory.clear();
};

/**
 * Find the Intlayer project root for a given path (or the active editor's file
 * when no path is supplied). Uses `searchConfigurationFile` from
 * `@intlayer/config`, which checks every known configuration file name, so
 * monorepo sub-projects resolve correctly even when intlayer is hoisted.
 */
export const findProjectRoot = (startPath?: string): string | undefined => {
  const resolvedPath =
    startPath ?? window.activeTextEditor?.document.uri.fsPath;

  if (!resolvedPath) {
    return undefined;
  }

  // `searchConfigurationFile` expects a directory
  const startDirectory = extname(resolvedPath)
    ? dirname(resolvedPath)
    : resolvedPath;

  if (projectRootByDirectory.has(startDirectory)) {
    return projectRootByDirectory.get(startDirectory);
  }

  let configurationFilePath: string | undefined;

  try {
    ({ configurationFilePath } = searchConfigurationFile(startDirectory));
  } catch {
    // Throws when no package.json encloses the directory: not a project
  }

  const projectRoot = configurationFilePath
    ? dirname(configurationFilePath)
    : undefined;

  projectRootByDirectory.set(startDirectory, projectRoot);

  return projectRoot;
};

/** Whether a parsed package.json lists `intlayer` as a dependency. */
const dependsOnIntlayer = (packageJson: Record<string, any>): boolean =>
  Boolean(
    packageJson?.dependencies?.intlayer ||
      packageJson?.devDependencies?.intlayer ||
      packageJson?.peerDependencies?.intlayer
  );

/**
 * Discover all Intlayer project roots in the workspace.
 * Searches for intlayer config files first (most specific indicator), then
 * falls back to package.json files that list intlayer as a dependency.
 */
export const findAllProjectRoots = async (): Promise<string[]> => {
  const projectRoots = new Set<string>();

  const configurationFileUris = await workspace.findFiles(
    `**/{${configurationFilesCandidates.join(',')}}`,
    '**/node_modules/**'
  );

  for (const uri of configurationFileUris) {
    projectRoots.add(dirname(uri.fsPath));
  }

  const packageJsonUris = await workspace.findFiles(
    '**/package.json',
    '**/node_modules/**'
  );

  for (const uri of packageJsonUris) {
    const directory = dirname(uri.fsPath);

    if (projectRoots.has(directory)) continue;

    try {
      const content = await workspace.fs.readFile(uri);
      const packageJson = JSON.parse(new TextDecoder('utf-8').decode(content));

      if (dependsOnIntlayer(packageJson)) {
        projectRoots.add(directory);
      }
    } catch {
      // Unreadable or malformed package.json
    }
  }

  return [...projectRoots];
};

/** Where a command was invoked from. */
export type CommandSource = {
  /** Project of the tree node the command was invoked on. */
  projectDir?: string;
  /** File the command was invoked on (explorer / editor title menus). */
  filePath?: string;
};

/**
 * Project a command runs on: the invoking tree node's project, else the
 * project of the invoking file (or of the active editor), else the only
 * project of the workspace, else the one the user picks. Shows an error when
 * the workspace holds no Intlayer project.
 *
 * @param placeHolder - Quick pick prompt shown when several projects match.
 * @returns The project root, or `undefined` when none was found or picked.
 */
export const resolveProjectDirOrPick = async (
  placeHolder: string,
  source: CommandSource = {}
): Promise<string | undefined> => {
  const projectDir = source.projectDir ?? findProjectRoot(source.filePath);

  if (projectDir) {
    return projectDir;
  }

  const projectRoots = await findAllProjectRoots();

  if (projectRoots.length === 1) {
    return projectRoots[0];
  }

  if (projectRoots.length > 1) {
    return window.showQuickPick(projectRoots, { placeHolder });
  }

  await window.showErrorMessage(
    `${prefix}Could not find intlayer project root.`
  );

  return undefined;
};
