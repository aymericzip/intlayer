import { describe, expect, it } from 'vitest';
import { getContentLayoutSetup } from './contentLayout';

describe('getContentLayoutSetup', () => {
  it('should map multilingual layouts to a co-located compiler output', () => {
    expect(getContentLayoutSetup('multilingual', 'json')).toEqual({
      compilerOutput: './{{fileName}}.content.json',
      isPerLocale: false,
    });
  });

  it('should map per-locale layouts to a locale output and dictionary.locale', () => {
    expect(getContentLayoutSetup('per-locale', 'ts')).toEqual({
      compilerOutput: './{{fileName}}.{{locale}}.content.ts',
      isPerLocale: true,
    });
  });

  it('should map centralized json to a split syncJSON catalog', () => {
    expect(getContentLayoutSetup('centralized', 'json').syncConfig).toEqual({
      plugin: 'json',
      format: 'i18next',
      sourceTemplate: './locales/${locale}.json',
      splitKeys: true,
    });
  });

  it('should map namespaces po to a per-key syncPO catalog', () => {
    expect(getContentLayoutSetup('namespaces', 'po').syncConfig).toEqual({
      plugin: 'po',
      format: 'i18next',
      sourceTemplate: './locales/${locale}/${key}.po',
    });
  });

  it('should fall back to the layout default for an unsupported format', () => {
    expect(getContentLayoutSetup('multilingual', 'po').compilerOutput).toBe(
      './{{fileName}}.content.ts'
    );
    expect(
      getContentLayoutSetup('centralized', 'ts').syncConfig?.sourceTemplate
    ).toBe('./locales/${locale}.json');
  });
});
