import { Locales } from '@intlayer/config';
import { describe, expect, it } from 'vitest';
import { getOutputFilePath } from './getOutputFilePath';

const baseLocale = Locales.ENGLISH;
const targetLocale = Locales.FRENCH;

describe('getOutputFilePath', () => {
  it('should replace locale in directory paths', () => {
    expect(
      getOutputFilePath('/docs/en/guide.md', targetLocale, baseLocale)
    ).toBe('/docs/fr/guide.md');
  });

  it('should handle Windows-style paths', () => {
    expect(
      getOutputFilePath('\\docs\\en\\guide.md', targetLocale, baseLocale)
    ).toBe('\\docs\\fr\\guide.md');
  });

  it('should replace locale in file naming patterns', () => {
    expect(getOutputFilePath('guide_en.md', targetLocale, baseLocale)).toBe(
      'guide_fr.md'
    );

    expect(getOutputFilePath('en_guide.md', targetLocale, baseLocale)).toBe(
      'fr_guide.md'
    );
  });

  it('should handle template placeholders', () => {
    expect(
      getOutputFilePath(
        '/docs/{{baseLocale}}/guide.md',
        targetLocale,
        baseLocale
      )
    ).toBe('/docs/{{locale}}/guide.md');

    expect(
      getOutputFilePath('guide.{{baseLocaleName}}.md', targetLocale, baseLocale)
    ).toBe('guide.{{localeName}}.md');
  });

  it('should handle locale name patterns', () => {
    expect(getOutputFilePath('guide.en.md', targetLocale, baseLocale)).toBe(
      'guide.fr.md'
    );
  });

  it('should append locale when no patterns match', () => {
    expect(getOutputFilePath('/docs/guide.md', targetLocale, baseLocale)).toBe(
      '/docs/guide.fr.md'
    );
  });

  it('should handle files without extensions', () => {
    expect(getOutputFilePath('/docs/guide', targetLocale, baseLocale)).toBe(
      '/docs/guide.fr'
    );
  });

  it('should handle multiple occurrences', () => {
    expect(
      getOutputFilePath('/en/docs/en/guide_en.md', targetLocale, baseLocale)
    ).toBe('/fr/docs/fr/guide_fr.md');
  });

  it('should not duplicate locale parts for composite target locales', () => {
    const compositeTarget = 'en-GB' as unknown as Locales;
    expect(getOutputFilePath('/en/file.md', compositeTarget, baseLocale)).toBe(
      '/en-GB/file.md'
    );
  });

  it('should throw error for invalid inputs', () => {
    expect(() => getOutputFilePath('', targetLocale, baseLocale)).toThrow(
      'filePath, locale, and baseLocale are required'
    );

    expect(() =>
      getOutputFilePath('/docs/guide.md', '' as Locales, baseLocale)
    ).toThrow('filePath, locale, and baseLocale are required');
  });
});
