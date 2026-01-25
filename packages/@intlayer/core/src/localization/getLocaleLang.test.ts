import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getLocaleLang } from './getLocaleLang';

describe('getLocaleLang', () => {
  it('should return the language code for locales with country code', () => {
    expect(getLocaleLang(Locales.ENGLISH_UNITED_STATES)).toBe('en');
    expect(getLocaleLang(Locales.FRENCH_CANADA)).toBe('fr');
  });

  it('should return the language code for locales without country code', () => {
    expect(getLocaleLang(Locales.ENGLISH)).toBe('en');
    expect(getLocaleLang(Locales.FRENCH)).toBe('fr');
  });

  it('should return an empty string for undefined locale', () => {
    expect(getLocaleLang(undefined)).toBe('');
  });

  it('should handle custom locale strings', () => {
    expect(getLocaleLang('es-ES' as any)).toBe('es');
    expect(getLocaleLang('pt' as any)).toBe('pt');
  });
});
