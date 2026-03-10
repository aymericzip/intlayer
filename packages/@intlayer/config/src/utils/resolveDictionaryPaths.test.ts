import type { Locale } from '@intlayer/types/allLocales';
import { describe, expect, it } from 'vitest';
import { resolveDictionaryPaths } from './resolveDictionaryPaths';

describe('resolveDictionaryPaths', () => {
  const baseDir = '/project';
  const locales = ['en', 'fr'] as Locale[];
  const defaultLocale = 'en' as Locale;
  const dictionaryKey = 'myKey';
  const sourceFilePath = '/project/src/components/MyComponent.tsx';

  it('should resolve a single multilingual path when no locale variable is present', async () => {
    const pattern = './{{key}}.content.ts';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales,
      defaultLocale,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      filePath: '/project/src/components/myKey.content.ts',
      locales: ['en', 'fr'],
      isPerLocale: false,
    });
  });

  it('should resolve multiple per-locale paths when {{locale}} is present', async () => {
    const pattern = './{{key}}.{{locale}}.content.ts';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales,
      defaultLocale,
    });

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      filePath: '/project/src/components/myKey.en.content.ts',
      locales: ['en'],
      isPerLocale: true,
    });
    expect(result).toContainEqual({
      filePath: '/project/src/components/myKey.fr.content.ts',
      locales: ['fr'],
      isPerLocale: true,
    });
  });

  it('should handle absolute paths in pattern', async () => {
    const pattern = '/tmp/{{key}}.{{locale}}.ts';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales: ['en'] as Locale[],
      defaultLocale,
    });

    expect(result[0].filePath).toBe('/tmp/myKey.en.ts');
  });

  it('should handle relative paths relative to baseDir when not starting with ./', async () => {
    const pattern = 'translations/{{key}}.json';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales: ['en'] as Locale[],
      defaultLocale,
    });

    expect(result[0].filePath).toBe('/project/translations/myKey.json');
  });

  it('should group locales if they resolve to the same path', async () => {
    const pattern = (context: any) => {
      if (context.locale === 'en' || context.locale === 'en-GB')
        return `./en-group.ts`;
      return `./other.ts`;
    };

    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales: ['en', 'en-GB', 'fr'] as Locale[],
      defaultLocale,
    });

    expect(result).toHaveLength(2);
    const enGroup = result.find((r) => r.filePath.endsWith('en-group.ts'));
    const frGroup = result.find((r) => r.filePath.endsWith('other.ts'));

    expect(enGroup?.locales).toEqual(['en', 'en-GB']);
    expect(enGroup?.isPerLocale).toBe(false);
    expect(frGroup?.locales).toEqual(['fr']);
    expect(frGroup?.isPerLocale).toBe(true);
  });

  it('should correctly resolve {{fileName}} for different file extensions', async () => {
    const pattern = './{{fileName}}.{{locale}}.content.ts';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath: '/project/src/App.tsx',
      baseDir,
      locales: ['en'] as Locale[],
      defaultLocale,
    });

    expect(result[0].filePath).toBe('/project/src/app.en.content.ts');
  });

  it('should treat function patterns as per-locale if they return different paths', async () => {
    const pattern = (context: any) => `./${context.locale}/dict.ts`;
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales: ['en', 'fr'] as Locale[],
      defaultLocale,
    });

    expect(result).toHaveLength(2);
    expect(result[0].isPerLocale).toBe(true);
    expect(result[1].isPerLocale).toBe(true);
  });

  it('should resolve {{dirPath}}, {{componentExtension}}, and lowercase fileName', async () => {
    const pattern =
      '/tmp/{{dirPath}}/{{fileName}}{{componentExtension}}.{{locale}}.ts';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales: ['en'] as Locale[],
      defaultLocale,
    });

    // dirPath is /project/src/components
    // fileName is mycomponent (lowercase)
    // componentExtension is .tsx (dotted)
    expect(result[0].filePath).toBe(
      '/tmp/src/components/mycomponent.tsx.en.ts'
    );
  });

  it('should resolve {{format}} and {{componentFormat}}', async () => {
    const pattern = './{{format}}/{{componentFormat}}/{{key}}.ts';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath, // .tsx -> componentFormat: ts
      baseDir,
      locales: ['en'] as Locale[],
      defaultLocale,
      format: 'cjs',
    });

    expect(result[0].filePath).toBe('/project/src/components/cjs/ts/myKey.ts');
  });

  it('should use contentExtension for {{extension}} variable if provided', async () => {
    const pattern = './{{fileName}}.{{locale}}{{extension}}';
    const result = await resolveDictionaryPaths({
      pattern,
      dictionaryKey,
      sourceFilePath,
      baseDir,
      locales: ['en'] as Locale[],
      defaultLocale,
      contentExtension: '.custom.js',
    });

    expect(result[0].filePath).toBe(
      '/project/src/components/mycomponent.en.custom.js'
    );
  });
});
