import { existsSync } from 'fs';
import { relative, resolve } from 'path';
import { BASE_DIR_PATH } from './defaultValues/server';

const EXTENSION = ['ts', 'js', 'json', 'cjs', 'mjs', ''];
const CONFIGURATION_FILE_NAME_1 = 'intlayer.config';
const CONFIGURATION_FILE_NAME_2 = '.intlayerrc';

const intLayerConfigFiles = EXTENSION.filter(
  (extension) => extension !== ''
).map((ext) => `${CONFIGURATION_FILE_NAME_1}.${ext}`);

const configurationFiles = [...intLayerConfigFiles, CONFIGURATION_FILE_NAME_2];

export const searchConfigurationFile = (
  configFilePath: string
): string | undefined => {
  let configurationFilePath: string | undefined = undefined;
  let numCustomConfiguration = 0;

  for (const fileName of configurationFiles) {
    try {
      const filePath = resolve(configFilePath, fileName);

      // Check if the file exists
      if (!existsSync(filePath)) {
        continue;
      } else {
        const relativeOutputPath = relative(BASE_DIR_PATH, filePath);

        numCustomConfiguration += 1;

        console.info(`Configuration file found: ${relativeOutputPath}`);

        if (!configurationFilePath) {
          configurationFilePath = filePath;
        }
      }
    } catch (error) {
      // Return "Cannot use import statement outside a module"
      console.error(`${fileName}: ${error as string}`);

      continue;
    }
  }

  if (numCustomConfiguration === 0) {
    console.info('Configuration file not found, using default configuration.');
  } else if (numCustomConfiguration > 1) {
    const relativeOutputPath = relative(BASE_DIR_PATH, configurationFilePath!);

    console.warn(
      `Multiple configuration files found, using ${relativeOutputPath}.`
    );
  }

  return configurationFilePath;
};
