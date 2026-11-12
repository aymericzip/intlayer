import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

/** Identity of the commits the extension makes for the developer. */
export const SYNC_COMMIT_AUTHOR = {
  name: 'Intlayer Bot',
  email: 'bot@intlayer.org',
} as const;

/** Files git writes while a merge, rebase, cherry-pick or revert is paused. */
const IN_PROGRESS_OPERATION_FILES = [
  'MERGE_HEAD',
  'rebase-merge',
  'rebase-apply',
  'CHERRY_PICK_HEAD',
  'REVERT_HEAD',
] as const;

/** Whether the working branch can receive a sync commit, else why not. */
export type RepositoryReadiness =
  | { status: 'ready' }
  | { status: 'not-ready'; reason: string };

/**
 * Runs git in `workingDirectory`. Credential prompts are disabled: a fetch
 * needing them fails instead of hanging the extension host.
 */
const runGit = async (
  workingDirectory: string,
  gitArguments: string[]
): Promise<string> => {
  const { stdout } = await execFileAsync('git', gitArguments, {
    cwd: workingDirectory,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });

  return stdout.trim();
};

/** Same as `runGit`, resolving `undefined` instead of throwing. */
const tryRunGit = async (
  workingDirectory: string,
  gitArguments: string[]
): Promise<string | undefined> => {
  try {
    return await runGit(workingDirectory, gitArguments);
  } catch {
    return undefined;
  }
};

/** Root of the git repository containing `directory`, if any. */
export const getRepositoryRoot = (
  directory: string
): Promise<string | undefined> =>
  tryRunGit(directory, ['rev-parse', '--show-toplevel']);

/** Name of the merge, rebase… left paused in the repository, if any. */
const getInProgressOperation = async (
  repositoryRoot: string
): Promise<string | undefined> => {
  for (const operationFile of IN_PROGRESS_OPERATION_FILES) {
    const operationPath = await tryRunGit(repositoryRoot, [
      'rev-parse',
      '--git-path',
      operationFile,
    ]);

    if (operationPath && existsSync(resolve(repositoryRoot, operationPath))) {
      return operationFile;
    }
  }

  return undefined;
};

/**
 * Checks the working branch is a named branch with an upstream, no paused
 * operation, and no upstream commit missing locally (after a fetch).
 */
export const getRepositoryReadiness = async (
  repositoryRoot: string
): Promise<RepositoryReadiness> => {
  const branch = await tryRunGit(repositoryRoot, [
    'symbolic-ref',
    '--quiet',
    '--short',
    'HEAD',
  ]);

  if (!branch) {
    return { status: 'not-ready', reason: 'HEAD is detached' };
  }

  const inProgressOperation = await getInProgressOperation(repositoryRoot);

  if (inProgressOperation) {
    return {
      status: 'not-ready',
      reason: `an operation is in progress (${inProgressOperation})`,
    };
  }

  const upstream = await tryRunGit(repositoryRoot, [
    'rev-parse',
    '--abbrev-ref',
    '--symbolic-full-name',
    '@{upstream}',
  ]);

  if (!upstream) {
    return {
      status: 'not-ready',
      reason: `branch "${branch}" has no upstream`,
    };
  }

  const fetchOutput = await tryRunGit(repositoryRoot, ['fetch', '--quiet']);

  if (fetchOutput === undefined) {
    return { status: 'not-ready', reason: `fetching "${upstream}" failed` };
  }

  const behindCount = Number(
    await runGit(repositoryRoot, ['rev-list', '--count', 'HEAD..@{upstream}'])
  );

  if (behindCount > 0) {
    return {
      status: 'not-ready',
      reason: `branch "${branch}" is ${behindCount} commit(s) behind "${upstream}"`,
    };
  }

  return { status: 'ready' };
};

/** Whether a file has staged, unstaged or untracked changes. */
export const hasUncommittedChanges = async (
  repositoryRoot: string,
  filePath: string
): Promise<boolean> =>
  Boolean(
    await runGit(repositoryRoot, ['status', '--porcelain', '--', filePath])
  );

/** Time of the last commit touching a file, in ms; `undefined` if none. */
export const getLastCommitTime = async (
  repositoryRoot: string,
  filePath: string
): Promise<number | undefined> => {
  const commitSeconds = await runGit(repositoryRoot, [
    'log',
    '-1',
    '--format=%ct',
    '--',
    filePath,
  ]);

  return commitSeconds ? Number(commitSeconds) * 1000 : undefined;
};

/**
 * Commits the changed files among `filePaths` as the Intlayer bot. Only those
 * paths are committed: anything else the developer staged stays staged.
 * Commit hooks are skipped, they would lint or format the developer's work.
 *
 * @param getMessage - Builds the commit message from the changed files.
 *
 * @returns The files committed (none when nothing changed).
 */
export const commitFiles = async (
  repositoryRoot: string,
  filePaths: string[],
  getMessage: (changedFilePaths: string[]) => string
): Promise<string[]> => {
  const changedFilePaths: string[] = [];

  for (const filePath of filePaths) {
    if (await hasUncommittedChanges(repositoryRoot, filePath)) {
      changedFilePaths.push(filePath);
    }
  }

  if (!changedFilePaths.length) return [];

  await runGit(repositoryRoot, ['add', '--', ...changedFilePaths]);
  await runGit(repositoryRoot, [
    '-c',
    `user.name=${SYNC_COMMIT_AUTHOR.name}`,
    '-c',
    `user.email=${SYNC_COMMIT_AUTHOR.email}`,
    'commit',
    '--no-verify',
    '--quiet',
    '--message',
    getMessage(changedFilePaths),
    '--',
    ...changedFilePaths,
  ]);

  return changedFilePaths;
};
