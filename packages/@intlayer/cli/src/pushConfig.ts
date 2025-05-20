import { getIntlayerAPI } from '@intlayer/api';
import {
  getConfiguration,
  logger,
  type GetConfigurationOptions,
} from '@intlayer/config';

type PushOptions = {
  logPrefix?: string;
  configOptions?: GetConfigurationOptions;
};

export const pushConfig = async (options?: PushOptions) => {
  const config = getConfiguration(options?.configOptions);

  const { clientId, clientSecret } = config.editor;

  if (!clientId || !clientSecret) {
    logger(
      'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.',
      {
        level: 'error',
        config: {
          prefix: options?.logPrefix,
        },
      }
    );
    return;
  }

  const intlayerAPI = getIntlayerAPI(undefined, config);

  const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

  const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

  // Get the list of dictionary keys
  const getDictionariesKeysResult =
    await intlayerAPI.project.pushProjectConfiguration(config, {
      headers: { Authorization: `Bearer ${oAuth2AccessToken}` },
    });

  if (!getDictionariesKeysResult.data) {
    throw new Error('Error pushing project configuration');
  }

  logger('Project configuration pushed successfully', {
    config: {
      prefix: options?.logPrefix,
    },
  });

  logger(JSON.stringify(getDictionariesKeysResult.data, null, 2), {
    config: {
      prefix: options?.logPrefix,
    },
  });
};
