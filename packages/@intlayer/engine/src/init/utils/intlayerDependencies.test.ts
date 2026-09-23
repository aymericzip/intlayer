import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  findPackageJsonFiles,
  getIntlayerDependencies,
  getIntlayerDependencyUpgrades,
  listIntlayerDependencies,
  toRange,
  writeIntlayerDependencyUpgrades,
} from './intlayerDependencies';

describe('intlayerDependencies', () => {
  let rootDir: string;

  const writePackageJson = async (
    directory: string,
    content: Record<string, unknown>,
    indentation: number | string = 2
  ) => {
    await mkdir(join(rootDir, directory), { recursive: true });
    await writeFile(
      join(rootDir, directory, 'package.json'),
      `${JSON.stringify(content, null, indentation)}\n`,
      'utf8'
    );
  };

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-dependencies-'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  describe('findPackageJsonFiles', () => {
    it('lists the root first and skips node_modules and build outputs', async () => {
      await writePackageJson('.', { name: 'root' });
      await writePackageJson('packages/web', { name: 'web' });
      await writePackageJson('apps/api', { name: 'api' });
      await writePackageJson('node_modules/intlayer', { name: 'intlayer' });
      await writePackageJson('apps/api/dist', { name: 'dist' });

      expect(await findPackageJsonFiles(rootDir)).toEqual([
        'package.json',
        'apps/api/package.json',
        'packages/web/package.json',
      ]);
    });
  });

  describe('getIntlayerDependencies', () => {
    it('keeps Intlayer packages declared with a registry range', () => {
      expect(
        getIntlayerDependencies({
          dependencies: {
            intlayer: '^9.0.0',
            'next-intlayer': '~9.0.0',
            'intlayer-editor': '9.0.0',
            react: '^19.0.0',
            '@intlayer/core': 'workspace:*',
            'vite-intlayer': 'catalog:',
          },
          devDependencies: { '@intlayer/sync-json-plugin': '^9.0.0' },
        })
      ).toEqual([
        {
          packageName: 'intlayer',
          dependencyField: 'dependencies',
          currentRange: '^9.0.0',
        },
        {
          packageName: 'next-intlayer',
          dependencyField: 'dependencies',
          currentRange: '~9.0.0',
        },
        {
          packageName: 'intlayer-editor',
          dependencyField: 'dependencies',
          currentRange: '9.0.0',
        },
        {
          packageName: '@intlayer/sync-json-plugin',
          dependencyField: 'devDependencies',
          currentRange: '^9.0.0',
        },
      ]);
    });
  });

  describe('toRange', () => {
    it('keeps the range operator', () => {
      expect(toRange('^9.0.0', '9.5.7')).toBe('^9.5.7');
      expect(toRange('~9.0.0', '9.5.7')).toBe('~9.5.7');
      expect(toRange('9.0.0', '9.5.7')).toBe('9.5.7');
    });
  });

  describe('getIntlayerDependencyUpgrades', () => {
    it('skips up-to-date and unresolved packages', () => {
      const upgrades = getIntlayerDependencyUpgrades(
        [
          {
            packageJsonPath: 'package.json',
            dependencies: [
              {
                packageName: 'intlayer',
                dependencyField: 'dependencies',
                currentRange: '^9.0.0',
              },
              {
                packageName: 'next-intlayer',
                dependencyField: 'dependencies',
                currentRange: '^9.5.7',
              },
              {
                packageName: 'intlayer-editor',
                dependencyField: 'devDependencies',
                currentRange: '^9.0.0',
              },
            ],
          },
        ],
        new Map([
          ['intlayer', '9.5.7'],
          ['next-intlayer', '9.5.7'],
          ['intlayer-editor', null],
        ])
      );

      expect(upgrades).toEqual([
        {
          packageJsonPath: 'package.json',
          packageName: 'intlayer',
          dependencyField: 'dependencies',
          currentRange: '^9.0.0',
          nextRange: '^9.5.7',
        },
      ]);
    });
  });

  describe('listIntlayerDependencies + writeIntlayerDependencyUpgrades', () => {
    it('upgrades every workspace package.json, keeping its formatting', async () => {
      await writePackageJson('.', {
        name: 'root',
        devDependencies: { 'eslint-plugin-intlayer': '^9.0.0' },
      });
      await writePackageJson(
        'apps/web',
        { name: 'web', dependencies: { 'next-intlayer': '^9.0.0' } },
        4
      );
      await writePackageJson('apps/docs', { name: 'docs' });

      const packageJsonDependencies = await listIntlayerDependencies(rootDir);

      expect(
        packageJsonDependencies.map(({ packageJsonPath }) => packageJsonPath)
      ).toEqual(['package.json', 'apps/web/package.json']);

      await writeIntlayerDependencyUpgrades(
        rootDir,
        getIntlayerDependencyUpgrades(
          packageJsonDependencies,
          new Map([
            ['eslint-plugin-intlayer', '9.5.7'],
            ['next-intlayer', '9.5.7'],
          ])
        )
      );

      expect(
        await readFile(join(rootDir, 'apps/web/package.json'), 'utf8')
      ).toBe(
        `${JSON.stringify(
          { name: 'web', dependencies: { 'next-intlayer': '^9.5.7' } },
          null,
          4
        )}\n`
      );
      expect(
        JSON.parse(await readFile(join(rootDir, 'package.json'), 'utf8'))
          .devDependencies
      ).toEqual({ 'eslint-plugin-intlayer': '^9.5.7' });
    });
  });
});
