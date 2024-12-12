import { getConfiguration } from '@intlayer/config';

type ConfigOptions = {};

export const getConfig = (_options?: ConfigOptions) => {
  const config = getConfiguration();

  console.log(config);
};
