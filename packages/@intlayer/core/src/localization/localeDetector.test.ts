import * as Locales from '@intlayer/types/locales';
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

  it('should resolve a missing header and an empty header differently', () => {
    const available = [Locales.FRENCH, Locales.ENGLISH];

    // No header means `*`: the first available locale wins
    expect(localeDetector({}, available, Locales.ENGLISH)).toBe(Locales.FRENCH);
    // An empty header matches nothing: the default locale wins
    expect(
      localeDetector({ 'accept-language': '' }, available, Locales.ENGLISH)
    ).toBe(Locales.ENGLISH);
  });

  it('should return the same locale when served from the cache', () => {
    const headers = { 'accept-language': 'fr-CA,fr;q=0.9,en;q=0.8' };
    const available = [Locales.ENGLISH, Locales.FRENCH];

    const firstResult = localeDetector(headers, available, Locales.ENGLISH);
    const cachedResult = localeDetector(headers, available, Locales.ENGLISH);

    expect(firstResult).toBe(Locales.FRENCH);
    expect(cachedResult).toBe(Locales.FRENCH);
  });

  it('should not reuse a result computed for other available locales', () => {
    const headers = { 'accept-language': 'es-MX,es;q=0.9' };

    expect(
      localeDetector(
        headers,
        [Locales.ENGLISH, Locales.SPANISH],
        Locales.ENGLISH
      )
    ).toBe(Locales.SPANISH);
    expect(
      localeDetector(
        headers,
        [Locales.ENGLISH, Locales.FRENCH],
        Locales.ENGLISH
      )
    ).toBe(Locales.ENGLISH);
  });

  it('should resolve headers too long to be cached', () => {
    const headers = {
      'accept-language': `${'x-unknown;q=0.1,'.repeat(20)}fr;q=0.9`,
    };

    expect(
      localeDetector(
        headers,
        [Locales.ENGLISH, Locales.FRENCH],
        Locales.ENGLISH
      )
    ).toBe(Locales.FRENCH);
  });
});
