import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { prepareStandaloneWorkspace } from './prepareStandaloneWorkspace';

const fixtureRoot = join(import.meta.dirname, '.tmp-standalone-fixture');

/** Writes a JSON manifest, creating parent directories as needed. */
const writeFixtureManifest = async (
  relativePath: string,
  manifest: Record<string, unknown>
): Promise<void> => {
  const directory = join(fixtureRoot, relativePath);

  await mkdir(directory, { recursive: true });
  await writeFile(
    join(directory, 'package.json'),
    JSON.stringify(manifest, null, 2)
  );
};

/** Reads a JSON manifest back from the fixture tree. */
const readFixtureManifest = async (
  relativePath: string
): Promise<Record<string, any>> =>
  JSON.parse(
    await readFile(join(fixtureRoot, relativePath, 'package.json'), 'utf8')
  );

describe('prepareStandaloneWorkspace', () => {
  beforeEach(async () => {
    await rm(fixtureRoot, { recursive: true, force: true });

    await writeFixtureManifest('.', {
      name: 'root',
      private: false,
      workspaces: ['./apps/*', './packages/**/*', './utils/*'],
      scripts: { build: 'turbo build' },
      devDependencies: { turbo: '2.0.0' },
      resolutions: { react: '19.2.8' },
    });

    await writeFixtureManifest('utils/ts-config', {
      name: '@utils/ts-config',
      version: '1.0.4',
      private: true,
    });

    await writeFixtureManifest('utils/tsdown-config', {
      name: '@utils/tsdown-config',
      version: '1.0.4',
      private: true,
    });

    await writeFixtureManifest('apps/backend', {
      name: '@intlayer/backend',
      dependencies: { '@intlayer/core': 'workspace:*', fastify: '5.12.0' },
      devDependencies: {
        '@utils/ts-config': 'workspace:*',
        typescript: '7.0.2',
      },
      peerDependencies: { '@intlayer/design-system': 'workspace:^' },
      optionalDependencies: { 'intlayer-editor': 'workspace:*' },
    });
  });

  afterEach(async () => {
    await rm(fixtureRoot, { recursive: true, force: true });
  });

  const run = (registryTag = 'latest', droppedDependencies: string[] = []) =>
    prepareStandaloneWorkspace({
      rootDirectory: fixtureRoot,
      workspaceDirectory: 'apps/backend',
      registryTag,
      localWorkspaceGlobs: ['utils/*'],
      droppedDependencies,
    });

  it('replaces published workspace ranges across every dependency field', async () => {
    await run();

    const manifest = await readFixtureManifest('apps/backend');

    expect(manifest.dependencies['@intlayer/core']).toBe('latest');
    expect(manifest.peerDependencies['@intlayer/design-system']).toBe('latest');
    expect(manifest.optionalDependencies['intlayer-editor']).toBe('latest');
  });

  it('keeps locally present private workspaces linked', async () => {
    await run();

    const manifest = await readFixtureManifest('apps/backend');

    expect(manifest.devDependencies['@utils/ts-config']).toBe('workspace:*');
  });

  it('leaves registry ranges untouched', async () => {
    await run();

    const manifest = await readFixtureManifest('apps/backend');

    expect(manifest.dependencies.fastify).toBe('5.12.0');
    expect(manifest.devDependencies.typescript).toBe('7.0.2');
  });

  it('honours an explicit registry tag', async () => {
    await run('9.3.2');

    const manifest = await readFixtureManifest('apps/backend');

    expect(manifest.dependencies['@intlayer/core']).toBe('9.3.2');
  });

  it('narrows the root workspaces and drops root scripts and devDependencies', async () => {
    await run();

    const rootManifest = await readFixtureManifest('.');

    expect(rootManifest.workspaces).toEqual(['apps/backend', 'utils/*']);
    expect(rootManifest.private).toBe(true);
    expect(rootManifest.scripts).toBeUndefined();
    expect(rootManifest.devDependencies).toBeUndefined();
  });

  it('preserves resolution-affecting root fields', async () => {
    await run();

    const rootManifest = await readFixtureManifest('.');

    expect(rootManifest.resolutions).toEqual({ react: '19.2.8' });
  });

  it('is idempotent', async () => {
    await run();
    const firstPass = await readFixtureManifest('apps/backend');

    await run();
    const secondPass = await readFixtureManifest('apps/backend');

    expect(secondPass).toEqual(firstPass);
  });

  it('removes dependencies named by droppedDependencies', async () => {
    await run('latest', ['@intlayer/core', 'intlayer-editor']);

    const manifest = await readFixtureManifest('apps/backend');

    expect(manifest.dependencies['@intlayer/core']).toBeUndefined();
    expect(manifest.optionalDependencies['intlayer-editor']).toBeUndefined();
    expect(manifest.dependencies.fastify).toBe('5.12.0');
  });

  it('ignores dropped names that are not declared', async () => {
    await run('latest', ['@intlayer/not-a-dependency']);

    const manifest = await readFixtureManifest('apps/backend');

    expect(manifest.dependencies['@intlayer/core']).toBe('latest');
  });

  it('drops local workspace globs that are absent from the build context', async () => {
    await rm(join(fixtureRoot, 'utils'), { recursive: true, force: true });

    await prepareStandaloneWorkspace({
      rootDirectory: fixtureRoot,
      workspaceDirectory: 'apps/backend',
      registryTag: 'latest',
      localWorkspaceGlobs: ['utils/*'],
      droppedDependencies: [],
    });

    const rootManifest = await readFixtureManifest('.');
    const manifest = await readFixtureManifest('apps/backend');

    expect(rootManifest.workspaces).toEqual(['apps/backend']);
    expect(manifest.devDependencies['@utils/ts-config']).toBe('latest');
  });

  it('throws when the target workspace has no manifest', async () => {
    await expect(
      prepareStandaloneWorkspace({
        rootDirectory: fixtureRoot,
        workspaceDirectory: 'apps/missing',
        registryTag: 'latest',
        localWorkspaceGlobs: ['utils/*'],
        droppedDependencies: [],
      })
    ).rejects.toThrow('No package.json found');
  });
});
