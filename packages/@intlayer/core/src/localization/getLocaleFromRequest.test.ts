import * as Locales from '@intlayer/types/locales';
import { describe, expect, it, vi } from 'vitest';
import { getLocaleFromRequest } from './getLocaleFromRequest';

const mockConfig = vi.hoisted(() => ({
  internationalization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  routing: {
    mode: 'prefix-no-default',
    storage: {
      cookies: [{ name: 'INTLAYER_LOCALE', attributes: {} }],
      localStorage: [],
      sessionStorage: [],
      headers: [{ name: 'x-intlayer-locale' }],
    },
  },
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
}));

const request = (path: string, headers: Record<string, string> = {}) =>
  new Request(`http://localhost${path}`, { headers });

describe('getLocaleFromRequest', () => {
  it('reads the locale from the URL prefix', async () => {
    expect(
      await getLocaleFromRequest(
        request('/fr/about', { cookie: 'INTLAYER_LOCALE=en' })
      )
    ).toBe(Locales.FRENCH);
  });

  it('treats an unprefixed path as the default locale in prefix-no-default mode', async () => {
    expect(
      await getLocaleFromRequest(request('/about', { 'accept-language': 'fr' }))
    ).toBe(Locales.ENGLISH);
  });

  it('accepts a request context carrying a URL object', async () => {
    expect(
      await getLocaleFromRequest({
        url: new URL('http://localhost/fr'),
        headers: new Headers(),
      })
    ).toBe(Locales.FRENCH);
  });

  it('falls back to the stored locale when the URL carries none', async () => {
    mockConfig.routing.mode = 'prefix-all';

    expect(
      await getLocaleFromRequest(
        request('/about', { cookie: 'INTLAYER_LOCALE=fr' })
      )
    ).toBe(Locales.FRENCH);
    expect(
      await getLocaleFromRequest(
        request('/about', { 'x-intlayer-locale': 'fr' })
      )
    ).toBe(Locales.FRENCH);
  });

  it('negotiates Accept-Language when nothing is stored', async () => {
    mockConfig.routing.mode = 'prefix-all';

    expect(
      await getLocaleFromRequest(
        request('/about', { 'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8' })
      )
    ).toBe(Locales.FRENCH);
    expect(await getLocaleFromRequest(request('/about'))).toBe(Locales.ENGLISH);
  });

  it('ignores the URL in no-prefix mode', async () => {
    mockConfig.routing.mode = 'no-prefix';

    expect(
      await getLocaleFromRequest(
        request('/fr', { cookie: 'INTLAYER_LOCALE=en' })
      )
    ).toBe(Locales.ENGLISH);
    expect(
      await getLocaleFromRequest(request('/', { cookie: 'INTLAYER_LOCALE=fr' }))
    ).toBe(Locales.FRENCH);
  });
});
