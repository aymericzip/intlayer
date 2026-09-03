import type { FastifyRequest } from 'fastify';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getBrowserOrigin, hasSessionCookie, verifyCsrf } from './csrf';

const SESSION_COOKIE = 'intlayer.session_token=abc123';

type RequestStub = {
  method?: string;
  cookie?: string;
  origin?: string;
  referer?: string;
  authorization?: string;
};

/** Minimal request stub carrying only the headers the guard reads. */
const buildRequest = ({
  method = 'POST',
  cookie,
  origin,
  referer,
  authorization,
}: RequestStub = {}): FastifyRequest =>
  ({
    method,
    headers: { cookie, origin, referer, authorization },
  }) as unknown as FastifyRequest;

let savedAppUrl: string | undefined;

beforeEach(() => {
  savedAppUrl = process.env.APP_URL;
  process.env.APP_URL = 'https://app.intlayer.org';
});

afterEach(() => {
  if (savedAppUrl === undefined) delete process.env.APP_URL;
  else process.env.APP_URL = savedAppUrl;
});

describe('hasSessionCookie', () => {
  it('detects every better-auth session cookie variant', () => {
    expect(hasSessionCookie('intlayer.session_token=a')).toBe(true);
    expect(hasSessionCookie('__Secure-intlayer.session_token=a')).toBe(true);
    expect(hasSessionCookie('intlayer.session_token_multi-xyz=a')).toBe(true);
    expect(hasSessionCookie('theme=dark; intlayer.session_token=a')).toBe(true);
  });

  it('ignores requests with no session cookie', () => {
    expect(hasSessionCookie(undefined)).toBe(false);
    expect(hasSessionCookie('')).toBe(false);
    expect(hasSessionCookie('theme=dark; locale=fr')).toBe(false);
  });

  it('does not match a session name appearing only in a cookie value', () => {
    expect(hasSessionCookie('decoy=session_token')).toBe(false);
  });
});

describe('getBrowserOrigin', () => {
  it('prefers the Origin header', () => {
    const request = buildRequest({
      origin: 'https://app.intlayer.org',
      referer: 'https://evil.com/page',
    });

    expect(getBrowserOrigin(request)).toBe('https://app.intlayer.org');
  });

  it('falls back to the Referer, reduced to its origin', () => {
    const request = buildRequest({
      referer: 'https://app.intlayer.org/a/b?c=1',
    });

    expect(getBrowserOrigin(request)).toBe('https://app.intlayer.org');
  });

  it('returns null when neither header is present', () => {
    expect(getBrowserOrigin(buildRequest())).toBeNull();
  });
});

describe('verifyCsrf', () => {
  it('allows safe methods regardless of origin', () => {
    for (const method of ['GET', 'HEAD', 'OPTIONS']) {
      const request = buildRequest({
        method,
        cookie: SESSION_COOKIE,
        origin: 'https://evil.com',
      });

      expect(verifyCsrf(request)).toEqual({
        outcome: 'allowed',
        reason: 'safe-method',
      });
    }
  });

  it('allows Bearer-authenticated writes from any origin (CLI, editor)', () => {
    const request = buildRequest({
      origin: 'https://a-customer-website.com',
      authorization: 'Bearer some-access-token',
    });

    expect(verifyCsrf(request)).toEqual({
      outcome: 'allowed',
      reason: 'bearer-authenticated',
    });
  });

  it('allows a Bearer request that also carries a stale session cookie', () => {
    const request = buildRequest({
      origin: 'https://a-customer-website.com',
      authorization: 'Bearer some-access-token',
      cookie: SESSION_COOKIE,
    });

    expect(verifyCsrf(request).outcome).toBe('allowed');
  });

  it('allows writes with no session cookie (webhooks, token endpoint)', () => {
    const request = buildRequest({ origin: 'https://stripe.com' });

    expect(verifyCsrf(request)).toEqual({
      outcome: 'allowed',
      reason: 'no-session-cookie',
    });
  });

  it('allows server-to-server calls that forward a cookie without an origin', () => {
    const request = buildRequest({ cookie: SESSION_COOKIE });

    expect(verifyCsrf(request)).toEqual({
      outcome: 'allowed',
      reason: 'no-browser-origin',
    });
  });

  it('allows cookie-authenticated writes from a trusted origin', () => {
    const request = buildRequest({
      cookie: SESSION_COOKIE,
      origin: 'https://app.intlayer.org',
    });

    expect(verifyCsrf(request)).toEqual({
      outcome: 'allowed',
      reason: 'trusted-origin',
    });
  });

  it('rejects cookie-authenticated writes from an untrusted origin', () => {
    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
      const request = buildRequest({
        method,
        cookie: SESSION_COOKIE,
        origin: 'https://evil.com',
      });

      expect(verifyCsrf(request)).toEqual({
        outcome: 'rejected',
        origin: 'https://evil.com',
      });
    }
  });

  it('rejects a cross-site form post that only carries a Referer', () => {
    const request = buildRequest({
      cookie: SESSION_COOKIE,
      referer: 'https://evil.com/csrf.html',
    });

    expect(verifyCsrf(request)).toEqual({
      outcome: 'rejected',
      origin: 'https://evil.com',
    });
  });

  it('rejects the opaque "null" origin used by sandboxed iframes', () => {
    const request = buildRequest({ cookie: SESSION_COOKIE, origin: 'null' });

    expect(verifyCsrf(request)).toEqual({
      outcome: 'rejected',
      origin: 'null',
    });
  });
});
