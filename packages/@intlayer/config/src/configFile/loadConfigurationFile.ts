import type { CustomIntlayerConfig } from '@intlayer/types';
import {
  type LoadExternalFileOptions,
  loadExternalFileSync,
} from '../loadExternalFile/loadExternalFile';
import { configESMxCJSRequire } from '../utils/ESMxCJSHelpers';

const filterValidConfiguration = (
  configuration: CustomIntlayerConfig
): CustomIntlayerConfig => {
  // @TODO Implement filtering of valid configuration
  return configuration;
};

const getAliases = (
  options?: Omit<LoadExternalFileOptions, 'configuration'>
) => {
  // Can fail if CJS hot removed from the module (e.g. in Tanstack Start + Nitro)
  try {
    return {
      ...options?.aliases,
      // Replace intlayer with @intlayer/types to avoid circular dependency intlayer -> @intlayer/config -> intlayer
      intlayer: configESMxCJSRequire.resolve('@intlayer/types'),
    };
  } catch {
    return options?.aliases;
  }
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
  const fileContent = loadExternalFileSync(configFilePath, {
    ...options,
    aliases: getAliases(options),
  });

  return filterValidConfiguration(fileContent);
};
