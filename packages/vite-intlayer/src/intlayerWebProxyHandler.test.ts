// @vitest-environment node
import { describe, expect, it } from 'vitest';
import type { NodeMiddleware } from './intlayerProxyHandler';
import { runProxyOnWebRequest } from './intlayerWebProxyHandler';

const request = (url: string, headers: Record<string, string> = {}) => ({
  url: new URL(url),
  headers: new Headers(headers),
});

describe('runProxyOnWebRequest', () => {
  it('exposes the request path and forwarded headers to the middleware', () => {
    let seenUrl: string | undefined;
    let seenHeaders: Record<string, string> | undefined;

    const middleware: NodeMiddleware = (req, _res, next) => {
      seenUrl = req.url;
      seenHeaders = req.headers as Record<string, string>;
      next();
    };

    runProxyOnWebRequest(
      middleware,
      request('http://localhost:4321/about?tab=1', {
        cookie: 'INTLAYER_LOCALE=fr',
        'accept-language': 'fr-FR',
        host: 'localhost:4321',
      })
    );

    expect(seenUrl).toBe('/about?tab=1');
    expect(seenHeaders?.cookie).toBe('INTLAYER_LOCALE=fr');
    expect(seenHeaders?.['accept-language']).toBe('fr-FR');
    expect(seenHeaders?.host).toBe('localhost:4321');
  });

  it('turns a redirect into a Response carrying status, location and cookies', () => {
    const middleware: NodeMiddleware = (_req, res) => {
      res.setHeader('Set-Cookie', 'INTLAYER_LOCALE=fr; Path=/');
      res.writeHead(302, { Location: '/fr' });
      res.end();
    };

    const outcome = runProxyOnWebRequest(
      middleware,
      request('http://localhost:4321/')
    );

    expect(outcome.kind).toBe('response');
    if (outcome.kind !== 'response') return;

    expect(outcome.response.status).toBe(302);
    expect(outcome.response.headers.get('location')).toBe('/fr');
    expect(outcome.response.headers.get('set-cookie')).toBe(
      'INTLAYER_LOCALE=fr; Path=/'
    );
    expect(outcome.response.body).toBeNull();
  });

  it('reports an internal rewrite and the headers set along the way', () => {
    const middleware: NodeMiddleware = (req, res, next) => {
      req.url = '/en/about';
      res.setHeader('Set-Cookie', 'INTLAYER_LOCALE=en; Path=/');
      next();
    };

    const outcome = runProxyOnWebRequest(
      middleware,
      request('http://localhost:4321/about')
    );

    expect(outcome.kind).toBe('next');
    if (outcome.kind !== 'next') return;

    expect(outcome.rewrittenPath).toBe('/en/about');
    expect([...outcome.headers]).toEqual([
      ['set-cookie', 'INTLAYER_LOCALE=en; Path=/'],
    ]);
  });

  it('keeps several cookies as separate Set-Cookie headers', () => {
    const middleware: NodeMiddleware = (_req, res, next) => {
      const existing = res.getHeader('Set-Cookie');
      expect(existing).toBeUndefined();
      res.setHeader('Set-Cookie', ['a=1; Path=/', 'b=2; Path=/']);
      expect(res.getHeader('Set-Cookie')).toEqual([
        'a=1; Path=/',
        'b=2; Path=/',
      ]);
      next();
    };

    const outcome = runProxyOnWebRequest(
      middleware,
      request('http://localhost:4321/about')
    );

    expect(outcome.kind).toBe('next');
    if (outcome.kind !== 'next') return;

    expect(outcome.headers.getSetCookie()).toEqual([
      'a=1; Path=/',
      'b=2; Path=/',
    ]);
  });

  it('reports a plain pass-through without a rewritten path', () => {
    const middleware: NodeMiddleware = (_req, _res, next) => next();

    const outcome = runProxyOnWebRequest(
      middleware,
      request('http://localhost:4321/fr/about')
    );

    expect(outcome.kind).toBe('next');
    if (outcome.kind !== 'next') return;

    expect(outcome.rewrittenPath).toBeUndefined();
    expect([...outcome.headers]).toEqual([]);
  });
});
