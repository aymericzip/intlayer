import { Locales } from '@intlayer/types';
import { describe, expect, it, vi } from 'vitest';
import { getLocale, t } from './index';

describe('adonis-intlayer', () => {
  describe('t', () => {
    it('should return the translation for the default locale when context is not initialized', () => {
      const translations = {
        en: 'Hello',
        fr: 'Bonjour',
      };

      // Should fallback to default locale (English)
      expect(t(translations)).toBe('Hello');
    });

    it('should return the translation for a specific locale when passed as argument', () => {
      const translations = {
        en: 'Hello',
        fr: 'Bonjour',
      };

      expect(t(translations, Locales.FRENCH)).toBe('Bonjour');
    });
  });

  describe('getLocale', () => {
    it('should return the default locale when context is not initialized', () => {
      expect(getLocale()).toBe(Locales.ENGLISH);
    });

    it('should return the locale passed as argument when context is not initialized', () => {
      expect(getLocale(Locales.FRENCH)).toBe(Locales.FRENCH);
    });
  });
});
