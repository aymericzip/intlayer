import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';

type ConfigOptions = {
  configOptions?: GetConfigurationOptions;
};

export const getConfig = (options?: ConfigOptions) => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config);

  appLogger(JSON.stringify(config, null, 2));
};
