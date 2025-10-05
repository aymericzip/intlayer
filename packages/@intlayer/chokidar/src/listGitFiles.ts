import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getAppLogger } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import simpleGit from 'simple-git';

export type DiffMode = 'gitDiff' | 'uncommitted' | 'unpushed' | 'untracked';

const getGitRootDir = async (): Promise<string | null> => {
  try {
    const git = simpleGit();
    const rootDir = await git.revparse(['--show-toplevel']);
    return rootDir.trim();
  } catch (error) {
    const appLogger = getAppLogger(configuration);
    appLogger(`Error getting git root directory: ${error}`, {
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

export type ListGitLinesOptions = {
  mode: DiffMode[];
  baseRef?: string;
  currentRef?: string;
};

export const listGitLines = async (
  filePath: string,
  {
    mode,
    baseRef = 'origin/main',
    currentRef = 'HEAD', // HEAD points to the current branch's latest commit
  }: ListGitLinesOptions
): Promise<number[]> => {
  const git = simpleGit();
  // We collect **line numbers** (1-based) that were modified/added by the diff.
  // Using a Set ensures uniqueness when the same line is reported by several modes.
  const changedLines: Set<number> = new Set();

  /**
   * Extracts line numbers from a diff generated with `--unified=0`.
   * Each hunk header looks like: @@ -<oldStart>,<oldCount> +<newStart>,<newCount> @@
   * We consider both the "+" (new) side for additions and the "-" (old) side for deletions.
   * For deletions, we add the line before and after the deletion point in the current file.
   */
  const collectLinesFromDiff = (diffOutput: string) => {
    const hunkRegex = /@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/g;
    let match: RegExpExecArray | null;

    while ((match = hunkRegex.exec(diffOutput)) !== null) {
      const oldCount = match[2] ? Number(match[2]) : 1;
      const newStart = Number(match[3]);
      const newCount = match[4] ? Number(match[4]) : 1;

      // Handle additions/modifications (+ side)
      if (newCount > 0) {
        for (let i = 0; i < newCount; i++) {
          changedLines.add(newStart + i);
        }
      }

      // Handle deletions (- side)
      if (oldCount > 0 && newCount === 0) {
        // For deletions, add the line before and after the deletion point
        // The deletion point in the new file is at newStart
        if (newStart > 1) {
          changedLines.add(newStart - 1); // Line before deletion
        }
        changedLines.add(newStart); // Line after deletion (if it exists)
      }
    }
  };

  // 1. Handle untracked files – when a file is untracked its entire content is new.
  if (mode.includes('untracked')) {
    const status = await git.status();
    const isUntracked = status.not_added.includes(filePath);
    if (isUntracked) {
      try {
        const content = readFileSync(filePath, 'utf-8');
        content.split('\n').forEach((_, idx) => changedLines.add(idx + 1));
      } catch {
        // ignore read errors – file may have been deleted, etc.
      }
    }
  }

  // 2. Uncommitted changes (working tree vs HEAD)
  if (mode.includes('uncommitted')) {
    const diffOutput = await git.diff(['--unified=0', 'HEAD', '--', filePath]);
    collectLinesFromDiff(diffOutput);
  }

  // 3. Unpushed commits – compare local branch to its upstream
  if (mode.includes('unpushed')) {
    const diffOutput = await git.diff([
      '--unified=0',
      '@{push}...HEAD',
      '--',
      filePath,
    ]);
    collectLinesFromDiff(diffOutput);
  }

  // 4. Regular git diff between baseRef and currentRef (e.g., CI pull-request diff)
  if (mode.includes('gitDiff')) {
    await git.fetch(baseRef);
    const diffOutput = await git.diff([
      '--unified=0',
      `${baseRef}...${currentRef}`,
      '--',
      filePath,
    ]);
    collectLinesFromDiff(diffOutput);
  }

  // Return the list sorted for convenience
  return Array.from(changedLines).sort((a, b) => a - b);
};
