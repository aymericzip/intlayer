import type { LocalizedUrl } from '@intlayer/types/module_augmentation';
import { describe, expectTypeOf, it } from 'vitest';

/**
 * `LocalizedUrl` mirrors what `getLocalizedUrl` builds at runtime. The routing
 * mode, default locale and declared locales are passed explicitly here — this
 * package declares none of them, so the registry defaults would collapse every
 * locale onto the default one.
 */
describe('LocalizedUrl', () => {
  type Locales = 'en' | 'fr' | 'es';
  type Url<Path extends string, L extends Locales> = LocalizedUrl<
    Path,
    L,
    'prefix-no-default',
    'en',
    Locales
  >;

  it('should prefix a path with a non-default locale', () => {
    expectTypeOf<Url<'/about', 'es'>>().toEqualTypeOf<'/es/about'>();
  });

  it('should collapse the root to a bare prefix, never a trailing slash', () => {
    expectTypeOf<Url<'/', 'es'>>().toEqualTypeOf<'/es'>();
  });

  it('should leave the default locale unprefixed', () => {
    expectTypeOf<Url<'/about', 'en'>>().toEqualTypeOf<'/about'>();
    expectTypeOf<Url<'/', 'en'>>().toEqualTypeOf<'/'>();
  });

  it('should drop the trailing slash of a non-root path', () => {
    expectTypeOf<Url<'/about/', 'fr'>>().toEqualTypeOf<'/fr/about'>();
  });

  it('should replace an existing locale segment', () => {
    expectTypeOf<Url<'/en/about', 'fr'>>().toEqualTypeOf<'/fr/about'>();
    expectTypeOf<Url<'/fr', 'es'>>().toEqualTypeOf<'/es'>();
  });

  it('should prefix the pathname of an absolute URL, not its origin', () => {
    expectTypeOf<
      Url<'https://example.com/about', 'fr'>
    >().toEqualTypeOf<'https://example.com/fr/about'>();
    expectTypeOf<
      Url<'https://example.com/', 'fr'>
    >().toEqualTypeOf<'https://example.com/fr'>();
  });

  it('should prefix every locale in prefix-all mode', () => {
    expectTypeOf<
      LocalizedUrl<'/', 'en', 'prefix-all', 'en', Locales>
    >().toEqualTypeOf<'/en'>();
    expectTypeOf<
      LocalizedUrl<'/about', 'en', 'prefix-all', 'en', Locales>
    >().toEqualTypeOf<'/en/about'>();
  });

  it('should strip the locale in no-prefix mode', () => {
    expectTypeOf<
      LocalizedUrl<'/fr/about', 'fr', 'no-prefix', 'en', Locales>
    >().toEqualTypeOf<'/about'>();
  });
});

/**
 * Domain routing, exercised against an explicit domain map — the same shape the
 * generated module augmentation feeds it as `__RoutingRegistry['domains']`.
 *
 * `en` and `fr` share `intlayer.org` (prefix routing still applies), while `zh`
 * is alone on `intlayer.cn` (the hostname identifies the locale, so no prefix).
 */
describe('LocalizedUrl with routing.domains', () => {
  type Locales = 'en' | 'fr' | 'zh';
  type Domains = {
    en: { origin: 'https://intlayer.org'; exclusive: false };
    fr: { origin: 'https://intlayer.org'; exclusive: false };
    zh: { origin: 'https://intlayer.cn'; exclusive: true };
  };
  type Url<Path extends string, L extends Locales> = LocalizedUrl<
    Path,
    L,
    'prefix-no-default',
    'en',
    Locales,
    Domains
  >;

  it('should drop the locale prefix of a locale alone on its domain', () => {
    expectTypeOf<Url<'/about', 'zh'>>().toEqualTypeOf<
      'https://intlayer.cn/about' | '/about'
    >();
  });

  it('should keep the locale prefix of a locale sharing its domain', () => {
    expectTypeOf<Url<'/about', 'fr'>>().toEqualTypeOf<
      'https://intlayer.org/fr/about' | '/fr/about'
    >();
    expectTypeOf<Url<'/about', 'en'>>().toEqualTypeOf<
      'https://intlayer.org/about' | '/about'
    >();
  });

  it('should strip an existing locale segment before switching domain', () => {
    expectTypeOf<Url<'/zh/about', 'zh'>>().toEqualTypeOf<
      'https://intlayer.cn/about' | '/about'
    >();
    expectTypeOf<Url<'/fr/about', 'zh'>>().toEqualTypeOf<
      'https://intlayer.cn/about' | '/about'
    >();
  });

  it('should keep the root slash of a domain-exclusive locale', () => {
    expectTypeOf<Url<'/', 'zh'>>().toEqualTypeOf<
      'https://intlayer.cn/' | '/'
    >();
  });

  it('should replace the origin of an absolute URL with the locale domain', () => {
    expectTypeOf<Url<'https://intlayer.org/about', 'zh'>>().toEqualTypeOf<
      'https://intlayer.cn/about' | 'https://intlayer.org/about'
    >();
  });

  it('should leave a locale mapped to no domain untouched', () => {
    type PartialDomains = {
      zh: { origin: 'https://intlayer.cn'; exclusive: true };
    };

    expectTypeOf<
      LocalizedUrl<
        '/about',
        'fr',
        'prefix-no-default',
        'en',
        Locales,
        PartialDomains
      >
    >().toEqualTypeOf<'/fr/about'>();
  });

  it('should keep the domain origin in no-prefix mode', () => {
    expectTypeOf<
      LocalizedUrl<'/about', 'zh', 'no-prefix', 'en', Locales, Domains>
    >().toEqualTypeOf<'https://intlayer.cn/about' | '/about'>();
  });

  it('should drop the prefix in prefix-all mode too', () => {
    expectTypeOf<
      LocalizedUrl<'/about', 'zh', 'prefix-all', 'en', Locales, Domains>
    >().toEqualTypeOf<'https://intlayer.cn/about' | '/about'>();
    expectTypeOf<
      LocalizedUrl<'/about', 'fr', 'prefix-all', 'en', Locales, Domains>
    >().toEqualTypeOf<'https://intlayer.org/fr/about' | '/fr/about'>();
  });
});
