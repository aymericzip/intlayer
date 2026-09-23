import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { upgradeIntlayerPackages } from './upgradeIntlayerPackages';

const { runPackageInstallMock } = vi.hoisted(() => ({
  runPackageInstallMock: vi.fn(),
}));

vi.mock('./utils/packageManager', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./utils/packageManager')>()),
  runPackageInstall: runPackageInstallMock,
}));

/** Versions served by the stubbed registry, keyed by `name/dist-tag`. */
const REGISTRY_VERSIONS: Record<string, string> = {
  'intlayer/latest': '9.5.7',
  'next-intlayer/latest': '9.5.7',
  'intlayer/canary': '9.6.0-canary.1',
  'next-intlayer/canary': '9.6.0-canary.1',
};

describe('upgradeIntlayerPackages', () => {
  let rootDir: string;
  const requestedUrls: string[] = [];

  const writePackageJson = async (
    directory: string,
    content: Record<string, unknown>
  ) => {
    await mkdir(join(rootDir, directory), { recursive: true });
    await writeFile(
      join(rootDir, directory, 'package.json'),
      `${JSON.stringify(content, null, 2)}\n`,
      'utf8'
    );
  };

  const readPackageJson = async (directory: string) =>
    JSON.parse(
      await readFile(join(rootDir, directory, 'package.json'), 'utf8')
    );

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-upgrade-'));
    requestedUrls.length = 0;
    runPackageInstallMock.mockReset();

    vi.stubGlobal('fetch', async (url: string) => {
      requestedUrls.push(url);
      const [, packageName, distTag] =
        url.match(/registry\.npmjs\.org\/(.+)\/([^/]+)$/) ?? [];
      const version = REGISTRY_VERSIONS[`${packageName}/${distTag}`];

      return version
        ? new Response(JSON.stringify({ version }))
        : new Response('Not found', { status: 404 });
    });

    await writePackageJson('.', {
      name: 'root',
      dependencies: { intlayer: '^9.0.0' },
    });
    await writePackageJson('apps/web', {
      name: 'web',
      dependencies: { 'next-intlayer': '~9.5.7', react: '^19.0.0' },
      devDependencies: { '@intlayer/shared': 'workspace:*' },
    });
  });

  afterEach(async () => {
    vi.unstubAllGlobals();
    await rm(rootDir, { recursive: true, force: true });
  });

  it('upgrades outdated packages of every package.json and installs once', async () => {
    const { upgrades } = await upgradeIntlayerPackages(rootDir);

    expect(upgrades).toEqual([
      expect.objectContaining({
        packageJsonPath: 'package.json',
        packageName: 'intlayer',
        nextRange: '^9.5.7',
      }),
    ]);
    expect((await readPackageJson('.')).dependencies.intlayer).toBe('^9.5.7');
    expect(
      (await readPackageJson('apps/web')).dependencies['next-intlayer']
    ).toBe('~9.5.7');
    expect(runPackageInstallMock).toHaveBeenCalledTimes(1);
  });

  it('only lists the upgrades in dry-run mode', async () => {
    const { upgrades } = await upgradeIntlayerPackages(rootDir, {
      dryRun: true,
    });

    expect(upgrades).toHaveLength(1);
    expect((await readPackageJson('.')).dependencies.intlayer).toBe('^9.0.0');
    expect(runPackageInstallMock).not.toHaveBeenCalled();
  });

  it('targets the requested dist-tag', async () => {
    const { upgrades } = await upgradeIntlayerPackages(rootDir, {
      distTag: 'canary',
    });

    expect(requestedUrls.every((url) => url.endsWith('/canary'))).toBe(true);
    expect(upgrades.map(({ nextRange }) => nextRange)).toEqual([
      '^9.6.0-canary.1',
      '~9.6.0-canary.1',
    ]);
  });

  it('does nothing when the project has no Intlayer package', async () => {
    await rm(join(rootDir, 'apps'), { recursive: true, force: true });
    await writePackageJson('.', { name: 'root' });

    const { packageJsonDependencies, upgrades } =
      await upgradeIntlayerPackages(rootDir);

    expect(packageJsonDependencies).toEqual([]);
    expect(upgrades).toEqual([]);
    expect(requestedUrls).toEqual([]);
  });
});
