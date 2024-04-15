import { relative } from 'path';
import type { CustomIntlayerConfig, IntlayerConfig } from '../types';
import { buildConfigurationFields } from './buildConfigurationFields';
import { loadConfigurationFile } from './loadConfigurationFile';
import { searchConfigurationFile } from './searchConfigurationFile';

let storedConfiguration: IntlayerConfig | undefined;
let storedConfigurationFilePath: string | undefined;
let storedNumCustomConfiguration: number | undefined;

export type GetConfigurationOptions = {
  baseDir: string;
  verbose: boolean;
};

const BASE_DIR_PATH = process.env.INTLAYER_BASE_DIR_PATH ?? process.cwd();
const defaultOptions: GetConfigurationOptions = {
  baseDir: BASE_DIR_PATH,
  verbose: false,
};

export const getConfiguration = (
  options?: Partial<GetConfigurationOptions>
): IntlayerConfig => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { baseDir, verbose } = mergedOptions;

  if (!storedConfiguration) {
    // Search for configuration files
    const { configurationFilePath, numCustomConfiguration } =
      searchConfigurationFile(baseDir);

    // Load the custom configuration
    let customConfiguration: CustomIntlayerConfig | undefined;
    if (configurationFilePath) {
      customConfiguration = loadConfigurationFile(configurationFilePath);
    }

    // Save the configuration to avoid reading the file again
    storedConfiguration = buildConfigurationFields(
      mergedOptions,
      customConfiguration
    );
    storedConfigurationFilePath = configurationFilePath;
    storedNumCustomConfiguration = numCustomConfiguration;
  }

  // Log warning if multiple configuration files are found
  if (verbose)
    logConfigFileResult(
      storedNumCustomConfiguration,
      storedConfigurationFilePath
    );

  return storedConfiguration;
};

const logConfigFileResult = (
  numCustomConfiguration?: number,
  configurationFilePath?: string
) => {
  if (numCustomConfiguration === 0) {
    console.info('Configuration file not found, using default configuration.');
  } else {
    const relativeOutputPath = relative(BASE_DIR_PATH, configurationFilePath!);

    if (numCustomConfiguration === 1) {
      console.info(`Configuration file found: ${relativeOutputPath}.`);
    } else {
      console.warn(
        `Multiple configuration files found, using ${relativeOutputPath}.`
      );
    }
  }
};
