import { relative } from 'node:path';
import type {
  CustomIntlayerConfig,
  IntlayerConfig,
  LogFunctions,
} from '@intlayer/types';
import merge from 'deepmerge';
import type { SandBoxContextOptions } from '../loadExternalFile/parseFileContent';
import { logger } from '../logger';
import { cache } from '../utils/cache';
import { getPackageJsonPath } from '../utils/getPackageJsonPath';
import { buildConfigurationFields } from './buildConfigurationFields';
import { loadConfigurationFile } from './loadConfigurationFile';
import { searchConfigurationFile } from './searchConfigurationFile';

export type GetConfigurationOptions = {
  baseDir?: string;
  override?: CustomIntlayerConfig;
  // Dotenv options
  env?: string;
  envFile?: string;
  // Log functions
  logFunctions?: LogFunctions;
  // Require function
  require?: NodeJS.Require;
} & Omit<SandBoxContextOptions, 'projectRequire'>;

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
    require: options?.require,
    ...options,
  };

  const baseDir = mergedOptions.baseDir ?? getPackageJsonPath().baseDir;

  const cachedConfiguration =
    cache.get<GetConfigurationAndFilePathResult>(mergedOptions);

  if (cachedConfiguration) return cachedConfiguration;

  // Search for configuration files
  const { configurationFilePath, numCustomConfiguration } =
    searchConfigurationFile(baseDir);

  if (options?.override?.log?.mode === 'verbose') {
    logConfigFileResult(baseDir, numCustomConfiguration, configurationFilePath);
  }

  let storedConfiguration: IntlayerConfig | undefined;

  if (configurationFilePath) {
    // Load the custom configuration
    const customConfiguration: CustomIntlayerConfig | undefined =
      loadConfigurationFile(configurationFilePath, {
        projectRequire: mergedOptions.require,
        // Dotenv options
        envVarOptions: {
          env: mergedOptions.env,
          envFile: mergedOptions.envFile,
        },
        // Sandbox context additional variables
        additionalEnvVars: mergedOptions.additionalEnvVars,
        aliases: mergedOptions.aliases,
      });

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

  cache.set(mergedOptions, {
    configuration,
    configurationFilePath,
  });

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
