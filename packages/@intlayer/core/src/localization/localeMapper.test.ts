import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { localeFlatMap, localeMap, localeRecord } from './localeMapper';

describe('localeMapper', () => {
  const locales = [Locales.ENGLISH, Locales.FRENCH];
  const defaultLocale = Locales.ENGLISH;

  describe('localeMap', () => {
    it('should map locales to data objects in prefix-no-default mode', () => {
      const result = localeMap(
        (data) => ({
          prefix: data.urlPrefix,
          isDefault: data.isDefault,
        }),
        locales,
        defaultLocale,
        'prefix-no-default'
      );

      expect(result).toEqual([
        { prefix: '', isDefault: true },
        { prefix: '/fr', isDefault: false },
      ]);
    });

    it('should map locales to data objects in prefix-all mode', () => {
      const result = localeMap(
        (data) => ({
          prefix: data.urlPrefix,
          isDefault: data.isDefault,
        }),
        locales,
        defaultLocale,
        'prefix-all'
      );

      expect(result).toEqual([
        { prefix: '/en', isDefault: true },
        { prefix: '/fr', isDefault: false },
      ]);
    });
  });

  describe('localeFlatMap', () => {
    it('should flat map locales', () => {
      const result = localeFlatMap(
        (data) => [data.locale, data.urlPrefix],
        locales,
        defaultLocale,
        'prefix-all'
      );

      expect(result).toEqual(['en', '/en', 'fr', '/fr']);
    });
  });

  describe('localeRecord', () => {
    it('should create a record of locales', () => {
      const result = localeRecord(
        (data) => data.urlPrefix,
        locales,
        defaultLocale,
        'prefix-all'
      );

      expect(result).toEqual({
        en: '/en',
        fr: '/fr',
      });
    });
  });
});
