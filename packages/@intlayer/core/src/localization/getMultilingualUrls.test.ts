import type { LocalesValues } from '@intlayer/types';
import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getMultilingualUrls } from './getMultilingualUrls';

describe('getMultilingualUrls', () => {
  describe('prefix-no-default mode', () => {
    it('should generate URLs for all locales without prefix for default', () => {
      const result = getMultilingualUrls('/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/about',
        fr: '/fr/about',
        es: '/es/about',
      });
    });

    it('should generate URLs with query parameters preserved', () => {
      const result = getMultilingualUrls('/about?page=1', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/about?page=1',
        fr: '/fr/about?page=1',
      });
    });

    it('should generate URLs with hash fragments preserved', () => {
      const result = getMultilingualUrls('/about#section', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/about#section',
        fr: '/fr/about#section',
      });
    });

    it('should generate URLs for root path', () => {
      const result = getMultilingualUrls('/', {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/',
        fr: '/fr',
        es: '/es',
      });
    });

    it('should remove existing locale prefix before generating new URLs', () => {
      const result = getMultilingualUrls('/fr/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/about',
        fr: '/fr/about',
        es: '/es/about',
      });
    });
  });

  describe('prefix-all mode', () => {
    it('should generate URLs with prefixes for all locales', () => {
      const result = getMultilingualUrls('/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        en: '/en/about',
        fr: '/fr/about',
        es: '/es/about',
      });
    });

    it('should generate prefixed URLs for root path', () => {
      const result = getMultilingualUrls('/', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        en: '/en',
        fr: '/fr',
      });
    });

    it('should preserve query parameters', () => {
      const result = getMultilingualUrls('/about?page=1', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        en: '/en/about?page=1',
        fr: '/fr/about?page=1',
      });
    });

    it('should preserve hash fragments', () => {
      const result = getMultilingualUrls('/about#section', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        en: '/en/about#section',
        fr: '/fr/about#section',
      });
    });
  });

  describe('search-params mode', () => {
    it('should generate URLs with locale query parameters', () => {
      const result = getMultilingualUrls('/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        en: '/about?locale=en',
        fr: '/about?locale=fr',
        es: '/about?locale=es',
      });
    });

    it('should append locale to existing query parameters', () => {
      const result = getMultilingualUrls('/about?page=1', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        en: '/about?page=1&locale=en',
        fr: '/about?page=1&locale=fr',
      });
    });

    it('should replace existing locale query parameter', () => {
      const result = getMultilingualUrls('/about?locale=de', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        en: '/about?locale=en',
        fr: '/about?locale=fr',
      });
    });

    it('should preserve hash fragments', () => {
      const result = getMultilingualUrls('/about#section', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        en: '/about?locale=en#section',
        fr: '/about?locale=fr#section',
      });
    });

    it('should handle both query and hash', () => {
      const result = getMultilingualUrls('/about?page=1#section', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        en: '/about?page=1&locale=en#section',
        fr: '/about?page=1&locale=fr#section',
      });
    });
  });

  describe('no-prefix mode', () => {
    it('should generate same URL for all locales', () => {
      const result = getMultilingualUrls('/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        en: '/about',
        fr: '/about',
        es: '/about',
      });
    });

    it('should remove existing locale prefix', () => {
      const result = getMultilingualUrls('/fr/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        en: '/about',
        fr: '/about',
        es: '/about',
      });
    });

    it('should preserve query parameters', () => {
      const result = getMultilingualUrls('/about?page=1', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        en: '/about?page=1',
        fr: '/about?page=1',
      });
    });

    it('should preserve hash fragments', () => {
      const result = getMultilingualUrls('/about#section', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        en: '/about#section',
        fr: '/about#section',
      });
    });
  });

  describe('absolute URLs', () => {
    it('should handle absolute URLs with prefix-no-default', () => {
      const result = getMultilingualUrls('https://example.com/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: 'https://example.com/about',
        fr: 'https://example.com/fr/about',
      });
    });

    it('should handle absolute URLs with prefix-all', () => {
      const result = getMultilingualUrls('https://example.com/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        en: `https://example.com/${Locales.ENGLISH}/about`,
        fr: `https://example.com/${Locales.FRENCH}/about`,
      });
    });

    it('should handle absolute URLs with search-params', () => {
      const result = getMultilingualUrls('https://example.com/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        en: 'https://example.com/about?locale=en',
        fr: 'https://example.com/about?locale=fr',
      });
    });

    it('should handle absolute URLs with no-prefix', () => {
      const result = getMultilingualUrls('https://example.com/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        en: 'https://example.com/about',
        fr: 'https://example.com/about',
      });
    });

    it('should handle absolute URLs with query parameters', () => {
      const result = getMultilingualUrls('https://example.com/about?page=1', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: 'https://example.com/about?page=1',
        fr: 'https://example.com/fr/about?page=1',
      });
    });

    it('should handle absolute URLs with hash', () => {
      const result = getMultilingualUrls('https://example.com/about#section', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: 'https://example.com/about#section',
        fr: 'https://example.com/fr/about#section',
      });
    });

    it('should handle absolute URLs with port', () => {
      const result = getMultilingualUrls('http://localhost:3000/about', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: 'http://localhost:3000/about',
        fr: 'http://localhost:3000/fr/about',
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty locales array', () => {
      const result = getMultilingualUrls('/about', {
        locales: [],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({});
    });

    it('should handle single locale', () => {
      const result = getMultilingualUrls('/about', {
        locales: [Locales.ENGLISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/about',
      });
    });

    it('should handle nested paths', () => {
      const result = getMultilingualUrls('/blog/posts/article', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/blog/posts/article',
        fr: '/fr/blog/posts/article',
      });
    });

    it('should handle locale codes with regions', () => {
      const result = getMultilingualUrls('/about', {
        locales: ['en-US', 'en-GB', 'fr-FR'],
        defaultLocale: 'en-US' as LocalesValues,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        'en-US': '/about',
        'en-GB': '/en-GB/about',
        'fr-FR': '/fr-FR/about',
      });
    });

    it('should handle complex query strings', () => {
      const result = getMultilingualUrls('/search?q=test&category=all&page=1', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/search?q=test&category=all&page=1',
        fr: '/fr/search?q=test&category=all&page=1',
      });
    });

    it('should handle URLs with special characters in query', () => {
      const result = getMultilingualUrls('/search?q=hello%20world', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/search?q=hello%20world',
        fr: '/fr/search?q=hello%20world',
      });
    });

    it('should handle many locales', () => {
      const result = getMultilingualUrls('/about', {
        locales: [
          Locales.ENGLISH,
          Locales.FRENCH,
          Locales.SPANISH,
          'de',
          'it',
          'pt',
        ],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/about',
        fr: '/fr/about',
        es: '/es/about',
        de: '/de/about',
        it: '/it/about',
        pt: '/pt/about',
      });
    });

    it('should not add trailing slash for non-root paths', () => {
      const result = getMultilingualUrls('/about/', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/about',
        fr: '/fr/about',
      });
    });
  });

  describe('consistency with documentation examples', () => {
    it('should match example from documentation for prefix-no-default', () => {
      const result = getMultilingualUrls('/dashboard', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toEqual({
        en: '/dashboard',
        fr: '/fr/dashboard',
      });
    });

    it('should match example from documentation for prefix-all', () => {
      const result = getMultilingualUrls('/dashboard', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toEqual({
        en: '/en/dashboard',
        fr: '/fr/dashboard',
      });
    });

    it('should match example from documentation for search-params', () => {
      const result = getMultilingualUrls('/dashboard', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toEqual({
        en: '/dashboard?locale=en',
        fr: '/dashboard?locale=fr',
      });
    });

    it('should match example from documentation for no-prefix', () => {
      const result = getMultilingualUrls('/dashboard', {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toEqual({
        en: '/dashboard',
        fr: '/dashboard',
      });
    });
  });
});
