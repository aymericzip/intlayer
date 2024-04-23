import { getConfiguration } from '../configFile/getConfiguration';
import { getPrefix, type Platform } from './detectPlatform';

/**
 * Format a key to corresponding environment variable name
 *
 * Example:
 *  toEnvVariable('mainDir') => 'INTLAYER_MAIN_DIR'
 */
const formatEnvName = (key: string, prefix: string): string =>
  prefix + key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

/**
 * Format all configuration values as environment variables
 */
export const formatEnvVariable = (
  platform: Platform
): Record<string, string> => {
  const intlayerConfig = getConfiguration();

  const prefix = getPrefix(platform);

  // Set all configuration values as environment variables
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries({
    ...intlayerConfig.content,
    ...intlayerConfig.internationalization,
    ...intlayerConfig.middleware,
  })) {
    if (typeof value === 'string') {
      env[formatEnvName(key, prefix)] = value;
    } else {
      env[formatEnvName(key, prefix)] = JSON.stringify(value);
    }
  }

  return env;
};
