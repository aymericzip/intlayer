import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getPreferredLanguages, localeDetector } from './localeDetector';

describe('getPreferredLanguages', () => {
  it('should parse simple Accept-Language header', () => {
    const header = 'en-US,en;q=0.9,fr;q=0.8';
    const available = ['en-US', 'fr'];
    expect(getPreferredLanguages(header, available)).toEqual(['en-US', 'fr']);
  });

  it('should sort by quality score', () => {
    const header = 'fr;q=0.7,en;q=0.9';
    const available = ['en', 'fr'];
    expect(getPreferredLanguages(header, available)).toEqual(['en', 'fr']);
  });

  it('should handle wildcard *', () => {
    const header = '*';
    const available = ['en', 'fr'];
    // When header is *, it should return all available languages in their original order
    expect(getPreferredLanguages(header, available)).toEqual(['en', 'fr']);
  });

  it('should return empty array if no matches and no wildcard', () => {
    const header = 'es';
    const available = ['en', 'fr'];
    expect(getPreferredLanguages(header, available)).toEqual([]);
  });

  it('should handle complex quality scores and specificity', () => {
    const header = 'en;q=0.8,en-US;q=0.9';
    const available = ['en-US', 'en'];
    expect(getPreferredLanguages(header, available)).toEqual(['en-US', 'en']);
  });

  it('should return languages from header if no available languages provided', () => {
    const header = 'en-US,fr;q=0.8';
    expect(getPreferredLanguages(header)).toEqual(['en-US', 'fr']);
  });
});

describe('localeDetector', () => {
  it('should detect locale from headers', () => {
    const headers = { 'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8' };
    const available = [Locales.ENGLISH, Locales.FRENCH];
    const result = localeDetector(headers, available, Locales.ENGLISH);
    expect(result).toBe(Locales.FRENCH);
  });

  it('should return default locale if no header provided', () => {
    const headers = {};
    const available = [Locales.ENGLISH, Locales.FRENCH];
    const result = localeDetector(headers, available, Locales.ENGLISH);
    expect(result).toBe(Locales.ENGLISH);
  });
});
