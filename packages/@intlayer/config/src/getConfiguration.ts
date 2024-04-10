import { relative } from 'path';
import { buildConfigurationFields } from './buildConfigurationFields';
import { BASE_DIR_PATH } from './defaultValues/server';
import { loadConfigurationFile } from './loadConfigurationFile';
import { searchConfigurationFile } from './searchConfigurationFile';
import type { CustomIntlayerConfig, IntlayerConfig } from './types';

let storedConfiguration: IntlayerConfig | undefined;
let storedConfigurationFilePath: string | undefined;
let storedNumCustomConfiguration: number | undefined;

type GetConfigurationOptions = {
  baseDirPath: string;
  verbose: boolean;
};

const defaultOptions: GetConfigurationOptions = {
  baseDirPath: BASE_DIR_PATH,
  verbose: false,
};

export const getConfiguration = (
  options?: Partial<GetConfigurationOptions>
): IntlayerConfig => {
  const { baseDirPath, verbose } = { ...defaultOptions, ...options };

  if (!storedConfiguration) {
    // Search for configuration files
    const { configurationFilePath, numCustomConfiguration } =
      searchConfigurationFile(baseDirPath, verbose);

    // Load the custom configuration
    let customConfiguration: CustomIntlayerConfig | undefined;
    if (configurationFilePath) {
      customConfiguration = loadConfigurationFile(configurationFilePath);
    }

    // Save the configuration to avoid reading the file again
    storedConfiguration = buildConfigurationFields(customConfiguration);
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
