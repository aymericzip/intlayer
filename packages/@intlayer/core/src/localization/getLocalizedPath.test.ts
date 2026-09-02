import * as Locales from '@intlayer/types/locales';
import { describe, expect, it } from 'vitest';
import { getLocalizedPath } from './getLocalizedPath';
import { getLocalizedUrl } from './getLocalizedUrl';
import type { RoutingOptions } from './getPrefix';
import { getRewriteRules } from './rewriteMatch';

describe('getLocalizedPath', () => {
  const rewrite = {
    '/products': {
      [Locales.ENGLISH]: '/products',
      [Locales.FRENCH]: '/produits',
    },
    '/products/[id]': {
      [Locales.ENGLISH]: '/products/[id]',
      [Locales.FRENCH]: '/produits/[id]',
    },
  } as const;

  const options = {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    mode: 'prefix-no-default',
    rewrite,
  } satisfies RoutingOptions;

  it('should apply the rewrite rule and the locale prefix', () => {
    expect(getLocalizedPath('/products', Locales.FRENCH, options)).toBe(
      '/fr/produits'
    );
    expect(getLocalizedPath('/products/123', Locales.FRENCH, options)).toBe(
      '/fr/produits/123'
    );
  });

  it('should not prefix the default locale in prefix-no-default mode', () => {
    expect(getLocalizedPath('/products', Locales.ENGLISH, options)).toBe(
      '/products'
    );
  });

  it('should collapse the root to a bare prefix', () => {
    expect(getLocalizedPath('/', Locales.FRENCH, options)).toBe('/fr');
    expect(getLocalizedPath('/', Locales.ENGLISH, options)).toBe('/');
  });

  it('should prefix a path no rewrite rule matches', () => {
    expect(getLocalizedPath('/unknown', Locales.FRENCH, options)).toBe(
      '/fr/unknown'
    );
  });

  it('should keep the canonical path when the locale has no pattern', () => {
    expect(getLocalizedPath('/products', Locales.SPANISH, options)).toBe(
      '/es/products'
    );
  });

  it('should accept the RewriteObject and the normalized formats', () => {
    const normalized = getRewriteRules(rewrite)!;

    expect(
      getLocalizedPath('/products', Locales.FRENCH, {
        ...options,
        rewrite: { url: normalized },
      })
    ).toBe('/fr/produits');
    expect(
      getLocalizedPath('/products', Locales.FRENCH, {
        ...options,
        rewrite: normalized,
      })
    ).toBe('/fr/produits');
  });

  it('should prefix every locale in prefix-all mode', () => {
    expect(
      getLocalizedPath('/products', Locales.ENGLISH, {
        ...options,
        mode: 'prefix-all',
      })
    ).toBe('/en/products');
  });

  it('should match getLocalizedUrl for relative paths', () => {
    for (const path of ['/', '/products', '/products/123', '/unknown']) {
      for (const locale of [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]) {
        expect(getLocalizedPath(path, locale, options)).toBe(
          getLocalizedUrl(path, locale, options)
        );
      }
    }
  });

  it('should preserve the query string and the hash', () => {
    expect(
      getLocalizedPath('/products?page=1#top', Locales.FRENCH, options)
    ).toBe('/fr/produits?page=1#top');
  });

  it('should only rewrite the path in no-prefix mode', () => {
    expect(
      getLocalizedPath('/products', Locales.FRENCH, {
        ...options,
        mode: 'no-prefix',
      })
    ).toBe('/produits');
  });

  it('should carry the locale as a search param in search-params mode', () => {
    expect(
      getLocalizedPath('/products?page=1', Locales.FRENCH, {
        ...options,
        mode: 'search-params',
      })
    ).toBe('/produits?page=1&locale=fr');
  });

  it('should drop the origin of an absolute URL', () => {
    expect(
      getLocalizedPath('https://intlayer.org/products', Locales.FRENCH, options)
    ).toBe('/fr/produits');
    expect(
      getLocalizedPath('https://intlayer.org', Locales.FRENCH, options)
    ).toBe('/fr');
    expect(
      getLocalizedPath(
        'https://intlayer.org/fr/produits?page=1#top',
        Locales.ENGLISH,
        options
      )
    ).toBe('/products?page=1#top');
  });

  it('should never emit an origin for a locale served from its own domain', () => {
    const domainOptions = {
      ...options,
      domains: { [Locales.SPANISH]: 'https://intlayer.es' },
    };

    // That domain serves Spanish at its root, so the prefix is dropped — but the
    // result stays a path, where `getLocalizedUrl` switches domain.
    expect(getLocalizedPath('/products', Locales.SPANISH, domainOptions)).toBe(
      '/products'
    );
    expect(getLocalizedUrl('/products', Locales.SPANISH, domainOptions)).toBe(
      'https://intlayer.es/products'
    );
  });
});
