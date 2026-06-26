import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  detectMissingIntlayerPackages,
  detectOutdatedIntlayerPackages,
  isIntlayerPackageName,
  normalizeVersion,
} from './packageManager';

describe('detectMissingIntlayerPackages', () => {
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
    it('installs react-native-intlayer as a dev dependency for Expo', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        'react-native': '^0.76.0',
        expo: '^52.0.0',
      });

      // react runtime integration + RN bundler plugin
      expect(result.packagesToInstall).toContain('react-intlayer');
      expect(result.devPackagesToInstall).toContain('react-native-intlayer');
    });

    it('does not re-list an already installed react-native-intlayer', () => {
      const result = detectMissingIntlayerPackages({
        react: '^19.0.0',
        'react-native': '^0.76.0',
        'react-native-intlayer': '^9.0.0',
      });

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
  });

  it('does not match unrelated packages', () => {
    expect(isIntlayerPackageName('react')).toBe(false);
    expect(isIntlayerPackageName('next-intl')).toBe(false);
    expect(isIntlayerPackageName('intlayer-utils')).toBe(false);
  });
});

describe('detectOutdatedIntlayerPackages', () => {
  let rootDir: string;

  const writeInstalledPackage = (packageName: string, version: string) => {
    const packageDir = join(rootDir, 'node_modules', packageName);
    mkdirSync(packageDir, { recursive: true });
    writeFileSync(
      join(packageDir, 'package.json'),
      JSON.stringify({ name: packageName, version })
    );
  };

  beforeEach(() => {
    rootDir = mkdtempSync(join(tmpdir(), 'intlayer-upgrade-'));
  });

  afterEach(() => {
    rmSync(rootDir, { recursive: true, force: true });
  });

  it('flags installed Intlayer packages behind the target version', () => {
    writeInstalledPackage('intlayer', '8.5.0');
    writeInstalledPackage('react-intlayer', '9.0.0');

    const outdated = detectOutdatedIntlayerPackages(
      rootDir,
      { intlayer: '^8.5.0', 'react-intlayer': '^9.0.0' },
      '9.0.0'
    );

    expect(outdated).toEqual(['intlayer']);
  });

  it('ignores non-Intlayer and not-yet-installed packages', () => {
    writeInstalledPackage('react', '18.0.0');

    const outdated = detectOutdatedIntlayerPackages(
      rootDir,
      { react: '^18.0.0', intlayer: '^8.0.0' },
      '9.0.0'
    );

    expect(outdated).toEqual([]);
  });

  it('returns nothing when the target version is not a valid semver', () => {
    writeInstalledPackage('intlayer', '8.0.0');

    const outdated = detectOutdatedIntlayerPackages(
      rootDir,
      { intlayer: '^8.0.0' },
      'latest'
    );

    expect(outdated).toEqual([]);
  });
});
