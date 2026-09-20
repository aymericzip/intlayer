// @vitest-environment node

import * as NodeTypes from '@intlayer/types/nodeType';
import type { APIContext } from 'astro';
import { describe, expect, it, vi } from 'vitest';
import {
  getIntlayerLocals,
  type IntlayerLocals,
  useDictionary,
  useIntlayer,
  useLocale,
} from './index';
import { onRequest } from './middleware';

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

type RenderResult = {
  locals: { intlayer: IntlayerLocals };
  rendered: string;
  response: Response;
};

/**
 * Runs the middleware on a request, rendering a fake page from `next()` the
 * way Astro does: the frontmatter runs from a later microtask, and the hooks
 * are called without any argument.
 */
const render = async (
  path: string,
  headers: Record<string, string> = {},
  isPrerendered = false
): Promise<RenderResult> => {
  const request = new Request(`http://localhost${path}`, { headers });
  const context = {
    url: new URL(request.url),
    // Astro warns, and returns nothing useful, when a prerendered render
    // reads the request headers.
    get request() {
      if (isPrerendered) throw new Error('headers read during prerender');
      return request;
    },
    isPrerendered,
    locals: {},
  } as unknown as APIContext;

  let rendered = '';

  const response = await onRequest(context, async () => {
    await Promise.resolve();
    const { locale } = useLocale();
    rendered = `<p lang="${locale}">${useIntlayer('greeting').title.value}</p>`;

    return new Response(rendered);
  });

  return {
    locals: context.locals as RenderResult['locals'],
    rendered,
    response,
  };
};

describe('astro-intlayer middleware', () => {
  it('resolves the locale from the URL prefix into `locals.intlayer`', async () => {
    const { locals, rendered } = await render('/fr/about', {
      'accept-language': 'en',
    });

    expect(locals.intlayer).toEqual({
      locale: 'fr',
      defaultLocale: 'en',
      availableLocales: ['en', 'fr'],
    });
    expect(rendered).toBe('<p lang="fr">Bonjour</p>');
  });

  it('treats an unprefixed path as the default locale', async () => {
    const { locals, rendered } = await render('/about', {
      'accept-language': 'en',
    });

    expect(locals.intlayer.locale).toBe('en');
    expect(rendered).toBe('<p lang="en">Hello</p>');
  });

  // Same redirect as the Intlayer proxy on a server-rendered request: the
  // negotiated locale is not the default one, so the URL must name it.
  it('redirects a server-rendered request to its negotiated locale', async () => {
    const { response } = await render('/about', { 'accept-language': 'fr' });

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('/fr/about');
  });

  it('never redirects a prerendered page', async () => {
    const { response, rendered } = await render('/about', {}, true);

    expect(response.status).toBe(200);
    expect(rendered).toBe('<p lang="en">Hello</p>');
  });

  it('resolves a prerendered page from its URL without reading the headers', async () => {
    const { locals } = await render('/fr/about', {}, true);

    expect(locals.intlayer.locale).toBe('fr');
  });

  it('isolates concurrent renders', async () => {
    const [french, english] = await Promise.all([render('/fr'), render('/')]);

    expect(french.rendered).toBe('<p lang="fr">Bonjour</p>');
    expect(english.rendered).toBe('<p lang="en">Hello</p>');
  });
});

describe('astro-intlayer server hooks', () => {
  it('expose the request locals', async () => {
    let locals: IntlayerLocals | undefined;

    await onRequest(
      {
        url: new URL('http://localhost/fr'),
        request: new Request('http://localhost/fr'),
        locals: {},
      } as APIContext,
      async () => {
        locals = getIntlayerLocals();
        return new Response();
      }
    );

    expect(locals).toEqual({
      locale: 'fr',
      defaultLocale: 'en',
      availableLocales: ['en', 'fr'],
    });
  });

  it('fall back to the default locale outside of a request', () => {
    expect(getIntlayerLocals()).toBeUndefined();
    expect(useLocale().locale).toBe('en');
    expect(useIntlayer('greeting').title.value).toBe('Hello');
    expect(useDictionary(greetingDictionary).title.value).toBe('Hello');
  });

  it('match the client content shape', () => {
    const content = useIntlayer('greeting');

    expect(String(content.title)).toBe('Hello');
    expect(content.onChange(() => {})).toBe(content);
    expect(useLocale().subscribe(() => {})).toBeTypeOf('function');
  });

  it('let a call-site locale override the request locale', async () => {
    let titles: string[] = [];

    await onRequest(
      {
        url: new URL('http://localhost/fr'),
        request: new Request('http://localhost/fr'),
        locals: {},
      } as APIContext,
      async () => {
        titles = [
          useIntlayer('greeting').title,
          useIntlayer('greeting', 'en').title,
          useIntlayer('greeting', { locale: 'en' }).title,
          useDictionary(greetingDictionary, 'en').title,
        ].map(String);
        return new Response();
      }
    );

    expect(titles).toEqual(['Bonjour', 'Hello', 'Hello', 'Hello']);
  });
});
