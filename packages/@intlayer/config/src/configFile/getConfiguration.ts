import merge from 'deepmerge';
import { relative } from 'path';
import { logger } from '../logger';
import type { CustomIntlayerConfig, IntlayerConfig } from '../types/config';
import { buildConfigurationFields } from './buildConfigurationFields';
import { loadConfigurationFile } from './loadConfigurationFile';
import { searchConfigurationFile } from './searchConfigurationFile';

let storedConfiguration: IntlayerConfig | undefined;
let storedConfigurationFilePath: string | undefined;
let storedNumCustomConfiguration: number | undefined;

export type GetConfigurationOptions = {
  baseDir?: string;
  override?: CustomIntlayerConfig;
  env?: string;
  envFile?: string;
};

const BASE_DIR_PATH = process.cwd();

/**
 * Get the configuration for the intlayer by reading the configuration file (e.g. intlayer.config.js)
 */
export const getConfiguration = (
  options?: GetConfigurationOptions
): IntlayerConfig => {
  const mergedOptions = {
    baseDir: BASE_DIR_PATH,
    ...options,
  };

  const { baseDir, env, envFile } = mergedOptions;

  if (!storedConfiguration || typeof options !== 'undefined') {
    // Search for configuration files
    const { configurationFilePath, numCustomConfiguration } =
      searchConfigurationFile(baseDir);

    // Load the custom configuration
    let customConfiguration: CustomIntlayerConfig | undefined;

    if (configurationFilePath) {
      customConfiguration = loadConfigurationFile(configurationFilePath, {
        env,
        envFile,
      });
    }

    // Save the configuration to avoid reading the file again
    storedConfiguration = buildConfigurationFields(
      customConfiguration,
      baseDir
    );

    storedConfigurationFilePath = configurationFilePath;
    storedNumCustomConfiguration = numCustomConfiguration;
  }

  // Log warning if multiple configuration files are found
  if (options?.override?.log?.mode === 'verbose') {
    logConfigFileResult(
      storedNumCustomConfiguration,
      storedConfigurationFilePath
    );
  }

  return merge(storedConfiguration, options?.override ?? {}) as IntlayerConfig;
};

const logConfigFileResult = (
  numCustomConfiguration?: number,
  configurationFilePath?: string
) => {
  if (numCustomConfiguration === 0) {
    logger('Configuration file not found, using default configuration.', {
      isVerbose: true,
    });
  } else {
    const relativeOutputPath = relative(BASE_DIR_PATH, configurationFilePath!);

    if (numCustomConfiguration === 1) {
      logger(`Configuration file found: ${relativeOutputPath}.`, {
        isVerbose: true,
      });
    } else {
      logger(
        `Multiple configuration files found, using ${relativeOutputPath}.`,
        {
          isVerbose: true,
        }
      );
    }
  }
};
