import { describe, expect, it } from 'vitest';
import {
  nextjsRewrite,
  reactRouterRewrite,
  svelteKitRewrite,
  tanstackRouterRewrite,
} from './index';

describe('routing formatters', () => {
  const rules = {
    '/[locale]/products/[id]': {
      en: '/[locale]/products/[id]',
      fr: '/[locale]/produits/[id]',
    },
    '/[locale]/blog/[[...slug]]': {
      en: '/[locale]/blog/[[...slug]]',
      fr: '/[locale]/blog/[[...slug]]',
    },
  };

  describe('nextjsRewrite', () => {
    const rewrite = nextjsRewrite(rules as any);

    it('should normalize url context (stripping locale)', () => {
      expect(rewrite.url.rules[0].canonical).toBe('/products/:id');
      expect(rewrite.url.rules[0].localized.fr).toBe('/produits/:id');
      expect(rewrite.url.rules[1].canonical).toBe('/blog/:slug*');
    });

    it('should normalize nextjs context (preserving locale syntax)', () => {
      expect(rewrite.nextjs?.rules[0].canonical).toBe('/:locale/products/:id');
      expect(rewrite.nextjs?.rules[1].canonical).toBe('/:locale/blog/:slug*');
    });
  });

  describe('svelteKitRewrite', () => {
    const svelteRules = {
      '/[locale]/products/[id]': {
        en: '/[locale]/products/[id]',
        fr: '/[locale]/produits/[id]',
      },
      '/[locale]/blog/[...path]': {
        en: '/[locale]/blog/[...path]',
        fr: '/[locale]/blog/[...path]',
      },
    };
    const rewrite = svelteKitRewrite(svelteRules as any);

    it('should normalize url context (stripping locale)', () => {
      expect(rewrite.url.rules[0].canonical).toBe('/products/:id');
      expect(rewrite.url.rules[1].canonical).toBe('/blog/:path*');
    });
  });

  describe('tanstackRouterRewrite', () => {
    const tanstackRules = {
      '/$locale/products/$id': {
        en: '/$locale/products/$id',
        fr: '/$locale/produits/$id',
      },
    };
    const rewrite = tanstackRouterRewrite(tanstackRules as any);

    it('should normalize url context (stripping locale)', () => {
      expect(rewrite.url.rules[0].canonical).toBe('/products/:id');
      expect(rewrite.url.rules[0].localized.fr).toBe('/produits/:id');
    });
  });

  describe('reactRouterRewrite', () => {
    const rrRules = {
      '/:locale/products/:id': {
        en: '/:locale/products/:id',
        fr: '/:locale/produits/:id',
      },
      '/:locale/blog/*': {
        en: '/:locale/blog/*',
        fr: '/:locale/blog/*',
      },
    };
    const rewrite = reactRouterRewrite(rrRules as any);

    it('should normalize url context (stripping locale)', () => {
      expect(rewrite.url.rules[0].canonical).toBe('/products/:id');
      expect(rewrite.url.rules[1].canonical).toBe('/blog/:path*');
    });
  });
});
