import { Locales } from 'intlayer';
import { describe, expect, it } from 'vitest';
import { resolveRedirectTarget } from './useNavigateToRedirectUrl';

const ORIGIN = 'https://app.intlayer.org';

describe('resolveRedirectTarget', () => {
  it('localizes an un-localized route path', () => {
    expect(
      resolveRedirectTarget('/auth/cli-login', {
        origin: ORIGIN,
        locale: Locales.PORTUGUESE,
      })
    ).toEqual({ kind: 'internal', href: '/pt/auth/cli-login' });
  });

  it('keeps the query string and hash of a localized path', () => {
    expect(
      resolveRedirectTarget('/pt/auth/cli-login?port=64004&state=744xrc#top', {
        origin: ORIGIN,
        locale: Locales.PORTUGUESE,
      })
    ).toEqual({
      kind: 'internal',
      href: '/pt/auth/cli-login?port=64004&state=744xrc#top',
    });
  });

  it('turns a same-origin absolute URL into a relative href', () => {
    expect(
      resolveRedirectTarget(
        `${ORIGIN}/pt/auth/cli-login?port=64004&state=744xrc`,
        { origin: ORIGIN, locale: Locales.PORTUGUESE }
      )
    ).toEqual({
      kind: 'internal',
      href: '/pt/auth/cli-login?port=64004&state=744xrc',
    });
  });

  it('re-localizes a path carrying another locale prefix', () => {
    expect(
      resolveRedirectTarget('/fr/dashboard', {
        origin: ORIGIN,
        locale: Locales.PORTUGUESE,
      })
    ).toEqual({ kind: 'internal', href: '/pt/dashboard' });
  });

  it('does not prefix the default locale', () => {
    expect(
      resolveRedirectTarget('/pt/dashboard', {
        origin: ORIGIN,
        locale: Locales.ENGLISH,
      })
    ).toEqual({ kind: 'internal', href: '/dashboard' });
  });

  it('flags a cross-origin URL as external', () => {
    expect(
      resolveRedirectTarget('http://localhost:64004/callback?state=744xrc', {
        origin: ORIGIN,
        locale: Locales.PORTUGUESE,
      })
    ).toEqual({
      kind: 'external',
      url: 'http://localhost:64004/callback?state=744xrc',
    });
  });
});
