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

  describe('getRewritePath', () => {
    it('should return rewritten path if rule matches', () => {
      expect(getRewritePath('/products', Locales.FRENCH, rewriteRules)).toBe(
        '/produits'
      );
    });

    it('should return undefined if no rewrite rule matches', () => {
      expect(
        getRewritePath('/unknown', Locales.FRENCH, rewriteRules)
      ).toBeUndefined();
    });

    it('should return undefined if already on localized path', () => {
      expect(
        getRewritePath('/produits', Locales.FRENCH, rewriteRules)
      ).toBeUndefined();
    });
  });
});
