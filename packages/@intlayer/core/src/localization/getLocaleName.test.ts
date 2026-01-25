import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getLocaleName } from './getLocaleName';

describe('getLocaleName', () => {
  it('should return the locale name in its own language by default', () => {
    expect(getLocaleName(Locales.ENGLISH)).toBe('English');
    expect(getLocaleName(Locales.FRENCH)).toBe('français');
  });

  it('should return the locale name in a target language', () => {
    expect(getLocaleName(Locales.ENGLISH, Locales.FRENCH)).toBe('anglais');
    expect(getLocaleName(Locales.FRENCH, Locales.ENGLISH)).toBe('French');
  });

  it('should handle region-specific locales', () => {
    expect(getLocaleName(Locales.ENGLISH_UNITED_STATES, Locales.ENGLISH)).toBe(
      'American English'
    );
  });
});
