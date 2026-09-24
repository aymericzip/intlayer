import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  COMPAT_I18N_LIBRARIES,
  detectCompatI18nLibraries,
  detectMissingIntlayerPackages,
  detectPackageManager,
  findLockFileDir,
  hasLintTooling,
  isIntlayerPackageName,
  moveCompatPackagesToDevDependencies,
  normalizeVersion,
} from './packageManager';

describe('detectCompatI18nLibraries', () => {
  it('returns nothing for a project without any i18n library', () => {
    expect(
      detectCompatI18nLibraries({ react: '^19.0.0', vite: '^6.0.0' })
    ).toEqual([]);
  });

  it('detects a library from its upstream package', () => {
    expect(
      detectCompatI18nLibraries({
        react: '^19.0.0',
        'react-i18next': '^15.0.0',
      })
    ).toEqual(['i18next / react-i18next']);
  });

  it('detects a library from its already installed Intlayer adapter', () => {
    expect(detectCompatI18nLibraries({ '@intlayer/lingui': '^6.0.0' })).toEqual(
      ['Lingui']
    );
  });

  it('detects every library of a project using several of them', () => {
    expect(
      detectCompatI18nLibraries({
        next: '^16.0.0',
        'next-intl': '^3.0.0',
        i18next: '^25.0.0',
      })
    ).toEqual(['i18next / react-i18next', 'next-intl / use-intl']);
  });

  it('only lists packages compat detection actually wires an adapter for', () => {
    for (const library of COMPAT_I18N_LIBRARIES) {
      for (const packageName of library.packages) {
        const { packagesToInstall, devPackagesToInstall } =
          detectMissingIntlayerPackages({ [packageName]: '*' });

        // Anything beyond the always-required `intlayer` package means the
        // compat branch of the detection recognized the dependency.
        const compatScheduled = [
          ...packagesToInstall,
          ...devPackagesToInstall,
        ].filter((scheduled) => scheduled !== 'intlayer');

        expect(
          compatScheduled,
          `${packageName} (${library.label}) is reported as a compat library but detection wires nothing for it`
        ).not.toEqual([]);
      }
    }
  });
});

describe('hasLintTooling', () => {
  it('is true for either supported linter', () => {
    expect(hasLintTooling({ eslint: '^9.0.0' })).toBe(true);
    expect(hasLintTooling({ oxlint: '^1.0.0' })).toBe(true);
  });

  it('is false for a project that does not lint', () => {
    expect(hasLintTooling({})).toBe(false);
    expect(hasLintTooling({ react: '^19.0.0', vite: '^6.0.0' })).toBe(false);
  });
});

