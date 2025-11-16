import type { LocalesValues } from '@intlayer/types';
import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getLocalizedUrl } from './getLocalizedUrl';

describe('getLocalizedUrl', () => {
  describe('prefix-no-default mode', () => {
    it('should not prefix default locale URLs', () => {
      const result = getLocalizedUrl('/about', Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/about');
    });

    it('should prefix non-default locale URLs', () => {
      const result = getLocalizedUrl('/about', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr/about');
    });

    it('should handle URLs with query parameters', () => {
      const result = getLocalizedUrl('/about?page=1', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr/about?page=1');
    });

    it('should handle URLs with hash fragments', () => {
      const result = getLocalizedUrl('/about#section', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr/about#section');
    });

    it('should handle URLs with both query and hash', () => {
      const result = getLocalizedUrl('/about?page=1#section', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr/about?page=1#section');
    });

    it('should remove existing locale prefix before adding new one', () => {
      const result = getLocalizedUrl('/en/about', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr/about');
    });

    it('should handle root path', () => {
      const result = getLocalizedUrl('/', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr');
    });

    it('should not add trailing slash for non-root paths', () => {
      const result = getLocalizedUrl('/about/', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr/about');
    });
  });

  describe('prefix-all mode', () => {
    it('should prefix default locale URLs', () => {
      const result = getLocalizedUrl('/about', Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toBe('/en/about');
    });

    it('should prefix non-default locale URLs', () => {
      const result = getLocalizedUrl('/about', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toBe('/fr/about');
    });

    it('should handle root path with default locale', () => {
      const result = getLocalizedUrl('/', Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toBe('/en');
    });

    it('should remove existing locale before adding new one', () => {
      const result = getLocalizedUrl('/en/about', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-all',
      });
      expect(result).toBe('/fr/about');
    });
  });

  describe('search-params mode', () => {
    it('should add locale as query parameter for default locale', () => {
      const result = getLocalizedUrl('/about', Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('/about?locale=en');
    });

    it('should add locale as query parameter for non-default locale', () => {
      const result = getLocalizedUrl('/about', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('/about?locale=fr');
    });

    it('should append locale to existing query parameters', () => {
      const result = getLocalizedUrl('/about?page=1', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('/about?page=1&locale=fr');
    });

    it('should replace existing locale query parameter', () => {
      const result = getLocalizedUrl('/about?locale=en', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('/about?locale=fr');
    });

    it('should preserve hash fragments', () => {
      const result = getLocalizedUrl('/about#section', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('/about?locale=fr#section');
    });

    it('should handle both query and hash', () => {
      const result = getLocalizedUrl('/about?page=1#section', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'search-params',
      });
      expect(result).toBe('/about?page=1&locale=fr#section');
    });
  });

  describe('no-prefix mode', () => {
    it('should not modify URL for default locale', () => {
      const result = getLocalizedUrl('/about', Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toBe('/about');
    });

    it('should not modify URL for non-default locale', () => {
      const result = getLocalizedUrl('/about', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toBe('/about');
    });

    it('should remove existing locale prefix', () => {
      const result = getLocalizedUrl('/fr/about', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toBe('/about');
    });

    it('should preserve query parameters', () => {
      const result = getLocalizedUrl('/about?page=1', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toBe('/about?page=1');
    });

    it('should preserve hash fragments', () => {
      const result = getLocalizedUrl('/about#section', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'no-prefix',
      });
      expect(result).toBe('/about#section');
    });
  });

  describe('absolute URLs', () => {
    it('should handle absolute URLs with prefix-no-default', () => {
      const result = getLocalizedUrl(
        'https://example.com/about',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'prefix-no-default',
        }
      );
      expect(result).toBe('https://example.com/fr/about');
    });

    it('should handle absolute URLs with prefix-all', () => {
      const result = getLocalizedUrl(
        'https://example.com/about',
        Locales.ENGLISH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'prefix-all',
        }
      );
      expect(result).toBe(`https://example.com/${Locales.ENGLISH}/about`);
    });

    it('should handle absolute URLs with search-params', () => {
      const result = getLocalizedUrl(
        'https://example.com/about',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'search-params',
        }
      );
      expect(result).toBe('https://example.com/about?locale=fr');
    });

    it('should handle absolute URLs with no-prefix', () => {
      const result = getLocalizedUrl(
        'https://example.com/about',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'no-prefix',
        }
      );
      expect(result).toBe('https://example.com/about');
    });

    it('should handle absolute URLs with query parameters', () => {
      const result = getLocalizedUrl(
        'https://example.com/about?page=1',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'prefix-no-default',
        }
      );
      expect(result).toBe('https://example.com/fr/about?page=1');
    });

    it('should handle absolute URLs with hash', () => {
      const result = getLocalizedUrl(
        'https://example.com/about#section',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'prefix-no-default',
        }
      );
      expect(result).toBe('https://example.com/fr/about#section');
    });

    it('should handle absolute URLs with port', () => {
      const result = getLocalizedUrl(
        'http://localhost:3000/about',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'prefix-no-default',
        }
      );
      expect(result).toBe('http://localhost:3000/fr/about');
    });
  });

  describe('edge cases', () => {
    it('should handle empty path', () => {
      const result = getLocalizedUrl('', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr');
    });

    it('should handle nested paths', () => {
      const result = getLocalizedUrl('/blog/posts/article', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/fr/blog/posts/article');
    });

    it('should handle locale codes with regions', () => {
      const result = getLocalizedUrl('/about', 'en-US', {
        locales: ['en-US', 'en-GB', 'fr-FR'],
        defaultLocale: 'en-US',
        mode: 'prefix-no-default',
      });
      expect(result).toBe('/about');
    });

    it('should handle complex query strings', () => {
      const result = getLocalizedUrl(
        '/search?q=test&category=all&page=1',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'prefix-no-default',
        }
      );
      expect(result).toBe('/fr/search?q=test&category=all&page=1');
    });

    it('should handle URLs with special characters in query', () => {
      const result = getLocalizedUrl(
        '/search?q=hello%20world',
        Locales.FRENCH,
        {
          locales: [Locales.ENGLISH, Locales.FRENCH],
          defaultLocale: Locales.ENGLISH,
          mode: 'prefix-no-default',
        }
      );
      expect(result).toBe('/fr/search?q=hello%20world');
    });
  });
});
