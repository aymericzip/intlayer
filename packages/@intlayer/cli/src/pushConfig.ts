import { getIntlayerAPIProxy } from '@intlayer/api';
import {
  getAppLogger,
  getConfiguration,
  type GetConfigurationOptions,
} from '@intlayer/config';
import { checkCMSAuth } from './utils/checkAccess';

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

  const hasCMSAuth = await checkCMSAuth(config);

  if (!hasCMSAuth) return;

  const intlayerAPI = getIntlayerAPIProxy(undefined, config);

  // Push the project configuration
  const getDictionariesKeysResult =
    await intlayerAPI.project.pushProjectConfiguration(config);

  if (!getDictionariesKeysResult.data) {
    throw new Error('Error pushing project configuration');
  }

  appLogger('Project configuration pushed successfully');

  appLogger(JSON.stringify(getDictionariesKeysResult.data, null, 2));
};
