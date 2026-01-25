import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getHTMLTextDir } from './getHTMLTextDir';

describe('getHTMLTextDir', () => {
  it('should return "ltr" for English', () => {
    expect(getHTMLTextDir(Locales.ENGLISH)).toBe('ltr');
  });

  it('should return "ltr" for French', () => {
    expect(getHTMLTextDir(Locales.FRENCH)).toBe('ltr');
  });

  it('should return "rtl" for Arabic', () => {
    expect(getHTMLTextDir(Locales.ARABIC)).toBe('rtl');
    expect(getHTMLTextDir(Locales.ARABIC_EGYPT)).toBe('rtl');
  });

  it('should return "rtl" for Hebrew', () => {
    expect(getHTMLTextDir(Locales.HEBREW)).toBe('rtl');
    expect(getHTMLTextDir(Locales.HEBREW_ISRAEL)).toBe('rtl');
  });

  it('should return "rtl" for Farsi', () => {
    expect(getHTMLTextDir(Locales.FARSI)).toBe('rtl');
  });

  it('should return "ltr" for undefined locale', () => {
    expect(getHTMLTextDir(undefined)).toBe('ltr');
  });

  it('should return "ltr" for unknown locales', () => {
    expect(getHTMLTextDir('unknown' as any)).toBe('ltr');
  });
});
