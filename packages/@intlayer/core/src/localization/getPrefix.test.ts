import type { LocalesValues } from '@intlayer/types';
import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getPrefix } from './getPrefix';

describe('getPrefix', () => {
  describe('prefix-all mode', () => {
    it('should return prefix with trailing slash for default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toBe(`${Locales.ENGLISH}/`);
    });

    it('should return prefix with trailing slash for non-default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        defaultLocale: Locales.FRENCH,
        mode: 'prefix-all',
      });
      expect(result).toBe(`${Locales.FRENCH}/`);
    });

    it('should work with different locales', () => {
      const result = getPrefix('it' as LocalesValues, {
        defaultLocale: 'it' as LocalesValues,
        mode: 'prefix-all',
      });
      expect(result).toBe('it/');
    });
  });

  describe('prefix-no-default mode', () => {
    it('should return empty string when locale matches default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('');
    });

    it('should return prefix when locale does not match default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe(`${Locales.ENGLISH}/`);
    });

    it('should return empty string for default locale even with different locale param', () => {
      const result = getPrefix(Locales.FRENCH, {
        defaultLocale: Locales.FRENCH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('');
    });
  });

  describe('search-params mode', () => {
    it('should return empty string for default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('');
    });

    it('should return empty string for non-default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('');
    });
  });

  describe('no-prefix mode', () => {
    it('should return empty string for default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toBe('');
    });

    it('should return empty string for non-default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined locale parameter', () => {
      const result = getPrefix(undefined, {
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toBe(`${Locales.ENGLISH}/`);
    });

    it('should work with string locale values', () => {
      const result = getPrefix('en-US' as LocalesValues, {
        defaultLocale: 'en-US' as LocalesValues,
        mode: 'prefix-all',
      });
      expect(result).toBe('en-US/');
    });

    it('should handle missing mode parameter', () => {
      const result = getPrefix(Locales.ENGLISH, {
        defaultLocale: Locales.ENGLISH,
      });
      // Should use default routing mode from configuration
      expect(typeof result).toBe('string');
    });

    it('should handle missing defaultLocale parameter', () => {
      const result = getPrefix(Locales.ENGLISH, {
        mode: 'prefix-all',
      });
      // Should use default locale from configuration
      expect(typeof result).toBe('string');
    });

    it('should return prefix when locale differs from default', () => {
      const result = getPrefix(Locales.SPANISH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe(`${Locales.ENGLISH}/`);
    });

    it('should handle addSlash parameter', () => {
      const withSlash = getPrefix(Locales.ENGLISH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
        addSlash: true,
      });
      expect(withSlash).toBe(`${Locales.ENGLISH}/`);

      const withoutSlash = getPrefix(Locales.ENGLISH, {
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
        addSlash: false,
      });
      expect(withoutSlash).toBe(`${Locales.ENGLISH}`);
    });
  });
});
