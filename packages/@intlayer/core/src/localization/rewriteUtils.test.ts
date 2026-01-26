import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import {
  getCanonicalPath,
  getInternalPath,
  getLocalizedPath,
  getRewritePath,
  getRewriteRules,
} from './rewriteUtils';

describe('rewriteUtils', () => {
  const rewriteRules = {
    '/products': {
      [Locales.ENGLISH]: '/products',
      [Locales.FRENCH]: '/produits',
    },
    '/products/[id]': {
      [Locales.ENGLISH]: '/products/[id]',
      [Locales.FRENCH]: '/produits/[id]',
    },
  } as const;

  const normalizedRules = getRewriteRules(rewriteRules);

  describe('getRewriteRules', () => {
    it('should normalize legacy rewrite format', () => {
      const rules = getRewriteRules(rewriteRules);
      expect(rules?.rules[0]).toEqual({
        canonical: '/products',
        localized: {
          en: '/products',
          fr: '/produits',
        },
      });
      expect(rules?.rules[1].canonical).toBe('/products/:id');
    });
  });

  describe('getCanonicalPath', () => {
    it('should find canonical path from localized path', () => {
      expect(
        getCanonicalPath('/produits', Locales.FRENCH, normalizedRules)
      ).toBe('/products');
      expect(
        getCanonicalPath('/produits/123', Locales.FRENCH, normalizedRules)
      ).toBe('/products/123');
    });

    it('should return original path if no rule matches', () => {
      expect(
        getCanonicalPath('/unknown', Locales.FRENCH, normalizedRules)
      ).toBe('/unknown');
    });
  });

  describe('getLocalizedPath', () => {
    it('should find localized path from canonical path', () => {
      expect(
        getLocalizedPath('/products', Locales.FRENCH, normalizedRules)
      ).toEqual({
        path: '/produits',
        isRewritten: true,
      });
      expect(
        getLocalizedPath('/products/123', Locales.FRENCH, normalizedRules)
      ).toEqual({
        path: '/produits/123',
        isRewritten: true,
      });
    });
  });

  describe('getInternalPath', () => {
    it('should add locale prefix if missing', () => {
      expect(getInternalPath('/products', Locales.FRENCH)).toBe('/fr/products');
    });

    it('should not add locale prefix if already present', () => {
      expect(getInternalPath('/fr/products', Locales.FRENCH)).toBe(
        '/fr/products'
      );
    });

    it('should handle root path', () => {
      expect(getInternalPath('/', Locales.FRENCH)).toBe('/fr');
    });
  });

  describe('getCanonicalPath with complex patterns', () => {
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

  describe('getLocalizedPath with complex patterns', () => {
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

    it('should localize optional catch-all', () => {
      expect(getLocalizedPath('/blog', Locales.FRENCH, complexRules)).toEqual({
        path: '/blog',
        isRewritten: true,
      });
      expect(
        getLocalizedPath('/blog/my-post', Locales.FRENCH, complexRules)
      ).toEqual({
        path: '/blog/my-post',
        isRewritten: true,
      });
    });

    it('should localize mandatory catch-all', () => {
      expect(
        getLocalizedPath('/docs/install', Locales.FRENCH, complexRules)
      ).toEqual({
        path: '/documentation/install',
        isRewritten: true,
      });
    });
  });
});
