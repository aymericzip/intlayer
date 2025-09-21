import type { AIOptions } from '@intlayer/api';
import { getIntlayerAPIProxy } from '@intlayer/api';
import { getAppLogger, type IntlayerConfig } from '@intlayer/config';

export const checkCMSAuth = async (
  configuration: IntlayerConfig
): Promise<boolean> => {
  const appLogger = getAppLogger(configuration, {
    config: {
      prefix: '',
    },
  });

  const hasCMSAuth =
    configuration.editor.clientId && configuration.editor.clientSecret;
  if (!hasCMSAuth) {
    appLogger('CMS auth not provided.', {
      level: 'error',
    });

    return false;
  }
  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  try {
    await intlayerAPI.oAuth.getOAuth2AccessToken();
  } catch (error) {
    let message;
    try {
      const jsonError = JSON.parse((error as Error).message as string);
      message = jsonError?.message ?? jsonError;
    } catch (error) {
      message = `${(error as Error).message} Error getting OAuth2 access token. Your token might be expired.`;
    }
    appLogger(message, {
      level: 'error',
    });
    return false;
  }

  return true;
};

export const checkAIAccess = async (
  configuration: IntlayerConfig,
  aiOptions?: AIOptions
): Promise<boolean> => {
  const appLogger = getAppLogger(configuration, {
    config: {
      prefix: '',
    },
  });

  const hasCMSAuth =
    configuration.editor.clientId && configuration.editor.clientSecret;
  const hasHisOwnAIAPIKey = configuration.ai?.apiKey || aiOptions?.apiKey;

  if (!hasCMSAuth && !hasHisOwnAIAPIKey) {
    appLogger('AI options or API key not provided.', {
      level: 'error',
    });

    return false;
  }

  return await checkCMSAuth(configuration);
};