describe('detectMissingIntlayerPackages', () => {
  describe('lint plugin', () => {
    it('installs the lint plugin when the project uses ESLint', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        eslint: '^9.0.0',
      });

      expect(result.devPackagesToInstall).toContain('eslint-plugin-intlayer');
    });

    it('installs the lint plugin when the project uses oxlint', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        oxlint: '^1.0.0',
      });

      expect(result.devPackagesToInstall).toContain('eslint-plugin-intlayer');
    });

    it('leaves a project that does not lint alone', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        vite: '^6.0.0',
      });

      expect(result.devPackagesToInstall).not.toContain(
        'eslint-plugin-intlayer'
      );
    });

    it('does not reinstall an already-present lint plugin', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        eslint: '^9.0.0',
        'eslint-plugin-intlayer': '^9.0.0',
      });

      expect(result.devPackagesToInstall).not.toContain(
        'eslint-plugin-intlayer'
      );
    });
  });

  describe('use-intl compat', () => {
    it('configures the use-intl vite plugin and ICU flat sync config', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        vite: '^6.0.0',
        'use-intl': '^4.0.0',
      });

      expect(result.packagesToInstall).toContain('@intlayer/use-intl');
      // react runtime integration is required by the compat package
      expect(result.packagesToInstall).toContain('react-intlayer');

      expect(result.compatVitePluginConfig).toEqual({
        pluginFunctionName: 'useIntlVitePlugin',
        pluginPackageSource: '@intlayer/use-intl/plugin',
      });

      expect(result.compatSyncConfig).toEqual({
        format: 'icu',
        sourceTemplate: './messages/${locale}.json',
        // single-file namespace model → split each top-level key
        splitKeys: true,
      });

      // syncJSON plugin is a dev dependency once a compat sync config is set
      expect(result.devPackagesToInstall).toContain(
        '@intlayer/sync-json-plugin'
      );
    });

    it('does not re-list already installed compat packages', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        vite: '^6.0.0',
        'use-intl': '^4.0.0',
        '@intlayer/use-intl': '^9.0.0',
      });

      expect(result.packagesToInstall).not.toContain('@intlayer/use-intl');
      expect(result.packagesToInstall).not.toContain('use-intl');
      // still recognized as a compat lib, so the plugin config is present
      expect(result.compatVitePluginConfig?.pluginFunctionName).toBe(
        'useIntlVitePlugin'
      );
    });

    it('lets next-intl take precedence over a transitive use-intl dep', () => {
      const result = detectMissingIntlayerPackages({
        next: '^15.0.0',
        'next-intl': '^4.0.0',
        'use-intl': '^4.0.0',
      });

      // next-intl wins the sync config (checked first); both resolve to the
      // single-file-per-locale namespace layout, so splitKeys is forced on
      expect(result.compatSyncConfig).toEqual({
        format: 'icu',
        sourceTemplate: './messages/${locale}.json',
        splitKeys: true,
      });
    });

    it('forces splitKeys for a next-intl project', () => {
      const result = detectMissingIntlayerPackages({
        next: '^15.0.0',
        'next-intl': '^4.0.0',
      });

      expect(result.compatSyncConfig).toEqual({
        format: 'icu',
        sourceTemplate: './messages/${locale}.json',
        splitKeys: true,
      });
    });

    it('does not force splitKeys for i18next (plain message keys)', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        i18next: '^23.0.0',
      });

      expect(result.compatSyncConfig?.splitKeys).toBeUndefined();
    });

    it('marks next-intl to be moved to devDependencies when in dependencies', () => {
      const result = detectMissingIntlayerPackages({
        next: '^15.0.0',
        'next-intl': '^4.0.0',
      });

      expect(result.packagesToInstall).toContain('@intlayer/next-intl');
      expect(result.packagesToInstall).not.toContain('next-intl');
      expect(result.packagesToMoveToDev).toContain('next-intl');
    });

    it('does not mark next-intl to move when already in devDependencies', () => {
      const result = detectMissingIntlayerPackages(
        {
          next: '^15.0.0',
          'next-intl': '^4.0.0',
        },
        {
          dependencies: { next: '^15.0.0' },
          devDependencies: { 'next-intl': '^4.0.0' },
        }
      );

      expect(result.packagesToMoveToDev).not.toContain('next-intl');
      expect(result.packagesToInstall).toContain('@intlayer/next-intl');
      expect(result.packagesToInstall).not.toContain('next-intl');
    });

    it('installs next-intl as devPackage when missing but @intlayer/next-intl is present', () => {
      const result = detectMissingIntlayerPackages({
        next: '^15.0.0',
        '@intlayer/next-intl': '^9.0.0',
      });

      expect(result.packagesToInstall).not.toContain('next-intl');
      expect(result.devPackagesToInstall).toContain('next-intl');
    });
  });

  describe('i18next / react-i18next compat vite plugin', () => {
    it('wires the react-i18next vite plugin (aliases react-i18next + i18next)', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        vite: '^6.0.0',
        'react-i18next': '^15.0.0',
        i18next: '^23.0.0',
      });

      expect(result.packagesToInstall).toContain('@intlayer/react-i18next');
      // react-i18next's wrapper wins over the bare i18next plugin
      expect(result.compatVitePluginConfig).toEqual({
        pluginFunctionName: 'reactI18nextVitePlugin',
        pluginPackageSource: '@intlayer/react-i18next/plugin',
      });
    });

    it('wires the bare i18next vite plugin when no react wrapper is present', () => {
      const result = detectMissingIntlayerPackages({
        vite: '^6.0.0',
        i18next: '^23.0.0',
      });

      expect(result.compatVitePluginConfig).toEqual({
        pluginFunctionName: 'i18nextVitePlugin',
        pluginPackageSource: '@intlayer/i18next/plugin',
      });
    });
  });

  describe('lingui compat', () => {
    it('uses syncPO when the project ships .po catalogs (lingui default)', () => {
      const result = detectMissingIntlayerPackages(
        {
          react: '^19.0.0',
          vite: '^6.0.0',
          '@lingui/core': '^5.0.0',
          '@lingui/react': '^5.0.0',
        },
        { linguiCatalogFormat: 'po' }
      );

      expect(result.packagesToInstall).toContain('@intlayer/lingui');
      expect(result.compatSyncConfig).toEqual({
        plugin: 'po',
        format: 'icu',
        // `${key}` captures the `messages` filename → dictionary key `messages`
        sourceTemplate: './src/locales/${locale}/${key}.po',
      });
      expect(result.devPackagesToInstall).toContain('@intlayer/sync-po-plugin');
      expect(result.devPackagesToInstall).not.toContain(
        '@intlayer/sync-json-plugin'
      );
    });

    it('uses syncJSON when the project ships .json catalogs', () => {
      const result = detectMissingIntlayerPackages(
        {
          react: '^19.0.0',
          vite: '^6.0.0',
          '@lingui/core': '^5.0.0',
        },
        { linguiCatalogFormat: 'json' }
      );

      expect(result.compatSyncConfig).toEqual({
        plugin: 'json',
        format: 'icu',
        sourceTemplate: './src/locales/${locale}/${key}.json',
      });
      expect(result.devPackagesToInstall).toContain(
        '@intlayer/sync-json-plugin'
      );
    });

    it('defaults to syncJSON when no catalog format was detected', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        '@lingui/core': '^5.0.0',
      });

      expect(result.compatSyncConfig?.plugin).toBe('json');
    });
  });

  describe('react native / expo', () => {
    it('installs react-native-intlayer as the only React runtime package', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        'react-native': '^0.76.0',
        expo: '^52.0.0',
      });

      // react-native-intlayer re-exports react-intlayer, so installing both
      // would duplicate the runtime the docs tell native apps to import from.
      expect(result.packagesToInstall).toContain('react-native-intlayer');
      expect(result.packagesToInstall).not.toContain('react-intlayer');
      expect(result.devPackagesToInstall).not.toContain(
        'react-native-intlayer'
      );
    });

    it('installs react-native-intlayer for a bare react-native project', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        'react-native': '^0.76.0',
      });

      expect(result.packagesToInstall).toContain('react-native-intlayer');
      expect(result.packagesToInstall).not.toContain('react-intlayer');
    });

    it('does not re-list an already installed react-native-intlayer', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        'react-native': '^0.76.0',
        'react-native-intlayer': '^9.0.0',
      });

      expect(result.packagesToInstall).not.toContain('react-native-intlayer');
      expect(result.devPackagesToInstall).not.toContain(
        'react-native-intlayer'
      );
    });
  });
});

