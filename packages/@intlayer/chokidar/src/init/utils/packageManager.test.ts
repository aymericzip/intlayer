import { describe, expect, it } from 'vitest';
import { detectMissingIntlayerPackages } from './packageManager';

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
      // single-file-per-locale layout, so splitKeys auto-detection applies
      expect(result.compatSyncConfig).toEqual({
        format: 'icu',
        sourceTemplate: './messages/${locale}.json',
      });
    });
  });
});
