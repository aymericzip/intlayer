import { logConfigDetails } from '@intlayer/chokidar/cli';
import { colorizeObject, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { checkCMSAuth, getAuthenticatedAPI } from './utils/checkAccess';

type PushOptions = {
  configOptions?: GetConfigurationOptions;
};

export const pushConfig = async (options?: PushOptions) => {
  const config = getConfiguration(options?.configOptions);
  logConfigDetails(options?.configOptions);

  const appLogger = getAppLogger(config);

  const hasCMSAuth = await checkCMSAuth(config, false);

  if (!hasCMSAuth) return;

  const intlayerAPI = await getAuthenticatedAPI(config);

  // Push the project configuration
  const getDictionariesKeysResult =
    await intlayerAPI.project.pushProjectConfiguration(config);

  if (!getDictionariesKeysResult.data) {
    throw new Error('Error pushing project configuration');
  }

  appLogger('Project configuration pushed successfully');

  appLogger(colorizeObject(getDictionariesKeysResult.data));
};
