import * as Locales from '@intlayer/types/locales';
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

    it('should handle path that is just a locale', () => {
      const result1 = getLocalizedUrl('/fr', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result1).toBe('/fr');

      const result2 = getLocalizedUrl('/fr', Locales.SPANISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result2).toBe('/es');

      const result3 = getLocalizedUrl('/fr', Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result3).toBe('/');
    });

    it('should handle path that is just a locale without leading slash', () => {
      const result1 = getLocalizedUrl('fr', Locales.FRENCH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result1).toBe('/fr');

      const result2 = getLocalizedUrl('fr', Locales.SPANISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result2).toBe('/es');

      const result3 = getLocalizedUrl('fr', Locales.ENGLISH, {
        locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result3).toBe('/');
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

  describe('domain routing', () => {
    // Simulates calling from a page on intlayer.org
    const domainOptions = {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.CHINESE],
      defaultLocale: Locales.ENGLISH,
      mode: 'prefix-no-default' as const,
      currentDomain: 'intlayer.org',
      domains: {
        [Locales.CHINESE]: 'intlayer.zh',
        [Locales.FRENCH]: 'intlayer.org',
        [Locales.ENGLISH]: 'intlayer.org',
      },
    };

    it('should return absolute URL for locale on a different domain', () => {
      const result = getLocalizedUrl('/about', Locales.CHINESE, domainOptions);
      expect(result).toBe('https://intlayer.zh/about');
    });

    it('should not add locale prefix for exclusive domain locale', () => {
      // zh maps to intlayer.zh — no /zh/ prefix in path
      const result = getLocalizedUrl('/', Locales.CHINESE, domainOptions);
      expect(result).toBe('https://intlayer.zh/');
    });

    it('should preserve query parameters in cross-domain URL', () => {
      const result = getLocalizedUrl(
        '/about?page=1',
        Locales.CHINESE,
        domainOptions
      );
      expect(result).toBe('https://intlayer.zh/about?page=1');
    });

    it('should preserve hash fragments in cross-domain URL', () => {
      const result = getLocalizedUrl(
        '/about#section',
        Locales.CHINESE,
        domainOptions
      );
      expect(result).toBe('https://intlayer.zh/about#section');
    });

    it('should strip existing locale prefix before applying cross-domain', () => {
      const result = getLocalizedUrl(
        '/zh/about',
        Locales.CHINESE,
        domainOptions
      );
      expect(result).toBe('https://intlayer.zh/about');
    });

    it('should replace the origin of an absolute URL when target domain differs', () => {
      const result = getLocalizedUrl(
        'https://intlayer.org/about',
        Locales.CHINESE,
        domainOptions
      );
      expect(result).toBe('https://intlayer.zh/about');
    });

    it('should use domain with explicit https:// protocol', () => {
      const result = getLocalizedUrl('/about', Locales.CHINESE, {
        ...domainOptions,
        domains: { [Locales.CHINESE]: 'https://intlayer.zh' },
      });
      expect(result).toBe('https://intlayer.zh/about');
    });

    it('should use domain with explicit http:// protocol', () => {
      const result = getLocalizedUrl('/about', Locales.CHINESE, {
        ...domainOptions,
        domains: { [Locales.CHINESE]: 'http://intlayer.zh' },
      });
      expect(result).toBe('http://intlayer.zh/about');
    });

    it('should return relative URL for locale sharing the current domain', () => {
      // fr maps to intlayer.org — same as currentDomain → relative
      const result = getLocalizedUrl('/about', Locales.FRENCH, domainOptions);
      expect(result).toBe('/fr/about');
    });

    it('should return relative URL for default locale on current domain', () => {
      const result = getLocalizedUrl('/about', Locales.ENGLISH, domainOptions);
      expect(result).toBe('/about');
    });

    it('should return relative URL when currentDomain matches locale domain', () => {
      // Simulates browsing from intlayer.zh — zh locale → relative
      const result = getLocalizedUrl('/about', Locales.CHINESE, {
        ...domainOptions,
        currentDomain: 'intlayer.zh',
      });
      expect(result).toBe('/about');
    });

    it('should auto-detect currentDomain from an absolute input URL', () => {
      // No explicit currentDomain; detected from the absolute URL origin
      const { currentDomain: _, ...optionsWithoutCurrentDomain } =
        domainOptions;
      const result = getLocalizedUrl(
        'https://intlayer.org/about',
        Locales.CHINESE,
        optionsWithoutCurrentDomain
      );
      expect(result).toBe('https://intlayer.zh/about');
    });

    it('should return relative URL when no currentDomain can be detected (SSR)', () => {
      // Relative input URL + no explicit currentDomain + no window → no base URL info
      const { currentDomain: _, ...optionsWithoutCurrentDomain } =
        domainOptions;
      const result = getLocalizedUrl(
        '/about',
        Locales.CHINESE,
        optionsWithoutCurrentDomain
      );
      // Cannot determine cross-domain — emits relative URL without prefix (exclusive domain)
      expect(result).toBe('/about');
    });

    it('should not generate domain URL when domains option is absent', () => {
      const result = getLocalizedUrl('/about', Locales.CHINESE, {
        locales: [Locales.ENGLISH, Locales.CHINESE],
        defaultLocale: Locales.ENGLISH,
        mode: 'prefix-no-default',
      });
      expect(result).toBe(`/${Locales.CHINESE}/about`);
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
