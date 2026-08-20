import type {
  LocalizedPath,
  LocalizedPathname,
  LocalizedUrl,
} from '@intlayer/types/module_augmentation';
import { describe, expectTypeOf, it } from 'vitest';
import { getLocalizedPath } from './getLocalizedPath';
import { getLocalizedUrl } from './getLocalizedUrl';

/**
 * `getLocalizedPath` prefixes the rewritten path, so it reports the very type
 * its sibling reports for a relative URL. This package declares neither rewrite
 * rules nor a default locale, so the registry leaves both steps as no-ops.
 */
describe('getLocalizedPath', () => {
  it('should report the same type as getLocalizedUrl', () => {
    expectTypeOf(getLocalizedPath('/about', 'fr')).toEqualTypeOf<
      LocalizedUrl<'/about', 'fr'>
    >();
    expectTypeOf(getLocalizedPath('/about', 'fr')).toEqualTypeOf(
      getLocalizedUrl('/about', 'fr')
    );
  });

  it('should keep the literal path when nothing rewrites or prefixes it', () => {
    expectTypeOf(getLocalizedPath('/about', 'fr')).toEqualTypeOf<'/about'>();
  });

  it('should drop the origin of an absolute URL', () => {
    expectTypeOf(
      getLocalizedPath('https://intlayer.org/about', 'fr')
    ).toEqualTypeOf<'/about'>();
  });

  it('should widen to string when the path is not a literal', () => {
    const dynamicPath = '/about' as string;

    expectTypeOf(getLocalizedPath(dynamicPath, 'fr')).toEqualTypeOf<string>();
  });
});

/**
 * The resolution itself, exercised against explicit rules — the same shape the
 * generated module augmentation feeds it as `__RoutingRegistry['rewrite']`.
 */
describe('LocalizedPath', () => {
  type Rules = {
    '/about': { en: '/about'; fr: '/a-propos' };
    '/product/:id': { en: '/product/:id'; fr: '/produit/:id' };
    '/shop/:category/:id': { fr: '/boutique/:category/:id' };
    '/docs/:path+': { fr: '/documentation/:path+' };
  };

  it('should rewrite a static path', () => {
    expectTypeOf<
      LocalizedPath<'/about', 'fr', Rules>
    >().toEqualTypeOf<'/a-propos'>();
  });

  it('should keep a path no rule matches', () => {
    expectTypeOf<
      LocalizedPath<'/contact', 'fr', Rules>
    >().toEqualTypeOf<'/contact'>();
  });

  it('should substitute a route parameter', () => {
    expectTypeOf<
      LocalizedPath<'/product/123', 'fr', Rules>
    >().toEqualTypeOf<'/produit/123'>();
  });

  it('should substitute several route parameters', () => {
    expectTypeOf<
      LocalizedPath<'/shop/shoes/123', 'fr', Rules>
    >().toEqualTypeOf<'/boutique/shoes/123'>();
  });

  it('should not match a parameter across a segment boundary', () => {
    expectTypeOf<
      LocalizedPath<'/product/123/reviews', 'fr', Rules>
    >().toEqualTypeOf<'/product/123/reviews'>();
  });

  it('should keep the path when the locale declares no pattern', () => {
    expectTypeOf<
      LocalizedPath<'/shop/shoes/123', 'en', Rules>
    >().toEqualTypeOf<'/shop/shoes/123'>();
  });

  it('should distribute over a union of locales', () => {
    expectTypeOf<LocalizedPath<'/about', 'en' | 'fr', Rules>>().toEqualTypeOf<
      '/about' | '/a-propos'
    >();
  });

  it('should widen a variadic rule to string, but only for the paths it could match', () => {
    expectTypeOf<
      LocalizedPath<'/docs/getting-started', 'fr', Rules>
    >().toEqualTypeOf<string>();
    expectTypeOf<
      LocalizedPath<'/about', 'fr', Rules>
    >().toEqualTypeOf<'/a-propos'>();
  });

  it('should keep every path when the project declares no rule', () => {
    expectTypeOf<LocalizedPath<'/about', 'fr', {}>>().toEqualTypeOf<'/about'>();
  });
});

/**
 * The return type of `getLocalizedPath`, exercised against an explicit routing
 * mode, default locale and locale set — this package declares none of them.
 */
describe('LocalizedPathname', () => {
  type Locales = 'en' | 'fr' | 'es';
  type Path<P extends string, L extends Locales> = LocalizedPathname<
    P,
    L,
    'prefix-no-default',
    'en',
    Locales
  >;

  it('should report the same type as LocalizedUrl for a relative path', () => {
    expectTypeOf<Path<'/about', 'es'>>().toEqualTypeOf<
      LocalizedUrl<'/about', 'es', 'prefix-no-default', 'en', Locales>
    >();
    expectTypeOf<Path<'/about', 'es'>>().toEqualTypeOf<'/es/about'>();
  });

  it('should drop the origin of an absolute URL', () => {
    expectTypeOf<
      Path<'https://intlayer.org/about', 'es'>
    >().toEqualTypeOf<'/es/about'>();
    expectTypeOf<
      Path<'https://intlayer.org/about', 'en'>
    >().toEqualTypeOf<'/about'>();
  });

  it('should collapse an origin without a path to the root', () => {
    expectTypeOf<Path<'https://intlayer.org', 'en'>>().toEqualTypeOf<'/'>();
    expectTypeOf<Path<'https://intlayer.org/', 'es'>>().toEqualTypeOf<'/es'>();
  });

  it('should replace a locale segment carried by an absolute URL', () => {
    expectTypeOf<
      Path<'https://intlayer.org/fr/about', 'es'>
    >().toEqualTypeOf<'/es/about'>();
  });
});
