import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resolveContentFilePaths } from './extractDictionaryInfo';

vi.mock('@intlayer/dictionaries-entry/unmerged', () => ({
  getUnmergedDictionaries: vi.fn(),
}));

const baseDir = '/project';

const configuration = {
  system: { baseDir },
  internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
  content: { fileExtensions: ['.content.json'] },
  compiler: { output: '/src/i18n/{{locale}}/{{key}}.content.json' },
} as unknown as IntlayerConfig;

const mockExistingDictionaries = (dictionaries: Dictionary[]) =>
  vi
    .mocked(getUnmergedDictionaries)
    .mockReturnValue({ admin: dictionaries } as ReturnType<
      typeof getUnmergedDictionaries
    >);

describe('resolveContentFilePaths', () => {
  beforeEach(() => {
    vi.mocked(getUnmergedDictionaries).mockReturnValue({});
  });

  it('keeps an existing per-locale dictionary per-locale', async () => {
    mockExistingDictionaries([
      {
        key: 'admin',
        locale: 'en',
        filePath: 'src/i18n/en/admin.content.json',
        content: {},
      },
    ]);

    await expect(
      resolveContentFilePaths(
        '/project/src/routes/admin.tsx',
        'admin',
        configuration
      )
    ).resolves.toEqual({
      absolutePath: '/project/src/i18n/en/admin.content.json',
      relativePath: 'src/i18n/en/admin.content.json',
      isPerLocale: true,
    });
  });

  it('keeps an existing multilingual dictionary multilingual', async () => {
    mockExistingDictionaries([
      { key: 'admin', filePath: 'src/admin.content.json', content: {} },
    ]);

    const { isPerLocale } = await resolveContentFilePaths(
      '/project/src/routes/admin.tsx',
      'admin',
      configuration
    );

    expect(isPerLocale).toBe(false);
  });

  it('detects a per-locale output for a new dictionary', async () => {
    const { relativePath, isPerLocale } = await resolveContentFilePaths(
      '/project/src/routes/admin.tsx',
      'admin',
      configuration
    );

    expect(relativePath).toBe('src/i18n/en/admin.content.json');
    expect(isPerLocale).toBe(true);
  });
});
