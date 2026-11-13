import { describe, expect, it } from 'vitest';
import { getExtractionIgnoreDirectives } from './ignoreDirectives';

/** Offset of the first occurrence of `needle` in `source`. */
const offsetOf = (source: string, needle: string): number =>
  source.indexOf(needle);

describe('getExtractionIgnoreDirectives', () => {
  it('ignores nothing without directives', () => {
    const source = 'const name = "John";';
    const directives = getExtractionIgnoreDirectives(source);

    expect(directives.isFileIgnored).toBe(false);
    expect(directives.isOffsetIgnored(offsetOf(source, 'John'))).toBe(false);
  });

  it('ignores the whole file', () => {
    const source = '// intlayer-ignore-file\nconst title = "Welcome home";';

    expect(getExtractionIgnoreDirectives(source).isFileIgnored).toBe(true);
  });

  it('ignores the line after an ignore-next-line comment', () => {
    const source = [
      '// intlayer-ignore-next-line',
      'const author = "John";',
      'const title = "Welcome";',
    ].join('\n');
    const directives = getExtractionIgnoreDirectives(source);

    expect(directives.isFileIgnored).toBe(false);
    expect(directives.isOffsetIgnored(offsetOf(source, 'John'))).toBe(true);
    expect(directives.isOffsetIgnored(offsetOf(source, 'Welcome'))).toBe(false);
  });

  it('ignores the line holding an ignore-line comment', () => {
    const source = [
      'const author = "John"; // intlayer-ignore-line',
      'const title = "Welcome";',
    ].join('\n');
    const directives = getExtractionIgnoreDirectives(source);

    expect(directives.isOffsetIgnored(offsetOf(source, 'John'))).toBe(true);
    expect(directives.isOffsetIgnored(offsetOf(source, 'Welcome'))).toBe(false);
  });

  it('supports JSX and HTML comment syntaxes', () => {
    const source = [
      '{/* intlayer-ignore-next-line */}',
      '<p>John</p>',
      '<!-- intlayer-ignore-next-line -->',
      '<p>Jane</p>',
      '<p>Welcome</p>',
    ].join('\n');
    const directives = getExtractionIgnoreDirectives(source);

    expect(directives.isOffsetIgnored(offsetOf(source, 'John'))).toBe(true);
    expect(directives.isOffsetIgnored(offsetOf(source, 'Jane'))).toBe(true);
    expect(directives.isOffsetIgnored(offsetOf(source, 'Welcome'))).toBe(false);
  });

  it('does not treat a directive inside a plain string as a comment', () => {
    const source = [
      'const hint = "Add intlayer-ignore-file to skip a file";',
      'const title = "Welcome";',
    ].join('\n');
    const directives = getExtractionIgnoreDirectives(source);

    expect(directives.isFileIgnored).toBe(false);
    expect(directives.isOffsetIgnored(offsetOf(source, 'Welcome'))).toBe(false);
  });

  it('never ignores an unknown offset', () => {
    const directives = getExtractionIgnoreDirectives('// intlayer-ignore-line');

    expect(directives.isOffsetIgnored(undefined)).toBe(false);
    expect(directives.isOffsetIgnored(null)).toBe(false);
  });
});
