import { describe, expect, it } from 'vitest';
import { findFieldDeclaration } from './findFieldDeclaration';

/** The text a located span covers. */
const locate = (
  text: string,
  filePath: string,
  dictionaryKey: string,
  fieldPath: string[]
): string | null => {
  const span = findFieldDeclaration(text, filePath, dictionaryKey, fieldPath);

  return span ? text.slice(span.start, span.end) : null;
};

/** Line number (0-based) of a located span. */
const locateLine = (
  text: string,
  filePath: string,
  dictionaryKey: string,
  fieldPath: string[]
): number | null => {
  const span = findFieldDeclaration(text, filePath, dictionaryKey, fieldPath);

  return span ? text.slice(0, span.start).split('\n').length - 1 : null;
};

describe('findFieldDeclaration — JSON catalogs', () => {
  const namespacedCatalog = JSON.stringify(
    {
      header: { title: 'Header title' },
      footer: { title: 'Footer title', 'links.github': 'GitHub' },
    },
    null,
    2
  );

  it('locates a field under its namespace, not the first same-named key', () => {
    expect(locateLine(namespacedCatalog, 'en.json', 'footer', ['title'])).toBe(
      5
    );
  });

  it('locates flat dotted keys', () => {
    expect(
      locate(namespacedCatalog, 'en.json', 'footer', ['links', 'github'])
    ).toBe('"links.github"');
    expect(
      locate(`{ "shared.footer.github": "GitHub" }`, 'en.json', 'index', [
        'shared.footer.github',
      ])
    ).toBe('"shared.footer.github"');
  });

  it('locates a field of a dictionary held at the catalog root', () => {
    expect(locate(`{ "title": "x" }`, 'footer.json', 'footer', ['title'])).toBe(
      '"title"'
    );
  });

  it('locates the namespace itself for a dictionary-level target', () => {
    expect(locate(namespacedCatalog, 'en.json', 'footer', [])).toBe('"footer"');
  });

  it('falls back to the deepest matched property', () => {
    expect(locate(namespacedCatalog, 'en.json', 'footer', ['missing'])).toBe(
      '"footer"'
    );
  });
});

describe('findFieldDeclaration — content declaration files', () => {
  const contentFile = [
    `import { t, type Dictionary } from 'intlayer';`,
    `const content = {`,
    `  key: 'home',`,
    `  content: {`,
    `    title: t({ en: 'Title' }),`,
    `    hero: { title: t({ en: 'Hero' }) },`,
    `  },`,
    `} satisfies Dictionary;`,
    `export default content;`,
  ].join('\n');

  it('walks from the `content` property', () => {
    expect(
      locateLine(contentFile, 'home.content.ts', 'home', ['hero', 'title'])
    ).toBe(5);
  });

  it('locates the `key` property for a dictionary-level target', () => {
    expect(locate(contentFile, 'home.content.ts', 'home', [])).toBe('key');
  });
});

describe('findFieldDeclaration — other formats', () => {
  it('falls back to a text search on the leaf name', () => {
    expect(
      locate(
        `key: home\ncontent:\n  title: Hi\n`,
        'home.content.yaml',
        'home',
        ['title']
      )
    ).toBe('title');
  });
});
