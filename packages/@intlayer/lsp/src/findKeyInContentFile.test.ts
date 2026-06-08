import { describe, expect, it } from 'vitest';
import {
  findContentFieldAtOffset,
  findKeyInContentFile,
} from './findKeyInContentFile';

const offsetOf = (haystack: string, needle: string): number => {
  const index = haystack.indexOf(needle);
  if (index === -1) throw new Error(`"${needle}" not found in text`);
  return index;
};

describe('findKeyInContentFile', () => {
  it('returns the key when cursor is on the key value', () => {
    const text = "  key: 'app',";
    expect(findKeyInContentFile(text, offsetOf(text, 'app'))).toBe('app');
  });

  it('returns the key when cursor is on the key property name', () => {
    const text = "  key: 'app',";
    expect(findKeyInContentFile(text, offsetOf(text, 'key'))).toBe('app');
  });

  it('handles double-quoted keys', () => {
    const text = '  key: "my-component",';
    expect(findKeyInContentFile(text, offsetOf(text, 'my-component'))).toBe(
      'my-component'
    );
  });

  it('handles backtick keys', () => {
    const text = '  key: `hero-section`,';
    expect(findKeyInContentFile(text, offsetOf(text, 'hero-section'))).toBe(
      'hero-section'
    );
  });

  it('handles keys with spaces around colon', () => {
    const text = '  key  :  "spaced-key",';
    expect(findKeyInContentFile(text, offsetOf(text, 'spaced-key'))).toBe(
      'spaced-key'
    );
  });

  it('returns null when cursor is outside any key declaration', () => {
    const text = "  key: 'app',\n  content: {},";
    expect(findKeyInContentFile(text, offsetOf(text, 'content'))).toBeNull();
  });

  it('returns null for unrelated properties', () => {
    const text = "  someOtherProp: 'value',";
    expect(findKeyInContentFile(text, offsetOf(text, 'value'))).toBeNull();
  });

  it('handles multiline content files', () => {
    const text = [
      'import { t } from "intlayer";',
      '',
      'export default {',
      "  key: 'navbar',",
      '  content: {',
      "    title: t({ en: 'Home', fr: 'Accueil' }),",
      '  },',
      '};',
    ].join('\n');

    expect(findKeyInContentFile(text, offsetOf(text, 'navbar'))).toBe('navbar');
    expect(findKeyInContentFile(text, offsetOf(text, 'title'))).toBeNull();
  });
});

describe('findKeyInContentFile — unquoted (YAML / Markdown frontmatter)', () => {
  it('returns a bare key value in YAML frontmatter', () => {
    const text = '---\nkey: my-markdown-content\ntitle: Hello\n---\n';
    expect(
      findKeyInContentFile(text, offsetOf(text, 'my-markdown-content'))
    ).toBe('my-markdown-content');
  });

  it('returns cursor-on-keyword for bare YAML key', () => {
    const text = 'key: hero-section\n';
    expect(findKeyInContentFile(text, offsetOf(text, 'key'))).toBe(
      'hero-section'
    );
  });

  it('handles bare keys with underscores and dots', () => {
    const text = 'key: page.hero_title\n';
    expect(findKeyInContentFile(text, offsetOf(text, 'page.hero_title'))).toBe(
      'page.hero_title'
    );
  });

  it('does not capture object values as bare keys', () => {
    const text = 'key: {nested: true}\n';
    expect(findKeyInContentFile(text, 0)).toBeNull();
  });

  it('stops bare value at newline', () => {
    const text = 'key: first-key\nkey: second-key\n';
    expect(findKeyInContentFile(text, offsetOf(text, 'first-key'))).toBe(
      'first-key'
    );
    expect(findKeyInContentFile(text, offsetOf(text, 'second-key'))).toBe(
      'second-key'
    );
  });
});

// ---------------------------------------------------------------------------
// findContentFieldAtOffset
// ---------------------------------------------------------------------------

