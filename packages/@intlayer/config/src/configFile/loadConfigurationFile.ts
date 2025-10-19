import type { CustomIntlayerConfig } from '@intlayer/types';
import {
  type LoadExternalFileOptions,
  loadExternalFileSync,
} from '../loadExternalFile/loadExternalFile';

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
  options?: Omit<LoadExternalFileOptions, 'configuration'>
): CustomIntlayerConfig | undefined => {
  const fileContent = loadExternalFileSync(configFilePath, options);

  return filterValidConfiguration(fileContent);
};
