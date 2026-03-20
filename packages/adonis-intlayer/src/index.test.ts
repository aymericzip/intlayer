import * as Locales from '@intlayer/types/locales';
import { describe, expect, it, vi } from 'vitest';

// Mock heavy deps before any imports that transitively load them.
const mockConfig = vi.hoisted(() => ({
  internationalization: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  editor: { enabled: false },
}));

vi.mock('@intlayer/config/node', () => ({
  getConfiguration: vi.fn(() => mockConfig),
}));

vi.mock('@intlayer/config/built', () => ({ default: mockConfig }));

vi.mock('@intlayer/chokidar/build', () => ({
  prepareIntlayer: vi.fn(),
}));

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
