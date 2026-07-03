import { colorizeObject, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { logConfigDetails } from '@intlayer/engine/cli';

type ConfigOptions = {
  configOptions?: GetConfigurationOptions;
};

const sanitize = (value: unknown): unknown => {
  if (typeof value === 'function' || typeof value === 'undefined') return null;
  if (Array.isArray(value)) return value.map(sanitize);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, v]) => typeof v !== 'function' && typeof v !== 'undefined')
        .map(([k, v]) => [k, sanitize(v)])
    );
  }
  return value;
};

export const getConfig = (options?: ConfigOptions) => {
  const config = getConfiguration(options?.configOptions);
  logConfigDetails(options?.configOptions);

  const appLogger = getAppLogger(config);

  appLogger(colorizeObject(sanitize(config) as typeof config));
};
