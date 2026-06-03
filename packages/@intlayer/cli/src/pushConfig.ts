import { logConfigDetails } from '@intlayer/chokidar/cli';
import { CYAN, GREY_DARK } from '@intlayer/config/colors';
import {
  colorize,
  colorizeObject,
  getAppLogger,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { checkCMSAuth, getAuthenticatedAPI } from './utils/checkAccess';
import { selectCmsEnvironment } from './utils/selectCmsEnvironment';

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

  await selectCmsEnvironment(options?.configOptions?.env, intlayerAPI, config);

  // Push the project configuration
  const getDictionariesKeysResult =
    await intlayerAPI.project.pushProjectConfiguration(config);

  if (!getDictionariesKeysResult.data) {
    appLogger(
      `Error pushing project configuration. Run ${colorize('npx intlayer login', CYAN)} command to authenticate.`,
      {
        level: 'error',
      }
    );
    throw new Error('Error pushing project configuration');
  }

  appLogger('Project configuration pushed successfully');

  appLogger(colorize('--------------------------------', GREY_DARK));
  appLogger(colorizeObject(getDictionariesKeysResult.data.configuration));
  appLogger(colorize('--------------------------------', GREY_DARK));
};
