import * as Locales from '@intlayer/types/locales';
import { describe, expect, it } from 'vitest';
import { comparePaths, normalizePath } from './comparePaths';

const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.RUSSIAN];

describe('normalizePath', () => {
  it('should strip the locale segment', () => {
    expect(normalizePath('/ru/path', locales)).toBe('/path');
    expect(normalizePath('/fr/path', locales)).toBe('/path');
  });

  it('should ensure a leading slash', () => {
    expect(normalizePath('ru/path', locales)).toBe('/path');
    expect(normalizePath('path', locales)).toBe('/path');
  });

  it('should remove trailing slashes except for the root', () => {
    expect(normalizePath('/ru/path/', locales)).toBe('/path');
    expect(normalizePath('/path/', locales)).toBe('/path');
    expect(normalizePath('/', locales)).toBe('/');
  });

  it('should resolve locale-only paths to the root', () => {
    expect(normalizePath('/ru', locales)).toBe('/');
    expect(normalizePath('/ru/', locales)).toBe('/');
  });

  it('should fall back to the root for empty values', () => {
    expect(normalizePath('', locales)).toBe('/');
  });

  it('should ignore protocol, host, query string and hash', () => {
    expect(normalizePath('https://example.com/ru/path', locales)).toBe('/path');
    expect(normalizePath('/ru/path?foo=bar', locales)).toBe('/path');
    expect(normalizePath('/ru/path#section', locales)).toBe('/path');
  });
});

describe('comparePaths', () => {
  it('should match paths that differ only by locale', () => {
    expect(comparePaths('/ru/path', '/path', locales)).toBe(true);
    expect(comparePaths('/ru/path/', '/path', locales)).toBe(true);
    expect(comparePaths('/ru/path', '/path/', locales)).toBe(true);
  });

  it('should match locale-only paths against the root', () => {
    expect(comparePaths('/ru/', '/', locales)).toBe(true);
    expect(comparePaths('/ru', '/', locales)).toBe(true);
  });

  it('should match paths missing a leading slash', () => {
    expect(comparePaths('ru/path', '/path', locales)).toBe(true);
  });

  it('should treat empty values as the root path', () => {
    expect(comparePaths('', '/', locales)).toBe(true);
    expect(comparePaths('/ru', '', locales)).toBe(true);
  });

  it('should match absolute and relative URLs pointing to the same page', () => {
    expect(comparePaths('https://example.com/ru/path', '/path', locales)).toBe(
      true
    );
  });

  it('should not match different paths', () => {
    expect(comparePaths('/ru/path', '/other', locales)).toBe(false);
    expect(comparePaths('/ru/path', '/path/nested', locales)).toBe(false);
  });
});
