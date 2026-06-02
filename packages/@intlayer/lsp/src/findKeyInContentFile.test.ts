import { describe, expect, it } from 'vitest';
import { findKeyInContentFile } from './findKeyInContentFile';

const offsetOf = (haystack: string, needle: string): number => {
  const idx = haystack.indexOf(needle);
  if (idx === -1) throw new Error(`"${needle}" not found in text`);
  return idx;
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
