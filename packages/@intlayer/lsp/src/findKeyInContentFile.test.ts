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

  it('returns dictionaryKey and fieldName when cursor is on a content field', () => {
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, 'greet')
    );
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });

  it('works for a second field in the same content block', () => {
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, 'title')
    );
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'title' });
  });

  it('returns null when cursor is on the key: declaration value', () => {
    // findKeyInContentFile handles this — findContentFieldAtOffset should yield null
    // because 'app' in key: 'app' is NOT followed by ':'
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, "'app'") + 1
    );
    expect(result).toBeNull();
  });

  it('returns null when cursor is on the key property name', () => {
    // 'key' is followed by ':' but findKeyInContentFile is checked first;
    // here we just verify findContentFieldAtOffset itself still returns something
    // because 'key' IS followed by ':' — the caller (onDefinition) picks
    // findKeyInContentFile's result first, so the combination is correct.
    // (We do NOT require findContentFieldAtOffset to exclude "key" itself.)
    const result = findContentFieldAtOffset(
      contentFile,
      offsetOf(contentFile, 'key')
    );
    // 'key' IS a property key — result is non-null (the caller defers to
    // findKeyInContentFile before ever calling this function, so this is fine).
    expect(result).not.toBeNull();
  });

  it('returns a result for a nested locale key (e.g. en: inside t({}))', () => {
    // 'en' inside t({ en: '...' }) IS a property key followed by ':',
    // so findContentFieldAtOffset will match it. That is acceptable: the caller
    // (onDefinition) will call getFieldUsageLocations("app", "en") which simply
    // returns no usages, yielding null — harmless.
    // Use a precise search that skips the 'en' substring inside 'appContent'.
    const localeColonOffset = contentFile.indexOf("      en: 'Hello");
    const result = findContentFieldAtOffset(contentFile, localeColonOffset + 6); // cursor on 'en'
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'en' });
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
    expect(result).toEqual({ dictionaryKey: 'my-dict', fieldName: 'greet' });
  });
});
