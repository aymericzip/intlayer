import { getConfiguration, logger } from '@intlayer/config';

type ConfigOptions = {
  logPrefix?: string;
};

export const getConfig = (options?: ConfigOptions) => {
  const config = getConfiguration();

  logger(JSON.stringify(config, null, 2), {
    config: {
      prefix: options?.logPrefix,
    },
  });
};
