import { type LoadEnvFileOptions } from '../loadEnvFile';
import { loadExternalFile } from '../loadExternalFile';
import { logger } from '../logger';
import type { CustomIntlayerConfig } from '../types/config';

const filterValidConfiguration = (
  configuration: CustomIntlayerConfig
): CustomIntlayerConfig => {
  // @TODO Implement filtering of valid configuration
  return configuration;
};

/**
 * Load the configuration file from the given path
 * Example of configuration file: intlayer.config.js
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadConfigurationFile = (
  configFilePath: string,
  envVarOptions?: LoadEnvFileOptions,
  projectRequire?: typeof require,
  additionalEnvVars?: Record<string, string>
): CustomIntlayerConfig | undefined => {
  try {
    const fileContent = loadExternalFile(
      configFilePath,
      envVarOptions,
      projectRequire,
      additionalEnvVars
    );

    return filterValidConfiguration(fileContent);
  } catch (error) {
    logger(
      `Error: ${error} ${JSON.stringify((error as Error).stack, null, 2)}`,
      {
        level: 'error',
      }
    );
  }
};
