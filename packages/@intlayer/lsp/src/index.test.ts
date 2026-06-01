import { describe, expect, it } from 'vitest';
import { findKeyAtOffset } from './findKeyAtOffset';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns the byte offset of the first occurrence of `needle` in `haystack`. */
const offsetOf = (haystack: string, needle: string): number => {
  const idx = haystack.indexOf(needle);
  if (idx === -1) throw new Error(`"${needle}" not found in text`);
  return idx;
};

// ---------------------------------------------------------------------------
// Single-line calls
// ---------------------------------------------------------------------------

describe('single-line calls', () => {
  it('resolves key when cursor is on the function name', () => {
    const text = 'useIntlayer("hero")';
    expect(findKeyAtOffset(text, offsetOf(text, 'useIntlayer'))).toBe('hero');
  });

  it('resolves key when cursor is on the key string', () => {
    const text = 'useIntlayer("hero")';
    expect(findKeyAtOffset(text, offsetOf(text, 'hero'))).toBe('hero');
  });

  it('resolves key when cursor is on the closing quote', () => {
    const text = 'useIntlayer("hero")';
    const closingQuoteOffset = text.lastIndexOf('"');
    expect(findKeyAtOffset(text, closingQuoteOffset)).toBe('hero');
  });

  it('resolves getIntlayer with extra locale argument', () => {
    const text = "getIntlayer('nav', locale)";
    expect(findKeyAtOffset(text, offsetOf(text, 'nav'))).toBe('nav');
  });

  it('resolves useIntlayer with TypeScript generic', () => {
    const text = 'useIntlayer<NavContent>("nav")';
    expect(findKeyAtOffset(text, offsetOf(text, 'nav'))).toBe('nav');
  });

  it('returns null when cursor is outside any call', () => {
    const text = 'useIntlayer("hero")';
    expect(findKeyAtOffset(text, text.length + 1)).toBeNull();
  });

  it('returns null for unrelated code', () => {
    const text = 'const x = someFunction("hero")';
    expect(findKeyAtOffset(text, offsetOf(text, 'hero'))).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Multi-line calls
// ---------------------------------------------------------------------------

describe('multi-line calls', () => {
  it('resolves key when function and key are on separate lines (no indent)', () => {
    const text = 'useIntlayer(\n"my-super-long-key"\n)';
    expect(findKeyAtOffset(text, offsetOf(text, 'my-super-long-key'))).toBe(
      'my-super-long-key'
    );
  });

  it('resolves key when key is indented on the next line', () => {
    const text = 'useIntlayer(\n  "my-super-long-key"\n)';
    expect(findKeyAtOffset(text, offsetOf(text, 'my-super-long-key'))).toBe(
      'my-super-long-key'
    );
  });

  it('resolves key when cursor is on the function name (multi-line call)', () => {
    const text = 'useIntlayer(\n  "my-super-long-key"\n)';
    expect(findKeyAtOffset(text, offsetOf(text, 'useIntlayer'))).toBe(
      'my-super-long-key'
    );
  });

  it('resolves getIntlayer multi-line with TypeScript generic', () => {
    const text = 'getIntlayer<HomeContent>(\n  "home",\n  locale\n)';
    expect(findKeyAtOffset(text, offsetOf(text, 'home'))).toBe('home');
  });

  it('resolves key with single-quoted string on next line', () => {
    const text = "useIntlayer(\n  'page-hero'\n)";
    expect(findKeyAtOffset(text, offsetOf(text, 'page-hero'))).toBe(
      'page-hero'
    );
  });

  it('resolves key with backtick string on next line', () => {
    const text = 'useIntlayer(\n  `template-key`\n)';
    expect(findKeyAtOffset(text, offsetOf(text, 'template-key'))).toBe(
      'template-key'
    );
  });

  it('handles multiple newlines between function and key', () => {
    const text = 'useIntlayer(\n\n  "spaced-key"\n)';
    expect(findKeyAtOffset(text, offsetOf(text, 'spaced-key'))).toBe(
      'spaced-key'
    );
  });

  it('returns null when cursor is after the closing paren', () => {
    const text = 'useIntlayer(\n  "my-key"\n)\n// cursor here';
    const afterCall = text.indexOf('// cursor here');
    expect(findKeyAtOffset(text, afterCall)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Multiple calls in the same file
// ---------------------------------------------------------------------------

describe('multiple calls in the same file', () => {
  it('returns the correct key for each call site', () => {
    const text = [
      'const a = useIntlayer("first");',
      'const b = useIntlayer(',
      '  "second"',
      ');',
      'const c = getIntlayer("third", locale);',
    ].join('\n');

    expect(findKeyAtOffset(text, offsetOf(text, 'first'))).toBe('first');
    expect(findKeyAtOffset(text, offsetOf(text, 'second'))).toBe('second');
    expect(findKeyAtOffset(text, offsetOf(text, 'third'))).toBe('third');
  });
});
