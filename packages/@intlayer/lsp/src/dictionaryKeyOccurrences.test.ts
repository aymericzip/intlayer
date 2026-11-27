import { describe, expect, it } from 'vitest';
import {
  collectNestedDictionaryKeys,
  collectSourceDictionaryKeys,
  type DictionaryKeyOccurrence,
  findDictionaryKeyDeclaration,
  findDictionaryKeyOccurrenceAtOffset,
} from './dictionaryKeyOccurrences';

/** The text each occurrence spans, checked against its key. */
const spannedTexts = (
  text: string,
  occurrences: (DictionaryKeyOccurrence | null)[]
): string[] =>
  occurrences.map((occurrence) => {
    if (!occurrence) return '<none>';

    const spanned = text.slice(occurrence.start, occurrence.end);

    expect(spanned).toBe(occurrence.dictionaryKey);

    return spanned;
  });

describe('findDictionaryKeyDeclaration', () => {
  it('locates the key of a default-exported TypeScript declaration', () => {
    const text = `import { t, type Dictionary } from 'intlayer';

const content = {
  key: 'app-header',
  content: { key: t({ en: 'Nested field named key' }) },
} satisfies Dictionary;

export default content;
`;

    expect(
      spannedTexts(text, [findDictionaryKeyDeclaration(text, 'a.content.ts')])
    ).toEqual(['app-header']);
  });

  it('locates the key of a CommonJS declaration', () => {
    const text = `module.exports = { key: "legacy", content: {} };`;

    expect(
      spannedTexts(text, [findDictionaryKeyDeclaration(text, 'a.content.cjs')])
    ).toEqual(['legacy']);
  });

  it('locates the key of a JSON declaration', () => {
    const text = JSON.stringify(
      { key: 'json-key', content: { key: 'not this one' } },
      null,
      2
    );

    expect(
      spannedTexts(text, [findDictionaryKeyDeclaration(text, 'a.content.json')])
    ).toEqual(['json-key']);
  });

  it('locates a top-level YAML key, not an indented one', () => {
    const text = `content:\n  key: nested\nkey: "yaml-key" # comment\n`;

    expect(
      spannedTexts(text, [findDictionaryKeyDeclaration(text, 'a.content.yaml')])
    ).toEqual(['yaml-key']);
  });

  it('locates the key in a Markdown frontmatter only', () => {
    const text = `---\ntitle: Page\nkey: md-key\n---\n\nkey: body-text\n`;

    expect(
      spannedTexts(text, [findDictionaryKeyDeclaration(text, 'a.content.md')])
    ).toEqual(['md-key']);
  });

  it('returns null for a computed key', () => {
    const text = `const name = 'dynamic';\nexport default { key: name, content: {} };`;

    expect(findDictionaryKeyDeclaration(text, 'a.content.ts')).toBeNull();
  });
});

describe('collectNestedDictionaryKeys', () => {
  it('collects nest() calls and raw nested nodes in scripts', () => {
    const text = `import { nest } from 'intlayer';

export default {
  key: 'page',
  content: {
    header: nest('app-header'),
    footer: nest("app-footer", 'links'),
    raw: { nodeType: 'nested', nested: { dictionaryKey: 'raw-key' } },
  },
};
`;

    expect(
      spannedTexts(text, collectNestedDictionaryKeys(text, 'a.content.ts'))
    ).toEqual(['app-header', 'app-footer', 'raw-key']);
  });

  it('collects nested nodes in JSON', () => {
    const text = JSON.stringify(
      {
        key: 'page',
        content: {
          header: { nodeType: 'nested', nested: { dictionaryKey: 'header' } },
        },
      },
      null,
      2
    );

    expect(
      spannedTexts(text, collectNestedDictionaryKeys(text, 'a.content.json'))
    ).toEqual(['header']);
  });

  it('collects nested nodes in YAML', () => {
    const text = `key: page\ncontent:\n  header:\n    nodeType: nested\n    nested:\n      dictionaryKey: 'header'\n`;

    expect(
      spannedTexts(text, collectNestedDictionaryKeys(text, 'a.content.yml'))
    ).toEqual(['header']);
  });
});

describe('collectSourceDictionaryKeys', () => {
  it('spans the key of every caller, sub-path excluded', () => {
    const text = `import { useIntlayer, getIntlayer } from 'react-intlayer';
import { useTranslations } from 'next-intl';

export const A = () => {
  const header = useIntlayer('app-header');
  const footer = getIntlayer(\`app-footer\`, 'en');
  const hero = useTranslations('home.hero');

  return null;
};
`;

    expect(spannedTexts(text, collectSourceDictionaryKeys(text))).toEqual([
      'app-header',
      'app-footer',
      'home',
    ]);
  });

  it('finds the occurrence under the cursor', () => {
    const text = `import { useIntlayer } from 'react-intlayer';\nuseIntlayer('app-header');`;
    const occurrences = collectSourceDictionaryKeys(text);
    const keyOffset = text.indexOf('app-header');

    expect(
      findDictionaryKeyOccurrenceAtOffset(occurrences, keyOffset + 3)
        ?.dictionaryKey
    ).toBe('app-header');
    expect(findDictionaryKeyOccurrenceAtOffset(occurrences, 0)).toBeNull();
  });
});
