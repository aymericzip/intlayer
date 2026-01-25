import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getLocaleFromPath } from './getLocaleFromPath';

describe('getLocaleFromPath', () => {
  const options = {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  };

  describe('prefix-all mode', () => {
    const modeOptions = { ...options, mode: 'prefix-all' as const };

    it('should extract locale from path prefix', () => {
      expect(getLocaleFromPath('/en/dashboard', modeOptions)).toBe(
        Locales.ENGLISH
      );
      expect(getLocaleFromPath('/fr/dashboard', modeOptions)).toBe(
        Locales.FRENCH
      );
    });

    it('should return undefined if no valid locale prefix is found', () => {
      expect(getLocaleFromPath('/dashboard', modeOptions)).toBeUndefined();
    });
  });

  describe('prefix-no-default mode', () => {
    const modeOptions = { ...options, mode: 'prefix-no-default' as const };

    it('should extract locale from path prefix', () => {
      expect(getLocaleFromPath('/fr/dashboard', modeOptions)).toBe(
        Locales.FRENCH
      );
    });

    it('should return default locale if no prefix is found', () => {
      expect(getLocaleFromPath('/dashboard', modeOptions)).toBe(
        Locales.ENGLISH
      );
    });
  });

  describe('search-params mode', () => {
    const modeOptions = { ...options, mode: 'search-params' as const };

    it('should extract locale from search params', () => {
      expect(getLocaleFromPath('/dashboard?locale=fr', modeOptions)).toBe(
        Locales.FRENCH
      );
    });

    it('should return default locale if no locale param is found', () => {
      expect(getLocaleFromPath('/dashboard', modeOptions)).toBe(
        Locales.ENGLISH
      );
    });
  });

  describe('no-prefix mode', () => {
    const modeOptions = { ...options, mode: 'no-prefix' as const };

    it('should always return default locale', () => {
      expect(getLocaleFromPath('/fr/dashboard', modeOptions)).toBe(
        Locales.ENGLISH
      );
      expect(getLocaleFromPath('/dashboard', modeOptions)).toBe(
        Locales.ENGLISH
      );
    });
  });

  it('should handle absolute URLs', () => {
    expect(
      getLocaleFromPath('https://example.com/fr/dashboard', {
        ...options,
        mode: 'prefix-all',
      })
    ).toBe(Locales.FRENCH);
  });
});
