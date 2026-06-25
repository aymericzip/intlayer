// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { linguiMessageToIcu, navigateCatalog } from './linguiCatalog';

describe('navigateCatalog', () => {
  it('resolves a flat dotted key (lingui catalog format)', () => {
    expect(
      navigateCatalog(
        { 'results-table.bundleSize': 'Bundle Size' },
        'results-table.bundleSize'
      )
    ).toBe('Bundle Size');
  });

  it('resolves a top-level key without dots', () => {
    expect(navigateCatalog({ mockBanner: 'Mock' }, 'mockBanner')).toBe('Mock');
  });

  it('resolves a nested path when no flat key matches', () => {
    expect(navigateCatalog({ home: { title: 'Welcome' } }, 'home.title')).toBe(
      'Welcome'
    );
  });

  it('prefers the flat key over nested navigation', () => {
    expect(navigateCatalog({ 'a.b': 'flat', a: { b: 'nested' } }, 'a.b')).toBe(
      'flat'
    );
  });

  it('returns undefined for a missing key', () => {
    expect(navigateCatalog({ a: 'x' }, 'missing.key')).toBeUndefined();
  });

  it('returns undefined for non-object catalogs', () => {
    expect(navigateCatalog(null, 'a')).toBeUndefined();
    expect(navigateCatalog('string', 'a')).toBeUndefined();
  });
});

describe('linguiMessageToIcu', () => {
  it('passes plain strings through (uncompiled .json catalog)', () => {
    expect(linguiMessageToIcu('Bundle Size')).toBe('Bundle Size');
  });

  it('flattens a single-string token array (compiled .mjs catalog)', () => {
    expect(linguiMessageToIcu(['Bundle Size'])).toBe('Bundle Size');
  });

  it('converts a placeholder token to an ICU variable', () => {
    expect(linguiMessageToIcu(['Hello ', ['name'], '!'])).toBe('Hello {name}!');
  });

  it('converts a number-formatted token', () => {
    expect(linguiMessageToIcu([['value', 'number']])).toBe('{value, number}');
  });

  it('converts a number token with a format style', () => {
    expect(linguiMessageToIcu([['value', 'number', 'percent']])).toBe(
      '{value, number, percent}'
    );
  });

  it('converts a plural token to an ICU plural block', () => {
    expect(
      linguiMessageToIcu([
        ['count', 'plural', { one: ['# item'], other: ['# items'] }],
      ])
    ).toBe('{count, plural, one {# item} other {# items}}');
  });

  it('converts a plural token with an offset', () => {
    expect(
      linguiMessageToIcu([
        ['count', 'plural', { offset: 1, other: ['# items'] }],
      ])
    ).toBe('{count, plural, offset:1 other {# items}}');
  });

  it('converts a select token', () => {
    expect(
      linguiMessageToIcu([
        ['role', 'select', { admin: ['Admin'], other: ['User'] }],
      ])
    ).toBe('{role, select, admin {Admin} other {User}}');
  });
});
