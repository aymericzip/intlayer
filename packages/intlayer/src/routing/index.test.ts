import {
  getCanonicalPath,
  resolveLocalizedPath,
} from '@intlayer/core/localization';
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

    // Regression: TanStack Start declares the locale as an optional param
    // (`{-$locale}`), which the formatter left in place — every rule then
    // carried an unmatchable `/{-/}` segment and no URL was ever rewritten.
    describe('optional param syntax', () => {
      const optionalRules = {
        '/{-$locale}/doc/releases/v8': {
          en: '/{-$locale}/doc/releases/v8',
          fr: '/{-$locale}/doc/sorties/v8',
          ru: '/{-$locale}/doc/релизы/v8',
        },
        '/{-$locale}/products/{$id}': {
          en: '/{-$locale}/products/{$id}',
          fr: '/{-$locale}/produits/{$id}',
        },
      };
      const optionalRewrite = tanstackRouterRewrite(optionalRules as any);

      it('should strip the optional locale in url context', () => {
        expect(optionalRewrite.url.rules[0].canonical).toBe('/doc/releases/v8');
        expect(optionalRewrite.url.rules[0].localized.fr).toBe(
          '/doc/sorties/v8'
        );
        expect(optionalRewrite.url.rules[0].localized.ru).toBe(
          '/doc/релизы/v8'
        );
        expect(optionalRewrite.url.rules[1].canonical).toBe('/products/:id');
        expect(optionalRewrite.url.rules[1].localized.fr).toBe('/produits/:id');
      });

      it('should keep the optional locale in vite context', () => {
        expect(optionalRewrite.vite?.rules[0].canonical).toBe(
          '/:locale?/doc/releases/v8'
        );
        expect(optionalRewrite.vite?.rules[1].localized.fr).toBe(
          '/:locale?/produits/:id'
        );
      });
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

  // The formatters exist to feed the resolvers, and a pattern they emit is only
  // correct if those resolvers can match it back — which is exactly what the
  // `{-$locale}` rules failed to do.
  describe('round trip through the resolvers', () => {
    const rewrite = tanstackRouterRewrite({
      '/{-$locale}/doc/releases/v8': {
        fr: '/{-$locale}/doc/sorties/v8',
        ru: '/{-$locale}/doc/релизы/v8',
      },
    } as any);

    it('should resolve a pretty path back to its canonical path', () => {
      expect(
        getCanonicalPath('/doc/sorties/v8', 'fr' as any, rewrite.url)
      ).toBe('/doc/releases/v8');
      expect(getCanonicalPath('/doc/релизы/v8', 'ru' as any, rewrite.url)).toBe(
        '/doc/releases/v8'
      );
    });

    it('should resolve a canonical path to the locale pretty path', () => {
      expect(
        resolveLocalizedPath('/doc/releases/v8', 'ru' as any, rewrite.url)
      ).toEqual({ path: '/doc/релизы/v8', isRewritten: true });
    });
  });
});
