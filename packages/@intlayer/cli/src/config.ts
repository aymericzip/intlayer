import {
  getConfiguration,
  type GetConfigurationOptions,
} from '@intlayer/config';
import { appLogger } from '@intlayer/config/client';

type ConfigOptions = {
  configOptions?: GetConfigurationOptions;
};

export const getConfig = (options?: ConfigOptions) => {
  const config = getConfiguration(options?.configOptions);

  appLogger(JSON.stringify(config, null, 2));
};
