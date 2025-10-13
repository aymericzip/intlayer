import type { LoadEnvFileOptions } from '../loadEnvFile';
import { loadExternalFile } from '../loadExternalFile';
import type { CustomIntlayerConfig } from '../types/config';
import { ESMxCJSRequire } from '../utils/ESMxCJSHelpers';

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
  projectRequire: NodeJS.Require = ESMxCJSRequire,
  envVarOptions?: LoadEnvFileOptions,
  additionalEnvVars?: Record<string, string>
): CustomIntlayerConfig | undefined => {
  const fileContent = loadExternalFile(
    configFilePath,
    projectRequire,
    envVarOptions,
    additionalEnvVars
  );

  return filterValidConfiguration(fileContent);
};
