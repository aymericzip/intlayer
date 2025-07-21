import { getIntlayerAPI, type FetcherOptions } from '@intlayer/api';
import { type IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useAuth } from './useAuth';

type UseIntlayerAuthProps = {
  options?: FetcherOptions;
  intlayerConfiguration?: IntlayerConfig;
};

export const useIntlayerAuth = (props?: UseIntlayerAuthProps) => {
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