describe('normalizeVersion', () => {
  it('strips range prefixes, pre-release and build metadata', () => {
    expect(normalizeVersion('^9.0.0-canary.3')).toBe('9.0.0');
    expect(normalizeVersion('~8.4.2')).toBe('8.4.2');
    expect(normalizeVersion('9.1.0')).toBe('9.1.0');
    expect(normalizeVersion('9.0.0+build.5')).toBe('9.0.0');
  });

  it('returns null for missing or non-semver values', () => {
    expect(normalizeVersion(undefined)).toBeNull();
    expect(normalizeVersion('latest')).toBeNull();
    expect(normalizeVersion('')).toBeNull();
  });
});

describe('isIntlayerPackageName', () => {
  it('matches core, scoped and framework integration packages', () => {
    expect(isIntlayerPackageName('intlayer')).toBe(true);
    expect(isIntlayerPackageName('@intlayer/core')).toBe(true);
    expect(isIntlayerPackageName('@intlayer/next-intl')).toBe(true);
    expect(isIntlayerPackageName('next-intlayer')).toBe(true);
    expect(isIntlayerPackageName('express-intlayer')).toBe(true);
    expect(isIntlayerPackageName('intlayer-editor')).toBe(true);
  });

  it('does not match unrelated packages', () => {
    expect(isIntlayerPackageName('react')).toBe(false);
    expect(isIntlayerPackageName('next-intl')).toBe(false);
    expect(isIntlayerPackageName('intlayerx')).toBe(false);
  });
});

