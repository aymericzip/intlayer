import { describe, expect, it } from 'vitest';
import { trimLeadingWhitespaceOutsideFences } from './utils';

describe('trimLeadingWhitespaceOutsideFences', () => {
  it('should strip the structural indentation outside of fences', () => {
    const text = ['  <Tab>', '  Some text', '  </Tab>'].join('\n');

    expect(trimLeadingWhitespaceOutsideFences(text, '  ')).toBe(
      ['<Tab>', 'Some text', '</Tab>'].join('\n')
    );
  });

  it('should preserve the indentation of a fence opened at column 0', () => {
    const text = [
      '  <Tab label="oxlint">',
      '',
      '```json',
      '{',
      '  "rules": {',
      '    "intlayer/no-raw-text": "warn"',
      '  }',
      '}',
      '```',
      '',
      '  </Tab>',
    ].join('\n');

    expect(trimLeadingWhitespaceOutsideFences(text, '  ')).toBe(
      [
        '<Tab label="oxlint">',
        '',
        '```json',
        '{',
        '  "rules": {',
        '    "intlayer/no-raw-text": "warn"',
        '  }',
        '}',
        '```',
        '',
        '</Tab>',
      ].join('\n')
    );
  });

  it('should strip the fence indentation from an indented fenced block', () => {
    const text = [
      '  <Tab>',
      '',
      '  ```ts',
      '  const value = {',
      '    key: "value",',
      '  };',
      '  ```',
      '',
      '  </Tab>',
    ].join('\n');

    expect(trimLeadingWhitespaceOutsideFences(text, '  ')).toBe(
      [
        '<Tab>',
        '',
        '```ts',
        'const value = {',
        '  key: "value",',
        '};',
        '```',
        '',
        '</Tab>',
      ].join('\n')
    );
  });

  it('should not treat a shorter marker inside a fence as its closing fence', () => {
    const text = [
      '  <Tab>',
      '',
      '````md',
      '```ts',
      '  const value = 1;',
      '```',
      '````',
      '',
      '  </Tab>',
    ].join('\n');

    expect(trimLeadingWhitespaceOutsideFences(text, '  ')).toBe(
      [
        '<Tab>',
        '',
        '````md',
        '```ts',
        '  const value = 1;',
        '```',
        '````',
        '',
        '</Tab>',
      ].join('\n')
    );
  });

  it('should return the text untouched when there is no indentation to strip', () => {
    const text = ['<Tab>', '```ts', '  const value = 1;', '```', '</Tab>'].join(
      '\n'
    );

    expect(trimLeadingWhitespaceOutsideFences(text, '')).toBe(text);
  });
});
