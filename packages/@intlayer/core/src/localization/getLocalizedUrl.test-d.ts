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