describe('package manager detection', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-package-manager-'));
    // Bounds the lock file lookup to the temporary repository.
    await mkdir(join(rootDir, '.git'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  describe('detectPackageManager', () => {
    it.each([
      ['bun.lock', 'bun'],
      ['bun.lockb', 'bun'],
      ['pnpm-lock.yaml', 'pnpm'],
      ['yarn.lock', 'yarn'],
      ['package-lock.json', 'npm'],
    ])('detects %s as %s', async (lockFile, packageManager) => {
      await writeFile(join(rootDir, lockFile), '');
      expect(detectPackageManager(rootDir)).toBe(packageManager);
    });

    it('falls back to the packageManager field of package.json', async () => {
      await writeFile(
        join(rootDir, 'package.json'),
        JSON.stringify({ packageManager: 'bun@1.2.0' })
      );
      expect(detectPackageManager(rootDir)).toBe('bun');
    });

    it('falls back to npm without any signal', () => {
      expect(detectPackageManager(rootDir)).toBe('npm');
    });
  });

  describe('findLockFileDir', () => {
    it('finds the workspace root lock file from a nested package', async () => {
      const workspaceDir = join(rootDir, 'apps', 'web');
      await mkdir(workspaceDir, { recursive: true });
      await writeFile(join(rootDir, 'bun.lock'), '');

      expect(findLockFileDir(workspaceDir)).toBe(rootDir);
    });

    it('stops at the repository root', async () => {
      expect(findLockFileDir(rootDir)).toBeNull();
    });
  });

  describe('moveCompatPackagesToDevDependencies', () => {
    it('moves next-intl from dependencies to devDependencies', () => {
      const packageJson = {
        name: 'my-app',
        dependencies: {
          next: '^15.0.0',
          'next-intl': '^3.26.0',
          react: '^19.0.0',
        },
        devDependencies: {
          typescript: '^5.0.0',
        },
      };

      const moved = moveCompatPackagesToDevDependencies(packageJson);

      expect(moved).toEqual(['next-intl']);
      expect(packageJson.dependencies['next-intl']).toBeUndefined();
      expect(packageJson.devDependencies['next-intl']).toBe('^3.26.0');
      expect(packageJson.devDependencies.typescript).toBe('^5.0.0');
    });

    it('does not touch already separated dependencies', () => {
      const packageJson = {
        dependencies: {
          next: '^15.0.0',
          react: '^19.0.0',
        },
        devDependencies: {
          'next-intl': '^3.26.0',
        },
      };

      const moved = moveCompatPackagesToDevDependencies(packageJson);

      expect(moved).toEqual([]);
      expect(packageJson.devDependencies['next-intl']).toBe('^3.26.0');
    });

    it('handles multiple compat packages', () => {
      const packageJson = {
        dependencies: {
          i18next: '^23.0.0',
          'react-i18next': '^14.0.0',
          react: '^19.0.0',
        },
        devDependencies: {},
      };

      const moved = moveCompatPackagesToDevDependencies(packageJson);

      expect(moved).toContain('i18next');
      expect(moved).toContain('react-i18next');
      expect(packageJson.dependencies.i18next).toBeUndefined();
      expect(packageJson.dependencies['react-i18next']).toBeUndefined();
      expect(packageJson.devDependencies.i18next).toBe('^23.0.0');
      expect(packageJson.devDependencies['react-i18next']).toBe('^14.0.0');
    });
  });
});
