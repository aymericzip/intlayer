import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getPathWithoutLocale } from './getPathWithoutLocale';

describe('getPathWithoutLocale', () => {
  const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

  it('should remove locale segment from the beginning of the path', () => {
    expect(getPathWithoutLocale('/en/dashboard', locales)).toBe('/dashboard');
    expect(getPathWithoutLocale('/fr/dashboard', locales)).toBe('/dashboard');
  });

  it('should return the same path if no locale segment is present', () => {
    expect(getPathWithoutLocale('/dashboard', locales)).toBe('/dashboard');
    expect(getPathWithoutLocale('/en-us/dashboard', locales)).toBe(
      '/en-us/dashboard'
    );
  });

  it('should remove locale from search parameters', () => {
    expect(getPathWithoutLocale('/dashboard?locale=fr', locales)).toBe(
      '/dashboard'
    );
    expect(getPathWithoutLocale('/dashboard?foo=bar&locale=fr', locales)).toBe(
      '/dashboard?foo=bar'
    );
  });

  it('should handle absolute URLs', () => {
    expect(
      getPathWithoutLocale('https://example.com/en/dashboard', locales)
    ).toBe('https://example.com/dashboard');
    expect(
      getPathWithoutLocale('https://example.com/dashboard?locale=fr', locales)
    ).toBe('https://example.com/dashboard');
  });

  it('should handle trailing slashes', () => {
    // Note: the current implementation of getPathWithoutLocale removes trailing slash if it ends with one
    expect(getPathWithoutLocale('/en/dashboard/', locales)).toBe('/dashboard');
  });

  it('should handle root path with locale', () => {
    expect(getPathWithoutLocale('/en', locales)).toBe('/');
    expect(getPathWithoutLocale('/en/', locales)).toBe('/');
  });
});
