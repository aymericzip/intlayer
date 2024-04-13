import { existsSync } from 'fs';
import { resolve } from 'path';

const EXTENSION = ['ts', 'js', 'json', 'cjs', 'mjs', ''];
const CONFIGURATION_FILE_NAME_1 = 'intlayer.config';
const CONFIGURATION_FILE_NAME_2 = '.intlayerrc';

const intLayerConfigFiles = EXTENSION.filter(
  (extension) => extension !== ''
).map((ext) => `${CONFIGURATION_FILE_NAME_1}.${ext}`);

const configurationFiles = [...intLayerConfigFiles, CONFIGURATION_FILE_NAME_2];

type SearchConfigurationFileResult = {
  configurationFilePath?: string;
  numCustomConfiguration: number;
};

export const searchConfigurationFile = (
  configFilePath: string
): SearchConfigurationFileResult => {
  let configurationFilePath: string | undefined = undefined;
  let numCustomConfiguration = 0;

  for (const fileName of configurationFiles) {
    try {
      const filePath = resolve(configFilePath, fileName);

      // Check if the file exists
      if (!existsSync(filePath)) {
        continue;
      } else {
        numCustomConfiguration += 1;

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

  return { configurationFilePath, numCustomConfiguration };
};
