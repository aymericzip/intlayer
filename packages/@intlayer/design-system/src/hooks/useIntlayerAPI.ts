import {
  getIntlayerAPI,
  type FetcherOptions,
  type IntlayerAPI,
} from '@intlayer/api';
import { type IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { getAuthAPI, type AuthAPI } from './auth';
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
          Authorization: `Bearer ${oAuth2AccessToken}`,
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
