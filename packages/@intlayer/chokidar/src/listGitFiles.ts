import { getAppLogger } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { join } from 'path';
import simpleGit from 'simple-git';

export type DiffMode = 'gitDiff' | 'uncommitted' | 'unpushed' | 'untracked';

const getGitRootDir = async (): Promise<string | null> => {
  try {
    const git = simpleGit();
    const rootDir = await git.revparse(['--show-toplevel']);
    return rootDir.trim();
  } catch (error) {
    const appLogger = getAppLogger(configuration);
    appLogger('Error getting git root directory:' + error, {
      level: 'error',
    });
    return null;
  }
};

export type ListGitFilesOptions = {
  mode: DiffMode[];
  baseRef?: string;
  currentRef?: string;
  absolute?: boolean;
};

export const listGitFiles = async ({
  mode,
  baseRef = 'origin/main',
  currentRef = 'HEAD', // HEAD points to the current branch's latest commit
  absolute = true,
}: ListGitFilesOptions) => {
  try {
    const git = simpleGit();
    const diff: Set<string> = new Set();

    if (mode.includes('untracked')) {
      const status = await git.status();
      status.not_added.forEach((f) => diff.add(f));
    }

    if (mode.includes('uncommitted')) {
      // Get uncommitted changes
      const uncommittedDiff = await git.diff(['--name-only', 'HEAD']);

      const uncommittedFiles = uncommittedDiff.split('\n').filter(Boolean);

      uncommittedFiles.forEach((file) => diff.add(file));
    }

    if (mode.includes('unpushed')) {
      // Get unpushed commits
      const unpushedDiff = await git.diff(['--name-only', '@{push}...HEAD']);

      const unpushedFiles = unpushedDiff.split('\n').filter(Boolean);

      unpushedFiles.forEach((file) => diff.add(file));
    }

    if (mode.includes('gitDiff')) {
      // Get the base branch (usually main/master) from CI environment

      await git.fetch(baseRef);

      const diffBranch = await git.diff([
        '--name-only',
        `${baseRef}...${currentRef}`,
      ]);

      const gitDiffFiles = diffBranch.split('\n').filter(Boolean);

      gitDiffFiles.forEach((file) => diff.add(file));
    }

    if (absolute) {
      const gitRootDir = await getGitRootDir();
      if (!gitRootDir) {
        return [];
      }
      return Array.from(diff).map((file) => join(gitRootDir, file));
    }

    return Array.from(diff);
  } catch (error) {
    console.warn('Failed to get changes list:', error);
  }
};
