import { describe, expect, it } from 'vitest';
import { slugify, trimLeadingWhitespaceOutsideFences } from './utils';

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

describe('slugify', () => {
  it('should handle standard English slugs', () => {
    expect(slugify('Table of Contents')).toBe('table-of-contents');
    expect(slugify('Install Package')).toBe('install-package');
    expect(slugify('intlayer-cli package')).toBe('intlayer-cli-package');
    expect(slugify('Editor & Live Sync')).toBe('editor--live-sync');
  });

  it('should handle Chinese and CJK characters properly', () => {
    expect(slugify('目录')).toBe('目录');
    expect(slugify('安装包')).toBe('安装包');
    expect(slugify('intlayer-cli 包')).toBe('intlayer-cli-包');
    expect(slugify('执行 Intlayer 命令')).toBe('执行-intlayer-命令');
    expect(slugify('编辑器与实时同步 (Live Sync)')).toBe(
      '编辑器与实时同步-live-sync'
    );
    expect(slugify('在 package.json 中使用 intlayer 命令')).toBe(
      '在-packagejson-中使用-intlayer-命令'
    );
  });

  it('should handle French and other accented Latin characters', () => {
    expect(slugify('Éditeur')).toBe('editeur');
    expect(slugify('Déjà vu')).toBe('deja-vu');
  });
});
