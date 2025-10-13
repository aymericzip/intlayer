import { relative } from 'node:path';
import merge from 'deepmerge';
import { logger } from '../logger';
import type {
  CustomIntlayerConfig,
  IntlayerConfig,
  LogFunctions,
} from '../types/config';
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
  logFunctions?: LogFunctions;
  require?: NodeJS.Require;
  additionalEnvVars?: Record<string, string>;
};

const BASE_DIR_PATH = process.cwd();

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
  const mergedOptions = {
    baseDir: BASE_DIR_PATH,
    ...options,
  };

  if (!storedConfiguration) {
    // Search for configuration files
    const { configurationFilePath, numCustomConfiguration } =
      searchConfigurationFile(mergedOptions.baseDir);

    // Load the custom configuration
    let customConfiguration: CustomIntlayerConfig | undefined;

    if (configurationFilePath) {
      customConfiguration = loadConfigurationFile(
        configurationFilePath,
        { env: mergedOptions.env, envFile: mergedOptions.envFile },
        mergedOptions?.require,
        mergedOptions.additionalEnvVars
      );
    }

    // Save the configuration to avoid reading the file again
    storedConfiguration = buildConfigurationFields(
      customConfiguration,
      mergedOptions.baseDir,
      mergedOptions.logFunctions
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

  const projectRequireConfig = {
    build: {
      require: mergedOptions.require,
    },
  } as CustomIntlayerConfig;

  const configWithProjectRequire = merge(
    storedConfiguration,
    projectRequireConfig
  ) as CustomIntlayerConfig;

  const configuration = merge(
    configWithProjectRequire,
    mergedOptions.override ?? {}
  ) as IntlayerConfig;

  return {
    configuration,
    configurationFilePath: storedConfigurationFilePath,
  };
};

/**
 * Get the configuration for the intlayer by reading the configuration file (e.g. intlayer.config.js)
 */
export const getConfiguration = (
  options?: GetConfigurationOptions
): IntlayerConfig => getConfigurationAndFilePath(options).configuration;

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
