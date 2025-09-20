import { getIntlayerAPI } from '@intlayer/api';
import {
  getAppLogger,
  getConfiguration,
  type GetConfigurationOptions,
} from '@intlayer/config';

type PushOptions = {
  configOptions?: GetConfigurationOptions;
};

export const pushConfig = async (options?: PushOptions) => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });

  const { clientId, clientSecret } = config.editor;

  if (!clientId || !clientSecret) {
    appLogger(
      'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.',
      {
        level: 'error',
      }
    );
    return;
  }

  const intlayerAPI = getIntlayerAPI(undefined, config);

  const oAuth2TokenResult = await intlayerAPI.oAuth.getOAuth2AccessToken();

  const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

  // Get the list of dictionary keys
  const getDictionariesKeysResult =
    await intlayerAPI.project.pushProjectConfiguration(config, {
      ...(oAuth2AccessToken && {
        headers: {
          Authorization: `Bearer ${oAuth2AccessToken}`,
        },
      }),
    });

  if (!getDictionariesKeysResult.data) {
    throw new Error('Error pushing project configuration');
  }

  appLogger('Project configuration pushed successfully');

  appLogger(JSON.stringify(getDictionariesKeysResult.data, null, 2));
};
