import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { createAuthClient } from 'better-auth/client';
import { URLSearchParams } from 'url';

type TokenResponse = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number; // seconds
  scope?: string;
};

let cachedToken: string | null = null;
let cachedExpiresAt = 0;

export const getAuthAPI = (intlayerConfig?: IntlayerConfig) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;
  const { clientId, clientSecret } = intlayerConfig?.editor ?? {};

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const authClient = createAuthClient({
    baseURL: backendURL,
  });

  /** Get (or refresh) a machine token */
  const getOAuth2Token = async (): Promise<string> => {
    if (!clientId || !clientSecret) {
      throw new Error('Missing clientId / clientSecret in the Intlayer config');
    }

    // Refresh only if missing or expired (5 s skew)
    if (cachedToken && Date.now() < cachedExpiresAt - 5_000) {
      return cachedToken;
    }

    const tokenURL = `${backendURL}/api/auth/oauth/token`;
    const body = new URLSearchParams({ grant_type: 'client_credentials' });

    const res = await fetch(tokenURL, {
      method: 'POST',
      headers: {
        // RFC 6749 §3.2.1 – basic auth is the default client‑auth method
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!res.ok) {
      throw new Error(`Token endpoint ${res.status}: ${await res.text()}`);
    }

    const json = (await res.json()) as TokenResponse;
    cachedToken = json.access_token;
    cachedExpiresAt = Date.now() + json.expires_in * 1_000;
    return cachedToken;
  };

  return { ...authClient, getOAuth2Token };
};
