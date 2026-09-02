import * as Locales from '@intlayer/types/locales';
import { describe, expect, it } from 'vitest';
import { getRewriteRules } from './rewriteMatch';
import { getInternalPath, resolveLocalizedPath } from './rewriteUtils';

describe('rewriteUtils', () => {
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

  describe('resolveLocalizedPath', () => {
    it('should find localized path from canonical path', () => {
      expect(
        resolveLocalizedPath('/products', Locales.FRENCH, normalizedRules)
      ).toEqual({
        path: '/produits',
        isRewritten: true,
      });
      expect(
        resolveLocalizedPath('/products/123', Locales.FRENCH, normalizedRules)
      ).toEqual({
        path: '/produits/123',
        isRewritten: true,
      });
    });

    it('should report the untouched path when no rule matches', () => {
      expect(
        resolveLocalizedPath('/unknown', Locales.FRENCH, normalizedRules)
      ).toEqual({
        path: '/unknown',
        isRewritten: false,
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

  describe('resolveLocalizedPath with complex patterns', () => {
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
      expect(
        resolveLocalizedPath('/blog', Locales.FRENCH, complexRules)
      ).toEqual({
        path: '/blog',
        isRewritten: true,
      });
      expect(
        resolveLocalizedPath('/blog/my-post', Locales.FRENCH, complexRules)
      ).toEqual({
        path: '/blog/my-post',
        isRewritten: true,
      });
    });

    it('should localize mandatory catch-all', () => {
      expect(
        resolveLocalizedPath('/docs/install', Locales.FRENCH, complexRules)
      ).toEqual({
        path: '/documentation/install',
        isRewritten: true,
      });
    });
  });
});
