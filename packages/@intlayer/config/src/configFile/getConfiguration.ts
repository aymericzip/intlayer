import { relative } from 'node:path';
import type {
  CustomIntlayerConfig,
  IntlayerConfig,
  LogFunctions,
} from '@intlayer/types';
import merge from 'deepmerge';
import { logger } from '../logger';
import { getPackageJsonPath } from '../utils/getPackageJsonPath';
import { buildConfigurationFields } from './buildConfigurationFields';
import { loadConfigurationFile } from './loadConfigurationFile';
import { searchConfigurationFile } from './searchConfigurationFile';

export type GetConfigurationOptions = {
  baseDir?: string;
  override?: CustomIntlayerConfig;
  env?: string;
  envFile?: string;
  logFunctions?: LogFunctions;
  require?: NodeJS.Require;
  additionalEnvVars?: Record<string, string>;
};

export type GetConfigurationAndFilePathResult = {
  configuration: IntlayerConfig;
  configurationFilePath: string | undefined;
};

/**
 * Get the configuration for the intlayer by reading the configuration file (e.g. intlayer.config.js)
 */
export const getConfigurationAndFilePath = (
  options?: GetConfigurationOptions
): GetConfigurationAndFilePathResult => {
  const { baseDir } = getPackageJsonPath();
  const mergedOptions = {
    baseDir,
    require: options?.require,
    ...options,
  };

  // Search for configuration files
  const { configurationFilePath, numCustomConfiguration } =
    searchConfigurationFile(mergedOptions.baseDir);

  if (options?.override?.log?.mode === 'verbose') {
    logConfigFileResult(
      mergedOptions.baseDir,
      numCustomConfiguration,
      configurationFilePath
    );
  }

  let storedConfiguration: IntlayerConfig | undefined;

  if (configurationFilePath) {
    // Load the custom configuration
    const customConfiguration: CustomIntlayerConfig | undefined =
      loadConfigurationFile(
        configurationFilePath,
        mergedOptions.require,
        { env: mergedOptions.env, envFile: mergedOptions.envFile },
        mergedOptions.additionalEnvVars
      );

    // Save the configuration to avoid reading the file again
    storedConfiguration = buildConfigurationFields(
      customConfiguration,
      mergedOptions.baseDir,
      mergedOptions.logFunctions
    );
  }

  // Log warning if multiple configuration files are found

  const projectRequireConfig: CustomIntlayerConfig = mergedOptions.require
    ? {
        build: {
          require: mergedOptions.require,
        },
      }
    : {};

  const configWithProjectRequire = merge(
    storedConfiguration ?? {},
    projectRequireConfig
  ) as CustomIntlayerConfig;

  const configuration = merge(
    configWithProjectRequire,
    mergedOptions.override ?? {}
  ) as IntlayerConfig;

  return {
    configuration,
    configurationFilePath,
  };
};

/**
 * Get the configuration for the intlayer by reading the configuration file (e.g. intlayer.config.js)
 */
export const getConfiguration = (
  options?: GetConfigurationOptions
): IntlayerConfig => getConfigurationAndFilePath(options).configuration;

const logConfigFileResult = (
  baseDir: string,
  numCustomConfiguration?: number,
  configurationFilePath?: string
) => {
  if (numCustomConfiguration === 0) {
    logger('Configuration file not found, using default configuration.', {
      isVerbose: true,
    });
  } else {
    const relativeOutputPath = relative(baseDir, configurationFilePath!);

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
