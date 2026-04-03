import * as Locales from '@intlayer/types/locales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
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

  describe('domain routing', () => {
    it('should return empty prefix when locale is assigned to its own domain', () => {
      const result = getPrefix(Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.CHINESE],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
        domains: { [Locales.FRENCH]: 'example.fr' },
      });
      expect(result).toEqual({ prefix: '', localePrefix: undefined });
    });

    it('should return empty prefix for domain-assigned locale even in prefix-all mode', () => {
      const result = getPrefix(Locales.CHINESE, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.CHINESE],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
        domains: { [Locales.CHINESE]: 'example.zh' },
      });
      expect(result).toEqual({ prefix: '', localePrefix: undefined });
    });

    it('should still prefix a locale that shares a domain with others', () => {
      // 'fr' and 'es' both map to 'example.org' — not exclusive, so normal prefix applies
      const result = getPrefix(Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
        domains: {
          [Locales.FRENCH]: 'example.org',
          [Locales.SPANISH]: 'example.org',
        },
      });
      expect(result).toEqual({
        prefix: `${Locales.FRENCH}/`,
        localePrefix: Locales.FRENCH,
      });
    });

    it('should return normal prefix for locale without a domains entry', () => {
      const result = getPrefix(Locales.SPANISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
        domains: { [Locales.FRENCH]: 'example.fr' },
      });
      expect(result).toEqual({
        prefix: `${Locales.SPANISH}/`,
        localePrefix: Locales.SPANISH,
      });
    });

    it('should return empty prefix for default locale regardless of domains', () => {
      const result = getPrefix(Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
        domains: { [Locales.FRENCH]: 'example.fr' },
      });
      expect(result).toEqual({ prefix: '', localePrefix: undefined });
    });

    it('should handle domains with protocol prefix', () => {
      const result = getPrefix(Locales.CHINESE, {
        locales: [Locales.ENGLISH, Locales.CHINESE],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
        domains: { [Locales.CHINESE]: 'https://example.zh' },
      });
      expect(result).toEqual({ prefix: '', localePrefix: undefined });
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
