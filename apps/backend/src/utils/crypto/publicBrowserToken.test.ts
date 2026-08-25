import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  PUBLIC_BROWSER_TOKEN_TTL_MS,
  signPublicBrowserToken,
  verifyPublicBrowserToken,
  verifyPublicBrowserTokenScope,
} from './publicBrowserToken';

const PROJECT_ID = '507f1f77bcf86cd799439011';

describe('public browser token', () => {
  beforeEach(() => {
    process.env.BETTER_AUTH_SECRET = 'test-signing-secret';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('round-trips the project id it was issued for', () => {
    const { token, expiresIn } = signPublicBrowserToken(PROJECT_ID);

    expect(verifyPublicBrowserToken(token)?.projectId).toBe(PROJECT_ID);
    expect(expiresIn).toBe(PUBLIC_BROWSER_TOKEN_TTL_MS / 1000);
  });

  it('rejects a token whose payload was swapped for another project', () => {
    const { token } = signPublicBrowserToken(PROJECT_ID);
    const signature = token.slice(token.lastIndexOf('.') + 1);

    const forgedPayload = Buffer.from(
      JSON.stringify({
        projectId: 'someone-elses-project',
        scopes: ['analytics:ingest'],
        expiresAt: Date.now() + PUBLIC_BROWSER_TOKEN_TTL_MS,
      })
    ).toString('base64url');

    expect(
      verifyPublicBrowserToken(`v1.${forgedPayload}.${signature}`)
    ).toBeNull();
  });

  it('rejects a token signed with a different server secret', () => {
    const { token } = signPublicBrowserToken(PROJECT_ID);

    process.env.BETTER_AUTH_SECRET = 'a-different-secret';

    expect(verifyPublicBrowserToken(token)).toBeNull();
  });

  it('rejects a token past its expiry', () => {
    const { token } = signPublicBrowserToken(PROJECT_ID);

    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + PUBLIC_BROWSER_TOKEN_TTL_MS + 1000);

    expect(verifyPublicBrowserToken(token)).toBeNull();
  });

  it('rejects malformed input without throwing', () => {
    for (const candidate of [
      undefined,
      '',
      'not-a-token',
      'v1.only-two.parts.extra',
      'v2.abc.def',
    ]) {
      expect(verifyPublicBrowserToken(candidate)).toBeNull();
    }
  });

  it('refuses to sign when the server secret is missing', () => {
    process.env.BETTER_AUTH_SECRET = '';

    expect(() => signPublicBrowserToken(PROJECT_ID)).toThrow(
      /BETTER_AUTH_SECRET/
    );
  });

  it('grants only the scopes it was issued with', () => {
    const { token, scopes } = signPublicBrowserToken(PROJECT_ID, [
      'analytics:ingest',
    ]);

    expect(scopes).toEqual(['analytics:ingest']);
    expect(
      verifyPublicBrowserTokenScope(token, 'analytics:ingest')?.projectId
    ).toBe(PROJECT_ID);

    // A scope the token does not carry must not be honoured, even though the
    // signature is valid — this is what keeps a public token away from writes.
    expect(verifyPublicBrowserTokenScope(token, 'dictionary:read')).toBeNull();
  });

  it('grants the full public set by default', () => {
    const { token, scopes } = signPublicBrowserToken(PROJECT_ID);

    expect(scopes).toEqual(['analytics:ingest', 'dictionary:read']);
    expect(
      verifyPublicBrowserTokenScope(token, 'dictionary:read')
    ).not.toBeNull();
  });

  it('rejects a token carrying only unknown scopes', () => {
    const { token } = signPublicBrowserToken(PROJECT_ID, [
      'dictionary:write',
    ] as never);

    expect(verifyPublicBrowserToken(token)).toBeNull();
  });
});
