import { describe, expect, test } from 'bun:test';
import {
  findVersionMisalignments,
  getReleasedWorkspaces,
} from './check-version-alignment.ts';
import { readWorkspacePackage } from './npm-release-utils.ts';
import type { WorkspacePackage } from './npm-release-utils.ts';

const createWorkspace = (
  overrides: Partial<WorkspacePackage> & Pick<WorkspacePackage, 'name'>
): WorkspacePackage => ({
  version: '9.7.0',
  directory: `packages/${overrides.name}`,
  ...overrides,
});

describe('findVersionMisalignments', () => {
  test('accepts workspaces aligned on the root version', () => {
    const workspaces = [
      createWorkspace({ name: 'intlayer' }),
      createWorkspace({
        name: '@intlayer/babel',
        dependencies: { intlayer: 'workspace:*', picocolors: '1.1.1' },
        peerDependencies: { intlayer: 'workspace:^' },
      }),
    ];

    expect(findVersionMisalignments(workspaces, '9.7.0')).toEqual([]);
  });

  test('rejects a workspace drifting from the root version', () => {
    const workspaces = [
      createWorkspace({ name: 'intlayer' }),
      createWorkspace({ name: '@intlayer/babel', version: '9.7.1' }),
    ];

    expect(findVersionMisalignments(workspaces, '9.7.0')).toEqual([
      '@intlayer/babel (packages/@intlayer/babel) is at 9.7.1, expected 9.7.0',
    ]);
  });

  test('skips versionless private workspaces only', () => {
    const versionless = { version: undefined as unknown as string };
    const workspaces = [
      createWorkspace({ name: 'showcase', private: true, ...versionless }),
      createWorkspace({ name: 'published', ...versionless }),
    ];

    expect(findVersionMisalignments(workspaces, '9.7.0')).toEqual([
      'published (packages/published) is at no version, expected 9.7.0',
    ]);
  });

  test('rejects internal dependencies pinned to another version', () => {
    const workspaces = [
      createWorkspace({ name: 'intlayer' }),
      createWorkspace({
        name: '@intlayer/babel',
        optionalDependencies: { intlayer: '9.6.0' },
        devDependencies: { intlayer: '9.6.0' },
      } as Partial<WorkspacePackage> & Pick<WorkspacePackage, 'name'>),
    ];

    expect(findVersionMisalignments(workspaces, '9.7.0')).toEqual([
      '@intlayer/babel (packages/@intlayer/babel) pins optionalDependencies.intlayer to "9.6.0", use "workspace:*"',
    ]);
  });
});

describe('getReleasedWorkspaces', () => {
  const workspaces = getReleasedWorkspaces();
  const names = workspaces.map(({ name }) => name);

  test('covers npm packages and app release targets, not examples', () => {
    expect(names).toContain('intlayer');
    expect(names).toContain('@intlayer/babel');
    expect(names).toContain('intlayer-vs-code-extension');
    expect(
      workspaces.some(({ directory }) => directory.startsWith('examples/'))
    ).toBe(false);
  });

  test('the repository is aligned on the root version', () => {
    const { version } = readWorkspacePackage();

    expect(findVersionMisalignments(workspaces, version)).toEqual([]);
  });
});