describe('findContentFieldAtOffset', () => {
  const contentFile = [
    "import { type Dictionary, t } from 'intlayer';",
    '',
    'const appContent: Dictionary = {',
    "  key: 'app',",
    '  content: {',
    '    greet: t({',
    "      en: 'Hello World!',",
    "      fr: 'Bonjour le monde !',",
    '    }),',
    '    title: t({',
    "      en: 'My App',",
    '    }),',
    '  },',
    '};',
  ].join('\n');

  it('returns dictionaryKey, fieldName and fieldPath when cursor is on a content field', () => {
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, 'greet')
    );
    expect(result).toEqual({
      dictionaryKey: 'app',
      fieldName: 'greet',
      fieldPath: ['greet'],
    });
  });

  it('works for a second field in the same content block', () => {
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, 'title')
    );
    expect(result).toEqual({
      dictionaryKey: 'app',
      fieldName: 'title',
      fieldPath: ['title'],
    });
  });

  it('returns null when cursor is on the key: declaration value', () => {
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, "'app'") + 1
    );
    expect(result).toBeNull();
  });

  it('returns null for a locale key inside t({}) — correctly skipped by AST', () => {
    // With the AST-based implementation, `en` inside `t({ en: '...' })` is
    // correctly excluded (t() args are locale maps, not navigable content fields).
    const localeColonOffset = contentFile.indexOf("      en: 'Hello");
    const result = findContentFieldAtOffset(contentFile, localeColonOffset + 6);
    expect(result).toBeNull();
  });

  it('returns null when there is no key: declaration in the file', () => {
    const text = '{ greet: "hello" }';
    expect(findContentFieldAtOffset(text, offsetOf(text, 'greet'))).toBeNull();
  });

  it('returns null when cursor is not on an identifier', () => {
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, '{')
    );
    expect(result).toBeNull();
  });

  it('correctly reads dictionaryKey from a double-quoted key declaration', () => {
    const text =
      'const contentObject = { key: "my-dict", content: { greet: t() } };';
    const result = findContentFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({
      dictionaryKey: 'my-dict',
      fieldName: 'greet',
      fieldPath: ['greet'],
    });
  });
});

// ---------------------------------------------------------------------------
// Nested fields
// ---------------------------------------------------------------------------

