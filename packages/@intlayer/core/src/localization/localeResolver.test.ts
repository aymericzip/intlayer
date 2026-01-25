import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { localeResolver } from './localeResolver';

describe('localeResolver', () => {
  const locales = [
    Locales.ENGLISH,
    Locales.FRENCH,
    Locales.ENGLISH_UNITED_STATES,
  ];
  const defaultLocale = Locales.ENGLISH;

  it('should resolve exact matches', () => {
    expect(localeResolver(Locales.FRENCH, locales, defaultLocale)).toBe(
      Locales.FRENCH
    );
    expect(
      localeResolver(Locales.ENGLISH_UNITED_STATES, locales, defaultLocale)
    ).toBe(Locales.ENGLISH_UNITED_STATES);
  });

  it('should resolve partial matches (language subtag)', () => {
    // en-GB should resolve to en if en is available
    expect(localeResolver('en-GB' as any, locales, defaultLocale)).toBe(
      Locales.ENGLISH
    );
  });

  it('should resolve from an array of requested locales', () => {
    expect(
      localeResolver(
        [Locales.SPANISH, Locales.FRENCH] as any,
        locales,
        defaultLocale
      )
    ).toBe(Locales.FRENCH);
  });

  it('should fallback to default locale if no match is found', () => {
    expect(localeResolver(Locales.SPANISH, locales, defaultLocale)).toBe(
      defaultLocale
    );
  });

  it('should handle case-insensitive matching', () => {
    expect(localeResolver('FR' as any, locales, defaultLocale)).toBe(
      Locales.FRENCH
    );
  });
});
