import { describe, expect, it } from 'vitest';
import { escapeRegex, findFieldRangesInFile } from './findFieldInFile';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const r = (
  startLine: number,
  startChar: number,
  endLine: number,
  endChar: number
) => ({
  start: { line: startLine, character: startChar },
  end: { line: endLine, character: endChar },
});

const esc = escapeRegex;

// ---------------------------------------------------------------------------
// Pattern 1 — destructuring
// ---------------------------------------------------------------------------

describe('findFieldRangesInFile — destructuring', () => {
  it('finds fieldName in a simple destructure', () => {
    const text = `const { greet } = useIntlayer("app");`;
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(1);
    // "greet" starts at index 8 in the text → char 8 on line 0
    expect(ranges[0]).toEqual(r(0, 8, 0, 13));
  });

  it('finds fieldName when it is not the only destructured key', () => {
    const text = `const { title, greet, count } = useIntlayer("app");`;
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(1);
    expect(ranges[0]!.start.character).toBe(text.indexOf('greet'));
  });

  it('finds fieldName in a renamed destructure (key: alias)', () => {
    // greet appears as the key being renamed — should still be found
    const text = `const { greet: hello } = useIntlayer("app");`;
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(1);
    expect(ranges[0]!.start.character).toBe(text.indexOf('greet'));
  });

  it('finds fieldName in a multiline destructure', () => {
    const text = [
      'const {',
      '  title,',
      '  greet,',
      '} = useIntlayer("app");',
    ].join('\n');
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(1);
    expect(ranges[0]!.start.line).toBe(2); // line index 2
    expect(ranges[0]!.start.character).toBe(2); // two-space indent
  });

  it('returns multiple ranges when the same file has multiple destructuring call sites', () => {
    const text = [
      'function ComponentA() {',
      '  const { greet } = useIntlayer("app");',
      '  return greet;',
      '}',
      'function ComponentB() {',
      '  const { greet } = useIntlayer("app");',
      '  return greet;',
      '}',
    ].join('\n');
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    // one hit per call site destructure (not per usage of the variable)
    expect(ranges).toHaveLength(2);
    expect(ranges[0]!.start.line).toBe(1);
    expect(ranges[1]!.start.line).toBe(5);
  });

  it('does not confuse fields from different dictionary keys', () => {
    const text = [
      'const { greet } = useIntlayer("app");',
      'const { greet } = useIntlayer("other");',
    ].join('\n');
    const rangesApp = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    const rangesOther = findFieldRangesInFile(
      text,
      esc('other'),
      'greet',
      esc('greet')
    );
    expect(rangesApp).toHaveLength(1);
    expect(rangesOther).toHaveLength(1);
    expect(rangesApp[0]!.start.line).toBe(0);
    expect(rangesOther[0]!.start.line).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Pattern 2 — member access
// ---------------------------------------------------------------------------

describe('findFieldRangesInFile — member access', () => {
  it('finds fieldName as a member access', () => {
    const text = [
      'const content = useIntlayer("app");',
      'return content.greet;',
    ].join('\n');
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(1);
    expect(ranges[0]!.start.line).toBe(1);
  });

  it('finds multiple member accesses of the same field', () => {
    const text = [
      'const content = useIntlayer("app");',
      'console.log(content.greet);',
      'return content.greet;',
    ].join('\n');
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(2);
    expect(ranges[0]!.start.line).toBe(1);
    expect(ranges[1]!.start.line).toBe(2);
  });

  it('returns multiple ranges when the same file has multiple assignment call sites', () => {
    const text = [
      'function ComponentA() {',
      '  const a = useIntlayer("app");',
      '  return a.greet;',
      '}',
      'function ComponentB() {',
      '  const b = useIntlayer("app");',
      '  return b.greet;',
      '}',
    ].join('\n');
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(2);
    expect(ranges[0]!.start.line).toBe(2); // a.greet
    expect(ranges[1]!.start.line).toBe(6); // b.greet
  });
});

// ---------------------------------------------------------------------------
// Mixed patterns in the same file
// ---------------------------------------------------------------------------

describe('findFieldRangesInFile — mixed patterns', () => {
  it('collects both destructure and member-access hits', () => {
    const text = [
      'const { greet } = useIntlayer("app");', // line 0 — destructure
      'const c = useIntlayer("app");', // line 1 — assignment
      'return c.greet;', // line 2 — member access
    ].join('\n');
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(2);
    const lines = ranges.map((rng) => rng.start.line).sort((a, b) => a - b);
    expect(lines).toEqual([0, 2]);
  });

  it('returns 4 ranges for two call sites each using both patterns', () => {
    const text = [
      'const { greet } = useIntlayer("app");', // destructure #1
      'const c1 = useIntlayer("app");', // assign #1
      'console.log(c1.greet);', // member access #1
      '',
      'const { greet } = useIntlayer("app");', // destructure #2
      'const c2 = useIntlayer("app");', // assign #2
      'console.log(c2.greet);', // member access #2
    ].join('\n');
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    // destructure #1, member access #1, destructure #2, member access #2
    expect(ranges).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// TypeScript generics
// ---------------------------------------------------------------------------

describe('findFieldRangesInFile — TypeScript generics', () => {
  it('handles a simple identifier generic', () => {
    const text = `const { greet } = useIntlayer<AppContent>("app");`;
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(1);
  });

  it('handles an object-type generic', () => {
    const text = `const { greet } = useIntlayer<{ greet: string }>("app");`;
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    // The 'greet' inside the type annotation must NOT be returned —
    // only the destructure key.
    expect(ranges).toHaveLength(1);
    // The destructure 'greet' comes before the type annotation one
    expect(ranges[0]!.start.character).toBeLessThan(text.indexOf('<'));
  });

  it('handles getIntlayer with a generic', () => {
    const text = `const c = getIntlayer<AppContent>("app"); return c.greet;`;
    const ranges = findFieldRangesInFile(
      text,
      esc('app'),
      'greet',
      esc('greet')
    );
    expect(ranges).toHaveLength(1);
  });
});
