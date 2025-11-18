import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import type { IntlayerConfig } from '@intlayer/types';
import { writeJsonIfChanged } from '../writeJsonIfChanged';

const getCachedConfiguration = async (configuration: IntlayerConfig) => {
  const configFilePath = join(
    configuration.content.configDir,
    'configuration.json'
  );

  const configurationContent = await readFile(configFilePath, 'utf8');
  return JSON.parse(configurationContent);
};

export const isCachedConfigurationUpToDate = async (
  configuration: IntlayerConfig
): Promise<boolean | null> => {
  try {
    const cachedConfiguration = await getCachedConfiguration(configuration);

    const parsedConfiguration = JSON.parse(JSON.stringify(configuration));

    const isSimilar = isDeepStrictEqual(
      cachedConfiguration,
      parsedConfiguration
    );

    return isSimilar;
  } catch {
    return null;
  }
};

export const writeConfiguration = async (configuration: IntlayerConfig) => {
  const { content } = configuration;
  const { configDir } = content;

  // Ensure target directory exists
  // configDir is expected to be the directory where configuration.json will live
  await mkdir(configDir, { recursive: true });

  const configFilePath = join(configDir, 'configuration.json');

  await writeJsonIfChanged(configFilePath, configuration);
};
