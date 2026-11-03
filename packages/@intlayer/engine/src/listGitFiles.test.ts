import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { hasGitRef, readGitFile } from './listGitFiles';

const git = (cwd: string, ...args: string[]) =>
  execFileSync(
    'git',
    [
      '-c',
      'user.name=test',
      '-c',
      'user.email=test@example.com',
      '-c',
      'commit.gpgsign=false',
      ...args,
    ],
    { cwd, stdio: 'pipe' }
  );

describe('git helpers used by fill', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'list-git-files-'));
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  it('returns nothing outside a git repository', async () => {
    const filePath = join(testDir, 'home.content.json');
    await writeFile(filePath, '{"key":"home"}');

    expect(await hasGitRef('HEAD', testDir)).toBe(false);
    expect(await readGitFile(filePath)).toBe(undefined);
  });

  it('returns nothing in a repository without commits', async () => {
    git(testDir, 'init', '-q');

    expect(await hasGitRef('HEAD', testDir)).toBe(false);
  });

  it('reads the committed version of a file', async () => {
    const filePath = join(testDir, 'home.content.json');
    git(testDir, 'init', '-q');
    await writeFile(filePath, '{"title":"Hi"}');
    git(testDir, 'add', '.');
    git(testDir, 'commit', '-q', '-m', 'init');
    await writeFile(filePath, '{"title":"Hello"}');

    expect(await hasGitRef('HEAD', testDir)).toBe(true);
    expect(await readGitFile(filePath)).toBe('{"title":"Hi"}');
  });

  it('does not find the base branch in a shallow clone', async () => {
    const originDir = join(testDir, 'origin');
    const cloneDir = join(testDir, 'clone');
    git(testDir, 'init', '-q', '-b', 'main', originDir);
    await writeFile(join(originDir, 'home.content.json'), '{"title":"Hi"}');
    git(originDir, 'add', '.');
    git(originDir, 'commit', '-q', '-m', 'init');
    git(originDir, 'checkout', '-q', '-b', 'feature');
    await writeFile(join(originDir, 'home.content.json'), '{"title":"Hello"}');
    git(originDir, 'commit', '-q', '-am', 'edit');

    // Same history as actions/checkout with its default fetch-depth: 1
    git(
      testDir,
      'clone',
      '-q',
      '--depth',
      '1',
      '--branch',
      'feature',
      `file://${originDir}`,
      cloneDir
    );

    expect(await hasGitRef('HEAD', cloneDir)).toBe(true);
    expect(await hasGitRef('origin/main', cloneDir)).toBe(false);
  });
});
