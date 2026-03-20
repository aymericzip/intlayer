import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import type {
  CustomIntlayerConfig,
  IntlayerConfig,
} from '@intlayer/types/config';
import { writeJsonIfChanged } from '../writeJsonIfChanged';

const getCachedConfiguration = async (configuration: IntlayerConfig) => {
  const configFilePath = join(
    configuration.system.configDir,
    'configuration.json'
  );

  const configurationContent = await readFile(configFilePath, 'utf8');
  return JSON.parse(configurationContent);
};

export const isCachedConfigurationUpToDate = async (
  configuration: IntlayerConfig
): Promise<boolean | null> => {
  const cleanedConfiguration = cleanConfiguration(configuration);
  const cachedConfiguration = await getCachedConfiguration(configuration);

  const isSimilar = isDeepStrictEqual(
    cachedConfiguration,
    cleanedConfiguration
  );

  return isSimilar;
};

const cleanConfiguration = (configuration: IntlayerConfig): IntlayerConfig => {
  const parsedConfiguration = JSON.parse(
    JSON.stringify({
      internationalization: {
        locales: configuration.internationalization.locales,
        defaultLocale: configuration.internationalization.defaultLocale,
      },
      editor: configuration.editor,
      log: configuration.log,
      routing: configuration.routing,
      metadata: configuration.metadata,
    } as CustomIntlayerConfig)
  );

  return parsedConfiguration;
};

export const writeConfiguration = async (configuration: IntlayerConfig) => {
  const { system } = configuration;
  const { configDir } = system;

  // Ensure target directory exists
  // configDir is expected to be the directory where configuration.json will live
  await mkdir(configDir, { recursive: true });

  const configFilePath = join(configDir, 'configuration.json');

  const cleanedConfiguration = cleanConfiguration(configuration);

  await writeJsonIfChanged(configFilePath, cleanedConfiguration);
};
