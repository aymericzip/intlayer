import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { getLocalProjectName } from './getLocalProjectName';

const temporaryDirectories: string[] = [];

const createProjectRoot = (
  folderName: string,
  packageJson?: string
): string => {
  const parentDirectory = mkdtempSync(join(tmpdir(), 'intlayer-name-'));
  const projectRoot = join(parentDirectory, folderName);

  temporaryDirectories.push(parentDirectory);
  mkdirSync(projectRoot);

  if (packageJson !== undefined) {
    writeFileSync(join(projectRoot, 'package.json'), packageJson);
  }

  return projectRoot;
};

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('getLocalProjectName', () => {
  it('uses the package.json name without its scope', () => {
    const projectRoot = createProjectRoot(
      'folder',
      JSON.stringify({ name: '@acme/web-app' })
    );

    expect(getLocalProjectName(projectRoot, 'repository')).toBe('web-app');
  });

  it('falls back to the repository name', () => {
    const projectRoot = createProjectRoot('folder', '{ invalid json');

    expect(getLocalProjectName(projectRoot, 'repository')).toBe('repository');
  });

  it('falls back to the folder name', () => {
    const projectRoot = createProjectRoot('my-folder');

    expect(getLocalProjectName(projectRoot)).toBe('my-folder');
  });
});
