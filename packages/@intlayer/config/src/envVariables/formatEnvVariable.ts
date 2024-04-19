import { getConfiguration } from '../configFile/getConfiguration';

/**
 * Format all configuration values as environment variables
 */
export const formatEnvVariable = (
  prefix = 'NEXT_PUBLIC_INTLAYER_'
): Record<string, string> => {
  const intlayerConfig = getConfiguration();

  /**
   * Format a key to corresponding environment variable name
   *
   * Example:
   *  toEnvVariable('mainDir') => 'INTLAYER_MAIN_DIR'
   */
  const formatEnvName = (key: string): string =>
    prefix + key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

  // Set all configuration values as environment variables
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries({
    ...intlayerConfig.content,
    ...intlayerConfig.internationalization,
    ...intlayerConfig.middleware,
  })) {
    if (typeof value === 'string') {
      env[formatEnvName(key)] = value;
    } else {
      env[formatEnvName(key)] = JSON.stringify(value);
    }
  }

  return env;
};
