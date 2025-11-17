import { relative } from 'node:path';
import type {
  CustomIntlayerConfig,
  IntlayerConfig,
  LogFunctions,
} from '@intlayer/types';
import merge from 'deepmerge';
import type { SandBoxContextOptions } from '../loadExternalFile/parseFileContent';
import { logger } from '../logger';
import { cacheMemory } from '../utils/cacheMemory';
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
  // cache
  cache?: boolean;
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
  let baseDir: string | undefined;

  try {
    // Can fail in some environments (e.g. MCP server, VScode extension)
    baseDir = options?.baseDir ?? getPackageJsonPath().baseDir;
  } catch (_err) {
    // Return default config if the package.json is not found
    return {
      configuration: buildConfigurationFields(
        {},
        options?.baseDir,
        options?.logFunctions
      ),
      configurationFilePath: undefined,
    };
  }

  const cachedConfiguration =
    cacheMemory.get<GetConfigurationAndFilePathResult>(options);

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
        projectRequire: options?.require,
        // Dotenv options
        envVarOptions: {
          env: options?.env,
          envFile: options?.envFile,
        },
        // Sandbox context additional variables
        additionalEnvVars: options?.additionalEnvVars,
        aliases: options?.aliases,
      });

    // Save the configuration to avoid reading the file again
    storedConfiguration = buildConfigurationFields(
      customConfiguration,
      options?.baseDir,
      options?.logFunctions
    );
  }

  // Log warning if multiple configuration files are found

  const projectRequireConfig: CustomIntlayerConfig = options?.require
    ? {
        build: {
          require: options?.require,
          cache: options?.cache,
        },
      }
    : {};

  const configWithProjectRequire = merge(
    storedConfiguration ?? {},
    projectRequireConfig
  ) as CustomIntlayerConfig;

  const configuration = merge(
    configWithProjectRequire,
    options?.override ?? {}
  ) as IntlayerConfig;

  cacheMemory.set(options, {
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
