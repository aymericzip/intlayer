import type { Dictionary } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getRelatedContentFiles } from './relatedContentFiles';

const createDictionary = (dictionary: Partial<Dictionary>): Dictionary =>
  ({ key: 'key', content: {}, ...dictionary }) as Dictionary;

describe('getRelatedContentFiles', () => {
  it('returns the content files extracted from the component', () => {
    const relatedContentFiles = getRelatedContentFiles(
      [
        createDictionary({
          key: 'header',
          componentFilePath: 'src/Header.tsx',
          filePath: 'src/header.content.json',
        }),
        createDictionary({
          key: 'footer',
          componentFilePath: 'src/Footer.tsx',
          filePath: 'src/footer.content.json',
        }),
        createDictionary({ key: 'manual', filePath: 'src/manual.content.ts' }),
      ],
      'src/Header.tsx',
      '/project'
    );

    expect(relatedContentFiles).toEqual([
      {
        kind: 'file',
        dictionaryKey: 'header',
        absolutePath: '/project/src/header.content.json',
      },
    ]);
  });

  it('dedupes files and skips dictionaries without a file', () => {
    const relatedContentFiles = getRelatedContentFiles(
      [
        createDictionary({
          key: 'header',
          componentFilePath: 'src/Header.tsx',
          filePath: '/project/src/header.content.json',
        }),
        createDictionary({
          key: 'header',
          componentFilePath: 'src/Header.tsx',
          filePath: '/project/src/header.content.json',
        }),
        createDictionary({
          key: 'remote',
          componentFilePath: 'src/Header.tsx',
        }),
      ],
      'src/Header.tsx',
      '/project'
    );

    expect(relatedContentFiles).toHaveLength(1);
  });

  it('links remote dictionaries to their CMS page', () => {
    const relatedContentFiles = getRelatedContentFiles(
      [
        createDictionary({
          key: 'hero-section',
          location: 'remote',
          componentFilePath: 'src/Hero.tsx',
        }),
        createDictionary({
          key: 'hero-section',
          location: 'remote',
          componentFilePath: 'src/Hero.tsx',
        }),
      ],
      'src/Hero.tsx',
      '/project',
      'https://app.intlayer.org/'
    );

    expect(relatedContentFiles).toEqual([
      {
        kind: 'remote',
        dictionaryKey: 'hero-section',
        cmsDictionaryUrl: 'https://app.intlayer.org/dictionary/hero-section',
      },
    ]);
  });

  it('skips remote dictionaries without a CMS URL', () => {
    expect(
      getRelatedContentFiles(
        [
          createDictionary({
            key: 'hero-section',
            location: 'remote',
            componentFilePath: 'src/Hero.tsx',
          }),
        ],
        'src/Hero.tsx',
        '/project'
      )
    ).toEqual([]);
  });
});
