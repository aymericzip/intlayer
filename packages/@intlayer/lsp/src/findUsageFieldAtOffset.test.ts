import { describe, expect, it } from 'vitest';
import { findUsageFieldAtOffset } from './findUsageFieldAtOffset';

const offsetOf = (
  text: string,
  needle: string,
  occurrenceIndex = 0
): number => {
  let index = -1;
  for (
    let iterationIndex = 0;
    iterationIndex <= occurrenceIndex;
    iterationIndex++
  ) {
    index = text.indexOf(needle, index + 1);
    if (index === -1)
      throw new Error(`"${needle}" (occurrence ${iterationIndex}) not found`);
  }
  return index;
};

// ---------------------------------------------------------------------------
// Pattern 1 — destructuring
// ---------------------------------------------------------------------------

describe('findUsageFieldAtOffset — destructuring', () => {
  it('returns key+field when cursor is on the destructured property', () => {
    const text = `const { localeSwitcherLabel } = useIntlayer("locale-switcher");`;
    const result = findUsageFieldAtOffset(
      text,
      offsetOf(text, 'localeSwitcherLabel')
    );
    expect(result).toEqual({
      dictionaryKey: 'locale-switcher',
      fieldName: 'localeSwitcherLabel',
    });
  });

  it('handles multiple destructured properties — cursor on first', () => {
    const text = `const { title, greet } = useIntlayer("app");`;
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'title'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'title' });
  });

  it('handles multiple destructured properties — cursor on second', () => {
    const text = `const { title, greet } = useIntlayer("app");`;
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });

  it('handles a renamed destructure (key: alias) — cursor on the key', () => {
    const text = `const { greet: hello } = useIntlayer("app");`;
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });

  it('handles a multiline destructure', () => {
    const text = [
      'const {',
      '  title,',
      '  greet,',
      '} = useIntlayer("app");',
    ].join('\n');
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });

  it('handles a TypeScript generic type argument', () => {
    const text = `const { greet } = useIntlayer<AppContent>("app");`;
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });

  it('works with getIntlayer', () => {
    const text = `const { label } = getIntlayer("my-dict");`;
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'label'));
    expect(result).toEqual({ dictionaryKey: 'my-dict', fieldName: 'label' });
  });

  it('returns null when cursor is outside the destructure braces (on the key string)', () => {
    const text = `const { greet } = useIntlayer("app");`;
    // Cursor on "app" — not inside the destructure, so should return null here
    // (findKeyAtOffset handles that case instead)
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'app'));
    expect(result).toBeNull();
  });

  it('returns null for an unrelated identifier', () => {
    const text = `const foo = bar("app");`;
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'foo'));
    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Pattern 2 — member access
// ---------------------------------------------------------------------------

describe('findUsageFieldAtOffset — member access', () => {
  it('returns key+field when cursor is on the member property', () => {
    const text = [
      'const t = useIntlayer("locale-switcher");',
      't.localeSwitcherLabel;',
    ].join('\n');
    const result = findUsageFieldAtOffset(
      text,
      offsetOf(text, 'localeSwitcherLabel')
    );
    expect(result).toEqual({
      dictionaryKey: 'locale-switcher',
      fieldName: 'localeSwitcherLabel',
    });
  });

  it('handles let and var declarations', () => {
    const text = [
      'let content = useIntlayer("app");',
      'console.log(content.greet);',
    ].join('\n');
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });

  it('handles JSX member access', () => {
    const text = [
      'const content = useIntlayer("app");',
      'return <p>{content.greet}</p>;',
    ].join('\n');
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });

  it('returns null when cursor is on the variable name (not the property)', () => {
    const text = ['const content = useIntlayer("app");', 'content.greet;'].join(
      '\n'
    );
    // Cursor on "content" — not on a property
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'content'));
    expect(result).toBeNull();
  });

  it('returns null when the variable was not assigned from useIntlayer', () => {
    const text = ['const other = someOtherFn("app");', 'other.greet;'].join(
      '\n'
    );
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('findUsageFieldAtOffset — edge cases', () => {
  it('returns null when offset is not on an identifier', () => {
    const text = `const { greet } = useIntlayer("app");`;
    expect(findUsageFieldAtOffset(text, offsetOf(text, '{'))).toBeNull();
    expect(findUsageFieldAtOffset(text, offsetOf(text, '='))).toBeNull();
  });

  it('does not confuse two different useIntlayer calls', () => {
    const text = [
      'const { greet } = useIntlayer("app");',
      'const { title } = useIntlayer("other");',
    ].join('\n');
    // Cursor on "greet" — should find "app", not "other"
    const result = findUsageFieldAtOffset(text, offsetOf(text, 'greet'));
    expect(result).toEqual({ dictionaryKey: 'app', fieldName: 'greet' });
  });
});
