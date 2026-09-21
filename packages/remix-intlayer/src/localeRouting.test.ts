import type { IntlayerConfig } from '@intlayer/types/config';
import { describe, expect, it } from 'vitest';
import {
  createLocaleRouting,
  type LocaleRoutingConfiguration,
} from './localeRouting';

const configuration = (
  routing: Partial<IntlayerConfig['routing']> = {}
): LocaleRoutingConfiguration => ({
  internationalization: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
  } as IntlayerConfig['internationalization'],
  routing: routing as IntlayerConfig['routing'],
});

const rewrite = { '/about': { fr: '/a-propos', es: '/acerca' } };

const request = (path: string, headers: Record<string, string> = {}) => ({
  url: new URL(path, 'http://localhost'),
  headers: new Headers(headers),
});

describe('createLocaleRouting', () => {
  describe('prefix-no-default (default mode)', () => {
    const resolve = createLocaleRouting(configuration({ rewrite }));

    it('serves a prefixed URL from its unprefixed canonical path', () => {
      expect(resolve(request('/fr/contact?x=1'))).toEqual({
        kind: 'rewrite',
        path: '/contact?x=1',
        locale: 'fr',
      });
    });

    it('serves the bare locale prefix from the root path', () => {
      expect(resolve(request('/fr'))).toEqual({
        kind: 'rewrite',
        path: '/',
        locale: 'fr',
      });
    });

    it('serves an unprefixed URL as the default locale', () => {
      expect(resolve(request('/about'))).toEqual({
        kind: 'rewrite',
        path: '/about',
        locale: 'en',
      });
    });

    it('redirects an unprefixed URL to the negotiated locale', () => {
      expect(
        resolve(request('/about?x=1', { 'accept-language': 'fr-FR,fr;q=0.9' }))
      ).toEqual({
        kind: 'redirect',
        location: '/fr/a-propos?x=1',
        status: 302,
      });
    });

    it('prefers the stored locale over Accept-Language', () => {
      expect(
        resolve(
          request('/', {
            'accept-language': 'en',
            cookie: 'INTLAYER_LOCALE=fr',
          })
        )
      ).toEqual({ kind: 'redirect', location: '/fr', status: 302 });
    });

    it('strips the default locale prefix and persists the locale', () => {
      expect(
        resolve(request('/en/about', { 'accept-language': 'fr' }))
      ).toEqual({
        kind: 'redirect',
        location: '/about',
        status: 302,
        persistLocale: 'en',
      });
    });

    it('redirects a canonical path to its localized form', () => {
      expect(resolve(request('/fr/about'))).toEqual({
        kind: 'redirect',
        location: '/fr/a-propos',
        status: 302,
      });
      expect(resolve(request('/fr/a-propos'))).toEqual({
        kind: 'rewrite',
        path: '/about',
        locale: 'fr',
      });
    });

    it('reads the locale of an unprefixed localized path', () => {
      expect(
        resolve(request('/a-propos', { 'accept-language': 'en' }))
      ).toEqual({ kind: 'redirect', location: '/fr/a-propos', status: 302 });
    });

    it('does not mistake a path starting with a locale for a prefix', () => {
      expect(resolve(request('/friends'))).toEqual({
        kind: 'rewrite',
        path: '/friends',
        locale: 'en',
      });
    });

    it('serves static assets from their unprefixed path', () => {
      expect(resolve(request('/logo.svg'))).toEqual({ kind: 'pass' });
      expect(resolve(request('/fr/logo.svg'))).toEqual({
        kind: 'rewrite',
        path: '/logo.svg',
      });
    });

    it('keeps non-ASCII paths matchable and re-encodes them', () => {
      const resolveCyrillic = createLocaleRouting(
        configuration({ rewrite: { '/releases': { fr: '/релизы' } } })
      );

      expect(
        resolveCyrillic(request('/fr/%D1%80%D0%B5%D0%BB%D0%B8%D0%B7%D1%8B'))
      ).toEqual({
        kind: 'rewrite',
        path: '/releases',
        locale: 'fr',
      });
    });

    it('honours the ignore option', () => {
      const resolveIgnoring = createLocaleRouting(configuration(), {
        ignore: ({ url }) => url.pathname.startsWith('/api'),
      });

      expect(resolveIgnoring(request('/api/health'))).toEqual({ kind: 'pass' });
    });
  });

  describe('prefix-all', () => {
    const resolve = createLocaleRouting(configuration({ mode: 'prefix-all' }));

    it('redirects an unprefixed URL to the default locale prefix', () => {
      expect(resolve(request('/about'))).toEqual({
        kind: 'redirect',
        location: '/en/about',
        status: 302,
      });
      expect(resolve(request('/'))).toEqual({
        kind: 'redirect',
        location: '/en',
        status: 302,
      });
    });

    it('serves the default locale prefix', () => {
      expect(resolve(request('/en/about'))).toEqual({
        kind: 'rewrite',
        path: '/about',
        locale: 'en',
      });
    });
  });

  describe('no-prefix', () => {
    const resolve = createLocaleRouting(
      configuration({ mode: 'no-prefix', rewrite })
    );

    it('serves every URL as the detected locale', () => {
      expect(resolve(request('/about', { 'accept-language': 'fr' }))).toEqual({
        kind: 'rewrite',
        path: '/about',
        locale: 'fr',
      });
    });

    it('redirects a prefixed URL to the unprefixed one and persists the locale', () => {
      expect(resolve(request('/fr/a-propos'))).toEqual({
        kind: 'redirect',
        location: '/about',
        status: 302,
        persistLocale: 'fr',
      });
    });

    it('reads the locale of a localized path', () => {
      expect(resolve(request('/acerca'))).toEqual({
        kind: 'rewrite',
        path: '/about',
        locale: 'es',
      });
    });
  });

  describe('search-params', () => {
    const resolve = createLocaleRouting(
      configuration({ mode: 'search-params' })
    );

    it('adds the locale search param', () => {
      expect(
        resolve(request('/about?x=1', { 'accept-language': 'fr' }))
      ).toEqual({
        kind: 'redirect',
        location: '/about?x=1&locale=fr',
        status: 302,
      });
    });

    it('serves a URL carrying its locale search param', () => {
      expect(resolve(request('/about?locale=fr'))).toEqual({
        kind: 'rewrite',
        path: '/about?locale=fr',
        locale: 'fr',
      });
    });

    it('moves a path prefix into the search param', () => {
      expect(resolve(request('/fr/about'))).toEqual({
        kind: 'redirect',
        location: '/about?locale=fr',
        status: 302,
        persistLocale: 'fr',
      });
    });
  });

  describe('domains', () => {
    const resolve = createLocaleRouting(
      configuration({ domains: { fr: 'example.fr', en: 'example.com' } })
    );

    it('redirects a prefixed URL to the domain of its locale', () => {
      expect(resolve(request('/fr/about?x=1'))).toEqual({
        kind: 'redirect',
        location: 'https://example.fr/about?x=1',
        status: 301,
      });
    });

    it('serves a locale-exclusive domain without a prefix', () => {
      expect(
        resolve({
          url: new URL('https://example.fr/about'),
          headers: new Headers({ 'accept-language': 'en' }),
        })
      ).toEqual({ kind: 'rewrite', path: '/about', locale: 'fr' });
    });
  });

  describe('basePath', () => {
    const resolve = createLocaleRouting(configuration({ basePath: '/app' }));

    it('routes under the base path only', () => {
      expect(resolve(request('/other'))).toEqual({ kind: 'pass' });
      expect(resolve(request('/app/fr/about'))).toEqual({
        kind: 'rewrite',
        path: '/app/about',
        locale: 'fr',
      });
      expect(resolve(request('/app', { 'accept-language': 'fr' }))).toEqual({
        kind: 'redirect',
        location: '/app/fr',
        status: 302,
      });
    });
  });

  describe('enableProxy', () => {
    it('passes every request through when disabled', () => {
      const resolve = createLocaleRouting(
        configuration({ enableProxy: false })
      );

      expect(resolve(request('/fr/about'))).toEqual({ kind: 'pass' });
    });

    it('ignores the stored locale on a dev server in auto mode', () => {
      const resolve = createLocaleRouting(configuration(), {
        isDevServer: true,
      });

      expect(resolve(request('/', { cookie: 'INTLAYER_LOCALE=fr' }))).toEqual({
        kind: 'rewrite',
        path: '/',
        locale: 'en',
      });
    });

    it('keeps the stored locale on a dev server when forced', () => {
      const resolve = createLocaleRouting(
        configuration({ enableProxy: true }),
        {
          isDevServer: true,
        }
      );

      expect(resolve(request('/', { cookie: 'INTLAYER_LOCALE=fr' }))).toEqual({
        kind: 'redirect',
        location: '/fr',
        status: 302,
      });
    });
  });
});
