import {
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';

type ConfigOptions = {
  configOptions?: GetConfigurationOptions;
};

export const getConfig = (options?: ConfigOptions) => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });

  appLogger(JSON.stringify(config, null, 2));
};
