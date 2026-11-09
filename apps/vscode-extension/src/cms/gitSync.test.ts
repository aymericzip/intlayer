import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  commitFiles,
  getLastCommitTime,
  getRepositoryReadiness,
  getRepositoryRoot,
  hasUncommittedChanges,
  SYNC_COMMIT_AUTHOR,
} from './gitSync';

const git = (workingDirectory: string, ...gitArguments: string[]): string =>
  execFileSync('git', gitArguments, { cwd: workingDirectory })
    .toString()
    .trim();

/** Commits as a test identity, without touching the global git config. */
const commitAll = (workingDirectory: string, message: string): void => {
  git(workingDirectory, 'add', '--all');
  git(
    workingDirectory,
    '-c',
    'user.name=Developer',
    '-c',
    'user.email=developer@example.com',
    'commit',
    '--quiet',
    '--message',
    message
  );
};

describe('gitSync', () => {
  let sandboxDirectory: string;
  let upstreamDirectory: string;
  let repositoryDirectory: string;

  beforeEach(() => {
    sandboxDirectory = mkdtempSync(join(tmpdir(), 'intlayer-git-sync-'));
    upstreamDirectory = join(sandboxDirectory, 'upstream.git');
    repositoryDirectory = join(sandboxDirectory, 'repository');

    git(
      sandboxDirectory,
      'init',
      '--quiet',
      '--bare',
      '--initial-branch=main',
      upstreamDirectory
    );
    git(sandboxDirectory, 'clone', '--quiet', upstreamDirectory, 'repository');
    git(repositoryDirectory, 'checkout', '--quiet', '-b', 'main');
    writeFileSync(join(repositoryDirectory, 'home.content.json'), '{}');
    commitAll(repositoryDirectory, 'initial');
    git(repositoryDirectory, 'push', '--quiet', '-u', 'origin', 'main');
  });

  afterEach(() => {
    rmSync(sandboxDirectory, { recursive: true, force: true });
  });

  it('finds the repository root', async () => {
    expect(await getRepositoryRoot(repositoryDirectory)).toBeTruthy();
    expect(await getRepositoryRoot(sandboxDirectory)).toBeUndefined();
  });

  it('is ready on a branch up to date with its upstream', async () => {
    expect(await getRepositoryReadiness(repositoryDirectory)).toEqual({
      status: 'ready',
    });
  });

  it('is not ready on a branch behind its upstream', async () => {
    const otherCloneDirectory = join(sandboxDirectory, 'other');

    git(sandboxDirectory, 'clone', '--quiet', upstreamDirectory, 'other');
    writeFileSync(join(otherCloneDirectory, 'about.content.json'), '{}');
    commitAll(otherCloneDirectory, 'add about');
    git(otherCloneDirectory, 'push', '--quiet', 'origin', 'main');

    const readiness = await getRepositoryReadiness(repositoryDirectory);

    expect(readiness.status).toBe('not-ready');
  });

  it('is not ready without an upstream or with a detached HEAD', async () => {
    git(repositoryDirectory, 'checkout', '--quiet', '-b', 'feature');
    expect((await getRepositoryReadiness(repositoryDirectory)).status).toBe(
      'not-ready'
    );

    git(repositoryDirectory, 'checkout', '--quiet', '--detach');
    expect((await getRepositoryReadiness(repositoryDirectory)).status).toBe(
      'not-ready'
    );
  });

  it('detects uncommitted changes and the last commit time', async () => {
    const filePath = join(repositoryDirectory, 'home.content.json');

    expect(await hasUncommittedChanges(repositoryDirectory, filePath)).toBe(
      false
    );
    expect(await getLastCommitTime(repositoryDirectory, filePath)).toEqual(
      expect.any(Number)
    );

    writeFileSync(filePath, '{"key":"home"}');

    expect(await hasUncommittedChanges(repositoryDirectory, filePath)).toBe(
      true
    );
    expect(
      await getLastCommitTime(repositoryDirectory, 'missing.json')
    ).toBeUndefined();
  });

  it('commits only the changed given files, as the bot', async () => {
    const syncedFilePath = join(repositoryDirectory, 'home.content.json');
    const unchangedFilePath = join(repositoryDirectory, 'about.content.json');
    const stagedFilePath = join(repositoryDirectory, 'work.ts');

    writeFileSync(unchangedFilePath, '{}');
    commitAll(repositoryDirectory, 'add about');
    writeFileSync(syncedFilePath, '{"key":"home"}');
    writeFileSync(stagedFilePath, 'export {};');
    git(repositoryDirectory, 'add', 'work.ts');

    const committedFilePaths = await commitFiles(
      repositoryDirectory,
      [syncedFilePath, unchangedFilePath],
      (changedFilePaths) => `sync ${changedFilePaths.length}`
    );

    expect(committedFilePaths).toEqual([syncedFilePath]);
    expect(git(repositoryDirectory, 'log', '-1', '--format=%an <%ae>|%s')).toBe(
      `${SYNC_COMMIT_AUTHOR.name} <${SYNC_COMMIT_AUTHOR.email}>|sync 1`
    );
    expect(
      git(repositoryDirectory, 'show', '--name-only', '--format=', 'HEAD')
    ).toBe('home.content.json');
    // The developer's staged work stays staged, out of the commit
    expect(git(repositoryDirectory, 'diff', '--cached', '--name-only')).toBe(
      'work.ts'
    );
  });

  it('commits nothing when no file changed', async () => {
    const headBefore = git(repositoryDirectory, 'rev-parse', 'HEAD');

    expect(
      await commitFiles(
        repositoryDirectory,
        [join(repositoryDirectory, 'home.content.json')],
        () => 'sync'
      )
    ).toEqual([]);
    expect(git(repositoryDirectory, 'rev-parse', 'HEAD')).toBe(headBefore);
  });
});
