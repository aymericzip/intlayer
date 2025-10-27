import {
  type FetcherOptions,
  getIntlayerAPI,
  type IntlayerAPI,
} from '@intlayer/api';
import { useConfiguration } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types';
import { type AuthAPI, getAuthAPI } from '../libs/auth';
import { useAuth } from './useAuth';

type UseIntlayerAuthProps = {
  options?: FetcherOptions;
  intlayerConfiguration?: IntlayerConfig;
};

export const useIntlayerOAuth = (props?: UseIntlayerAuthProps): IntlayerAPI => {
  const configuration = useConfiguration();
  const { oAuth2AccessToken } = useAuth();

  return getIntlayerAPI(
    {
      ...(oAuth2AccessToken && {
        headers: {
          Authorization: `Bearer ${oAuth2AccessToken.accessToken}`,
        },
      }),
      ...(props?.options ?? {}),
    },
    props?.intlayerConfiguration ?? configuration
  );
};

export const useIntlayerAuth = (props?: UseIntlayerAuthProps): AuthAPI => {
  const configuration = useConfiguration();

  return getAuthAPI(props?.intlayerConfiguration ?? configuration);
};
