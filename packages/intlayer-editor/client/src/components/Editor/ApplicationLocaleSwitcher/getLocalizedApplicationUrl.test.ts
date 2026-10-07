// @vitest-environment node
// jsdom breaks esbuild, loaded through the built configuration in Node
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import { describe, expect, it } from 'vitest';
import { getLocalizedApplicationUrl } from './getLocalizedApplicationUrl';

const APPLICATION_URL = 'http://localhost:3000';

const createConfiguration = (
  mode: IntlayerConfig['routing']['mode']
): Pick<IntlayerConfig, 'internationalization' | 'routing'> =>
  ({
    internationalization: {
      locales: ['en', 'fr'] as Locale[],
      defaultLocale: 'en' as Locale,
    },
    routing: { mode },
  }) as Pick<IntlayerConfig, 'internationalization' | 'routing'>;

describe('getLocalizedApplicationUrl', () => {
  it('prefixes the path with the requested locale', () => {
    expect(
      getLocalizedApplicationUrl(
        APPLICATION_URL,
        '/about',
        'fr' as Locale,
        createConfiguration('prefix-no-default')
      )
    ).toBe('http://localhost:3000/fr/about');
  });

  it('swaps the locale prefix of an already localized path', () => {
    expect(
      getLocalizedApplicationUrl(
        APPLICATION_URL,
        '/fr/about',
        'en' as Locale,
        createConfiguration('prefix-all')
      )
    ).toBe('http://localhost:3000/en/about');
  });

  it('removes the prefix for the default locale', () => {
    expect(
      getLocalizedApplicationUrl(
        APPLICATION_URL,
        '/fr/about',
        'en' as Locale,
        createConfiguration('prefix-no-default')
      )
    ).toBe('http://localhost:3000/about');
  });

  it('sets the locale search parameter', () => {
    expect(
      getLocalizedApplicationUrl(
        APPLICATION_URL,
        '/about',
        'fr' as Locale,
        createConfiguration('search-params')
      )
    ).toBe('http://localhost:3000/about?locale=fr');
  });

  it('returns null when the locale is not part of the URL', () => {
    expect(
      getLocalizedApplicationUrl(
        APPLICATION_URL,
        '/about',
        'fr' as Locale,
        createConfiguration('no-prefix')
      )
    ).toBeNull();
  });
});
