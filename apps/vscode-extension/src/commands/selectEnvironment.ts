import { readdirSync } from 'node:fs';
import { basename, relative } from 'node:path';
import { window, workspace } from 'vscode';
import type { DictionaryTreeDataProvider } from '../explorer/dictionaryExplorer';
import {
  getSelectedEnvironment,
  setSelectedEnvironment,
} from '../utils/envStore';
import { findAllProjectRoots, findProjectRoot } from '../utils/findProjectRoot';
import { prefix } from '../utils/logFunctions';

const wellKnownEnvs = ['production', 'development', 'test'];

const discoverEnvNames = (projectDir: string): string[] => {
  try {
    const files = readdirSync(projectDir);
    const names = new Set<string>();
    for (const f of files) {
      if (!f.startsWith('.env.')) {
        continue;
      }
      // strip prefix .env.
      const rest = f.slice(5);
      // remove optional .local suffix
      const name = rest.replace(/\.local$/, '');
      if (name && name !== 'local') {
        names.add(name);
      }
    }
    return Array.from(names);
  } catch {
    return [];
  }
};

export const selectEnvironment = async (
  projectDirFromContext: string | undefined,
  treeDataProvider?: DictionaryTreeDataProvider
) => {
  let projectDir = projectDirFromContext;
  if (!projectDir) {
    const roots = await findAllProjectRoots();

    if (!roots.length) {
      window.showWarningMessage(
        `${prefix}No Intlayer projects found in workspace.`
      );
      return;
    }
    const workspaceRoot = workspace.workspaceFolders?.[0]?.uri.fsPath;
    const currentProjectAbs = findProjectRoot();
    const orderedRoots = currentProjectAbs
      ? [currentProjectAbs, ...roots.filter((r) => r !== currentProjectAbs)]
      : roots;

    const items = orderedRoots.map((absPath) => {
      const relPath = workspaceRoot
        ? relative(workspaceRoot, absPath)
        : absPath;
      return {
        label: workspaceRoot ? (relPath ?? '.') : absPath,
        description: absPath,
      } as const;
    });
    const picked = await window.showQuickPick(items, {
      placeHolder: 'Select a project to configure environment',
    });
    if (!picked) {
      return;
    }
    projectDir = picked.description ?? picked.label;
  }

  if (!projectDir) {
    await window.showErrorMessage(`${prefix}No project directory selected.`);
    return;
  }

  const discovered = discoverEnvNames(projectDir);
  const existing = getSelectedEnvironment(projectDir);
  const options = Array.from(new Set<string>([...wellKnownEnvs, ...discovered]))
    .filter(Boolean)
    .map((env) => ({
      label: env,
      description: env === existing ? 'current' : undefined,
    }));

  const pickedEnv = await window.showQuickPick(options, {
    placeHolder: `Select environment for ${projectDir}`,
  });
  if (!pickedEnv) {
    return;
  }

  await setSelectedEnvironment(projectDir, pickedEnv.label);

  const projectName = basename(projectDir);
  await window.showInformationMessage(
    `${prefix}Environment set to "${pickedEnv.label}" for ${projectName}`
  );

  if (treeDataProvider) {
    treeDataProvider.refresh();
  }
};
