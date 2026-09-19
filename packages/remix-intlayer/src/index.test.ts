import * as NodeTypes from '@intlayer/types/nodeType';
import { createRouter } from 'remix/router';
import { createElement } from 'remix/ui';
import { renderToString } from 'remix/ui/server';
import { describe, expect, it, vi } from 'vitest';
import {
  getIntlayerState,
  intlayer,
  useDictionary,
  useIntlayer,
  useLocale,
} from './index';

vi.mock('@intlayer/engine/build', () => ({
  prepareIntlayer: vi.fn().mockResolvedValue(undefined),
}));

const greetingDictionary = {
  key: 'greeting',
  content: {
    title: {
      nodeType: NodeTypes.TRANSLATION,
      [NodeTypes.TRANSLATION]: { en: 'Hello', fr: 'Bonjour' },
    },
  },
} as const;

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({ greeting: greetingDictionary }),
}));

type LocalePayload = {
  locale: string;
  property: string;
  pathname: string;
  title: string;
  dictionaryTitle: string;
};

/**
 * Remix UI component reading the request locale without receiving it.
 */
const Greeting = () => {
  const { title } = useIntlayer('greeting');
  const { locale } = useLocale();

  return () => createElement('p', { lang: locale }, title);
};

// Forced so the stored locale drives routing whatever NODE_ENV the test
// runner sets, as it does in production.
const router = createRouter({ middleware: [intlayer({ isDevServer: false })] });

// Every route is declared once, unprefixed: the middleware serves `/fr/about`
// from `/about` and exposes the locale through the request context.
router.get('/', (context) =>
  Response.json({
    locale: useLocale().locale,
    property: context.intlayer.locale,
    pathname: context.url.pathname,
    title: useIntlayer('greeting').title,
    dictionaryTitle: useDictionary(greetingDictionary).title,
  } satisfies LocalePayload)
);

router.get(
  '/ui',
  async () =>
    // Deferred so the render runs from a later microtask, as a real
    // `context.render` streaming response would.
    new Response(
      await Promise.resolve().then(() =>
        renderToString(createElement(Greeting, {}))
      )
    )
);

router.get('/override', () =>
  Response.json({
    locale: useIntlayer('greeting', 'en').title,
    selector: useIntlayer('greeting', { locale: 'en' }).title,
  })
);

router.get('/immutable', () => Response.redirect('http://localhost/', 303));

const fetchPath = (
  path: string,
  headers: Record<string, string> = {}
): Promise<Response> =>
  router.fetch(new Request(`http://localhost${path}`, { headers }));

const fetchJson = async <T>(
  path: string,
  headers: Record<string, string> = {}
): Promise<T> => (await fetchPath(path, headers)).json() as Promise<T>;

describe('intlayer middleware', () => {
  it('serves a prefixed URL from the unprefixed route as that locale', async () => {
    const result = await fetchJson<LocalePayload>('/fr', {
      'accept-language': 'en',
    });

    expect(result).toEqual({
      locale: 'fr',
      property: 'fr',
      pathname: '/',
      title: 'Bonjour',
      dictionaryTitle: 'Bonjour',
    });
  });

  it('serves an unprefixed URL as the default locale', async () => {
    const result = await fetchJson<LocalePayload>('/', {
      'accept-language': 'en',
    });

    expect(result.locale).toBe('en');
    expect(result.title).toBe('Hello');
  });

  it('redirects an unprefixed URL to the negotiated locale', async () => {
    const response = await fetchPath('/', { 'accept-language': 'fr' });

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('/fr');
  });

  it('redirects a stored locale to its prefixed URL', async () => {
    const response = await fetchPath('/', { cookie: 'INTLAYER_LOCALE=fr' });

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('/fr');
  });

  it('strips the default locale prefix and persists the locale', async () => {
    const response = await fetchPath('/en', { 'accept-language': 'fr' });

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('/');
    expect(response.headers.get('set-cookie')).toContain('INTLAYER_LOCALE=en');
    expect(response.headers.get('x-intlayer-locale')).toBe('en');
  });

  it('propagates the routed locale through the storage header', async () => {
    const response = await fetchPath('/fr');

    expect(response.headers.get('x-intlayer-locale')).toBe('fr');
  });

  it('sets the storage header on an immutable response', async () => {
    const response = await fetchPath('/fr/immutable');

    expect(response.status).toBe(303);
    expect(response.headers.get('x-intlayer-locale')).toBe('fr');
  });

  it('exposes the default and available locales', async () => {
    let state: ReturnType<typeof getIntlayerState>;
    let result: ReturnType<typeof useLocale> | undefined;

    router.get('/probe', () => {
      state = getIntlayerState();
      result = useLocale();
      return new Response();
    });

    await fetchPath('/probe');

    expect(state).toEqual({
      locale: 'en',
      defaultLocale: 'en',
      availableLocales: ['en', 'fr'],
    });
    expect(result).toEqual(state);
  });

  it('lets a call-site locale override the request locale', async () => {
    const result = await fetchJson<{ locale: string; selector: string }>(
      '/fr/override'
    );

    expect(result).toEqual({ locale: 'Hello', selector: 'Hello' });
  });

  it('keeps the request scope alive through a Remix UI render', async () => {
    const response = await fetchPath('/fr/ui');

    expect(await response.text()).toContain('<p lang="fr">Bonjour</p>');
  });

  it('isolates concurrent requests', async () => {
    const [french, english] = await Promise.all([
      fetchJson<LocalePayload>('/fr'),
      fetchJson<LocalePayload>('/', { 'accept-language': 'en' }),
    ]);

    expect(french.title).toBe('Bonjour');
    expect(english.title).toBe('Hello');
  });
});

describe('intlayer middleware with the proxy disabled', () => {
  it('only resolves the locale', async () => {
    const localeOnlyRouter = createRouter({
      middleware: [intlayer({ ignore: () => true })],
    });

    localeOnlyRouter.get('/:locale', (context) =>
      Response.json({
        param: context.params.locale,
        locale: context.intlayer.locale,
      })
    );

    const response = await localeOnlyRouter.fetch(
      new Request('http://localhost/fr')
    );

    expect(await response.json()).toEqual({ param: 'fr', locale: 'fr' });
  });
});

describe('hooks outside of a request', () => {
  it('fall back to the default locale', () => {
    expect(getIntlayerState()).toBeUndefined();
    expect(useLocale().locale).toBe('en');
    expect(useIntlayer('greeting').title).toBe('Hello');
    expect(useDictionary(greetingDictionary, 'fr').title).toBe('Bonjour');
  });
});
