import * as Locales from '@intlayer/types/locales';
import { describe, expect, it } from 'vitest';
import { getCanonicalPath } from './getCanonicalPath';
import { getRewriteRules } from './rewriteMatch';

describe('getCanonicalPath', () => {
  const normalizedRules = getRewriteRules({
    '/products': {
      [Locales.ENGLISH]: '/products',
      [Locales.FRENCH]: '/produits',
    },
    '/products/[id]': {
      [Locales.ENGLISH]: '/products/[id]',
      [Locales.FRENCH]: '/produits/[id]',
    },
  });

  it('should find canonical path from localized path', () => {
    expect(getCanonicalPath('/produits', Locales.FRENCH, normalizedRules)).toBe(
      '/products'
    );
    expect(
      getCanonicalPath('/produits/123', Locales.FRENCH, normalizedRules)
    ).toBe('/products/123');
  });

  it('should return original path if no rule matches', () => {
    expect(getCanonicalPath('/unknown', Locales.FRENCH, normalizedRules)).toBe(
      '/unknown'
    );
  });

  it('should accept the raw rewrite configuration', () => {
    // The documented signature takes `routing.rewrite` itself, so a caller
    // holding the configuration does not have to normalize it first.
    expect(
      getCanonicalPath('/produits', Locales.FRENCH, {
        '/products': {
          [Locales.ENGLISH]: '/products',
          [Locales.FRENCH]: '/produits',
        },
      })
    ).toBe('/products');
  });

  describe('encoding-insensitive lookup', () => {
    const rules = {
      rules: [
        {
          canonical: '/doc/releases/v8',
          localized: {
            en: '/doc/releases/v8',
            ja: '/doc/リリース/v8',
            ru: '/doc/релизы/v8',
          },
        },
        {
          canonical: '/products/:id',
          localized: {
            en: '/products/:id',
            ja: '/製品/:id',
          },
        },
      ],
    };

    it('maps a localized alias back to its canonical path', () => {
      expect(
        getCanonicalPath('/doc/リリース/v8', Locales.JAPANESE, rules)
      ).toBe('/doc/releases/v8');
    });

    it('matches a percent-encoded path against a literal pattern', () => {
      // `URL.pathname` and the router hand the slug over percent-encoded.
      expect(
        getCanonicalPath(
          '/doc/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9/v8',
          Locales.JAPANESE,
          rules
        )
      ).toBe('/doc/releases/v8');
      expect(
        getCanonicalPath(
          '/doc/%D1%80%D0%B5%D0%BB%D0%B8%D0%B7%D1%8B/v8',
          undefined,
          rules
        )
      ).toBe('/doc/releases/v8');
    });

    it('decodes the captured params of an encoded path', () => {
      expect(
        getCanonicalPath('/%E8%A3%BD%E5%93%81/42', Locales.JAPANESE, rules)
      ).toBe('/products/42');
    });

    it('returns the original path when no rule matches', () => {
      expect(
        getCanonicalPath('/doc/%E3%83%8A/v8', Locales.JAPANESE, rules)
      ).toBe('/doc/%E3%83%8A/v8');
    });

    it('leaves a malformed percent-encoding untouched', () => {
      expect(getCanonicalPath('/doc/%E3%v8', Locales.JAPANESE, rules)).toBe(
        '/doc/%E3%v8'
      );
    });
  });

  describe('complex patterns', () => {
    const complexRules = {
      rules: [
        {
          canonical: '/blog/:slug*',
          localized: {
            en: '/blog/:slug*',
            fr: '/blog/:slug*',
          },
        },
        {
          canonical: '/docs/:path+',
          localized: {
            en: '/docs/:path+',
            fr: '/documentation/:path+',
          },
        },
      ],
    };

    it('should match optional catch-all (:slug*)', () => {
      expect(getCanonicalPath('/blog', Locales.FRENCH, complexRules)).toBe(
        '/blog'
      );
      expect(
        getCanonicalPath('/blog/my-post', Locales.FRENCH, complexRules)
      ).toBe('/blog/my-post');
      expect(
        getCanonicalPath('/blog/my-post/sub-path', Locales.FRENCH, complexRules)
      ).toBe('/blog/my-post/sub-path');
    });

    it('should match mandatory catch-all (:path+)', () => {
      expect(
        getCanonicalPath('/documentation/install', Locales.FRENCH, complexRules)
      ).toBe('/docs/install');
      expect(
        getCanonicalPath(
          '/documentation/install/step-1',
          Locales.FRENCH,
          complexRules
        )
      ).toBe('/docs/install/step-1');
      // Should NOT match /documentation (since it's 1+)
      expect(
        getCanonicalPath('/documentation', Locales.FRENCH, complexRules)
      ).toBe('/documentation');
    });

    it('should match optional segment (:param?)', () => {
      const optionalRules = {
        rules: [
          {
            canonical: '/profile/:section?',
            localized: {
              en: '/profile/:section?',
              fr: '/profil/:section?',
            },
          },
        ],
      };
      expect(getCanonicalPath('/profil', Locales.FRENCH, optionalRules)).toBe(
        '/profile'
      );
      expect(
        getCanonicalPath('/profil/settings', Locales.FRENCH, optionalRules)
      ).toBe('/profile/settings');
      expect(
        getCanonicalPath(
          '/profil/settings/extra',
          Locales.FRENCH,
          optionalRules
        )
      ).toBe('/profil/settings/extra'); // Too many segments
    });
  });
});
