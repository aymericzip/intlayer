'use client';

import type { OAuth2Token } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { useEffect, useState, useCallback } from 'react';
import { intlayerAPI } from '../../../libs/intlayer-api';

export const useOAuth2 = (csrfToken: string | null | undefined) => {
  const { clientId, clientSecret } = getConfiguration().editor;

  const [oAuth2AccessToken, setOAuth2AccessToken] = useState<
    OAuth2Token | null | undefined
  >(undefined);

  const fetchAccessToken = useCallback(async () => {
    if (!csrfToken) return;

    await intlayerAPI.auth
      .getOAuth2AccessToken({
        body: { csrf_token: csrfToken },
      })
      .then((response) => {
        if (!response.data) {
          return setOAuth2AccessToken(null);
        }

        setOAuth2AccessToken(response.data);
      })
      .catch((error) => {
        console.error('Error fetching oAuth2 token:', error);
        setOAuth2AccessToken(null);
      });
  }, [csrfToken]);

  useEffect(() => {
    if (!oAuth2AccessToken && clientId && clientSecret && csrfToken) {
      fetchAccessToken();
    }
  }, [oAuth2AccessToken, clientId, clientSecret, csrfToken]);

  return {
    oAuth2AccessToken,
    setOAuth2AccessToken,
    fetchAccessToken,
  };
};
