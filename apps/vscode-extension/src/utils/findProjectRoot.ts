import { dirname } from 'node:path';
import {
  configurationFilesCandidates,
  searchConfigurationFile,
} from '@intlayer/config/node';
import { window, workspace } from 'vscode';

const getActiveFilePath = () => window.activeTextEditor?.document.uri.fsPath;

/**
 * Find the intlayer project root for a given path (or the active editor's file
 * when no path is supplied). Uses `searchConfigurationFile` from `@intlayer/config`
 * which checks for all known intlayer config file names, so monorepo sub-projects
 * are resolved correctly even when intlayer is hoisted to the workspace root.
 */
export const findProjectRoot = (startPath?: string): string | undefined => {
  const resolvedPath = startPath ?? getActiveFilePath();

  if (!resolvedPath) {
    return undefined;
  }

  // searchConfigurationFile expects a directory; if we have a file path, go up one level
  const startDir =
    resolvedPath.includes('.') && !resolvedPath.endsWith('/')
      ? dirname(resolvedPath)
      : resolvedPath;

  const { configurationFilePath } = searchConfigurationFile(startDir);

  if (configurationFilePath) {
    return dirname(configurationFilePath);
  }

  return undefined;
};

/**
 * Discover all Intlayer project roots in the workspace.
 * Searches for intlayer config files first (most specific indicator), then
 * falls back to package.json files that list intlayer as a dependency.
 */
export const findAllProjectRoots = async (): Promise<string[]> => {
  const rootSet = new Set<string>();

  // Primary: directories that contain an intlayer config file
  const configPattern = `**/{${configurationFilesCandidates.join(',')}}`;
  const configUris = await workspace.findFiles(
    configPattern,
    '**/node_modules/**'
  );
  for (const uri of configUris) {
    rootSet.add(dirname(uri.fsPath));
  }

  // Fallback: package.json files that explicitly list intlayer as a dependency
  const packageJsonUris = await workspace.findFiles(
    '**/package.json',
    '**/node_modules/**'
  );
  for (const uri of packageJsonUris) {
    if (rootSet.has(dirname(uri.fsPath))) {
      continue; // already found via config file
    }
    try {
      const content = await workspace.fs.readFile(uri);
      const fileStr = new TextDecoder('utf-8').decode(content);
      const pkg = JSON.parse(fileStr);

      if (
        pkg?.dependencies?.intlayer ||
        pkg?.devDependencies?.intlayer ||
        pkg?.peerDependencies?.intlayer
      ) {
        rootSet.add(dirname(uri.fsPath));
      }
    } catch {}
  }

  return Array.from(rootSet);
};
