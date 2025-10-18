import type { CustomIntlayerConfig } from '@intlayer/types';
import type { LoadEnvFileOptions } from '../loadEnvFile';
import { loadExternalFile } from '../loadExternalFile';

const filterValidConfiguration = (
  configuration: CustomIntlayerConfig
): CustomIntlayerConfig => {
  // @TODO Implement filtering of valid configuration
  return configuration;
};

type LoadConfigurationFileOptions = {
  projectRequire?: NodeJS.Require;
  envVarOptions?: LoadEnvFileOptions;
  additionalEnvVars?: Record<string, string>;
  aliases?: Record<string, string | object>;
};

/**
 * Load the configuration file from the given path
 * Example of configuration file: intlayer.config.js
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadConfigurationFile = (
  configFilePath: string,
  options?: LoadConfigurationFileOptions
): CustomIntlayerConfig | undefined => {
  const fileContent = loadExternalFile(configFilePath, options);

  return filterValidConfiguration(fileContent);
};
