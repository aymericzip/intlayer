import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

/**
 * Suggested CMS project name for a local project: its `package.json` name
 * (without the npm scope), else the repository name, else the folder name.
 */
export const getLocalProjectName = (
  projectRoot: string,
  repositoryName?: string
): string => {
  const packageJsonPath = join(projectRoot, 'package.json');

  if (existsSync(packageJsonPath)) {
    try {
      const { name } = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
        name?: unknown;
      };

      if (typeof name === 'string' && name.trim()) {
        return name.replace(/^@[^/]+\//, '').trim();
      }
    } catch {
      // Unreadable package.json: fall back below
    }
  }

  return repositoryName || basename(projectRoot);
};
