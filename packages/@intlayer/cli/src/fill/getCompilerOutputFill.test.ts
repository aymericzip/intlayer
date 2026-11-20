import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, Fill } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { getCompilerOutputFill } from './getCompilerOutputFill';

const baseDir = '/project';

const createConfiguration = (compilerOutput?: Fill): IntlayerConfig =>
  ({
    system: { baseDir },
    internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
    content: { fileExtensions: ['.content.ts', '.content.json'] },
    compiler: { output: compilerOutput },
  }) as unknown as IntlayerConfig;

const compilerDictionary: Dictionary = {
  key: 'app-shell',
  locale: 'en',
  filePath: 'src/i18n/en/app-shell.content.json',
  content: { inbox: 'Inbox' },
};

describe('getCompilerOutputFill', () => {
  it('returns the per-locale compiler output that emitted the dictionary', async () => {
    const output = '/src/i18n/{{locale}}/{{key}}.content.json';

    await expect(
      getCompilerOutputFill(compilerDictionary, createConfiguration(output))
    ).resolves.toBe(output);
  });

  it('supports function patterns', async () => {
    const output: Fill = ({ locale, key }) =>
      `/src/i18n/${locale}/${key}.content.json`;

    await expect(
      getCompilerOutputFill(compilerDictionary, createConfiguration(output))
    ).resolves.toBe(output);
  });

  it('ignores dictionaries the compiler output did not emit', async () => {
    const output = '/locales/{{locale}}/{{key}}.content.json';

    await expect(
      getCompilerOutputFill(compilerDictionary, createConfiguration(output))
    ).resolves.toBeUndefined();
  });

  it('ignores compiler outputs that do not vary per locale', async () => {
    const output = '/src/i18n/en/{{key}}.content.json';

    await expect(
      getCompilerOutputFill(compilerDictionary, createConfiguration(output))
    ).resolves.toBeUndefined();
  });

  it('ignores multilingual dictionaries and missing compiler output', async () => {
    const { locale: _locale, ...multilingualDictionary } = compilerDictionary;

    await expect(
      getCompilerOutputFill(
        multilingualDictionary,
        createConfiguration('/src/i18n/{{locale}}/{{key}}.content.json')
      )
    ).resolves.toBeUndefined();
    await expect(
      getCompilerOutputFill(compilerDictionary, createConfiguration())
    ).resolves.toBeUndefined();
  });
});