describe('findContentFieldAtOffset — nested fields', () => {
  const nestedContentFile = [
    "import { type Dictionary, t } from 'intlayer';",
    '',
    'const content = {',
    "  key: 'locale-switcher',",
    '  content: {',
    '    localeSwitcherLabel: t({',
    "      en: 'Language switcher',",
    "      fr: 'Changer de langue',",
    '    }),',
    '    searchInput: {',
    '      text: t({',
    "        en: 'Search Locale',",
    '      }),',
    '      placeholder: t({',
    "        en: 'Search a locale',",
    '      }),',
    '    },',
    '  },',
    '};',
  ].join('\n');

  it('returns single-element fieldPath for a top-level content field', () => {
    const result = findContentFieldAtOffset(
      nestedContentFile,
      offsetOf(nestedContentFile, 'localeSwitcherLabel')
    );
    expect(result).toEqual({
      dictionaryKey: 'locale-switcher',
      fieldName: 'localeSwitcherLabel',
      fieldPath: ['localeSwitcherLabel'],
    });
  });

  it('returns single-element fieldPath for a nested object field', () => {
    const result = findContentFieldAtOffset(
      nestedContentFile,
      offsetOf(nestedContentFile, 'searchInput')
    );
    expect(result).toEqual({
      dictionaryKey: 'locale-switcher',
      fieldName: 'searchInput',
      fieldPath: ['searchInput'],
    });
  });

  it('returns full fieldPath for a field nested inside a sub-object', () => {
    // 'text' inside searchInput: { text: t({...}) }
    // offsetOf returns first occurrence — the one inside searchInput
    const textOffset = nestedContentFile.indexOf('      text: t({');
    const result = findContentFieldAtOffset(
      nestedContentFile,
      textOffset + 6 // middle of 'text'
    );
    expect(result).toEqual({
      dictionaryKey: 'locale-switcher',
      fieldName: 'text',
      fieldPath: ['searchInput', 'text'],
    });
  });

  it('returns full fieldPath for placeholder inside searchInput', () => {
    const placeholderOffset = nestedContentFile.indexOf(
      '      placeholder: t('
    );
    const result = findContentFieldAtOffset(
      nestedContentFile,
      placeholderOffset + 6
    );
    expect(result).toEqual({
      dictionaryKey: 'locale-switcher',
      fieldName: 'placeholder',
      fieldPath: ['searchInput', 'placeholder'],
    });
  });

  it('returns null for locale keys inside t() even inside a nested object', () => {
    const enOffset = nestedContentFile.indexOf("        en: 'Search Locale'");
    const result = findContentFieldAtOffset(nestedContentFile, enOffset + 8);
    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// JSON / JSON5 / JSONC
// ---------------------------------------------------------------------------

describe('findContentFieldAtOffset — JSON', () => {
  const jsonContent = `{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "plainField": "Hello World",
    "multilingualContent": {
      "nodeType": "translation",
      "translation": { "en": "English", "fr": "French" }
    },
    "nestedObj": {
      "childA": "value A",
      "childB": "value B"
    }
  }
}`;

  it('finds quoted key', () => {
    expect(
      findKeyInContentFile(jsonContent, offsetOf(jsonContent, '"key"'))
    ).toBe('page');
  });

  it('finds plain field', () => {
    expect(
      findContentFieldAtOffset(
        jsonContent,
        offsetOf(jsonContent, 'plainField') + 1,
        '.json'
      )
    ).toEqual({
      dictionaryKey: 'page',
      fieldName: 'plainField',
      fieldPath: ['plainField'],
    });
  });

  it('finds typed node content field', () => {
    expect(
      findContentFieldAtOffset(
        jsonContent,
        offsetOf(jsonContent, 'multilingualContent') + 1,
        '.json'
      )
    ).toEqual({
      dictionaryKey: 'page',
      fieldName: 'multilingualContent',
      fieldPath: ['multilingualContent'],
    });
  });

  it('ignores nodeType', () => {
    expect(
      findContentFieldAtOffset(
        jsonContent,
        offsetOf(jsonContent, '"nodeType"') + 1,
        '.json'
      )
    ).toBeNull();
  });

  it('ignores locale key inside translation', () => {
    expect(
      findContentFieldAtOffset(
        jsonContent,
        offsetOf(jsonContent, '"en"') + 1,
        '.json'
      )
    ).toBeNull();
  });

  it('finds nested child field', () => {
    expect(
      findContentFieldAtOffset(
        jsonContent,
        offsetOf(jsonContent, '"childA"') + 1,
        '.json'
      )
    ).toEqual({
      dictionaryKey: 'page',
      fieldName: 'childA',
      fieldPath: ['nestedObj', 'childA'],
    });
  });
});

// ---------------------------------------------------------------------------
// YAML
// ---------------------------------------------------------------------------

describe('findContentFieldAtOffset — YAML', () => {
  const yamlContent = [
    'key: my-dict',
    'title: My Dictionary',
    'content:',
    '  hero:',
    '    title: Welcome',
    '    subtitle: Build apps',
    '  footer:',
    '    footerText: Copyright 2024',
    '',
  ].join('\n');

  it('finds key', () => {
    expect(
      findKeyInContentFile(yamlContent, offsetOf(yamlContent, 'key'))
    ).toBe('my-dict');
  });

  it('finds hero', () => {
    expect(
      findContentFieldAtOffset(
        yamlContent,
        offsetOf(yamlContent, '  hero:\n') + 2,
        '.yaml'
      )
    ).toEqual({
      dictionaryKey: 'my-dict',
      fieldName: 'hero',
      fieldPath: ['hero'],
    });
  });

  it('finds footerText', () => {
    expect(
      findContentFieldAtOffset(
        yamlContent,
        offsetOf(yamlContent, 'footerText') + 2,
        '.yaml'
      )
    ).toEqual({
      dictionaryKey: 'my-dict',
      fieldName: 'footerText',
      fieldPath: ['footerText'],
    });
  });

  it('returns null for top-level keys', () => {
    expect(findContentFieldAtOffset(yamlContent, 0, '.yaml')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Markdown
// ---------------------------------------------------------------------------

describe('findContentFieldAtOffset — Markdown', () => {
  const markdownContent = [
    '---',
    'key: welcome-page',
    'locale: en',
    'title: Welcome Page Content',
    '---',
    '',
    '# Welcome to Our Platform',
    '',
    '## Build amazing applications with ease',
    '',
  ].join('\n');

  it('finds key', () => {
    expect(
      findKeyInContentFile(markdownContent, offsetOf(markdownContent, 'key:'))
    ).toBe('welcome-page');
  });

  it('always returns null for content fields (no content: block)', () => {
    expect(
      findContentFieldAtOffset(
        markdownContent,
        offsetOf(markdownContent, 'Welcome'),
        '.md'
      )
    ).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Intlayer Leaf Helpers in TS
// ---------------------------------------------------------------------------

describe('findContentFieldAtOffset — TS leaf helpers', () => {
  const tsWithAllHelpers = [
    "import { t, enu, cond, plural, gender, insert, nest, md, file, html } from 'intlayer';",
    'export default {',
    "  key: 'page',",
    '  content: {',
    "    myTranslation: t({ en: 'Hello', fr: 'Bonjour' }),",
    "    myEnum: enu({ pending: 'Pending', approved: 'Approved' }),",
    "    myCond: cond({ true: 'Yes', false: 'No' }),",
    "    myPlural: plural({ one: 'One item', other: '{{count}} items' }),",
    "    myGender: gender({ male: 'He', female: 'She', other: 'They' }),",
    "    myInsert: insert('Hello {{name}}!'),",
    "    myNest: nest('other-dict'),",
    "    myMd: md('# Hello'),",
    "    myFile: file('./readme.md'),",
    "    myHtml: html('<p>Hello</p>'),",
    '    nestedPlain: {',
    "      deepField: t({ en: 'Deep' }),",
    '    },',
    '  },',
    '}',
  ].join('\n');

  it('finds all top-level helper fields', () => {
    const helpers = [
      'myTranslation',
      'myEnum',
      'myCond',
      'myPlural',
      'myGender',
      'myInsert',
      'myNest',
      'myMd',
      'myFile',
      'myHtml',
    ];
    for (const helper of helpers) {
      expect(
        findContentFieldAtOffset(
          tsWithAllHelpers,
          offsetOf(tsWithAllHelpers, helper),
          '.ts'
        )
      ).toEqual({
        dictionaryKey: 'page',
        fieldName: helper,
        fieldPath: [helper],
      });
    }
  });

  it('ignores arguments of leaf helpers', () => {
    expect(
      findContentFieldAtOffset(
        tsWithAllHelpers,
        offsetOf(tsWithAllHelpers, 'pending'),
        '.ts'
      )
    ).toBeNull();
    expect(
      findContentFieldAtOffset(
        tsWithAllHelpers,
        offsetOf(tsWithAllHelpers, "en: 'Hello'"),
        '.ts'
      )
    ).toBeNull();
    expect(
      findContentFieldAtOffset(
        tsWithAllHelpers,
        offsetOf(tsWithAllHelpers, "male: 'He'"),
        '.ts'
      )
    ).toBeNull();
    expect(
      findContentFieldAtOffset(
        tsWithAllHelpers,
        offsetOf(tsWithAllHelpers, "one: 'One item'"),
        '.ts'
      )
    ).toBeNull();
  });

  it('finds nested fields with full path', () => {
    expect(
      findContentFieldAtOffset(
        tsWithAllHelpers,
        offsetOf(tsWithAllHelpers, 'deepField'),
        '.ts'
      )
    ).toEqual({
      dictionaryKey: 'page',
      fieldName: 'deepField',
      fieldPath: ['nestedPlain', 'deepField'],
    });
  });
});
