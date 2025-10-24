import type { AIOptions } from '@intlayer/api';
import { getIntlayerAPIProxy } from '@intlayer/api';
import { extractErrorMessage, getAppLogger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';

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
    const message = extractErrorMessage(error);

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
  const appLogger = getAppLogger(configuration);

  const hasCMSAuth =
    configuration.editor.clientId && configuration.editor.clientSecret;
  const hasHisOwnAIAPIKey = configuration.ai?.apiKey || aiOptions?.apiKey;

  // User need to provide either his own AI API key or the CMS auth
  if (!hasCMSAuth && !hasHisOwnAIAPIKey) {
    appLogger('AI options or API key not provided.', {
      level: 'error',
    });

    return false;
  }

  // If the user do not have his own AI API key, we need to check the CMS auth
  if (!hasHisOwnAIAPIKey) {
    return await checkCMSAuth(configuration);
  }

  return true;
};
