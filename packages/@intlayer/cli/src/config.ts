import { getConfiguration, logger } from '@intlayer/config';

type ConfigOptions = {};

export const getConfig = (_options?: ConfigOptions) => {
  const config = getConfiguration();

  logger(config);
};
