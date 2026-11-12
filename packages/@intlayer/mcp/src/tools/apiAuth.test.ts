import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getOAuth2AccessToken } = vi.hoisted(() => ({
  getOAuth2AccessToken: vi.fn(),
}));

vi.mock('@intlayer/api', () => ({
  getIntlayerAPI: () => ({ oAuth: { getOAuth2AccessToken } }),
}));

vi.mock('@intlayer/config/built', () => ({
  editor: { clientId: 'env-client-id' },
}));

vi.mock('@intlayer/config/secrets', () => ({
  getEditorClientSecret: () => 'env-client-secret',
}));

import { mcpRequestContext } from '../server/requestContext';
import {
  clearAccessTokenCache,
  getAccessToken,
  getAuthenticatedAPI,
  resolveCredentials,
} from './apiAuth';

const contextCredentials = {
  clientId: 'header-client-id',
  clientSecret: 'header-client-secret',
};

describe('resolveCredentials', () => {
  it('prefers explicit arguments', () => {
    expect(
      resolveCredentials(
        { clientId: 'argument-id', clientSecret: 'argument-secret' },
        { allowEnvironmentCredentials: true }
      )
    ).toEqual({ clientId: 'argument-id', clientSecret: 'argument-secret' });
  });

  it('uses the request context before the environment', () => {
    mcpRequestContext.run({ credentials: contextCredentials }, () => {
      expect(
        resolveCredentials({}, { allowEnvironmentCredentials: true })
      ).toEqual(contextCredentials);
    });
  });

  it('falls back to the environment only when allowed', () => {
    expect(
      resolveCredentials({}, { allowEnvironmentCredentials: true })
    ).toEqual({ clientId: 'env-client-id', clientSecret: 'env-client-secret' });
    expect(
      resolveCredentials({}, { allowEnvironmentCredentials: false })
    ).toBeUndefined();
  });
});

describe('getAccessToken', () => {
  beforeEach(() => {
    clearAccessTokenCache();
  });

  it('reads `accessToken` from the token response and caches it', async () => {
    getOAuth2AccessToken.mockResolvedValue({
      data: {
        accessToken: 'token-1',
        accessTokenExpiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      },
    });

    await expect(getAccessToken(contextCredentials)).resolves.toBe('token-1');
    await expect(getAccessToken(contextCredentials)).resolves.toBe('token-1');
    expect(getOAuth2AccessToken).toHaveBeenCalledTimes(1);
  });

  it('does not reuse a token for a different secret', async () => {
    getOAuth2AccessToken
      .mockResolvedValueOnce({ data: { accessToken: 'token-1' } })
      .mockResolvedValueOnce({ data: { accessToken: 'token-2' } });

    await getAccessToken(contextCredentials);
    await expect(
      getAccessToken({ ...contextCredentials, clientSecret: 'other' })
    ).resolves.toBe('token-2');
  });

  it('refreshes a token close to its expiry', async () => {
    getOAuth2AccessToken
      .mockResolvedValueOnce({
        data: {
          accessToken: 'token-1',
          accessTokenExpiresAt: new Date(Date.now() + 1000).toISOString(),
        },
      })
      .mockResolvedValueOnce({ data: { accessToken: 'token-2' } });

    await getAccessToken(contextCredentials);
    await expect(getAccessToken(contextCredentials)).resolves.toBe('token-2');
  });

  it('throws when no token is issued', async () => {
    getOAuth2AccessToken.mockResolvedValue({ data: null });

    await expect(getAccessToken(contextCredentials)).rejects.toThrow(
      'Failed to obtain OAuth2 access token'
    );
  });
});

describe('getAuthenticatedAPI', () => {
  it('rejects a hosted call without credentials', async () => {
    await expect(
      getAuthenticatedAPI({}, { allowEnvironmentCredentials: false })
    ).rejects.toThrow('Authorization: Bearer');
  });

  it('accepts a bearer token from the request context', async () => {
    await mcpRequestContext.run({ accessToken: 'bearer-token' }, async () => {
      await expect(
        getAuthenticatedAPI({}, { allowEnvironmentCredentials: false })
      ).resolves.toBeDefined();
    });
    expect(getOAuth2AccessToken).not.toHaveBeenCalled();
  });
});
