import type { LocalesValues } from '@intlayer/types';
import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getPrefix } from './getPrefix';

describe('getPrefix', () => {
  describe('prefix-all mode', () => {
    it('should return prefix with trailing slash for default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        prefix: `${Locales.ENGLISH}/`,
        localePrefix: Locales.ENGLISH,
      });
    });

    it('should return prefix with trailing slash for non-default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.FRENCH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        prefix: `${Locales.FRENCH}/`,
        localePrefix: Locales.FRENCH,
      });
    });

    it('should work with different locales', () => {
      const result = getPrefix('it', {
        locales: ['it' as LocalesValues],
        defaultLocale: 'it',
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        prefix: 'it/',
        localePrefix: 'it',
      });
    });
  });

  describe('prefix-no-default mode', () => {
    it('should return empty strings when locale matches default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        prefix: '',
        localePrefix: undefined,
      });
    });

    it('should return prefix when locale does not match default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        prefix: `${Locales.FRENCH}/`,
        localePrefix: Locales.FRENCH,
      });
    });

    it('should return empty strings for default locale even with different locale param', () => {
      const result = getPrefix(Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.FRENCH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        prefix: '',
        localePrefix: undefined,
      });
    });
  });

  describe('search-params mode', () => {
    it('should return empty strings for default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        prefix: '',
        localePrefix: undefined,
      });
    });

    it('should return empty strings for non-default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        prefix: '',
        localePrefix: undefined,
      });
    });
  });

  describe('no-prefix mode', () => {
    it('should return empty strings for default locale', () => {
      const result = getPrefix(Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        prefix: '',
        localePrefix: undefined,
      });
    });

    it('should return empty strings for non-default locale', () => {
      const result = getPrefix(Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        prefix: '',
        localePrefix: undefined,
      });
    });
  });

  describe('edge cases', () => {
    it('should handle undefined locale parameter', () => {
      const result = getPrefix(undefined as unknown as LocalesValues, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        prefix: '',
        localePrefix: undefined,
      });
    });

    it('should work with string locale values', () => {
      const result = getPrefix('en-US', {
        locales: ['en-US' as LocalesValues],
        defaultLocale: 'en-US',
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        prefix: 'en-US/',
        localePrefix: 'en-US',
      });
    });

    it('should handle missing mode parameter', () => {
      const result = getPrefix(Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
      });
      // Should use default routing mode from configuration
      expect(result).toHaveProperty('prefix');
      expect(result).toHaveProperty('localePrefix');
    });

    it('should handle missing defaultLocale parameter', () => {
      const result = getPrefix(Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        mode: 'prefix-all',
      });
      // Should use default locale from configuration
      expect(result).toHaveProperty('prefix');
      expect(result).toHaveProperty('localePrefix');
    });

    it('should return prefix when locale differs from default', () => {
      const result = getPrefix(Locales.SPANISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        prefix: `${Locales.SPANISH}/`,
        localePrefix: Locales.SPANISH,
      });
    });
  });
});
