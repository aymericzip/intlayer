import {
  getConfiguration,
  type GetConfigurationOptions,
  logger,
} from '@intlayer/config';

type ConfigOptions = {
  logPrefix?: string;
} & GetConfigurationOptions;

export const getConfig = (options?: ConfigOptions) => {
  const config = getConfiguration(options);

  logger(JSON.stringify(config, null, 2), {
    config: {
      prefix: options?.logPrefix,
    },
  });
};
